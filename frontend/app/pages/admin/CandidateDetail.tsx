import { useState } from 'react';

import { Link, useParams } from 'react-router';

export default function CandidateDetail() {
  const { id } = useParams();
  const [decisionNotes, setDecisionNotes] = useState('');

  const handleDecision = (_decision: 'offer' | 'pipeline' | 'reject') => {
    // TODO: wire to candidate decision API in Phase 7 integration
  };

  const handleAddNote = () => {
    // TODO: wire add-note flow in Phase 7 integration
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="admin-candidate-detail-page"
    >
      <div className="max-w-[1000px] mx-auto p-8">
        <Link
          to="/admin/recruitment"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-6"
          data-testid="admin-candidate-detail-back-link"
        >
          <span aria-hidden="true">&larr;</span>
          Back to Recruitment
        </Link>

        <header className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-5">
              <div
                className="w-20 h-20 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                aria-hidden="true"
              >
                MJ
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                    Michael Johnson{id ? ` (#${id})` : ''}
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-blue-500"
                      aria-hidden="true"
                    ></span>
                    Interview Stage
                  </span>
                </div>
                <p className="text-slate-600 mb-2">Senior Frontend Developer</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <span>michael.johnson@email.com</span>
                  <span>+1 (555) 234-5678</span>
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button data-testid="admin-candidate-detail-download-resume-btn"
                type="button"
                onClick={() => {
                  /* download resume */
                }}
                className="h-10 px-4 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer"
              >
                Download Resume
              </button>
              <button data-testid="admin-candidate-detail-schedule-interview-btn"
                type="button"
                onClick={() => {
                  /* schedule interview */
                }}
                className="h-10 px-4 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all flex items-center gap-2 cursor-pointer"
              >
                Schedule Interview
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Interview Pipeline</h2>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white text-sm font-medium"
                      aria-hidden="true"
                    >
                      &#10003;
                    </div>
                    <div className="flex-1 h-1 bg-green-500 rounded"></div>
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white text-sm font-medium"
                      aria-hidden="true"
                    >
                      &#10003;
                    </div>
                    <div className="flex-1 h-1 bg-green-500 rounded"></div>
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-medium"
                      aria-hidden="true"
                    >
                      3
                    </div>
                    <div className="flex-1 h-1 bg-slate-200 rounded"></div>
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 text-slate-500 text-sm font-medium"
                      aria-hidden="true"
                    >
                      4
                    </div>
                    <div className="flex-1 h-1 bg-slate-200 rounded"></div>
                  </div>
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 text-slate-500 text-sm font-medium"
                    aria-hidden="true"
                  >
                    5
                  </div>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span className="text-green-600 font-medium">Applied</span>
                  <span className="text-green-600 font-medium">Screening</span>
                  <span className="text-blue-600 font-medium">Interview</span>
                  <span>Offer</span>
                  <span>Hired</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Skills &amp; Experience</h2>
              </div>
              <div className="p-5 space-y-5">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
                    Technical Skills
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
                    <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-purple-50 text-purple-700">
                      Node.js
                    </span>
                    <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-purple-50 text-purple-700">
                      GraphQL
                    </span>
                    <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-green-50 text-green-700">
                      Jest
                    </span>
                    <span className="px-3 py-1.5 rounded-lg text-sm font-medium bg-green-50 text-green-700">
                      Cypress
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
                    Experience Summary
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                      <div
                        className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600"
                        aria-hidden="true"
                      >
                        B
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          Senior Frontend Developer
                        </p>
                        <p className="text-xs text-slate-500">
                          TechCorp Inc. &bull; 2021 - Present &bull; 3 years
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                      <div
                        className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600"
                        aria-hidden="true"
                      >
                        B
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">Frontend Developer</p>
                        <p className="text-xs text-slate-500">
                          StartupXYZ &bull; 2018 - 2021 &bull; 3 years
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
                    Education
                  </p>
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <div
                      className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600"
                      aria-hidden="true"
                    >
                      E
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">BS in Computer Science</p>
                      <p className="text-xs text-slate-500">Stanford University &bull; 2018</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-base font-semibold text-slate-900">Interview Notes</h2>
                <button data-testid="admin-candidate-detail-add-note-btn"
                  type="button"
                  onClick={handleAddNote}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                >
                  + Add Note
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs font-medium"
                        aria-hidden="true"
                      >
                        SM
                      </div>
                      <span className="text-sm font-medium text-slate-900">Sarah Mitchell</span>
                      <span className="text-xs text-slate-400">HR Manager</span>
                    </div>
                    <span className="text-xs text-slate-400">Jan 22, 2025</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Phone screening went well. Candidate has strong React experience and good
                    communication skills. Recommended for technical interview.
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                      Positive
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium"
                        aria-hidden="true"
                      >
                        JD
                      </div>
                      <span className="text-sm font-medium text-slate-900">John Davis</span>
                      <span className="text-xs text-slate-400">Tech Lead</span>
                    </div>
                    <span className="text-xs text-slate-400">Jan 25, 2025</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Technical interview completed. Strong understanding of React patterns and
                    TypeScript. Solved the coding challenge efficiently. Asked good questions about
                    our tech stack.
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                      Strong Hire
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Hiring Decision</h2>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label
                    htmlFor="decision-notes"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Decision Notes
                  </label>
                  <textarea data-testid="admin-candidate-detail-textarea-decision-notes-1"
                    id="decision-notes"
                    rows={3}
                    value={decisionNotes}
                    onChange={(e) => setDecisionNotes(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Add decision notes..."
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button data-testid="admin-candidate-detail-proceed-offer-btn"
                    type="button"
                    onClick={() => handleDecision('offer')}
                    className="flex-1 h-11 rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Proceed to Offer
                  </button>
                  <button data-testid="admin-candidate-detail-keep-pipeline-btn"
                    type="button"
                    onClick={() => handleDecision('pipeline')}
                    className="flex-1 h-11 rounded-lg text-sm font-medium text-amber-600 bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Keep in Pipeline
                  </button>
                  <button data-testid="admin-candidate-detail-reject-btn"
                    type="button"
                    onClick={() => handleDecision('reject')}
                    className="flex-1 h-11 rounded-lg text-sm font-medium text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Application Info</h2>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Position</span>
                  <span className="text-sm font-medium text-slate-900">Sr. Frontend Dev</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Department</span>
                  <span className="text-sm font-medium text-slate-900">Engineering</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Applied Date</span>
                  <span className="text-sm font-medium text-slate-900">Jan 15, 2025</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Source</span>
                  <span className="text-sm font-medium text-slate-900">LinkedIn</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Expected Salary</span>
                  <span className="text-sm font-medium text-slate-900">$130,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Notice Period</span>
                  <span className="text-sm font-medium text-slate-900">2 weeks</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Candidate Score</h2>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-slate-900">85</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-600">Technical Skills</span>
                      <span className="font-medium text-slate-900">90%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: '90%' }}
                        aria-hidden="true"
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-600">Experience</span>
                      <span className="font-medium text-slate-900">85%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: '85%' }}
                        aria-hidden="true"
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-600">Culture Fit</span>
                      <span className="font-medium text-slate-900">80%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: '80%' }}
                        aria-hidden="true"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Activity</h2>
              </div>
              <div className="p-5">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span
                        className="w-2 h-2 rounded-full bg-blue-500"
                        aria-hidden="true"
                      ></span>
                      <span
                        className="w-0.5 h-full bg-slate-200"
                        aria-hidden="true"
                      ></span>
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium text-slate-900">Technical Interview</p>
                      <p className="text-xs text-slate-500">Jan 25, 2025</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span
                        className="w-2 h-2 rounded-full bg-green-500"
                        aria-hidden="true"
                      ></span>
                      <span
                        className="w-0.5 h-full bg-slate-200"
                        aria-hidden="true"
                      ></span>
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium text-slate-900">Phone Screening</p>
                      <p className="text-xs text-slate-500">Jan 22, 2025</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span
                        className="w-2 h-2 rounded-full bg-green-500"
                        aria-hidden="true"
                      ></span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Application Received</p>
                      <p className="text-xs text-slate-500">Jan 15, 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
