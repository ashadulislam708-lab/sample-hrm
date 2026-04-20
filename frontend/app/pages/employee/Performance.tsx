import { Link } from 'react-router';

export default function Performance() {
  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="performance-page"
    >
      <div className="max-w-[1400px] mx-auto p-6 md:p-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <nav className="flex text-sm text-slate-500 mb-2">
              <span>Performance</span>
              <span className="mx-2 text-slate-400">/</span>
              <span className="text-slate-900 font-medium">Overview</span>
            </nav>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Performance
            </h1>
          </div>
          <div className="flex gap-3">
            <button data-testid="performance-download-btn"
              type="button"
              onClick={() => {
                /* download */
              }}
              className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Download Report
            </button>
            <Link
              to="/employee/performance/goal"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all"
              data-testid="performance-new-goal-link"
            >
              + New Goal
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 tracking-tight">Current Goals</h2>
              <Link
                to="/employee/performance"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                data-testid="performance-view-all-goals-link"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              <div
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col md:flex-row md:items-center gap-5 hover:border-slate-300 transition-colors"
                data-testid="performance-goal-card-sales"
              >
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-slate-900">Complete Q1 Sales Target</h3>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-50">
                      On Track
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 mb-3">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: '75%' }}
                      aria-hidden="true"
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Due Jan 31, 2025</span>
                    <span className="font-medium text-slate-700">75% Complete</span>
                  </div>
                </div>
                <div className="flex md:flex-col justify-end">
                  <Link
                    to="/employee/performance/goal"
                    className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-100"
                    data-testid="performance-goal-sales-update-link"
                  >
                    Update
                  </Link>
                </div>
              </div>

              <div
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col md:flex-row md:items-center gap-5 hover:border-slate-300 transition-colors"
                data-testid="performance-goal-card-learning"
              >
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-slate-900">Learn React Native</h3>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-50">
                      At Risk
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 mb-3">
                    <div
                      className="bg-amber-500 h-2 rounded-full"
                      style={{ width: '40%' }}
                      aria-hidden="true"
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Due Feb 15, 2025</span>
                    <span className="font-medium text-slate-700">40% Complete</span>
                  </div>
                </div>
                <div className="flex md:flex-col justify-end">
                  <Link
                    to="/employee/performance/goal"
                    className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-100"
                    data-testid="performance-goal-learning-update-link"
                  >
                    Update
                  </Link>
                </div>
              </div>

              <div
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col md:flex-row md:items-center gap-5 hover:border-slate-300 transition-colors"
                data-testid="performance-goal-card-response"
              >
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-slate-900">Improve Client Response Time</h3>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-50">
                      On Track
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 mb-3">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: '90%' }}
                      aria-hidden="true"
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Due Jan 20, 2025</span>
                    <span className="font-medium text-slate-700">90% Complete</span>
                  </div>
                </div>
                <div className="flex md:flex-col justify-end">
                  <Link
                    to="/employee/performance/goal"
                    className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-100"
                    data-testid="performance-goal-response-update-link"
                  >
                    Update
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-slate-900 tracking-tight">Daily Activity</h2>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative overflow-hidden">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">Daily Notes This Week</h3>
                  <p className="text-xs text-slate-500 mt-1">Track your daily progress</p>
                </div>
                <div
                  className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] font-semibold"
                  aria-hidden="true"
                >
                  N
                </div>
              </div>
              <div className="flex justify-between items-center mb-6">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, idx) => (
                  <div key={day} className="flex flex-col items-center gap-2">
                    <div
                      className={
                        idx < 4
                          ? 'w-8 h-8 rounded-full bg-emerald-50 border border-emerald-500 text-emerald-700 flex items-center justify-center text-xs font-semibold'
                          : 'w-8 h-8 rounded-full bg-slate-50 border-2 border-dashed border-slate-300 text-slate-300 flex items-center justify-center'
                      }
                    >
                      {idx < 4 ? '✓' : ''}
                    </div>
                    <span className="text-[10px] font-medium text-slate-400 uppercase">{day}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/employee/performance"
                className="block text-center text-sm font-medium text-blue-600 hover:text-blue-700 py-2 border-t border-slate-100 pt-4"
                data-testid="performance-daily-notes-link"
              >
                View daily notes
              </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 text-sm mb-4">Recent Reviews</h3>
              <div className="space-y-3">
                <Link
                  to="/employee/performance/review/q4-2024"
                  className="block p-3 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100 transition-colors"
                  data-testid="performance-review-q4-link"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-900">Q4 2024 Review</span>
                    <span className="text-xs font-semibold text-blue-600">4.2 / 5.0</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Completed Jan 5, 2025</p>
                </Link>
                <Link
                  to="/employee/performance/feedback/crm"
                  className="block p-3 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100 transition-colors"
                  data-testid="performance-feedback-crm-link"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-900">
                      CRM Dashboard Redesign
                    </span>
                    <span className="text-xs font-semibold text-amber-600">4.5 / 5.0</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Project feedback Dec 18, 2024</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
