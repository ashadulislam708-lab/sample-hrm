import { useState } from 'react';

import EmptyState from '~/components/atoms/EmptyState';

type ReportType = 'attendance' | 'leave' | 'performance' | 'notes';
type QuickRange = 'week' | 'month' | 'last-month' | 'custom';

interface AttendanceRow {
  id: string;
  initials: string;
  name: string;
  department: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'late' | 'absent';
  totalHours: string;
}

export default function Reports() {
  const [activeReport, setActiveReport] = useState<ReportType>('attendance');
  const [startDate, setStartDate] = useState('2023-10-01');
  const [endDate, setEndDate] = useState('2023-10-07');
  const [quickRange, setQuickRange] = useState<QuickRange>('week');

  // Rows sourced from Redux in Phase 7.
  const rows: AttendanceRow[] = [];

  const reportLabelMap: Record<ReportType, string> = {
    attendance: 'Team Attendance',
    leave: 'Leave Summary',
    performance: 'Performance Overview',
    notes: 'Daily Notes',
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="team-reports-page"
    >
      <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Team Reports</h1>
          <p className="text-sm text-slate-500 mt-1">
            Generate and analyze reports for your team&apos;s activities.
          </p>
        </header>

        {/* Report Type Selection */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            type="button"
            onClick={() => setActiveReport('attendance')}
            className={`text-left bg-white p-5 rounded-xl border-2 shadow-sm transition-all cursor-pointer ${activeReport === 'attendance' ? 'border-blue-500 shadow-md' : 'border-slate-200 hover:border-blue-200 hover:shadow-md'}`}
            data-testid="team-reports-tile-attendance"
          >
            <div
              className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3 text-xs font-semibold"
              aria-hidden="true"
            >
              AT
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Team Attendance</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              View detailed attendance logs and Gather data.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setActiveReport('leave')}
            className={`text-left bg-white p-5 rounded-xl border shadow-sm transition-all cursor-pointer ${activeReport === 'leave' ? 'border-2 border-blue-500 shadow-md' : 'border-slate-200 hover:border-blue-200 hover:shadow-md'}`}
            data-testid="team-reports-tile-leave"
          >
            <div
              className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center mb-3 text-xs font-semibold"
              aria-hidden="true"
            >
              LV
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Leave Summary</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Analyze leave utilization and upcoming absences.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setActiveReport('performance')}
            className={`text-left bg-white p-5 rounded-xl border shadow-sm transition-all cursor-pointer ${activeReport === 'performance' ? 'border-2 border-blue-500 shadow-md' : 'border-slate-200 hover:border-blue-200 hover:shadow-md'}`}
            data-testid="team-reports-tile-performance"
          >
            <div
              className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-3 text-xs font-semibold"
              aria-hidden="true"
            >
              PF
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Performance Overview</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Track team goals progress and evaluation scores.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setActiveReport('notes')}
            className={`text-left bg-white p-5 rounded-xl border shadow-sm transition-all cursor-pointer ${activeReport === 'notes' ? 'border-2 border-blue-500 shadow-md' : 'border-slate-200 hover:border-blue-200 hover:shadow-md'}`}
            data-testid="team-reports-tile-notes"
          >
            <div
              className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-3 text-xs font-semibold"
              aria-hidden="true"
            >
              DN
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Daily Notes</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Monitor daily work log submission rates.
            </p>
          </button>
        </section>

        {/* Report Configuration & Filters */}
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex-1 space-y-4 lg:space-y-0">
              <div className="flex flex-col sm:flex-row gap-4">
                <div>
                  <label
                    htmlFor="report-start-date"
                    className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide"
                  >
                    Start Date
                  </label>
                  <input data-testid="team-reports-input-report-start-date-1"
                    id="report-start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full sm:w-44 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  />
                </div>
                <div>
                  <label
                    htmlFor="report-end-date"
                    className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide"
                  >
                    End Date
                  </label>
                  <input data-testid="team-reports-input-report-end-date-2"
                    id="report-end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full sm:w-44 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-end">
                  <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide sm:invisible">
                    Quick Select
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setQuickRange('week')}
                      className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${quickRange === 'week' ? 'text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100' : 'text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900'}`}
                      data-testid="team-reports-quick-week-btn"
                    >
                      This Week
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuickRange('month')}
                      className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${quickRange === 'month' ? 'text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100' : 'text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900'}`}
                      data-testid="team-reports-quick-month-btn"
                    >
                      This Month
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuickRange('last-month')}
                      className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${quickRange === 'last-month' ? 'text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100' : 'text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900'}`}
                      data-testid="team-reports-quick-last-month-btn"
                    >
                      Last Month
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuickRange('custom')}
                      className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${quickRange === 'custom' ? 'text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100' : 'text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900'}`}
                      data-testid="team-reports-quick-custom-btn"
                    >
                      Custom
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Export Actions */}
            <div className="flex items-center gap-3 border-t lg:border-t-0 border-slate-100 pt-4 lg:pt-0 w-full lg:w-auto">
              <button
                type="button"
                onClick={() => {
                  /* export excel — wired in Phase 7 */
                }}
                className="flex-1 lg:flex-none inline-flex justify-center items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm cursor-pointer"
                data-testid="team-reports-export-excel-btn"
              >
                Export Excel
              </button>
              <button
                type="button"
                onClick={() => {
                  /* export pdf — wired in Phase 7 */
                }}
                className="flex-1 lg:flex-none inline-flex justify-center items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm cursor-pointer"
                data-testid="team-reports-export-pdf-btn"
              >
                Export PDF
              </button>
            </div>
          </div>
        </section>

        {/* Report Preview */}
        <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h2 className="text-base font-semibold text-slate-900 tracking-tight flex items-center gap-2">
                Report Preview: {reportLabelMap[activeReport]}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Showing data from{' '}
                <span className="font-medium text-slate-700">{startDate}</span> to{' '}
                <span className="font-medium text-slate-700">{endDate}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  /* refresh — wired in Phase 7 */
                }}
                aria-label="Refresh preview"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                data-testid="team-reports-refresh-btn"
              >
                Refresh
              </button>
              <button
                type="button"
                onClick={() => {
                  /* open menu — wired in Phase 7 */
                }}
                aria-label="Open menu"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                data-testid="team-reports-menu-btn"
              >
                Menu
              </button>
            </div>
          </div>

          {rows.length === 0 ? (
            <div className="p-8">
              <EmptyState
                title="No data for selected range"
                description="Adjust the date range or report type to see results."
                testId="team-reports-empty"
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 w-1/4">Employee</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Check In</th>
                    <th className="px-4 py-3">Check Out</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Total Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rows.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-slate-50/50 transition-colors"
                      data-testid={`team-reports-row-${row.id}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center border border-indigo-200"
                            aria-hidden="true"
                          >
                            {row.initials}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{row.name}</p>
                            <p className="text-xs text-slate-400">{row.department}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-slate-600">{row.date}</td>
                      <td className="px-4 py-4 text-slate-900 font-medium">{row.checkIn}</td>
                      <td className="px-4 py-4 text-slate-900 font-medium">{row.checkOut}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${row.status === 'present' ? 'bg-green-50 text-green-700 border-green-100' : row.status === 'late' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-red-50 text-red-700 border-red-100'}`}
                          data-testid={`team-reports-status-${row.id}-badge`}
                        >
                          {row.status === 'present'
                            ? 'Present'
                            : row.status === 'late'
                              ? 'Late'
                              : 'Absent'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right font-medium text-slate-700">
                        {row.totalHours}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-white">
            <p className="text-xs text-slate-500">
              Showing{' '}
              <span className="font-medium text-slate-900">
                {rows.length === 0 ? '0' : `1-${rows.length}`}
              </span>{' '}
              of <span className="font-medium text-slate-900">{rows.length}</span> results
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  /* previous page — wired in Phase 7 */
                }}
                className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-colors cursor-pointer"
                data-testid="team-reports-previous-btn"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => {
                  /* next page — wired in Phase 7 */
                }}
                className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                data-testid="team-reports-next-btn"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
