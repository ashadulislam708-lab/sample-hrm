import { useState } from 'react';

import { Link } from 'react-router';

import EmptyState from '~/components/atoms/EmptyState';

export default function Dashboard() {
  const [search, setSearch] = useState('');

  // Members rendered from Redux in Phase 7. Until then, show empty state.
  const members: Array<{ id: string; initials: string; name: string; role: string }> = [];

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="team-dashboard-page"
    >
      <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Team Overview</h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage team performance, attendance, and member details.
            </p>
          </div>
          <Link
            to="/team/members/add"
            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-colors"
            data-testid="team-dashboard-add-member-link"
          >
            Add Member
          </Link>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between"
            data-testid="team-dashboard-total-members-card"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Members</p>
                <h2 className="text-3xl font-bold text-slate-900 mt-2 tracking-tight">12</h2>
              </div>
              <div
                className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-semibold"
                aria-hidden="true"
              >
                TM
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-green-700 bg-green-50 w-fit px-2 py-1 rounded border border-green-100/50">
              <span>+2 new this month</span>
            </div>
          </div>

          <div
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between"
            data-testid="team-dashboard-attendance-card"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Today&apos;s Attendance</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight">10</h2>
                  <span className="text-sm font-medium text-slate-400">/ 12</span>
                </div>
              </div>
              <div
                className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-xs font-semibold"
                aria-hidden="true"
              >
                AT
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span
                  className="w-2 h-2 rounded-full bg-green-500"
                  aria-hidden="true"
                />
                <span className="font-medium">10 Present</span>
                <span className="text-slate-300">|</span>
                <span className="text-amber-700">1 Late</span>
                <span className="text-slate-300">|</span>
                <span className="text-red-600">1 Absent</span>
              </div>
              <p className="text-xs text-slate-400 pl-4">8 via Gather, 2 Manual</p>
            </div>
          </div>

          <Link
            to="/team/approvals"
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between hover:border-amber-300 hover:shadow-md transition-all relative overflow-hidden"
            data-testid="team-dashboard-approvals-link"
          >
            <div className="flex items-start justify-between relative">
              <div>
                <p className="text-sm font-medium text-slate-500">Pending Requests</p>
                <div className="flex items-center gap-3 mt-2">
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight">5</h2>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200">
                    Action Needed
                  </span>
                </div>
              </div>
              <div
                className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xs font-semibold"
                aria-hidden="true"
              >
                PR
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-slate-500">Review leave &amp; timesheets</span>
              <div className="text-blue-600 font-medium">Review</div>
            </div>
          </Link>
        </div>

        {/* Team Members Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight self-start sm:self-center">
              Team Members
            </h2>

            <div className="w-full sm:w-auto flex items-center gap-3">
              <div className="relative w-full sm:w-64">
                <input data-testid="team-dashboard-input-text-1"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search members..."
                  className="w-full pl-3 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                />
              </div>
              <button data-testid="team-dashboard-filter-btn"
                type="button"
                onClick={() => {
                  /* open filter — wired in Phase 7 */
                }}
                aria-label="Open filters"
                className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-slate-700 hover:border-slate-300 transition-colors shadow-sm cursor-pointer"
              >
                Filter
              </button>
            </div>
          </div>

          {members.length === 0 ? (
            <EmptyState
              title="No team members yet"
              description="Add your first team member to get started."
              testId="team-dashboard-members-empty"
            />
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              data-testid="team-dashboard-members-grid"
            >
              {members.map((m) => (
                <div
                  key={m.id}
                  className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col items-center text-center shadow-sm"
                >
                  <div
                    className="w-20 h-20 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl font-bold border-2 border-white shadow-sm mb-4"
                    aria-hidden="true"
                  >
                    {m.initials}
                  </div>
                  <h4 className="text-base font-semibold text-slate-900 tracking-tight">
                    {m.name}
                  </h4>
                  <p className="text-xs font-medium text-slate-500 mt-1">{m.role}</p>
                  <div className="mt-6 w-full pt-4 border-t border-slate-100">
                    <Link
                      to={`/team/members/${m.id}`}
                      className="w-full py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 hover:text-slate-900 flex items-center justify-center gap-2 transition-colors"
                      data-testid={`team-dashboard-view-${m.id}-link`}
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
