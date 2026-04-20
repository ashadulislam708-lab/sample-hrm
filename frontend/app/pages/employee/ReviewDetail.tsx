import { Link } from 'react-router';

export default function ReviewDetail() {
  const categories = [
    { label: 'Technical Skills', score: '4.5 / 5.0', width: 90, color: 'bg-blue-600' },
    { label: 'Communication', score: '4.0 / 5.0', width: 80, color: 'bg-blue-600' },
    { label: 'Teamwork & Collaboration', score: '4.5 / 5.0', width: 90, color: 'bg-blue-600' },
    { label: 'Problem Solving', score: '4.0 / 5.0', width: 80, color: 'bg-blue-600' },
    { label: 'Time Management', score: '3.8 / 5.0', width: 76, color: 'bg-amber-500' },
    { label: 'Leadership & Initiative', score: '4.2 / 5.0', width: 84, color: 'bg-blue-600' },
  ];

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600 font-normal"
      data-testid="review-detail-page"
    >
      <div className="max-w-4xl mx-auto p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-4">
          <Link
            to="/employee/performance"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
            data-testid="review-detail-back-link"
          >
            <span aria-hidden="true">&larr;</span>
            Back to Performance
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-50"
                  data-testid="review-detail-status-badge"
                >
                  Completed
                </span>
                <span className="text-sm text-slate-500">Q4 2024</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-2">
                Performance Review
              </h1>
              <p className="text-slate-500">October 1, 2024 - December 31, 2024</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-100">
              <p className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-2">
                Overall Rating
              </p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-blue-600">4.2</span>
                <span className="text-lg text-blue-400">/ 5.0</span>
              </div>
              <div className="flex justify-center gap-0.5 mt-2 text-amber-500" aria-hidden="true">
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9734;</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-semibold text-indigo-700">
              AM
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">Reviewed by Alex Morgan</p>
              <p className="text-xs text-slate-500">Engineering Manager</p>
            </div>
            <span className="ml-auto text-xs text-slate-400">Reviewed on Jan 5, 2025</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Performance Categories</h2>
          <div className="space-y-6">
            {categories.map((cat) => (
              <div key={cat.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">{cat.label}</span>
                  <span className="text-sm font-semibold text-slate-900">{cat.score}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className={`${cat.color} h-2 rounded-full`}
                    style={{ width: `${cat.width}%` }}
                    aria-hidden="true"
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600"
                aria-hidden="true"
              >
                &#9733;
              </div>
              <h3 className="font-semibold text-slate-900">Key Strengths</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5" aria-hidden="true">
                  &#10004;
                </span>
                <span className="text-sm text-slate-600">
                  Excellent attention to detail in UI/UX design work
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5" aria-hidden="true">
                  &#10004;
                </span>
                <span className="text-sm text-slate-600">
                  Strong collaboration with cross-functional teams
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5" aria-hidden="true">
                  &#10004;
                </span>
                <span className="text-sm text-slate-600">
                  Proactive in learning new design tools and technologies
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5" aria-hidden="true">
                  &#10004;
                </span>
                <span className="text-sm text-slate-600">
                  Consistently delivers high-quality work
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600"
                aria-hidden="true"
              >
                !
              </div>
              <h3 className="font-semibold text-slate-900">Areas for Improvement</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5" aria-hidden="true">
                  &rarr;
                </span>
                <span className="text-sm text-slate-600">
                  Could improve time estimation for complex projects
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5" aria-hidden="true">
                  &rarr;
                </span>
                <span className="text-sm text-slate-600">
                  More proactive communication on project blockers
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5" aria-hidden="true">
                  &rarr;
                </span>
                <span className="text-sm text-slate-600">
                  Consider taking on more mentorship responsibilities
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Manager Comments</h2>
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
            <p className="text-sm text-slate-600 leading-relaxed">
              John has shown remarkable growth this quarter, particularly in his design work and
              collaboration skills. His contributions to the CRM Dashboard Redesign project were
              exceptional, and he consistently delivered high-quality work that exceeded
              expectations.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mt-4">
              Moving forward, I encourage John to focus on improving his time management skills and
              to communicate more proactively about potential blockers. With these improvements, I
              believe he has strong potential for advancement to a Senior Designer role.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Goals for Q1 2025</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-semibold text-blue-700 mt-0.5">
                1
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Complete Design System Documentation
                </p>
                <p className="text-xs text-slate-500 mt-0.5">Due: March 31, 2025</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-semibold text-blue-700 mt-0.5">
                2
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Mentor 2 Junior Designers</p>
                <p className="text-xs text-slate-500 mt-0.5">Ongoing</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-semibold text-blue-700 mt-0.5">
                3
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Improve Sprint Velocity by 15%</p>
                <p className="text-xs text-slate-500 mt-0.5">Due: March 31, 2025</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button data-testid="review-detail-download-btn"
            type="button"
            onClick={() => {
              /* download pdf */
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Download PDF
          </button>
          <Link
            to="/employee/performance"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
            data-testid="review-detail-back-perf-link"
          >
            Back to Performance
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
