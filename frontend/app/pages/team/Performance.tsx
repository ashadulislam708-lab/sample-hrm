import EmptyState from '~/components/atoms/EmptyState';

export default function Performance() {
  // All content sourced from Redux in Phase 7. Until then, show empty placeholders.
  const memberGoals: Array<{
    id: string;
    initials: string;
    name: string;
    role: string;
    progress: number;
    active: number;
    completed: number;
  }> = [];

  const dailyNotesRows: Array<{
    id: string;
    initials: string;
    name: string;
    m: boolean;
    t: boolean;
    w: boolean;
    th: boolean;
    f: boolean;
  }> = [];

  const evaluations: Array<{
    id: string;
    title: string;
    date: string;
    rating: number;
    memberInitials: string[];
  }> = [];

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="team-performance-page"
    >
      <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Team Performance</h1>
            <p className="text-sm text-slate-500 mt-1">
              Track goals, daily progress, and project evaluations.
            </p>
          </div>
          <button data-testid="team-performance-set-goals-btn"
            type="button"
            onClick={() => {
              /* set goals — wired in Phase 7 */
            }}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm cursor-pointer"
          >
            Set Goals
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Goals Overview */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900 tracking-tight flex items-center gap-2">
                Team Goals
              </h2>
              <button data-testid="team-performance-goals-view-all-btn"
                type="button"
                onClick={() => {
                  /* view all goals — wired in Phase 7 */
                }}
                className="text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="p-5 space-y-6 flex-1">
              {memberGoals.length === 0 ? (
                <EmptyState
                  title="No goals set"
                  description="Set team goals to start tracking progress."
                  testId="team-performance-goals-empty"
                />
              ) : (
                memberGoals.map((g) => (
                  <div
                    key={g.id}
                    className="flex items-center gap-4"
                    data-testid={`team-performance-goal-${g.id}`}
                  >
                    <div
                      className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0"
                      aria-hidden="true"
                    >
                      {g.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-sm font-semibold text-slate-900">{g.name}</h3>
                        <span className="text-xs font-semibold text-green-500">{g.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 mb-1.5 overflow-hidden">
                        <div
                          className="bg-green-500 h-1.5 rounded-full"
                          style={{ width: `${g.progress}%` }}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-slate-500">
                          {g.role} &bull; {g.active} active, {g.completed} completed
                        </p>
                        <button data-testid={`team-performance-review-${g.id}-btn`}
                          type="button"
                          onClick={() => {
                            /* review — wired in Phase 7 */
                          }}
                          className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                        >
                          Review
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex justify-center">
              <button data-testid="team-performance-show-all-members-btn"
                type="button"
                onClick={() => {
                  /* show all members — wired in Phase 7 */
                }}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer"
              >
                Show All Members
              </button>
            </div>
          </section>

          {/* Daily Notes */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-900 tracking-tight flex items-center gap-2">
                  Daily Notes Submission
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Team average:{' '}
                  <span className="text-green-600 font-medium">85%</span> submission rate this week
                </p>
              </div>
              <div className="flex gap-1">
                <button data-testid="team-performance-notes-prev-btn"
                  type="button"
                  onClick={() => {
                    /* prev week — wired in Phase 7 */
                  }}
                  aria-label="Previous week"
                  className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <span aria-hidden="true">&larr;</span>
                </button>
                <button data-testid="team-performance-notes-next-btn"
                  type="button"
                  onClick={() => {
                    /* next week — wired in Phase 7 */
                  }}
                  aria-label="Next week"
                  className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </div>

            {dailyNotesRows.length === 0 ? (
              <div className="p-5">
                <EmptyState
                  title="No daily notes this week"
                  description="Daily notes submissions will appear here once recorded."
                  testId="team-performance-notes-empty"
                />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
                    <tr>
                      <th className="px-5 py-3 w-1/3">Member</th>
                      <th className="px-2 py-3 text-center">M</th>
                      <th className="px-2 py-3 text-center">T</th>
                      <th className="px-2 py-3 text-center">W</th>
                      <th className="px-2 py-3 text-center">T</th>
                      <th className="px-2 py-3 text-center">F</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {dailyNotesRows.map((row) => (
                      <tr key={row.id} data-testid={`team-performance-notes-row-${row.id}`}>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center"
                              aria-hidden="true"
                            >
                              {row.initials}
                            </div>
                            <span className="font-medium text-slate-900 text-xs">{row.name}</span>
                          </div>
                        </td>
                        <td className="px-2 py-3 text-center">{row.m ? 'ok' : '-'}</td>
                        <td className="px-2 py-3 text-center">{row.t ? 'ok' : '-'}</td>
                        <td className="px-2 py-3 text-center">{row.w ? 'ok' : '-'}</td>
                        <td className="px-2 py-3 text-center">{row.th ? 'ok' : '-'}</td>
                        <td className="px-2 py-3 text-center">{row.f ? 'ok' : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>

        {/* Project Evaluations */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Project Evaluations</h2>
            <button data-testid="team-performance-evaluate-btn"
              type="button"
              onClick={() => {
                /* evaluate team — wired in Phase 7 */
              }}
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm cursor-pointer"
            >
              Evaluate Team
            </button>
          </div>

          {evaluations.length === 0 ? (
            <EmptyState
              title="No project evaluations yet"
              description="Evaluate team projects to build a performance record."
              testId="team-performance-evaluations-empty"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {evaluations.map((ev) => (
                <div
                  key={ev.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-shadow"
                  data-testid={`team-performance-eval-${ev.id}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-semibold"
                      aria-hidden="true"
                    >
                      PR
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-slate-50 text-slate-500">
                      {ev.date}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-1">{ev.title}</h3>
                  <div className="flex items-center gap-1 mb-4">
                    <span className="text-xs font-semibold text-slate-600 ml-1">
                      {ev.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex -space-x-2">
                      {ev.memberInitials.map((initials, idx) => (
                        <div
                          key={`${ev.id}-${idx}`}
                          className="w-6 h-6 rounded-full bg-indigo-100 border-2 border-white text-[10px] flex items-center justify-center text-indigo-700 font-bold"
                          aria-hidden="true"
                        >
                          {initials}
                        </div>
                      ))}
                    </div>
                    <button data-testid={`team-performance-eval-${ev.id}-details-btn`}
                      type="button"
                      onClick={() => {
                        /* view evaluation detail — wired in Phase 7 */
                      }}
                      className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
