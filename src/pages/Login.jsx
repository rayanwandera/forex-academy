import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }
    navigate('/dashboard');
  }

  return (
    <div className="container" style={{ maxWidth: 420, padding: '3rem 1.5rem' }}>
      <h1 style={{ fontSize: '1.8rem' }}>Log in</h1>

      <form onSubmit={handleSubmit} className="card">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <p className="error-text" style={{ marginTop: 12 }}>{error}</p>}

        <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 20 }} disabled={submitting}>
          {submitting ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <p style={{ marginTop: 16 }}>
        No account yet? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
