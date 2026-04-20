import { Link, Navigate, Outlet } from 'react-router';

import { useAuth } from '~/contexts/AuthContext';
import { RoleEnum } from '~/enums/role.enum';

export default function AdminLayout() {
  const { user, isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="p-6">Loading...</div>;
  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;
  if (user.role !== RoleEnum.HR_ADMIN) return <Navigate to="/unauthorized" replace />;
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 flex-col bg-[#0F172A] text-white lg:flex" data-testid="admin-sidebar">
        <div className="px-6 py-4 text-lg font-semibold">
          <Link
            to="/admin/dashboard"
            aria-label="HR Admin brand home"
            data-testid="admin-brand-link"
          >
            <span className="sr-only">brand </span>HR Admin
          </Link>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
          <a href="/admin/dashboard" className="block rounded px-3 py-2 hover:bg-white/10">Dashboard</a>
          <a href="/admin/employees" className="block rounded px-3 py-2 hover:bg-white/10">Employees</a>
          <a href="/admin/attendance" className="block rounded px-3 py-2 hover:bg-white/10">Attendance</a>
          <a href="/admin/leave" className="block rounded px-3 py-2 hover:bg-white/10">Leave</a>
          <a href="/admin/leave/emergency" className="block rounded px-3 py-2 hover:bg-white/10">Emergency Leave</a>
          <a href="/admin/payroll" className="block rounded px-3 py-2 hover:bg-white/10">Payroll</a>
          <a href="/admin/bonuses" className="block rounded px-3 py-2 hover:bg-white/10">Bonuses</a>
          <a href="/admin/loans" className="block rounded px-3 py-2 hover:bg-white/10">Loans</a>
          <a href="/admin/performance" className="block rounded px-3 py-2 hover:bg-white/10">Performance</a>
          <a href="/admin/recruitment" className="block rounded px-3 py-2 hover:bg-white/10">Recruitment</a>
          <a href="/admin/policies" className="block rounded px-3 py-2 hover:bg-white/10">Policies</a>
          <a href="/admin/integrations" className="block rounded px-3 py-2 hover:bg-white/10">Integrations</a>
          <a href="/admin/office-config" className="block rounded px-3 py-2 hover:bg-white/10">Office Config</a>
          <a href="/admin/reports" className="block rounded px-3 py-2 hover:bg-white/10">Reports</a>
        </nav>
        <div className="px-6 py-4 text-xs text-white/60">{user.fullName}</div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1920px] p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
