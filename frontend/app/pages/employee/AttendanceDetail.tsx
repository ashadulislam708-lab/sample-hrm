import { Link, useParams } from 'react-router';

export default function AttendanceDetail() {
  const { id } = useParams<{ id: string }>();

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="attendance-detail-page"
    >
      <div className="max-w-[900px] mx-auto w-full p-8">
        <Link
          to="/employee/attendance"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-6 group"
          data-testid="attendance-detail-back-link"
        >
          <span aria-hidden="true">&larr;</span>
          Back to Attendance
        </Link>

        <header className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
              <span className="text-2xl font-semibold" aria-hidden="true">
                15
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                January 15, 2025
              </h1>
              <p className="text-sm text-slate-500">Wednesday</p>
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100 mt-2"
                data-testid="attendance-detail-status-badge"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true"></span>
                Present - On Time
              </span>
              {id ? <p className="text-xs text-slate-400 mt-1">Record ID: {id}</p> : null}
            </div>
          </div>
          <button data-testid="attendance-detail-correction-btn"
            type="button"
            onClick={() => {
              /* correction request — wired in Phase 7 */
            }}
            className="h-10 px-4 rounded-lg text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer"
          >
            Request Correction
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <section
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              data-testid="attendance-detail-time-card"
            >
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Time Details</h2>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <p className="text-xs text-slate-500 mb-1">Clock In</p>
                    <p className="text-lg font-semibold text-slate-900">09:02 AM</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-xl">
                    <p className="text-xs text-slate-500 mb-1">Clock Out</p>
                    <p className="text-lg font-semibold text-slate-900">06:15 PM</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <p className="text-xs text-slate-500 mb-1">Work Hours</p>
                    <p className="text-lg font-semibold text-slate-900">9h 13m</p>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-xl">
                    <p className="text-xs text-slate-500 mb-1">Break Time</p>
                    <p className="text-lg font-semibold text-slate-900">1h 00m</p>
                  </div>
                </div>
              </div>
            </section>

            <section
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              data-testid="attendance-detail-timeline-card"
            >
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Activity Timeline</h2>
              </div>
              <div className="p-5">
                <div className="relative">
                  <div
                    className="absolute left-4 top-6 bottom-6 w-0.5 bg-slate-200"
                    aria-hidden="true"
                  ></div>
                  <div className="space-y-6">
                    <div className="relative flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center z-10 text-green-600 text-xs font-semibold">
                        In
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-slate-900">Clocked In</p>
                          <span className="text-xs text-slate-500">09:02 AM</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Via Gather (Auto-detected)</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          IP: 192.168.1.105 &bull; Office WiFi
                        </p>
                      </div>
                    </div>
                    <div className="relative flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center z-10 text-amber-600 text-xs font-semibold">
                        B
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-slate-900">Lunch Break Started</p>
                          <span className="text-xs text-slate-500">12:30 PM</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Duration: 1 hour</p>
                      </div>
                    </div>
                    <div className="relative flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-blue-400 flex items-center justify-center z-10 text-blue-600 text-xs font-semibold">
                        R
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-slate-900">Break Ended</p>
                          <span className="text-xs text-slate-500">01:30 PM</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Resumed work</p>
                      </div>
                    </div>
                    <div className="relative flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-red-100 border-2 border-red-500 flex items-center justify-center z-10 text-red-600 text-xs font-semibold">
                        Out
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-slate-900">Clocked Out</p>
                          <span className="text-xs text-slate-500">06:15 PM</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Via Gather (Auto-detected)</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          IP: 192.168.1.105 &bull; Office WiFi
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              data-testid="attendance-detail-summary-card"
            >
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Day Summary</h2>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Status</span>
                  <span className="text-sm font-medium text-green-600">Present</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Expected Hours</span>
                  <span className="text-sm font-medium text-slate-900">8h 00m</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Actual Hours</span>
                  <span className="text-sm font-medium text-slate-900">9h 13m</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Overtime</span>
                  <span className="text-sm font-medium text-blue-600">+1h 13m</span>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-sm text-slate-600">Check-in Method</span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700">
                    Gather
                  </span>
                </div>
              </div>
            </section>

            <section
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              data-testid="attendance-detail-week-card"
            >
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">This Week</h2>
              </div>
              <div className="p-3">
                <div className="grid grid-cols-7 gap-1 text-center">
                  <div className="p-2 rounded-lg bg-green-50">
                    <p className="text-[10px] text-slate-500">Mon</p>
                    <p className="text-xs font-medium text-green-600">P</p>
                  </div>
                  <div className="p-2 rounded-lg bg-green-50">
                    <p className="text-[10px] text-slate-500">Tue</p>
                    <p className="text-xs font-medium text-green-600">P</p>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-100 border border-blue-300">
                    <p className="text-[10px] text-blue-600">Wed</p>
                    <p className="text-xs font-medium text-blue-600">P</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50">
                    <p className="text-[10px] text-slate-500">Thu</p>
                    <p className="text-xs font-medium text-slate-400">-</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50">
                    <p className="text-[10px] text-slate-500">Fri</p>
                    <p className="text-xs font-medium text-slate-400">-</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50">
                    <p className="text-[10px] text-slate-400">Sat</p>
                    <p className="text-xs font-medium text-slate-300">-</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50">
                    <p className="text-[10px] text-slate-400">Sun</p>
                    <p className="text-xs font-medium text-slate-300">-</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 text-center mt-3">
                  3 of 5 working days completed
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
