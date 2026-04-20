import { Link, useParams } from 'react-router';

export default function JobPostingDetail() {
  const { id } = useParams();

  const handleAction = (_action: 'edit' | 'pause' | 'close') => {
    // TODO: wire to job posting action API in Phase 7 integration
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="admin-job-posting-detail-page"
    >
      <div className="max-w-[1000px] mx-auto p-8">
        <Link
          to="/admin/recruitment"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-6"
          data-testid="admin-job-posting-detail-back-link"
        >
          <span aria-hidden="true">&larr;</span>
          Back to Recruitment
        </Link>

        <header className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-5">
              <div
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg"
                aria-hidden="true"
              >
                JP
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                    Senior Frontend Developer
                    {id ? <span className="text-slate-400 text-sm ml-2">#{id}</span> : null}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-green-500"
                      aria-hidden="true"
                    ></span>
                    Active
                  </span>
                </div>
                <p className="text-slate-600 mb-2">
                  Engineering Department &bull; Full-time &bull; Remote
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <span>Posted: Jan 10, 2025</span>
                  <span>24 Applicants</span>
                  <span>1,234 Views</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button data-testid="admin-job-posting-detail-edit-btn"
                type="button"
                onClick={() => handleAction('edit')}
                className="h-10 px-4 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer"
              >
                Edit
              </button>
              <button data-testid="admin-job-posting-detail-pause-btn"
                type="button"
                onClick={() => handleAction('pause')}
                className="h-10 px-4 rounded-lg text-sm font-medium text-amber-600 bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-all flex items-center gap-2 cursor-pointer"
              >
                Pause
              </button>
              <button data-testid="admin-job-posting-detail-close-btn"
                type="button"
                onClick={() => handleAction('close')}
                className="h-10 px-4 rounded-lg text-sm font-medium text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 transition-all flex items-center gap-2 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Job Description</h2>
              </div>
              <div className="p-5 space-y-4">
                <p className="text-sm text-slate-700 leading-relaxed">
                  We are looking for an experienced Senior Frontend Developer to join our growing
                  engineering team. You will be responsible for building and maintaining our web
                  applications, working closely with designers and backend engineers to deliver
                  exceptional user experiences.
                </p>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                    Key Responsibilities
                  </p>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="text-green-500 mt-0.5 flex-shrink-0"
                      >
                        &#10003;
                      </span>
                      Build responsive, performant web applications using React and TypeScript
                    </li>
                    <li className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="text-green-500 mt-0.5 flex-shrink-0"
                      >
                        &#10003;
                      </span>
                      Collaborate with UX/UI designers to implement pixel-perfect designs
                    </li>
                    <li className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="text-green-500 mt-0.5 flex-shrink-0"
                      >
                        &#10003;
                      </span>
                      Write clean, maintainable, and well-tested code
                    </li>
                    <li className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="text-green-500 mt-0.5 flex-shrink-0"
                      >
                        &#10003;
                      </span>
                      Mentor junior developers and participate in code reviews
                    </li>
                    <li className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="text-green-500 mt-0.5 flex-shrink-0"
                      >
                        &#10003;
                      </span>
                      Contribute to technical architecture decisions
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Requirements</h2>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
                    Required Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-700">
                      React
                    </span>
                    <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-700">
                      TypeScript
                    </span>
                    <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-700">
                      Next.js
                    </span>
                    <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-700">
                      Tailwind CSS
                    </span>
                    <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-50 text-blue-700">
                      Git
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
                    Nice to Have
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-100 text-slate-600">
                      GraphQL
                    </span>
                    <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-100 text-slate-600">
                      Node.js
                    </span>
                    <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-100 text-slate-600">
                      AWS
                    </span>
                    <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-100 text-slate-600">
                      Docker
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                    Experience &amp; Education
                  </p>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="text-blue-500 mt-0.5 flex-shrink-0"
                      >
                        &#10003;
                      </span>
                      5+ years of frontend development experience
                    </li>
                    <li className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="text-blue-500 mt-0.5 flex-shrink-0"
                      >
                        &#10003;
                      </span>
                      Bachelor&apos;s degree in Computer Science or equivalent
                    </li>
                    <li className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="text-blue-500 mt-0.5 flex-shrink-0"
                      >
                        &#10003;
                      </span>
                      Experience leading small teams or mentoring
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-base font-semibold text-slate-900">Recent Applicants</h2>
                <Link
                  to="/admin/recruitment"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  data-testid="admin-job-posting-detail-view-all-link"
                >
                  View All (24)
                </Link>
              </div>
              <div className="divide-y divide-slate-100">
                <Link
                  to="/admin/recruitment/candidates/1"
                  className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                  data-testid="admin-job-posting-detail-applicant-1-link"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-medium"
                      aria-hidden="true"
                    >
                      MJ
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Michael Johnson</p>
                      <p className="text-xs text-slate-500">Applied Jan 15, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700">
                      Interview
                    </span>
                    <span aria-hidden="true" className="text-slate-400">&rarr;</span>
                  </div>
                </Link>
                <Link
                  to="/admin/recruitment/candidates/2"
                  className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                  data-testid="admin-job-posting-detail-applicant-2-link"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white text-sm font-medium"
                      aria-hidden="true"
                    >
                      EW
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Emily Wilson</p>
                      <p className="text-xs text-slate-500">Applied Jan 18, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-amber-50 text-amber-700">
                      Screening
                    </span>
                    <span aria-hidden="true" className="text-slate-400">&rarr;</span>
                  </div>
                </Link>
                <Link
                  to="/admin/recruitment/candidates/3"
                  className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                  data-testid="admin-job-posting-detail-applicant-3-link"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-sm font-medium"
                      aria-hidden="true"
                    >
                      DK
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">David Kim</p>
                      <p className="text-xs text-slate-500">Applied Jan 20, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-600">
                      New
                    </span>
                    <span aria-hidden="true" className="text-slate-400">&rarr;</span>
                  </div>
                </Link>
                <Link
                  to="/admin/recruitment/candidates/4"
                  className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
                  data-testid="admin-job-posting-detail-applicant-4-link"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-sm font-medium"
                      aria-hidden="true"
                    >
                      SP
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Sarah Parker</p>
                      <p className="text-xs text-slate-500">Applied Jan 22, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-600">
                      New
                    </span>
                    <span aria-hidden="true" className="text-slate-400">&rarr;</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Job Details</h2>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Job ID</span>
                  <span className="text-sm font-medium text-slate-900">JOB-2025-0012</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Department</span>
                  <span className="text-sm font-medium text-slate-900">Engineering</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Employment</span>
                  <span className="text-sm font-medium text-slate-900">Full-time</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Location</span>
                  <span className="text-sm font-medium text-slate-900">Remote</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Salary Range</span>
                  <span className="text-sm font-medium text-slate-900">$120K - $150K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Experience</span>
                  <span className="text-sm font-medium text-slate-900">5+ years</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Pipeline Status</h2>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-600">New Applications</span>
                  <span className="text-sm font-semibold text-slate-900">8</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <span className="text-sm text-slate-600">Screening</span>
                  <span className="text-sm font-semibold text-amber-700">6</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-slate-600">Interview</span>
                  <span className="text-sm font-semibold text-blue-700">5</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm text-slate-600">Offer Stage</span>
                  <span className="text-sm font-semibold text-purple-700">2</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm text-slate-600">Hired</span>
                  <span className="text-sm font-semibold text-green-700">1</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="text-sm text-slate-600">Rejected</span>
                  <span className="text-sm font-semibold text-red-600">2</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Hiring Team</h2>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs font-medium"
                    aria-hidden="true"
                  >
                    SM
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">Sarah Mitchell</p>
                    <p className="text-xs text-slate-500">Recruiter</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium"
                    aria-hidden="true"
                  >
                    JD
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">John Davis</p>
                    <p className="text-xs text-slate-500">Hiring Manager</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-medium"
                    aria-hidden="true"
                  >
                    AR
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">Alex Rodriguez</p>
                    <p className="text-xs text-slate-500">Tech Lead</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-5 text-white">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-medium">Quick Stats</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-blue-100">Avg. Time to Hire</span>
                  <span className="font-semibold">18 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-100">Conversion Rate</span>
                  <span className="font-semibold">12.5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-100">Days Active</span>
                  <span className="font-semibold">18</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
