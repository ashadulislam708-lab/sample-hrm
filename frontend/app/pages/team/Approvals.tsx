import { useState } from 'react';

import EmptyState from '~/components/atoms/EmptyState';

type ApprovalFilter = 'all' | 'leave' | 'emergency' | 'late' | 'shift';

interface ApprovalRequest {
  id: string;
  filter: Exclude<ApprovalFilter, 'all'>;
  employeeName: string;
  employeeRole: string;
  initials: string;
}

export default function Approvals() {
  const [activeFilter, setActiveFilter] = useState<ApprovalFilter>('all');
  const [commentDraft, setCommentDraft] = useState<Record<string, string>>({});

  // Data rendered from Redux in Phase 7. Until then show empty state.
  const requests: ApprovalRequest[] = [];
  const decisions: Array<{
    id: string;
    date: string;
    employee: string;
    type: string;
    decision: 'approved' | 'rejected';
    comment: string;
  }> = [];

  const handleDecision = (_requestId: string, _decision: 'approved' | 'rejected') => {
    // TODO: wire to decision API in Phase 7 integration
  };

  const filteredRequests =
    activeFilter === 'all' ? requests : requests.filter((r) => r.filter === activeFilter);

  const setFilter = (f: ApprovalFilter) => () => setActiveFilter(f);

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="team-approvals-page"
    >
      <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Team Approvals</h1>
          <p className="text-sm text-slate-500 mt-1">Review and manage team requests</p>
        </header>

        {/* Filter Tabs */}
        <div className="border-b border-slate-200">
          <div className="flex items-center gap-8 overflow-x-auto">
            <button data-testid="team-approvals-tab-all"
              type="button"
              onClick={setFilter('all')}
              className={`pb-3 border-b-2 font-medium text-sm flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${activeFilter === 'all' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
            >
              All Requests
              <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                {requests.length}
              </span>
            </button>
            <button data-testid="team-approvals-tab-leave"
              type="button"
              onClick={setFilter('leave')}
              className={`pb-3 border-b-2 font-medium text-sm flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${activeFilter === 'leave' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
            >
              Leave
              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                {requests.filter((r) => r.filter === 'leave').length}
              </span>
            </button>
            <button data-testid="team-approvals-tab-emergency"
              type="button"
              onClick={setFilter('emergency')}
              className={`pb-3 border-b-2 font-medium text-sm flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${activeFilter === 'emergency' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
            >
              Emergency Leave
              <span className="bg-red-50 text-red-500 px-2 py-0.5 rounded-full text-xs font-semibold">
                {requests.filter((r) => r.filter === 'emergency').length}
              </span>
            </button>
            <button data-testid="team-approvals-tab-late"
              type="button"
              onClick={setFilter('late')}
              className={`pb-3 border-b-2 font-medium text-sm flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${activeFilter === 'late' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
            >
              Late Attendance
              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                {requests.filter((r) => r.filter === 'late').length}
              </span>
            </button>
            <button data-testid="team-approvals-tab-shift"
              type="button"
              onClick={setFilter('shift')}
              className={`pb-3 border-b-2 font-medium text-sm flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${activeFilter === 'shift' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
            >
              Work Day Shift
              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                {requests.filter((r) => r.filter === 'shift').length}
              </span>
            </button>
          </div>
        </div>

        {/* Request Cards List */}
        <section className="space-y-4">
          {filteredRequests.length === 0 ? (
            <EmptyState
              title="No pending requests"
              description="You're all caught up. New requests will appear here."
              testId="team-approvals-empty"
            />
          ) : (
            filteredRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-shadow"
                data-testid={`team-approvals-card-${req.id}`}
              >
                <div className="flex items-start gap-4 md:w-1/3">
                  <div
                    className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0"
                    aria-hidden="true"
                  >
                    {req.initials}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{req.employeeName}</h3>
                    <p className="text-xs text-slate-500">{req.employeeRole}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <input data-testid={`team-approvals-comment-${req.id}`}
                    type="text"
                    value={commentDraft[req.id] ?? ''}
                    onChange={(e) =>
                      setCommentDraft((prev) => ({ ...prev, [req.id]: e.target.value }))
                    }
                    placeholder="Add comment..."
                    className="w-full md:w-48 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                  <button data-testid={`team-approvals-approve-${req.id}-btn`}
                    type="button"
                    onClick={() => handleDecision(req.id, 'approved')}
                    className="bg-green-500 hover:bg-green-700 text-white p-2 rounded-lg transition-colors shadow-sm cursor-pointer"
                    aria-label="Approve"
                  >
                    Approve
                  </button>
                  <button data-testid={`team-approvals-reject-${req.id}-btn`}
                    type="button"
                    onClick={() => handleDecision(req.id, 'rejected')}
                    className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-lg transition-colors shadow-sm cursor-pointer"
                    aria-label="Reject"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </section>

        {/* Approval History */}
        <section className="pt-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Recent Decisions
            </h2>
            <button data-testid="team-approvals-history-toggle-btn"
              type="button"
              onClick={() => {
                /* toggle history — wired in Phase 7 */
              }}
              className="text-slate-400 hover:text-slate-600 cursor-pointer"
              aria-label="Toggle history"
            >
              <span aria-hidden="true">&darr;</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {decisions.length === 0 ? (
              <EmptyState
                title="No recent decisions"
                description="Approved or rejected requests will appear here."
                testId="team-approvals-history-empty"
              />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-medium">
                    <tr>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Employee</th>
                      <th className="px-6 py-3">Type</th>
                      <th className="px-6 py-3">Decision</th>
                      <th className="px-6 py-3 w-1/3">Comment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {decisions.map((d) => (
                      <tr
                        key={d.id}
                        className="hover:bg-slate-50/50 transition-colors"
                        data-testid={`team-approvals-history-row-${d.id}`}
                      >
                        <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{d.date}</td>
                        <td className="px-6 py-4 font-medium text-slate-900">{d.employee}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                            {d.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${d.decision === 'approved' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`}
                            data-testid={`team-approvals-history-decision-${d.id}-badge`}
                          >
                            {d.decision === 'approved' ? 'Approved' : 'Rejected'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-500 truncate">{d.comment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 text-center">
              <button data-testid="team-approvals-view-all-history-btn"
                type="button"
                onClick={() => {
                  /* navigate to full history — wired in Phase 7 */
                }}
                className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
              >
                View All History
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
