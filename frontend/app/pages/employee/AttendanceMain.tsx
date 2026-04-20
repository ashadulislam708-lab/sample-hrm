import { Link } from 'react-router';

import EmptyState from '~/components/atoms/EmptyState';

export default function AttendanceMain() {
  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="attendance-main-page"
    >
      <div className="max-w-[1400px] mx-auto p-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">Attendance</h1>
            <p className="text-slate-500 mt-1.5 text-sm">
              Manage your daily attendance, view history and track work hours.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-medium text-slate-500 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-200 flex items-center gap-2"
              data-testid="attendance-main-online-badge"
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"
                aria-hidden="true"
              ></span>
              Online
            </span>
          </div>
        </header>

        <div
          className="bg-white rounded-xl p-6 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-slate-100 mb-8 relative overflow-hidden"
          data-testid="attendance-main-clockin-card"
        >
          <div className="relative z-10 flex flex-col lg:flex-row justify-between lg:items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100"
                  data-testid="attendance-main-gather-badge"
                >
                  Gather Town Connected
                </span>
                <span className="text-xs text-slate-400">|</span>
                <span className="text-xs text-slate-500 font-medium">Wed, Oct 25, 2023</span>
              </div>
              <div className="flex items-baseline gap-3 mb-2">
                <h2 className="text-5xl font-bold text-slate-900 tracking-tight font-mono">
                  09:42:15
                </h2>
                <span className="text-xl font-medium text-slate-400">AM</span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                Clock-in within 10 minutes of 08:00 AM is considered on time.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-8">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                  Today&apos;s Status
                </p>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-slate-900">08:02 AM</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-green-100 text-green-700">
                      ON TIME
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-blue-600 font-medium">
                    Auto Clocked via Gather
                  </div>
                </div>
              </div>

              <button data-testid="attendance-main-clockout-btn"
                type="button"
                disabled
                onClick={() => {
                  /* clock out */
                }}
                className="flex items-center gap-2 bg-slate-100 text-slate-400 px-5 py-3 rounded-xl font-medium cursor-not-allowed opacity-75"
              >
                Clock Out
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4 bg-white rounded-lg p-1 border border-slate-200 shadow-sm w-fit">
              <button data-testid="attendance-main-prev-month-btn"
                type="button"
                onClick={() => {
                  /* prev month */
                }}
                aria-label="Previous month"
                className="p-1.5 rounded-md hover:bg-slate-50 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                &lsaquo;
              </button>
              <span className="text-sm font-semibold text-slate-900 min-w-[100px] text-center">
                October 2023
              </span>
              <button data-testid="attendance-main-next-month-btn"
                type="button"
                onClick={() => {
                  /* next month */
                }}
                aria-label="Next month"
                className="p-1.5 rounded-md hover:bg-slate-50 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              >
                &rsaquo;
              </button>
            </div>

            <div className="flex items-center bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
              <button data-testid="attendance-main-calendar-view-btn"
                type="button"
                onClick={() => {
                  /* switch calendar */
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-100 text-slate-900 shadow-sm transition-all cursor-pointer"
              >
                <span className="text-xs font-medium">Calendar</span>
              </button>
              <Link
                to="/employee/attendance/history"
                className="flex items-center gap-2 px-3 py-1.5 rounded-md text-slate-500 hover:text-slate-900 transition-all"
                data-testid="attendance-main-list-view-link"
              >
                <span className="text-xs font-medium">List View</span>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                <div
                  key={d}
                  className="py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  {d}
                </div>
              ))}
            </div>
            <div className="p-8">
              <EmptyState
                title="No attendance records for this month"
                description="Your daily attendance will appear here once recorded."
                testId="attendance-main-calendar-empty"
              />
            </div>
            <div className="p-4 bg-white border-t border-slate-100 flex flex-wrap gap-6 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full bg-green-500"
                  aria-hidden="true"
                ></span>
                <span>Present</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full bg-amber-500"
                  aria-hidden="true"
                ></span>
                <span>Late</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" aria-hidden="true"></span>
                <span>Absent</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full bg-blue-500"
                  aria-hidden="true"
                ></span>
                <span>Leave</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <h3 className="font-semibold text-slate-900 text-lg">Late Attendance Requests</h3>
            <Link
              to="/employee/attendance/late-request"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              data-testid="attendance-main-apply-late-link"
            >
              + Apply Late Attendance
            </Link>
          </div>
          <div className="p-8">
            <EmptyState
              title="No late attendance requests"
              description="Submit a late attendance request when you arrive after cut-off time."
              testId="attendance-main-late-empty"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
