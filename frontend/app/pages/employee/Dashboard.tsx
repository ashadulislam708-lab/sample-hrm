import { Link } from 'react-router';

export default function Dashboard() {
  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="dashboard-page"
    >
      <div className="max-w-[1400px] mx-auto w-full p-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Dashboard</h1>
            <p className="text-slate-500 mt-1">Good Morning, John</p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-medium text-slate-500 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-200 flex items-center gap-2"
              data-testid="dashboard-online-badge"
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"
                aria-hidden="true"
              ></span>
              Online
            </span>
            <div
              className="h-10 w-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center text-xs font-semibold text-slate-700"
              aria-hidden="true"
            >
              JD
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <div
            className="bg-white rounded-xl p-6 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-between h-full"
            data-testid="dashboard-leave-balance-card"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Leave Balance</p>
                <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">
                  8 / 12{' '}
                  <span className="text-sm font-medium text-slate-400 ml-1">days</span>
                </h2>
              </div>
              <div
                className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"
                aria-hidden="true"
              >
                LB
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-medium text-slate-600">Casual Leave</span>
                <span className="text-slate-400">66%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: '66%' }}
                  aria-hidden="true"
                ></div>
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-xl p-6 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-between h-full"
            data-testid="dashboard-attendance-card"
          >
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-medium text-slate-500">Attendance (Aug)</p>
              <div
                className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center"
                aria-hidden="true"
              >
                AT
              </div>
            </div>
            <div className="flex items-end gap-4 mt-2">
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-green-600">18</span>
                <span className="text-xs text-slate-400 mt-0.5">Present</span>
              </div>
              <div className="w-px h-8 bg-slate-100" aria-hidden="true"></div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-amber-500">2</span>
                <span className="text-xs text-slate-400 mt-0.5">Late</span>
              </div>
              <div className="w-px h-8 bg-slate-100" aria-hidden="true"></div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-red-500">1</span>
                <span className="text-xs text-slate-400 mt-0.5">Absent</span>
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-xl p-6 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-between h-full"
            data-testid="dashboard-pending-requests-card"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Pending Requests</p>
                <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">3</h2>
              </div>
              <div
                className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center relative"
                aria-hidden="true"
              >
                PR
              </div>
            </div>
            <div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600 border border-amber-100">
                Awaiting Approval
              </span>
            </div>
          </div>

          <div
            className="bg-white rounded-xl p-6 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-between h-full"
            data-testid="dashboard-active-loan-card"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">Active Loan</p>
                <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">$2,500</h2>
              </div>
              <div
                className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center"
                aria-hidden="true"
              >
                $
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500">Outstanding Balance</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button data-testid="dashboard-clockin-btn"
              type="button"
              onClick={() => {
                /* clock in — wired in Phase 7 */
              }}
              className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl shadow-sm transition-all cursor-pointer"
            >
              <span className="font-medium">Clock In</span>
            </button>
            <Link
              to="/employee/leave/apply"
              className="flex items-center justify-center gap-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 p-4 rounded-xl shadow-sm transition-all"
              data-testid="dashboard-apply-leave-link"
            >
              <span className="font-medium">Apply Leave</span>
            </Link>
            <Link
              to="/employee/leave/apply-emergency"
              className="flex items-center justify-center gap-3 bg-white hover:bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl shadow-sm transition-all"
              data-testid="dashboard-emergency-leave-link"
            >
              <span className="font-medium">Emergency Leave</span>
            </Link>
            <Link
              to="/employee/salary"
              className="flex items-center justify-center gap-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 p-4 rounded-xl shadow-sm transition-all"
              data-testid="dashboard-view-payslip-link"
            >
              <span className="font-medium">View Payslip</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 bg-white rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-semibold text-slate-900">Recent Activity</h3>
              <button data-testid="dashboard-activity-view-all-btn"
                type="button"
                onClick={() => {
                  /* view all */
                }}
                className="text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                View All
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex-shrink-0 flex items-center justify-center mt-0.5 text-xs font-semibold"
                    aria-hidden="true"
                  >
                    In
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-slate-900">Clocked In</p>
                        <p className="text-xs text-slate-500 mt-0.5">Regular shift start</p>
                      </div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-green-50 text-green-700 border border-green-100">
                        On Time
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5">Today, 09:00 AM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex-shrink-0 flex items-center justify-center mt-0.5 text-xs font-semibold"
                    aria-hidden="true"
                  >
                    LR
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-slate-900">Leave Request</p>
                        <p className="text-xs text-slate-500 mt-0.5">Sick leave for 2 days</p>
                      </div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-100">
                        Pending
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5">Yesterday, 04:30 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex-shrink-0 flex items-center justify-center mt-0.5 text-xs font-semibold"
                    aria-hidden="true"
                  >
                    $
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-slate-900">Salary Credited</p>
                        <p className="text-xs text-slate-500 mt-0.5">August 2023 Payroll</p>
                      </div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-green-50 text-green-700 border border-green-100">
                        Success
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5">Sep 1, 10:00 AM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full bg-slate-50 text-slate-600 flex-shrink-0 flex items-center justify-center mt-0.5 text-xs font-semibold"
                    aria-hidden="true"
                  >
                    Out
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-slate-900">Clocked Out</p>
                        <p className="text-xs text-slate-500 mt-0.5">Regular shift end</p>
                      </div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                        Auto
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5">Sep 1, 06:05 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-semibold text-slate-900">Notifications</h3>
              <button data-testid="dashboard-notifications-mark-read-btn"
                type="button"
                onClick={() => {
                  /* mark all read */
                }}
                aria-label="Mark all as read"
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                &#10003;
              </button>
            </div>
            <div>
              <div className="divide-y divide-slate-50">
                <Link
                  to="/employee/notifications"
                  className="block p-4 hover:bg-slate-50 transition-colors group"
                  data-testid="dashboard-notif-hr-policy-link"
                >
                  <div className="flex gap-3">
                    <span
                      className="mt-1.5 h-2 w-2 rounded-full bg-blue-600 flex-shrink-0"
                      aria-hidden="true"
                    ></span>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                          HR Policy Update
                        </p>
                        <span className="text-[10px] text-slate-400">2m</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        New work-from-home policy has been updated. Please review the document.
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/employee/notifications"
                  className="block p-4 hover:bg-slate-50 transition-colors group"
                  data-testid="dashboard-notif-team-meeting-link"
                >
                  <div className="flex gap-3">
                    <span
                      className="mt-1.5 h-2 w-2 rounded-full bg-blue-600 flex-shrink-0"
                      aria-hidden="true"
                    ></span>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                          Team Meeting
                        </p>
                        <span className="text-[10px] text-slate-400">1h</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Weekly sync with the design team in Conference Room A.
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/employee/notifications"
                  className="block p-4 hover:bg-slate-50 transition-colors group"
                  data-testid="dashboard-notif-leave-approved-link"
                >
                  <div className="flex gap-3">
                    <span
                      className="mt-1.5 h-2 w-2 rounded-full bg-transparent flex-shrink-0"
                      aria-hidden="true"
                    ></span>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-medium text-slate-700">Leave Approved</p>
                        <span className="text-[10px] text-slate-400">1d</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Your casual leave request for Aug 25th has been approved by Manager.
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/employee/notifications"
                  className="block p-4 hover:bg-slate-50 transition-colors group"
                  data-testid="dashboard-notif-public-holiday-link"
                >
                  <div className="flex gap-3">
                    <span
                      className="mt-1.5 h-2 w-2 rounded-full bg-transparent flex-shrink-0"
                      aria-hidden="true"
                    ></span>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-medium text-slate-700">Public Holiday</p>
                        <span className="text-[10px] text-slate-400">3d</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Office will remain closed on Monday for Labor Day.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 text-center">
              <Link
                to="/employee/notifications"
                className="text-xs font-medium text-slate-500 hover:text-slate-700"
                data-testid="dashboard-view-all-notifications-link"
              >
                View all notifications
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
