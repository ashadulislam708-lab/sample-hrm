import { Navigate, Outlet } from 'react-router';

import { useAuth } from '~/contexts/AuthContext';

export default function AuthGuard() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}
