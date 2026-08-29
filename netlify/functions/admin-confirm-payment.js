import { getAdminClient, getAuthedUser, completeSuccessfulPayment, json } from './_lib.js';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });

  const user = await getAuthedUser(event);
  if (!user) return json(401, { error: 'Not authenticated' });

  const admin = getAdminClient();
  const { data: callerProfile } = await admin.from('profiles').select('is_admin').eq('id', user.id).single();
  if (!callerProfile?.is_admin) return json(403, { error: 'Admin only' });

  let paymentId;
  try {
    ({ paymentId } = JSON.parse(event.body || '{}'));
  } catch {
    return json(400, { error: 'Invalid request body' });
  }

  const { data: payment, error } = await admin.from('payments').select('*').eq('id', paymentId).single();
  if (error || !payment) return json(404, { error: 'Payment not found' });

  await completeSuccessfulPayment(admin, payment);
  return json(200, { ok: true });
};
