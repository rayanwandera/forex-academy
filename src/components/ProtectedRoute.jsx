import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ session, profile, loading, requireAdmin, children }) {
  if (loading) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        <p>Loading…</p>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !profile?.is_admin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (!requireAdmin && profile?.is_admin) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
