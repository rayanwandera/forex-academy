import {
  getAdminClient,
  getAuthedUser,
  getAirtelAccessToken,
  getAirtelTransactionStatus,
  completeSuccessfulPayment,
  json,
} from './_lib.js';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });

  const user = await getAuthedUser(event);
  if (!user) return json(401, { error: 'Not authenticated' });

  let paymentId;
  try {
    ({ paymentId } = JSON.parse(event.body || '{}'));
  } catch {
    return json(400, { error: 'Invalid request body' });
  }

  const admin = getAdminClient();
  const { data: payment, error } = await admin.from('payments').select('*').eq('id', paymentId).single();
  if (error || !payment) return json(404, { error: 'Payment not found' });
  if (payment.user_id !== user.id) return json(403, { error: 'Not your payment' });

  // The webhook may already have resolved this — trust the DB if so.
  if (payment.status !== 'pending') {
    return json(200, { status: payment.status });
  }

  try {
    const accessToken = await getAirtelAccessToken();
    const result = await getAirtelTransactionStatus({ accessToken, transactionId: payment.provider_reference });
    // Field path is not yet confirmed against the "Payment enquiry" doc page —
    // log the raw shape once in sandbox and adjust this line if it differs.
    // e.g. "TS" (success), "TF" (failed), "TIP" (in progress)
    const txnStatus = result?.data?.transaction?.status || result?.transaction?.status || result?.status;

    if (txnStatus === 'TS') {
      await completeSuccessfulPayment(admin, payment);
      return json(200, { status: 'successful' });
    }
    if (txnStatus === 'TF') {
      await admin.from('payments').update({ status: 'failed' }).eq('id', payment.id);
      return json(200, { status: 'failed' });
    }
    return json(200, { status: 'pending' });
  } catch (err) {
    // Don't fail the whole payment just because a single status check errored —
    // let the frontend keep polling until its own timeout.
    return json(200, { status: 'pending', note: err.message });
  }
};
