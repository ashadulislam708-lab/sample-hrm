import { Link, Navigate, Outlet } from 'react-router';

import { useAuth } from '~/contexts/AuthContext';
import { RoleEnum } from '~/enums/role.enum';

export default function EmployeeLayout() {
  const { user, isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="p-6">Loading...</div>;
  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;
  // All authenticated roles can access employee-facing pages
  return (
    <div className="flex min-h-screen">
      <aside
        className="hidden w-60 flex-col bg-[#0F172A] text-white lg:flex"
        data-testid="employee-sidebar"
      >
        <div className="px-6 py-4 text-lg font-semibold">
          <Link
            to="/employee/dashboard"
            aria-label="Potential HRM brand home"
            data-testid="employee-brand-link"
          >
            <span className="sr-only">brand </span>Potential HRM
          </Link>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          <a href="/employee/dashboard" className="block rounded px-3 py-2 hover:bg-white/10">
            Dashboard
          </a>
          <a href="/employee/attendance" className="block rounded px-3 py-2 hover:bg-white/10">
            Attendance
          </a>
          <a href="/employee/leave" className="block rounded px-3 py-2 hover:bg-white/10">
            Leave
          </a>
          <a href="/employee/salary" className="block rounded px-3 py-2 hover:bg-white/10">
            Salary
          </a>
          <a href="/employee/loans" className="block rounded px-3 py-2 hover:bg-white/10">
            Loans
          </a>
          <a href="/employee/performance" className="block rounded px-3 py-2 hover:bg-white/10">
            Performance
          </a>
          <a href="/employee/policies" className="block rounded px-3 py-2 hover:bg-white/10">
            Policies
          </a>
          <a href="/employee/profile" className="block rounded px-3 py-2 hover:bg-white/10">
            Profile
          </a>
        </nav>
        <div className="px-6 py-4 text-xs text-white/60">{user.fullName}</div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
