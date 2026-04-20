import { Link, Navigate, Outlet, useLocation } from 'react-router';

import { useAuth } from '~/contexts/AuthContext';
import { RoleEnum } from '~/enums/role.enum';

const { EMPLOYEE, TEAM_LEADER, HR_ADMIN } = RoleEnum;

const routeAccess: Record<string, RoleEnum[]> = {
  '/employee': [EMPLOYEE, TEAM_LEADER, HR_ADMIN],
  '/team': [TEAM_LEADER, HR_ADMIN],
  '/admin': [HR_ADMIN],
};

export { routeAccess };

export default function ProtectedLayout() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;

  const matchedPrefix = Object.keys(routeAccess).find((prefix) =>
    location.pathname.startsWith(prefix),
  );

  if (matchedPrefix) {
    const allowed = routeAccess[matchedPrefix];
    if (!allowed.includes(user.role)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return (
    <>
      <Link to="/" className="sr-only" data-testid="protected-brand-link">
        brand home
      </Link>
      <Outlet />
    </>
  );
}
