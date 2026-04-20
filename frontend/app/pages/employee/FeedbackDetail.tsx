import { Link } from 'react-router';

export default function FeedbackDetail() {
  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600 font-normal"
      data-testid="feedback-detail-page"
    >
      <div className="max-w-4xl mx-auto p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-4">
          <Link
            to="/employee/performance"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
            data-testid="feedback-detail-back-link"
          >
            <span aria-hidden="true">&larr;</span>
            Back to Performance
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-50"
                  data-testid="feedback-detail-status-badge"
                >
                  Completed
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-2">
                CRM Dashboard Redesign
              </h1>
              <p className="text-slate-500">Project completed on December 15, 2024</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex gap-0.5 text-amber-500 mb-2" aria-hidden="true">
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9734;</span>
              </div>
              <span className="text-sm font-semibold text-slate-900">4.5 / 5.0</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-sm font-semibold text-pink-700">
              SC
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">Sarah Chen</p>
              <p className="text-xs text-slate-500">Project Manager</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Project Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                Duration
              </p>
              <p className="text-sm text-slate-900">Oct 1, 2024 - Dec 15, 2024 (10 weeks)</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                Your Role
              </p>
              <p className="text-sm text-slate-900">Lead Designer</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                Team Size
              </p>
              <p className="text-sm text-slate-900">5 members</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                Budget Utilized
              </p>
              <p className="text-sm text-slate-900">$25,000 / $30,000 (83%)</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Evaluation Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                Quality
              </p>
              <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                Excellent
              </span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                Timeliness
              </p>
              <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                On Time
              </span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                Communication
              </p>
              <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                Very Good
              </span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                Collaboration
              </p>
              <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                Excellent
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Manager Feedback</h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"
                  aria-hidden="true"
                >
                  +
                </div>
                <h3 className="text-sm font-semibold text-slate-900">What Went Well</h3>
              </div>
              <div className="bg-emerald-50/50 rounded-lg p-4 border border-emerald-100">
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5" aria-hidden="true">
                      &#10004;
                    </span>
                    <span>
                      Outstanding visual design execution that exceeded stakeholder expectations
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5" aria-hidden="true">
                      &#10004;
                    </span>
                    <span>Proactive communication throughout the project lifecycle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5" aria-hidden="true">
                      &#10004;
                    </span>
                    <span>Effective coordination with development team for smooth handoff</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5" aria-hidden="true">
                      &#10004;
                    </span>
                    <span>
                      User testing sessions were well planned and provided valuable insights
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600"
                  aria-hidden="true"
                >
                  !
                </div>
                <h3 className="text-sm font-semibold text-slate-900">Areas for Improvement</h3>
              </div>
              <div className="bg-amber-50/50 rounded-lg p-4 border border-amber-100">
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5" aria-hidden="true">
                      &rarr;
                    </span>
                    <span>
                      Initial scope estimation was slightly optimistic - consider adding buffer time
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5" aria-hidden="true">
                      &rarr;
                    </span>
                    <span>Documentation could be more detailed for future reference</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"
                  aria-hidden="true"
                >
                  &#8220;
                </div>
                <h3 className="text-sm font-semibold text-slate-900">Overall Comments</h3>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                <p className="text-sm text-slate-600 leading-relaxed">
                  &ldquo;John delivered exceptional work on this project. His attention to detail
                  and creative problem-solving skills were instrumental in creating a dashboard
                  that both looks great and functions intuitively. The client was extremely
                  satisfied with the final deliverable. I would be happy to work with John on
                  future projects and highly recommend him for design leadership roles.&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-xs font-semibold text-pink-700">
                    SC
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-900">Sarah Chen</p>
                    <p className="text-[10px] text-slate-500">Dec 18, 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button data-testid="feedback-detail-download-btn"
            type="button"
            onClick={() => {
              /* download report */
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Download Report
          </button>
          <Link
            to="/employee/performance"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
            data-testid="feedback-detail-back-perf-link"
          >
            Back to Performance
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
