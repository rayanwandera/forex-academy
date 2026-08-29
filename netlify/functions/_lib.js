import { createClient } from '@supabase/supabase-js';

export const COURSE_PRICE_UGX = 20000;
export const REFERRAL_BONUS_UGX = 5000;

// Service-role client — only ever used inside Netlify Functions, never sent to the browser.
export function getAdminClient() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// Verifies the bearer token sent from the frontend and returns the Supabase auth user.
export async function getAuthedUser(event) {
  const authHeader = event.headers.authorization || event.headers.Authorization || '';
  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    console.log('getAuthedUser: no bearer token found in request headers');
    return null;
  }

  const admin = getAdminClient();
  const { data, error } = await admin.auth.getUser(token);
  if (error) {
    console.log('getAuthedUser: admin.auth.getUser failed:', error.message);
    return null;
  }
  return data.user;
}

function airtelBaseUrl() {
  return process.env.AIRTEL_ENV === 'production'
    ? 'https://openapi.airtel.africa'
    : 'https://openapiuat.airtel.africa';
}

// OAuth2 client-credentials token for the Airtel Money Open API.
export async function getAirtelAccessToken() {
  const res = await fetch(`${airtelBaseUrl()}/auth/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: '*/*' },
    body: JSON.stringify({
      client_id: process.env.AIRTEL_CLIENT_ID,
      client_secret: process.env.AIRTEL_CLIENT_SECRET,
      grant_type: 'client_credentials',
    }),
  });
  const data = await res.json();
  if (!res.ok || !data.access_token) {
    throw new Error(`Airtel auth failed: ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

// Normalizes a Ugandan number like "0772123456" or "+256772123456" to the
// local-format MSISDN Airtel's API expects (no country code, no leading 0).
export function normalizeUgPhone(rawPhone) {
  const digits = String(rawPhone).replace(/\D/g, '');
  if (digits.startsWith('256')) return digits.slice(3);
  if (digits.startsWith('0')) return digits.slice(1);
  return digits;
}

// Sends the "Request to Pay" push — this triggers Airtel's own USSD prompt on
// the customer's phone where THEY enter their PIN. We never see or ask for it.
//
// Confirmed against the Uganda developer portal (Documentation > Merchant
// Collection > Transfers, Aug 2026): POST /merchant-collection/v1/payments.
// `payee.relationship_id` is the sub-merchant ID you chose when you did the
// one-time "Register Merchant" call — set it as AIRTEL_MERCHANT_RELATIONSHIP_ID.
export async function initiateAirtelRequestToPay({ accessToken, msisdn, amount, transactionId, reference }) {
  const res = await fetch(`${airtelBaseUrl()}/merchant-collection/v1/payments`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'x-country': 'UG',
      'x-currency': 'UGX',
    },
    body: JSON.stringify({
      payee: { relationship_id: process.env.AIRTEL_MERCHANT_RELATIONSHIP_ID },
      payer: { msisdn },
      transaction: { id: transactionId, amount: String(amount), reference },
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Airtel request-to-pay failed: ${JSON.stringify(data)}`);
  }
  return data;
}

// Polls Airtel for the current status of a transaction by our transaction id.
// TODO: confirm the exact path/response shape against Documentation >
// Merchant Collection > "Payment enquiry" in the portal — this is a
// best-guess placeholder following the same /merchant-collection/v1 family
// until that page is checked (see README "Payment enquiry" note).
export async function getAirtelTransactionStatus({ accessToken, transactionId }) {
  const res = await fetch(`${airtelBaseUrl()}/merchant-collection/v1/payments/${transactionId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'x-country': 'UG',
      'x-currency': 'UGX',
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Airtel status check failed: ${JSON.stringify(data)}`);
  }
  return data;
}

// Shared by the webhook and the status-poll fallback: flips the payment and
// profile to paid, and credits the referrer (if any) exactly once thanks to
// the unique(referrer_id, referred_id) constraint on referral_earnings.
export async function completeSuccessfulPayment(admin, payment) {
  await admin.from('payments').update({ status: 'successful' }).eq('id', payment.id);

  const { data: profile } = await admin
    .from('profiles')
    .select('id, referred_by')
    .eq('id', payment.user_id)
    .single();

  await admin.from('profiles').update({ is_paid: true }).eq('id', payment.user_id);

  if (profile?.referred_by) {
    await admin
      .from('referral_earnings')
      .upsert(
        {
          referrer_id: profile.referred_by,
          referred_id: payment.user_id,
          amount_ugx: REFERRAL_BONUS_UGX,
          status: 'pending',
        },
        { onConflict: 'referrer_id,referred_id', ignoreDuplicates: true }
      );
  }
}

export function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}
