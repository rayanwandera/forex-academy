import { getAdminClient, getAuthedUser, COURSE_PRICE_UGX, json } from './_lib.js';

// This is the default payment path while automatic Airtel Money confirmation
// isn't wired up yet: the user sends money to the site's Airtel number
// themselves, then submits the phone number they paid from (and optionally a
// transaction reference) here. This just creates a pending row for an admin
// to check and confirm in Admin > Payments — no money moves through this call.
export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });

  const user = await getAuthedUser(event);
  if (!user) return json(401, { error: 'Not authenticated' });

  let phone, note;
  try {
    ({ phone, note } = JSON.parse(event.body || '{}'));
  } catch {
    return json(400, { error: 'Invalid request body' });
  }
  if (!phone) return json(400, { error: 'Phone number is required' });

  const admin = getAdminClient();
  const { data: payment, error } = await admin
    .from('payments')
    .insert({
      user_id: user.id,
      phone,
      amount_ugx: COURSE_PRICE_UGX,
      provider: 'manual',
      note: note || null,
      status: 'pending',
    })
    .select()
    .single();

  if (error) return json(500, { error: error.message });

  return json(200, { paymentId: payment.id });
};
