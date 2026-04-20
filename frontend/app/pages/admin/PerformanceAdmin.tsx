import { useState } from 'react';

import EmptyState from '~/components/atoms/EmptyState';

interface ReviewCycle {
  id: string;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  participants: number;
}

type PerfTab = 'cycles' | 'goals' | 'metrics';

export default function PerformanceAdmin() {
  const [activeTab, setActiveTab] = useState<PerfTab>('cycles');
  const cycles: ReviewCycle[] = [];

  const tabClass = (t: PerfTab) =>
    activeTab === t
      ? 'py-3 border-b-2 border-blue-600 text-blue-600 text-sm font-medium cursor-pointer'
      : 'py-3 border-b-2 border-transparent text-slate-500 hover:text-slate-700 text-sm font-medium cursor-pointer';

  const handleCreateCycle = () => {
    // TODO: wire to create-review-cycle API in Phase 7 integration
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="admin-performance-page"
    >
      <div className="max-w-[1400px] mx-auto p-8 space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Performance Management
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage review cycles, goals, and custom metrics.
            </p>
          </div>
          <button data-testid="admin-performance-create-cycle-btn"
            type="button"
            onClick={handleCreateCycle}
            className="h-10 px-4 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            + New Review Cycle
          </button>
        </header>

        <div className="border-b border-slate-200">
          <nav className="flex items-center gap-8">
            <button data-testid="admin-performance-tab-cycles"
              type="button"
              onClick={() => setActiveTab('cycles')}
              className={tabClass('cycles')}
            >
              Review Cycles
            </button>
            <button data-testid="admin-performance-tab-goals"
              type="button"
              onClick={() => setActiveTab('goals')}
              className={tabClass('goals')}
            >
              Goals
            </button>
            <button data-testid="admin-performance-tab-metrics"
              type="button"
              onClick={() => setActiveTab('metrics')}
              className={tabClass('metrics')}
            >
              Custom Metrics
            </button>
          </nav>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {cycles.length === 0 ? (
            <EmptyState
              title="No review cycles yet"
              description="Create a review cycle to start collecting performance data."
              testId="admin-performance-empty"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-left font-medium">
                  <tr>
                    <th className="px-6 py-3">Cycle</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Start</th>
                    <th className="px-6 py-3">End</th>
                    <th className="px-6 py-3">Participants</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {cycles.map((c) => (
                    <tr
                      key={c.id}
                      className="hover:bg-slate-50/60 transition-colors"
                      data-testid={`admin-performance-cycle-row-${c.id}`}
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">{c.name}</td>
                      <td className="px-6 py-4 text-slate-700">{c.status}</td>
                      <td className="px-6 py-4 text-slate-500">{c.startDate}</td>
                      <td className="px-6 py-4 text-slate-500">{c.endDate}</td>
                      <td className="px-6 py-4 text-slate-700">{c.participants}</td>
                      <td className="px-6 py-4 text-right">
                        <button data-testid={`admin-performance-cycle-manage-${c.id}-btn`}
                          type="button"
                          onClick={() => {
                            /* manage cycle */
                          }}
                          className="text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
