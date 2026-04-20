import EmptyState from '~/components/atoms/EmptyState';

interface EmergencyCard {
  id: string;
  name: string;
  role: string;
  reason: string;
  startedAt: string;
  initials: string;
}

export default function EmergencyLeaveDashboard() {
  const active: EmergencyCard[] = [];

  const handleAction = (_id: string, _action: 'contact' | 'approve-coverage' | 'handled') => {
    // TODO: wire to emergency action API in Phase 7 integration
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="admin-emergency-leave-dashboard-page"
    >
      <div className="max-w-[1400px] mx-auto p-8 space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Active Emergency Leaves
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Live alerts for teammates currently on emergency leave.
            </p>
          </div>
          <div
            className="inline-flex items-center gap-2 text-xs font-medium bg-red-50 text-red-700 border border-red-100 px-3 py-1.5 rounded-full"
            data-testid="admin-emergency-leave-dashboard-live-badge"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"
              aria-hidden="true"
            ></span>
            Live
          </div>
        </header>

        {active.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <EmptyState
              title="No active emergency leaves"
              description="Active emergency leave threads will appear here when teammates submit them."
              testId="admin-emergency-leave-dashboard-empty"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {active.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
                data-testid={`admin-emergency-leave-dashboard-card-${c.id}`}
              >
                <div className="p-5 flex items-center gap-4 border-b border-slate-100">
                  <div
                    className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-semibold"
                    aria-hidden="true"
                  >
                    {c.initials}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{c.name}</h3>
                    <p className="text-xs text-slate-500">{c.role}</p>
                  </div>
                </div>
                <div className="p-5 space-y-3 flex-1">
                  <p className="text-sm text-slate-700 leading-relaxed">{c.reason}</p>
                  <p className="text-xs text-slate-500">Started: {c.startedAt}</p>
                </div>
                <div className="p-5 border-t border-slate-100 flex items-center gap-2">
                  <button data-testid={`admin-emergency-leave-dashboard-contact-${c.id}-btn`}
                    type="button"
                    onClick={() => handleAction(c.id, 'contact')}
                    className="flex-1 h-9 rounded-lg text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all cursor-pointer"
                  >
                    Contact
                  </button>
                  <button data-testid={`admin-emergency-leave-dashboard-approve-coverage-${c.id}-btn`}
                    type="button"
                    onClick={() => handleAction(c.id, 'approve-coverage')}
                    className="flex-1 h-9 rounded-lg text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 transition-all cursor-pointer"
                  >
                    Approve Coverage
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAction(c.id, 'handled')}
                    className="flex-1 h-9 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
                    data-testid={`admin-emergency-leave-dashboard-handled-${c.id}-btn`}
                  >
                    Mark Handled
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
