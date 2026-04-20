import { useState } from 'react';

import EmptyState from '~/components/atoms/EmptyState';

type NotifFilter = 'all' | 'unread' | 'read';

export default function Notifications() {
  const [filter, setFilter] = useState<NotifFilter>('all');

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="notifications-page"
    >
      <div className="max-w-4xl mx-auto p-6 md:p-8 space-y-6">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Notifications
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Stay up to date with the latest activity relevant to you.
            </p>
          </div>
          <button data-testid="notifications-mark-all-read-btn"
            type="button"
            onClick={() => {
              /* mark all as read */
            }}
            className="h-10 px-4 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all inline-flex items-center justify-center cursor-pointer"
          >
            Mark all as read
          </button>
        </header>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
            {(['all', 'unread', 'read'] as NotifFilter[]).map((key) => (
              <button data-testid={`notifications-filter-${key}`}
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer capitalize ${
                  filter === key
                    ? 'bg-slate-100 text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          <div className="divide-y divide-slate-50">
            <div
              className="p-4 hover:bg-slate-50 transition-colors group"
              data-testid="notifications-item-hr-policy"
            >
              <div className="flex gap-3">
                <span
                  className="mt-1.5 h-2 w-2 rounded-full bg-blue-600 flex-shrink-0"
                  aria-hidden="true"
                ></span>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-slate-900">HR Policy Update</p>
                    <span className="text-[10px] text-slate-400">2m</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    New work-from-home policy has been updated. Please review the document.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="p-4 hover:bg-slate-50 transition-colors group"
              data-testid="notifications-item-team-meeting"
            >
              <div className="flex gap-3">
                <span
                  className="mt-1.5 h-2 w-2 rounded-full bg-blue-600 flex-shrink-0"
                  aria-hidden="true"
                ></span>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-slate-900">Team Meeting</p>
                    <span className="text-[10px] text-slate-400">1h</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Weekly sync with the design team in Conference Room A.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="p-4 hover:bg-slate-50 transition-colors group"
              data-testid="notifications-item-leave-approved"
            >
              <div className="flex gap-3">
                <span
                  className="mt-1.5 h-2 w-2 rounded-full bg-transparent flex-shrink-0"
                  aria-hidden="true"
                ></span>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-slate-700">Leave Approved</p>
                    <span className="text-[10px] text-slate-400">1d</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Your casual leave request for Aug 25th has been approved by Manager.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="p-4 hover:bg-slate-50 transition-colors group"
              data-testid="notifications-item-public-holiday"
            >
              <div className="flex gap-3">
                <span
                  className="mt-1.5 h-2 w-2 rounded-full bg-transparent flex-shrink-0"
                  aria-hidden="true"
                ></span>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-slate-700">Public Holiday</p>
                    <span className="text-[10px] text-slate-400">3d</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Office will remain closed on Monday for Labor Day.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {filter === 'read' ? (
            <div className="p-8">
              <EmptyState
                title="Nothing to show here"
                description="Adjust filters to see other notifications."
                testId="notifications-empty"
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
