import { useState } from 'react';

import { Link } from 'react-router';

import EmptyState from '~/components/atoms/EmptyState';

type TabFilter = 'all' | 'pending' | 'approved' | 'rejected';

export default function LeaveMain() {
  const [activeTab, setActiveTab] = useState<TabFilter>('all');

  return (
    <div className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600" data-testid="leave-main-page">
      <div className="max-w-[1400px] mx-auto w-full p-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">
              Leave Management
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your leave requests and check your remaining balance.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/employee/leave/apply-emergency"
              className="h-11 px-5 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-all shadow-sm flex items-center gap-2"
              data-testid="leave-main-apply-emergency-link"
            >
              Apply Emergency Leave
            </Link>
            <Link
              to="/employee/leave/apply"
              className="h-11 px-5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm flex items-center gap-2"
              data-testid="leave-main-apply-link"
            >
              Apply Leave
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div
            className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between h-40 relative overflow-hidden"
            data-testid="leave-main-casual-card"
          >
            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600"
                  aria-hidden="true"
                >
                  CL
                </div>
                <span className="text-sm font-medium text-slate-600">Casual Leave</span>
              </div>
            </div>
            <div className="relative z-10">
              <div className="flex items-end gap-2 mb-3">
                <h3 className="text-2xl font-semibold text-slate-900 tracking-tight">
                  8 <span className="text-lg text-slate-400 font-normal">/ 12 days available</span>
                </h3>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full"
                  style={{ width: '66%' }}
                  aria-hidden="true"
                ></div>
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between h-40 relative overflow-hidden"
            data-testid="leave-main-sick-card"
          >
            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600"
                  aria-hidden="true"
                >
                  SL
                </div>
                <span className="text-sm font-medium text-slate-600">Sick Leave</span>
              </div>
            </div>
            <div className="relative z-10">
              <div className="flex items-end gap-2 mb-3">
                <h3 className="text-2xl font-semibold text-slate-900 tracking-tight">
                  5 <span className="text-lg text-slate-400 font-normal">/ 7 days available</span>
                </h3>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-rose-500 h-2 rounded-full"
                  style={{ width: '71%' }}
                  aria-hidden="true"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <section className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-slate-900 tracking-tight">Leave History</h2>
            <div className="flex bg-slate-100 p-1 rounded-lg self-start">
              {(['all', 'pending', 'approved', 'rejected'] as TabFilter[]).map((tab) => (
                <button data-testid={`leave-main-tab-${tab}`}
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 text-xs font-medium transition-all rounded-md capitalize cursor-pointer ${
                    activeTab === tab
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {tab === 'all' ? 'All' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="p-8">
            <EmptyState
              title="No leave requests yet"
              description="Your leave history will appear here once you submit a request."
              testId="leave-main-history-empty"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
