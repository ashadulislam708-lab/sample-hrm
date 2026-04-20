import { Link } from 'react-router';

import EmptyState from '~/components/atoms/EmptyState';

export default function AttendanceHistory() {
  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="attendance-history-page"
    >
      <div className="max-w-[1400px] mx-auto p-8">
        <div className="flex items-center gap-4 mb-4">
          <Link
            to="/employee/attendance"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
            data-testid="attendance-history-back-link"
          >
            <span aria-hidden="true">&larr;</span>
            Back to Attendance
          </Link>
        </div>

        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">
              Attendance History
            </h1>
            <p className="text-slate-500 mt-1.5 text-sm">
              Review your past attendance records and patterns.
            </p>
          </div>
          <button data-testid="attendance-history-export-btn"
            type="button"
            onClick={() => {
              /* export */
            }}
            className="h-10 px-4 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all inline-flex items-center justify-center cursor-pointer"
          >
            Export CSV
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              Present Days
            </p>
            <p className="text-2xl font-semibold text-green-600">18</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              Late Arrivals
            </p>
            <p className="text-2xl font-semibold text-amber-500">2</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              Absent Days
            </p>
            <p className="text-2xl font-semibold text-red-500">1</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              Average Hours
            </p>
            <p className="text-2xl font-semibold text-slate-900">8h 42m</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 tracking-tight">
              Attendance Records
            </h2>
            <div className="flex items-center gap-2">
              <input data-testid="attendance-history-month-filter"
                type="month"
                className="h-9 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm"
              />
              <select data-testid="attendance-history-status-filter"
                className="h-9 px-3 pr-8 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm"
                defaultValue="all"
              >
                <option value="all">All Statuses</option>
                <option value="present">Present</option>
                <option value="late">Late</option>
                <option value="absent">Absent</option>
                <option value="leave">Leave</option>
              </select>
            </div>
          </div>
          <div className="p-8">
            <EmptyState
              title="No attendance records found"
              description="Try adjusting filters to see records."
              testId="attendance-history-empty"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
