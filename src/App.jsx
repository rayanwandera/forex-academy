import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) loadProfile(session.user.id, { showLoading: true });
      else setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) loadProfile(session.user.id);
      else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function loadProfile(userId, { showLoading = false } = {}) {
    if (showLoading) setLoading(true);
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (!error) setProfile(data);
    setLoading(false);
  }

  return (
    <>
      <Navbar session={session} profile={profile} />
      <Routes>
        <Route path="/" element={<Landing session={session} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute session={session} profile={profile} loading={loading}>
              <Dashboard profile={profile} refreshProfile={() => loadProfile(session.user.id)} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute session={session} profile={profile} loading={loading} requireAdmin>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
