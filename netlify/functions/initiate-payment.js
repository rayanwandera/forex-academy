import { randomUUID } from 'crypto';
import {
  getAdminClient,
  getAuthedUser,
  getAirtelAccessToken,
  initiateAirtelRequestToPay,
  normalizeUgPhone,
  COURSE_PRICE_UGX,
  json,
} from './_lib.js';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });

  const user = await getAuthedUser(event);
  if (!user) return json(401, { error: 'Not authenticated' });

  let phone;
  try {
    ({ phone } = JSON.parse(event.body || '{}'));
  } catch {
    return json(400, { error: 'Invalid request body' });
  }
  if (!phone) return json(400, { error: 'Phone number is required' });

  const admin = getAdminClient();
  const transactionId = randomUUID();

  // Record the attempt as pending before calling Airtel, so admins can see and
  // manually reconcile it even if the webhook or a later status check fails.
  const { data: payment, error: insertError } = await admin
    .from('payments')
    .insert({
      user_id: user.id,
      phone,
      amount_ugx: COURSE_PRICE_UGX,
      provider: 'airtel',
      provider_reference: transactionId,
      status: 'pending',
    })
    .select()
    .single();

  if (insertError) return json(500, { error: insertError.message });

  try {
    const accessToken = await getAirtelAccessToken();
    await initiateAirtelRequestToPay({
      accessToken,
      msisdn: normalizeUgPhone(phone),
      amount: COURSE_PRICE_UGX,
      transactionId,
      reference: 'Pip & Ledger course enrollment',
    });
  } catch (err) {
    await admin.from('payments').update({ status: 'failed' }).eq('id', payment.id);
    return json(502, { error: `Could not reach Airtel Money: ${err.message}` });
  }

  return json(200, { paymentId: payment.id });
};
