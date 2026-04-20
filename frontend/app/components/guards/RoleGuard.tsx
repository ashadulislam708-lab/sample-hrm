import { Navigate, Outlet } from 'react-router';

import { useAuth } from '~/contexts/AuthContext';
import type { RoleEnum } from '~/enums/role.enum';

interface Props {
  allowedRoles: RoleEnum[];
}

export default function RoleGuard({ allowedRoles }: Props) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
}
