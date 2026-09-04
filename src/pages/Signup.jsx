import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Signup() {
  const [searchParams] = useSearchParams();
  const refFromLink = searchParams.get('ref') || '';

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState(refFromLink);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setInfo('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setSubmitting(true);
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone,
          referral_code_used: referralCode.trim() || null,
        },
      },
    });
    setSubmitting(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (data.session) {
      navigate('/dashboard');
    } else {
      setInfo('Check your email to confirm your account, then log in.');
    }
  }

  return (
    <div className="container" style={{ maxWidth: 460, padding: '3rem 1.5rem' }}>
      <h1 style={{ fontSize: '1.8rem' }}>Create your account</h1>
      <p>Enroll in the course and get your own referral link.</p>

      <form onSubmit={handleSubmit} className="card">
        <label htmlFor="fullName">Full name</label>
        <input id="fullName" required value={fullName} onChange={(e) => setFullName(e.target.value)} />

        <label htmlFor="phone">Phone number (for Airtel Money payment)</label>
        <input id="phone" required placeholder="07XXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} />

        <label htmlFor="email">Email</label>
        <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />

        <label htmlFor="referral">Referral code (optional)</label>
        <input id="referral" value={referralCode} onChange={(e) => setReferralCode(e.target.value)} placeholder="e.g. AB12CD" />

        {error && <p className="error-text" style={{ marginTop: 12 }}>{error}</p>}
        {info && <p className="success-text" style={{ marginTop: 12 }}>{info}</p>}

        <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 20 }} disabled={submitting}>
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p style={{ marginTop: 16 }}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}
