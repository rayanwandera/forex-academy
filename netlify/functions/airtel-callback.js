import { getAdminClient, completeSuccessfulPayment, json } from './_lib.js';

// Register this exact URL (including the ?token=... secret) as your callback
// URL in the Airtel developer portal:
//   https://YOUR-SITE.netlify.app/.netlify/functions/airtel-callback?token=YOUR_SECRET
// The token is a shared secret you invent yourself and set as
// AIRTEL_CALLBACK_SECRET in Netlify env vars — it stops randoms from POSTing
// fake "payment successful" events at this public URL.
export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });

  const token = event.queryStringParameters?.token;
  if (!token || token !== process.env.AIRTEL_CALLBACK_SECRET) {
    return json(401, { error: 'Invalid callback token' });
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'Invalid payload' });
  }

  // Airtel's payload shape can vary by product/version — log it so you can
  // adjust this parsing to match exactly what your sandbox sends you.
  console.log('Airtel callback payload:', JSON.stringify(body));

  const transactionId = body?.transaction?.id || body?.data?.transaction?.id;
  const status = body?.transaction?.status_code || body?.transaction?.status || body?.data?.transaction?.status;

  if (!transactionId) return json(400, { error: 'Missing transaction id in payload' });

  const admin = getAdminClient();
  const { data: payment } = await admin
    .from('payments')
    .select('*')
    .eq('provider_reference', transactionId)
    .single();

  if (!payment) return json(404, { error: 'Unknown transaction' });

  const isSuccess = ['TS', 'SUCCESS', 'SUCCESSFUL'].includes(String(status).toUpperCase());
  const isFailure = ['TF', 'FAILED', 'FAILURE'].includes(String(status).toUpperCase());

  if (isSuccess && payment.status !== 'successful') {
    await completeSuccessfulPayment(admin, payment);
  } else if (isFailure && payment.status === 'pending') {
    await admin.from('payments').update({ status: 'failed' }).eq('id', payment.id);
  }

  return json(200, { received: true });
};
