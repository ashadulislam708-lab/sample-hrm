import { useState } from 'react';

import { Link, useParams } from 'react-router';

export default function LeaveRequestDetail() {
  const { id } = useParams();
  const [hrNotes, setHrNotes] = useState('');

  const handleDecision = (_decision: 'approved' | 'rejected') => {
    // TODO: wire to leave decision API in Phase 7 integration
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="admin-leave-request-detail-page"
    >
      <div className="max-w-[900px] mx-auto p-8">
        <Link
          to="/admin/leave"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-6"
          data-testid="admin-leave-request-detail-back-link"
        >
          <span aria-hidden="true">&larr;</span>
          Back to Leave Management
        </Link>

        <header className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600"
              aria-hidden="true"
            >
              LR
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                  Leave Request #{id ?? 'LV-2024-0095'}
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-amber-500"
                    aria-hidden="true"
                  ></span>
                  Pending
                </span>
              </div>
              <p className="text-sm text-slate-500">Submitted: January 18, 2025 at 3:45 PM</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Employee Information</h2>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center text-2xl font-bold"
                    aria-hidden="true"
                  >
                    ED
                  </div>
                  <div className="flex-1">
                    <Link
                      to="/admin/employees/1"
                      className="text-lg font-semibold text-slate-900 hover:text-blue-600"
                      data-testid="admin-leave-request-detail-employee-link"
                    >
                      Emily Davis
                    </Link>
                    <p className="text-sm text-slate-500">UI Designer &bull; Product Team</p>
                    <p className="text-xs text-slate-400 mt-1">
                      EMP-2023-0045 &bull; Reports to John Doe
                    </p>
                  </div>
                  <Link
                    to="/admin/employees/1"
                    className="h-9 px-3 rounded-lg text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all inline-flex items-center justify-center"
                    data-testid="admin-leave-request-detail-view-profile-link"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
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
                    <p className="text-sm font-medium text-slate-900">2 Days</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Start Date
                    </p>
                    <p className="text-sm font-medium text-slate-900">January 27, 2025</p>
                    <p className="text-xs text-slate-500">Monday</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      End Date
                    </p>
                    <p className="text-sm font-medium text-slate-900">January 28, 2025</p>
                    <p className="text-xs text-slate-500">Tuesday</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                    Reason
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Personal appointment and errands that require two consecutive days. All design
                    work will be handed over to Sarah before I leave.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">HR Decision</h2>
              </div>
              <div className="p-5 space-y-4">
                <div className="p-4 bg-green-50 border border-green-100 rounded-lg flex items-start gap-3">
                  <span aria-hidden="true" className="text-green-600 mt-0.5">
                    &#10003;
                  </span>
                  <div>
                    <p className="text-sm font-medium text-green-800">Team Lead Approved</p>
                    <p className="text-xs text-green-700 mt-0.5">
                      Approved by John Doe on Jan 19, 2025
                    </p>
                    <p className="text-xs text-green-600 mt-1 italic">
                      &ldquo;Approved. Emily has completed all pending tasks.&rdquo;
                    </p>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="hr-notes"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Add HR notes (optional)
                  </label>
                  <textarea data-testid="admin-leave-request-detail-textarea-hr-notes-1"
                    id="hr-notes"
                    rows={3}
                    value={hrNotes}
                    onChange={(e) => setHrNotes(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Add any notes for the record..."
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button data-testid="admin-leave-request-detail-approve-btn"
                    type="button"
                    onClick={() => handleDecision('approved')}
                    className="flex-1 h-11 rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Final Approve
                  </button>
                  <button data-testid="admin-leave-request-detail-reject-btn"
                    type="button"
                    onClick={() => handleDecision('rejected')}
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
                <h2 className="text-base font-semibold text-slate-900">Leave Balance</h2>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Casual Leave</span>
                    <span className="text-sm font-medium text-slate-900">10 / 12 days</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full"
                      style={{ width: '83%' }}
                      aria-hidden="true"
                    ></div>
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
                    ></div>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-xs text-slate-500">
                    After approval:{' '}
                    <strong className="text-slate-700">8 casual days</strong> remaining
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Approval Flow</h2>
              </div>
              <div className="p-5">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600"
                      aria-hidden="true"
                    >
                      &#10003;
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Submitted</p>
                      <p className="text-xs text-slate-500">Jan 18, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600"
                      aria-hidden="true"
                    >
                      &#10003;
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Team Lead Approved</p>
                      <p className="text-xs text-slate-500">Jan 19, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600"
                      aria-hidden="true"
                    >
                      &#9201;
                    </div>
                    <div>
                      <p className="text-sm font-medium text-amber-700">HR Approval Pending</p>
                      <p className="text-xs text-slate-500">Your action needed</p>
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
