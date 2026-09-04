import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AdminDashboard() {
  const [payments, setPayments] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [users, setUsers] = useState([]);
  const [tab, setTab] = useState('payments');
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState('');

  async function loadAll() {
    const [{ data: p }, { data: r }, { data: w }, { data: u }] = await Promise.all([
      supabase.from('payments').select('*, user:user_id (full_name, phone)').order('created_at', { ascending: false }),
      supabase.from('referral_earnings').select('*, referrer:referrer_id (full_name), referred:referred_id (full_name)').order('created_at', { ascending: false }),
      supabase.from('withdrawal_requests').select('*, user:user_id (full_name)').order('created_at', { ascending: false }),
      supabase.from('profiles').select('id, full_name, phone, is_paid, is_admin, created_at').order('created_at', { ascending: false }),
    ]);
    setPayments(p || []);
    setReferrals(r || []);
    setWithdrawals(w || []);
    setUsers(u || []);
  }

  useEffect(() => { loadAll(); }, []);

  async function confirmPaymentManually(paymentId) {
    setBusyId(paymentId);
    setError('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch('/.netlify/functions/admin-confirm-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
        body: JSON.stringify({ paymentId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to confirm payment');
      await loadAll();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  async function markReferralPaid(id) {
    setBusyId(id);
    const { error: updateError } = await supabase.from('referral_earnings').update({ status: 'paid' }).eq('id', id);
    if (updateError) setError(updateError.message);
    await loadAll();
    setBusyId(null);
  }

  async function confirmWithdrawal(withdrawalRequestId) {
    setBusyId(withdrawalRequestId);
    setError('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch('/.netlify/functions/admin-confirm-withdrawal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
        body: JSON.stringify({ withdrawalRequestId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to confirm withdrawal');
      await loadAll();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  const pendingWithdrawalTotal = withdrawals.filter((w) => w.status === 'pending').reduce((s, w) => s + w.amount_ugx, 0);

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <h1 style={{ fontSize: '1.8rem' }}>Admin dashboard</h1>

      <div style={{ display: 'flex', gap: 24, margin: '1.5rem 0', flexWrap: 'wrap' }}>
        <div className="card" style={{ flex: 1, minWidth: 160 }}>
          <div className="mono" style={{ fontSize: '1.6rem', color: 'var(--gold)' }}>{users.length}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Total users</div>
        </div>
        <div className="card" style={{ flex: 1, minWidth: 160 }}>
          <div className="mono" style={{ fontSize: '1.6rem', color: 'var(--gain)' }}>{payments.filter((p) => p.status === 'successful').length}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Confirmed payments</div>
        </div>
        <div className="card" style={{ flex: 1, minWidth: 160 }}>
          <div className="mono" style={{ fontSize: '1.6rem' }}>
            {pendingWithdrawalTotal.toLocaleString()} UGX
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Withdrawals owed</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {['payments', 'withdrawals', 'referrals', 'users'].map((t) => (
          <button key={t} className={tab === t ? 'btn btn-primary' : 'btn btn-ghost'} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {error && <p className="error-text" style={{ marginBottom: 12 }}>{error}</p>}

      {tab === 'payments' && (
        <div className="card">
          <table>
            <thead>
              <tr><th>User</th><th>Phone</th><th>Amount</th><th>Note</th><th>Status</th><th>Date</th><th></th></tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td>{p.user?.full_name}</td>
                  <td className="mono">{p.phone}</td>
                  <td className="mono">{p.amount_ugx.toLocaleString()} UGX</td>
                  <td style={{ maxWidth: 220 }}>{p.note || '—'}</td>
                  <td><span className={`badge ${p.status === 'successful' ? 'badge-gain' : p.status === 'failed' ? 'badge-loss' : 'badge-pending'}`}>{p.status}</span></td>
                  <td>{new Date(p.created_at).toLocaleString()}</td>
                  <td>
                    {p.status !== 'successful' && (
                      <button className="btn btn-ghost" disabled={busyId === p.id} onClick={() => confirmPaymentManually(p.id)}>
                        {busyId === p.id ? 'Confirming…' : 'Confirm payment'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'withdrawals' && (
        <div className="card">
          <table>
            <thead>
              <tr><th>User</th><th>Phone</th><th>Amount</th><th>Status</th><th>Requested</th><th></th></tr>
            </thead>
            <tbody>
              {withdrawals.length === 0 && (
                <tr><td colSpan="6" style={{ color: 'var(--text-dim)' }}>No withdrawal requests yet.</td></tr>
              )}
              {withdrawals.map((w) => (
                <tr key={w.id}>
                  <td>{w.user?.full_name}</td>
                  <td className="mono">{w.phone}</td>
                  <td className="mono">{w.amount_ugx.toLocaleString()} UGX</td>
                  <td><span className={`badge ${w.status === 'paid' ? 'badge-gain' : 'badge-pending'}`}>{w.status}</span></td>
                  <td>{new Date(w.created_at).toLocaleString()}</td>
                  <td>
                    {w.status !== 'paid' && (
                      <button className="btn btn-ghost" disabled={busyId === w.id} onClick={() => confirmWithdrawal(w.id)}>
                        {busyId === w.id ? 'Confirming…' : 'Mark as paid'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'referrals' && (
        <div className="card">
          <table>
            <thead>
              <tr><th>Referrer</th><th>Referred</th><th>Amount</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {referrals.map((r) => (
                <tr key={r.id}>
                  <td>{r.referrer?.full_name}</td>
                  <td>{r.referred?.full_name}</td>
                  <td className="mono">{r.amount_ugx.toLocaleString()} UGX</td>
                  <td><span className={`badge ${r.status === 'paid' ? 'badge-gain' : 'badge-pending'}`}>{r.status}</span></td>
                  <td>
                    {r.status === 'pending' && (
                      <button className="btn btn-ghost" disabled={busyId === r.id} onClick={() => markReferralPaid(r.id)}>
                        {busyId === r.id ? 'Saving…' : 'Mark as paid'}
                      </button>
                    )}
                    {r.status === 'requested' && (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>See Withdrawals tab</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'users' && (
        <div className="card">
          <table>
            <thead>
              <tr><th>Name</th><th>Phone</th><th>Paid</th><th>Joined</th></tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.full_name} {u.is_admin && <span className="badge">admin</span>}</td>
                  <td className="mono">{u.phone}</td>
                  <td><span className={`badge ${u.is_paid ? 'badge-gain' : 'badge-pending'}`}>{u.is_paid ? 'paid' : 'unpaid'}</span></td>
                  <td>{new Date(u.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
