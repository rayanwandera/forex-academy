import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { courses, REFERRAL_BONUS_UGX } from '../data/courses';
import Payment from './Payment';

function CourseAccordion() {
  const [openLesson, setOpenLesson] = useState(null);

  return (
    <div>
      {courses.map((course) => (
        <div key={course.id} className="card" style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: '1.2rem' }}>{course.title}</h3>
          <p>{course.tagline}</p>
          <div>
            {course.lessons.map((lesson) => {
              const isOpen = openLesson === lesson.id;
              return (
                <div key={lesson.id} style={{ borderTop: '1px solid var(--line)', padding: '0.9rem 0' }}>
                  <button
                    onClick={() => setOpenLesson(isOpen ? null : lesson.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text)',
                      width: '100%',
                      textAlign: 'left',
                      display: 'flex',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    {lesson.title}
                    <span className="mono" style={{ color: 'var(--gold)' }}>{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div style={{ marginTop: 12, whiteSpace: 'pre-line', color: 'var(--text-dim)' }}>
                      {lesson.body}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

const MIN_WITHDRAWAL_UGX = 50000;

function ReferralPanel({ profile }) {
  const [earnings, setEarnings] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState(profile?.phone || '');
  const [withdrawStatus, setWithdrawStatus] = useState('idle'); // idle | submitting | error
  const [withdrawError, setWithdrawError] = useState('');
  const referralLink = `${window.location.origin}/signup?ref=${profile.referral_code}`;

  async function load() {
    const [{ data: earningsData }, { data: withdrawalsData }] = await Promise.all([
      supabase
        .from('referral_earnings')
        .select('id, amount_ugx, status, created_at, referred:referred_id (full_name)')
        .eq('referrer_id', profile.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('withdrawal_requests')
        .select('id, amount_ugx, phone, status, created_at')
        .eq('user_id', profile.id)
        .order('created_at', { ascending: false }),
    ]);
    setEarnings(earningsData || []);
    setWithdrawals(withdrawalsData || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.id]);

  const total = earnings.reduce((sum, e) => sum + e.amount_ugx, 0);
  const paidOut = earnings.filter((e) => e.status === 'paid').reduce((sum, e) => sum + e.amount_ugx, 0);
  const availableToWithdraw = earnings.filter((e) => e.status === 'pending').reduce((sum, e) => sum + e.amount_ugx, 0);
  const hasPendingRequest = withdrawals.some((w) => w.status === 'pending');
  const canWithdraw = availableToWithdraw >= MIN_WITHDRAWAL_UGX && !hasPendingRequest;

  function copyLink() {
    navigator.clipboard.writeText(referralLink);
  }

  async function handleWithdraw() {
    setWithdrawError('');
    setWithdrawStatus('submitting');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch('/.netlify/functions/request-withdrawal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` },
        body: JSON.stringify({ phone }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Could not submit withdrawal');
      await load();
      setWithdrawStatus('idle');
    } catch (err) {
      setWithdrawError(err.message);
      setWithdrawStatus('error');
    }
  }

  return (
    <div className="card">
      <h3 style={{ fontSize: '1.2rem' }}>Your referrals</h3>
      <p>Share your link. You earn {REFERRAL_BONUS_UGX.toLocaleString()} UGX for every friend who enrolls.</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        <input readOnly value={referralLink} style={{ flex: 1, minWidth: 220 }} />
        <button className="btn btn-ghost" onClick={copyLink}>Copy</button>
      </div>

      <div style={{ display: 'flex', gap: 24, marginBottom: 20, flexWrap: 'wrap' }}>
        <div>
          <div className="mono" style={{ fontSize: '1.6rem', color: 'var(--gold)' }}>{earnings.length}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Referrals</div>
        </div>
        <div>
          <div className="mono" style={{ fontSize: '1.6rem' }}>{total.toLocaleString()} UGX</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Total earned</div>
        </div>
        <div>
          <div className="mono" style={{ fontSize: '1.6rem', color: 'var(--gain)' }}>{paidOut.toLocaleString()} UGX</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Paid out</div>
        </div>
      </div>

      <div className="card" style={{ background: 'var(--ink-soft)', marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Available to withdraw</div>
            <div className="mono" style={{ fontSize: '1.3rem' }}>{availableToWithdraw.toLocaleString()} UGX</div>
          </div>
          {hasPendingRequest ? (
            <span className="badge badge-pending">Withdrawal pending</span>
          ) : (
            <span className="badge">{MIN_WITHDRAWAL_UGX.toLocaleString()} UGX minimum (10 referrals)</span>
          )}
        </div>

        {canWithdraw ? (
          <div>
            <label htmlFor="withdraw-phone">Airtel Money number to receive payout</label>
            <input id="withdraw-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="07XXXXXXXX" />
            {withdrawError && <p className="error-text" style={{ marginTop: 8 }}>{withdrawError}</p>}
            <button className="btn btn-primary btn-block" style={{ marginTop: 12 }} disabled={withdrawStatus === 'submitting'} onClick={handleWithdraw}>
              {withdrawStatus === 'submitting' ? 'Submitting…' : `Withdraw ${availableToWithdraw.toLocaleString()} UGX`}
            </button>
          </div>
        ) : hasPendingRequest ? (
          <p style={{ fontSize: '0.85rem', margin: 0 }}>An admin will confirm and send your payout soon.</p>
        ) : (
          <p style={{ fontSize: '0.85rem', margin: 0 }}>
            Refer {Math.max(0, Math.ceil((MIN_WITHDRAWAL_UGX - availableToWithdraw) / REFERRAL_BONUS_UGX))} more people to unlock withdrawal.
          </p>
        )}
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : earnings.length === 0 ? (
        <p>No referrals yet — share your link above to start earning.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Friend</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {earnings.map((e) => (
              <tr key={e.id}>
                <td>{e.referred?.full_name || 'Referred user'}</td>
                <td className="mono">{e.amount_ugx.toLocaleString()} UGX</td>
                <td>
                  <span className={`badge ${e.status === 'paid' ? 'badge-gain' : 'badge-pending'}`}>
                    {e.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default function Dashboard({ profile, refreshProfile }) {
  if (!profile) return null;

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <h1 style={{ fontSize: '1.8rem' }}>Welcome, {profile.full_name}</h1>

      {!profile.is_paid && (
        <div style={{ marginBottom: 32 }}>
          <Payment profile={profile} />
        </div>
      )}

      {profile.is_paid && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(280px, 1fr)', gap: 24, alignItems: 'start' }}>
          <CourseAccordion />
          <ReferralPanel profile={profile} />
        </div>
      )}
    </div>
  );
}
