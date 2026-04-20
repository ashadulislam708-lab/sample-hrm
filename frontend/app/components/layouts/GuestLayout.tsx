import { Link, Navigate, Outlet } from 'react-router';

import { useAuth } from '~/contexts/AuthContext';
import { ROLE_HOME_ROUTE } from '~/enums/role.enum';

export default function GuestLayout() {
  const { user, isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isAuthenticated && user) return <Navigate to={ROLE_HOME_ROUTE[user.role]} replace />;
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted p-6">
      <Link to="/" className="sr-only" aria-label="Potential HRM home" data-testid="guest-brand-link">
        brand home
      </Link>
      <div className="w-full max-w-md rounded-lg bg-background p-8 shadow-sm">
        <Outlet />
      </div>
    </main>
  );
}
