import { Link, useParams } from 'react-router';

export default function LeaveRequestDetail() {
  const { id } = useParams<{ id: string }>();

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="leave-request-detail-page"
    >
      <div className="max-w-4xl mx-auto p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-4">
          <Link
            to="/employee/leave"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
            data-testid="leave-request-detail-back-link"
          >
            <span aria-hidden="true">&larr;</span>
            Back to Leave
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100"
                  data-testid="leave-request-detail-status-badge"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-amber-500"
                    aria-hidden="true"
                  ></span>
                  Pending
                </span>
                <span className="text-sm text-slate-500">Casual Leave</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-2">
                Leave Request #{id ?? 'LV-2024-042'}
              </h1>
              <p className="text-sm text-slate-500">
                Requested on November 12, 2023 for 2 working days.
              </p>
            </div>
            <div className="flex gap-2">
              <button data-testid="leave-request-detail-edit-btn"
                type="button"
                onClick={() => {
                  /* edit request */
                }}
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Edit
              </button>
              <button data-testid="leave-request-detail-cancel-btn"
                type="button"
                onClick={() => {
                  /* cancel request */
                }}
                className="px-4 py-2 bg-white border border-red-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                Cancel Request
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              Start Date
            </p>
            <p className="text-lg font-semibold text-slate-900">Nov 15, 2023</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              End Date
            </p>
            <p className="text-lg font-semibold text-slate-900">Nov 16, 2023</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              Duration
            </p>
            <p className="text-lg font-semibold text-slate-900">2 Working Days</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
          <h2 className="text-sm font-semibold text-slate-900 mb-3">Reason</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Family wedding ceremony in hometown. I will ensure all pending tasks are handed off
            before my absence.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
          <h2 className="text-sm font-semibold text-slate-900 mb-4">Approval Timeline</h2>
          <div className="space-y-5">
            <div className="flex gap-4">
              <div
                className="w-8 h-8 rounded-full bg-blue-100 border-2 border-blue-500 text-blue-700 flex items-center justify-center flex-shrink-0 text-xs font-semibold"
                aria-hidden="true"
              >
                S
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Request Submitted</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  By John Doe &bull; Nov 12, 2023 &bull; 10:22 AM
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div
                className="w-8 h-8 rounded-full bg-amber-100 border-2 border-amber-400 text-amber-700 flex items-center justify-center flex-shrink-0 text-xs font-semibold"
                aria-hidden="true"
              >
                P
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Awaiting Manager Approval</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Will be reviewed by your direct supervisor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
