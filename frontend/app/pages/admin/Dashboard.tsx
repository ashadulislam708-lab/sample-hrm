import { useState } from 'react';

import EmptyState from '~/components/atoms/EmptyState';

type DateRange = 'today' | '7d' | '30d' | 'custom';

export default function Dashboard() {
  const [range, setRange] = useState<DateRange>('today');

  const alerts: Array<{ id: string; name: string; description: string }> = [];

  const rangeBtnClass = (r: DateRange) =>
    `h-9 px-3 rounded-lg text-xs font-medium cursor-pointer transition-colors ${range === r ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'}`;

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="admin-dashboard-page"
    >
      <div className="max-w-[1400px] mx-auto p-8 space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">
              Welcome back, here&apos;s what&apos;s happening with your team today.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button data-testid="admin-dashboard-range-today-btn"
              type="button"
              onClick={() => setRange('today')}
              className={rangeBtnClass('today')}
            >
              Today
            </button>
            <button data-testid="admin-dashboard-range-7d-btn"
              type="button"
              onClick={() => setRange('7d')}
              className={rangeBtnClass('7d')}
            >
              Last 7 Days
            </button>
            <button data-testid="admin-dashboard-range-30d-btn"
              type="button"
              onClick={() => setRange('30d')}
              className={rangeBtnClass('30d')}
            >
              Last 30 Days
            </button>
            <button data-testid="admin-dashboard-range-custom-btn"
              type="button"
              onClick={() => setRange('custom')}
              className={rangeBtnClass('custom')}
            >
              Custom
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <div
            className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
            data-testid="admin-dashboard-stat-headcount"
          >
            <p className="text-xs font-medium text-slate-500 uppercase mb-2">Total Headcount</p>
            <p className="text-2xl font-semibold text-slate-900">156</p>
          </div>
          <div
            className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
            data-testid="admin-dashboard-stat-attendance"
          >
            <p className="text-xs font-medium text-slate-500 uppercase mb-2">
              Today&apos;s Attendance
            </p>
            <p className="text-2xl font-semibold text-green-600">142</p>
          </div>
          <div
            className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
            data-testid="admin-dashboard-stat-approvals"
          >
            <p className="text-xs font-medium text-slate-500 uppercase mb-2">Pending Approvals</p>
            <p className="text-2xl font-semibold text-amber-600">12</p>
          </div>
          <div
            className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
            data-testid="admin-dashboard-stat-loans"
          >
            <p className="text-xs font-medium text-slate-500 uppercase mb-2">Active Loans</p>
            <p className="text-2xl font-semibold text-violet-600">23</p>
          </div>
          <div
            className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
            data-testid="admin-dashboard-stat-payroll"
          >
            <p className="text-xs font-medium text-slate-500 uppercase mb-2">Payroll (This Mo.)</p>
            <p className="text-2xl font-semibold text-slate-900">$485k</p>
          </div>
          <div
            className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
            data-testid="admin-dashboard-stat-emergency"
          >
            <p className="text-xs font-medium text-slate-500 uppercase mb-2">Emergency Leaves</p>
            <p className="text-2xl font-semibold text-red-600">2</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div
            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
            data-testid="admin-dashboard-attendance-trend-card"
          >
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">Attendance Trend</h3>
              <button data-testid="admin-dashboard-attendance-trend-menu-btn"
                type="button"
                onClick={() => {
                  /* chart menu */
                }}
                className="text-slate-400 hover:text-slate-600 cursor-pointer text-xs font-medium"
              >
                Menu
              </button>
            </div>
            <div className="p-8 h-[220px] flex items-center justify-center text-sm text-slate-400">
              Chart data loads from API in Phase 7.
            </div>
          </div>

          <div
            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
            data-testid="admin-dashboard-leave-utilization-card"
          >
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">Leave Utilization</h3>
              <button data-testid="admin-dashboard-leave-utilization-menu-btn"
                type="button"
                onClick={() => {
                  /* chart menu */
                }}
                className="text-slate-400 hover:text-slate-600 cursor-pointer text-xs font-medium"
              >
                Menu
              </button>
            </div>
            <div className="p-8 h-[220px] flex items-center justify-center text-sm text-slate-400">
              Chart data loads from API in Phase 7.
            </div>
          </div>

          <div
            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
            data-testid="admin-dashboard-headcount-card"
          >
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">Department Headcount</h3>
              <button data-testid="admin-dashboard-headcount-menu-btn"
                type="button"
                onClick={() => {
                  /* chart menu */
                }}
                className="text-slate-400 hover:text-slate-600 cursor-pointer text-xs font-medium"
              >
                Menu
              </button>
            </div>
            <div className="p-8 h-[220px] flex items-center justify-center text-sm text-slate-400">
              Chart data loads from API in Phase 7.
            </div>
          </div>

          <div
            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
            data-testid="admin-dashboard-attendance-source-card"
          >
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">Attendance Source</h3>
              <button data-testid="admin-dashboard-attendance-source-menu-btn"
                type="button"
                onClick={() => {
                  /* chart menu */
                }}
                className="text-slate-400 hover:text-slate-600 cursor-pointer text-xs font-medium"
              >
                Menu
              </button>
            </div>
            <div className="p-8 h-[220px] flex items-center justify-center text-sm text-slate-400">
              Chart data loads from API in Phase 7.
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">Emergency Alerts</h3>
            <button data-testid="admin-dashboard-alerts-settings-btn"
              type="button"
              onClick={() => {
                /* settings */
              }}
              aria-label="Alert settings"
              className="text-slate-400 hover:text-slate-600 cursor-pointer text-xs font-medium"
            >
              Settings
            </button>
          </div>
          {alerts.length === 0 ? (
            <EmptyState
              title="No active emergency leaves"
              description="Emergency leave alerts will appear here."
              testId="admin-dashboard-alerts-empty"
            />
          ) : (
            <div className="divide-y divide-slate-100">
              {alerts.map((a) => (
                <div
                  key={a.id}
                  className="p-5 flex items-center gap-4"
                  data-testid={`admin-dashboard-alert-${a.id}`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"
                    aria-hidden="true"
                  ></span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{a.name}</p>
                    <p className="text-xs text-slate-500">{a.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
