import { Link, Navigate, Outlet } from 'react-router';

import { useAuth } from '~/contexts/AuthContext';
import { RoleEnum } from '~/enums/role.enum';

export default function TeamLeaderLayout() {
  const { user, isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="p-6">Loading...</div>;
  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;
  if (user.role !== RoleEnum.TEAM_LEADER && user.role !== RoleEnum.HR_ADMIN) {
    return <Navigate to="/unauthorized" replace />;
  }
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 flex-col bg-[#0F172A] text-white lg:flex" data-testid="team-sidebar">
        <div className="px-6 py-4 text-lg font-semibold">
          <Link
            to="/team/dashboard"
            aria-label="Team Lead brand home"
            data-testid="team-brand-link"
          >
            <span className="sr-only">brand </span>Team Lead
          </Link>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          <a href="/team/dashboard" className="block rounded px-3 py-2 hover:bg-white/10">Team Dashboard</a>
          <a href="/team/approvals" className="block rounded px-3 py-2 hover:bg-white/10">Approvals</a>
          <a href="/team/performance" className="block rounded px-3 py-2 hover:bg-white/10">Performance</a>
          <a href="/team/reports" className="block rounded px-3 py-2 hover:bg-white/10">Reports</a>
        </nav>
        <div className="px-6 py-4 text-xs text-white/60">{user.fullName}</div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
