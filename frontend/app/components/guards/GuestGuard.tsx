import { Navigate, Outlet } from 'react-router';

import { useAuth } from '~/contexts/AuthContext';
import { ROLE_HOME_ROUTE } from '~/enums/role.enum';

export default function GuestGuard() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isAuthenticated && user) return <Navigate to={ROLE_HOME_ROUTE[user.role]} replace />;

  return <Outlet />;
}
