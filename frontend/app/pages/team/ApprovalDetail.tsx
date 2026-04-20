import { useState } from 'react';

import { Link, useParams } from 'react-router';

export default function ApprovalDetail() {
  const { id } = useParams<{ id: string }>();
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleDecision = (_decision: 'approved' | 'rejected') => {
    setSubmitting(true);
    // TODO: wire to approval API in Phase 7 integration
    setSubmitting(false);
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="team-approval-detail-page"
    >
      <div className="max-w-[900px] mx-auto p-8">
        <Link
          to="/team/approvals"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-6 group"
          data-testid="team-approval-detail-back-link"
        >
          <span aria-hidden="true">&larr;</span>
          Back to Approvals
        </Link>

        <header className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 text-sm font-semibold"
              aria-hidden="true"
            >
              LV
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                  Leave Request
                </h1>
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100"
                  data-testid="team-approval-detail-status-badge"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" aria-hidden="true" />
                  Pending Your Approval
                </span>
              </div>
              <p className="text-sm text-slate-500">Request ID: #{id ?? 'LV-2024-0092'}</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              data-testid="team-approval-detail-requestor-card"
            >
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Requestor</h2>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold"
                    aria-hidden="true"
                  >
                    MC
                  </div>
                  <div>
                    <p className="text-base font-semibold text-slate-900">Mike Chen</p>
                    <p className="text-sm text-slate-500">Backend Developer</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Joined: June 2022 &bull; Reports to you
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              data-testid="team-approval-detail-request-card"
            >
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Request Details</h2>
              </div>
              <div className="p-5 space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Leave Type
                    </p>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                      Casual Leave
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Duration
                    </p>
                    <p className="text-sm font-medium text-slate-900">3 Days</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Start Date
                    </p>
                    <p className="text-sm font-medium text-slate-900">January 22, 2025</p>
                    <p className="text-xs text-slate-500">Wednesday</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      End Date
                    </p>
                    <p className="text-sm font-medium text-slate-900">January 24, 2025</p>
                    <p className="text-xs text-slate-500">Friday</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                    Reason
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Family vacation planned for the long weekend. All pending tasks will be handed
                    over to Sarah before I leave. Will be reachable via email for urgent matters.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                    Submitted
                  </p>
                  <p className="text-sm text-slate-700">January 15, 2025 at 2:30 PM</p>
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              data-testid="team-approval-detail-decision-card"
            >
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Your Decision</h2>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label
                    htmlFor="approval-comment"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Add a comment (optional)
                  </label>
                  <textarea data-testid="team-approval-detail-textarea-approval-comment-1"
                    id="approval-comment"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    placeholder="Add any notes for the employee..."
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button data-testid="team-approval-detail-approve-btn"
                    type="button"
                    disabled={submitting}
                    onClick={() => handleDecision('approved')}
                    className="flex-1 h-11 rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Approve Request
                  </button>
                  <button data-testid="team-approval-detail-reject-btn"
                    type="button"
                    disabled={submitting}
                    onClick={() => handleDecision('rejected')}
                    className="flex-1 h-11 rounded-lg text-sm font-medium text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Reject Request
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              data-testid="team-approval-detail-balance-card"
            >
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Mike&apos;s Leave Balance</h2>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Casual Leave</span>
                    <span className="text-sm font-medium text-slate-900">6 / 12 days</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full"
                      style={{ width: '50%' }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Sick Leave</span>
                    <span className="text-sm font-medium text-slate-900">7 / 7 days</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-rose-500 h-2 rounded-full"
                      style={{ width: '100%' }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-xs text-slate-500">
                    After approval, Mike will have{' '}
                    <strong className="text-slate-700">3 casual leave days</strong> remaining.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              data-testid="team-approval-detail-impact-card"
            >
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Team Impact</h2>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Team members on leave</span>
                  <span className="text-sm font-medium text-slate-900">0 / 12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Sprint deadline</span>
                  <span className="text-sm font-medium text-green-600">After leave period</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Overlap with others</span>
                  <span className="text-sm font-medium text-green-600">None</span>
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              data-testid="team-approval-detail-history-card"
            >
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Recent Leave History</h2>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-900">Casual Leave</p>
                    <p className="text-xs text-slate-500">Dec 23-24, 2024</p>
                  </div>
                  <span className="text-xs text-green-600 font-medium">Approved</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-900">Sick Leave</p>
                    <p className="text-xs text-slate-500">Nov 15, 2024</p>
                  </div>
                  <span className="text-xs text-green-600 font-medium">Approved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
