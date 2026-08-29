import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { COURSE_PRICE_UGX, MERCHANT_PHONE_DISPLAY } from '../data/courses';

export default function Payment({ profile }) {
  const [phone, setPhone] = useState(profile?.phone || '');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | submitted | error
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setStatus('submitting');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch('/.netlify/functions/submit-payment-claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ phone, note }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Could not submit payment');
      setStatus('submitted');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }

  if (status === 'submitted') {
    return (
      <div className="card" style={{ maxWidth: 480 }}>
        <p className="badge badge-pending" style={{ marginBottom: 12 }}>Pending confirmation</p>
        <h3 style={{ fontSize: '1.15rem' }}>Payment submitted</h3>
        <p>
          We've recorded your payment and it's waiting for an admin to confirm it. This is
          usually done within a few hours. Your course will unlock automatically as soon as
          it's confirmed — refresh this page later to check.
        </p>
        <button className="btn btn-ghost" onClick={() => window.location.reload()}>Refresh now</button>
      </div>
    );
  }

  return (
    <div className="card" style={{ maxWidth: 480 }}>
      <h3 style={{ fontSize: '1.15rem' }}>Unlock the full course</h3>
      <p>
        Send <strong className="mono">{COURSE_PRICE_UGX.toLocaleString()} UGX</strong> via Airtel Money to:
      </p>
      <p className="mono" style={{ fontSize: '1.4rem', color: 'var(--gold)', marginBottom: 20 }}>
        {MERCHANT_PHONE_DISPLAY}
      </p>
      <p style={{ fontSize: '0.85rem' }}>
        Use your own Airtel Money app or dial *185# as usual — enter your PIN there like any
        normal payment. We never ask for your PIN on this site. Once you've sent it, tell us
        below so an admin can confirm and unlock your account.
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="paid-phone">The phone number you paid from</label>
        <input
          id="paid-phone"
          required
          placeholder="07XXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label htmlFor="paid-note">Transaction reference or note (optional)</label>
        <input
          id="paid-note"
          placeholder="e.g. Airtel Money transaction ID from the SMS confirmation"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        {error && <p className="error-text" style={{ marginTop: 12 }}>{error}</p>}

        <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 20 }} disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Submitting…' : "I've sent the payment"}
        </button>
      </form>
    </div>
  );
}
