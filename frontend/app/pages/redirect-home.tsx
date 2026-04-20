import { Navigate } from 'react-router';
import { ROLE_HOME_ROUTE } from '~/enums/role.enum';
import { useAuth } from '~/contexts/AuthContext';

export default function RedirectHome() {
  const { user, isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="p-6">Loading...</div>;
  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;
  return <Navigate to={ROLE_HOME_ROUTE[user.role]} replace />;
}
