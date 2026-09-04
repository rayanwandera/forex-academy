import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Navbar({ session, profile }) {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/');
  }

  return (
    <header style={{ borderBottom: '1px solid var(--line)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'baseline', gap: 8, color: 'var(--text)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.15rem' }}>
          <span style={{ color: 'var(--gold)' }}>Pip</span>&amp;Ledger
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {!session && (
            <>
              <Link to="/login">Log in</Link>
              <Link to="/signup" className="btn btn-primary">Get started</Link>
            </>
          )}
          {session && profile && !profile.is_admin && (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button className="btn btn-ghost" onClick={handleLogout}>Log out</button>
            </>
          )}
          {session && profile && profile.is_admin && (
            <>
              <Link to="/admin">Admin</Link>
              <button className="btn btn-ghost" onClick={handleLogout}>Log out</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
