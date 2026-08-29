import { Link } from 'react-router-dom';
import { courses, COURSE_PRICE_UGX, REFERRAL_BONUS_UGX } from '../data/courses';

function Ticker() {
  // Deterministic pseudo-random candlestick strip — a signature visual, not decoration:
  // it evokes a live price feed without pretending to be real market data.
  const seed = [4, 9, 2, 7, 5, 8, 3, 6, 9, 4, 7, 2, 8, 5, 3, 6, 9, 4, 7, 5];
  return (
    <div
      aria-hidden="true"
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 6,
        height: 90,
        opacity: 0.55,
        marginBottom: '2rem',
      }}
    >
      {seed.map((v, i) => {
        const up = i % 3 !== 0;
        const height = 20 + v * 6;
        return (
          <div
            key={i}
            style={{
              width: 6,
              height,
              background: up ? 'var(--gain)' : 'var(--loss)',
              borderRadius: 2,
              animation: `pulse 2.4s ease-in-out ${i * 0.08}s infinite`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.15); }
        }
        @media (prefers-reduced-motion: reduce) {
          [aria-hidden="true"] div { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

export default function Landing({ session }) {
  return (
    <div>
      {/* Hero */}
      <section className="container" style={{ padding: '5rem 1.5rem 4rem' }}>
        <Ticker />
        <div className="badge" style={{ marginBottom: '1.25rem' }}>PIP &amp; LEDGER · FOREX EDUCATION</div>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', maxWidth: 780 }}>
          Learn to read the market. Learn to spot a scam. Get paid for who you bring.
        </h1>
        <p style={{ fontSize: '1.15rem', maxWidth: 620 }}>
          Three practical courses — forex fundamentals, how brokers and "gurus" scam beginners,
          and how to use AI tools without being fooled by them — for a one-time {COURSE_PRICE_UGX.toLocaleString()} UGX.
          Refer a friend and earn {REFERRAL_BONUS_UGX.toLocaleString()} UGX when they enroll.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <Link to={session ? '/dashboard' : '/signup'} className="btn btn-primary">
            {session ? 'Go to dashboard' : 'Enroll now'}
          </Link>
          <a href="#curriculum" className="btn btn-ghost">See the curriculum</a>
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="container" style={{ padding: '2rem 1.5rem 4rem' }}>
        <h2 style={{ fontSize: '1.6rem' }}>What's inside</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginTop: '1.5rem' }}>
          {courses.map((c, i) => (
            <div key={c.id} className="card">
              <div className="badge mono" style={{ marginBottom: 12 }}>{String(i + 1).padStart(2, '0')} / {String(courses.length).padStart(2, '0')}</div>
              <h3 style={{ fontSize: '1.15rem' }}>{c.title}</h3>
              <p>{c.tagline}</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>{c.lessons.length} lessons</p>
            </div>
          ))}
        </div>
      </section>

      {/* Referral pitch */}
      <section className="container" style={{ padding: '1rem 1.5rem 5rem' }}>
        <div className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ maxWidth: 560 }}>
            <h2 style={{ fontSize: '1.4rem' }}>Earn by sharing what you learn</h2>
            <p>
              Once you enroll, you get a personal referral link. Every friend who signs up and
              completes payment earns you {REFERRAL_BONUS_UGX.toLocaleString()} UGX — tracked automatically on your dashboard.
            </p>
          </div>
          <Link to={session ? '/dashboard' : '/signup'} className="btn btn-primary">
            {session ? 'View my referral link' : 'Create an account'}
          </Link>
        </div>
      </section>
    </div>
  );
}
