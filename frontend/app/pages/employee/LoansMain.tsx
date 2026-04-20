import { Link } from 'react-router';

import EmptyState from '~/components/atoms/EmptyState';

export default function LoansMain() {
  return (
    <div className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600" data-testid="loans-main-page">
      <div className="max-w-[1400px] mx-auto p-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
              <span>Salary</span>
              <span aria-hidden="true">&rsaquo;</span>
              <span className="text-slate-900 font-medium">Loans</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Loans Management</h1>
          </div>
          <Link
            to="/employee/loans/apply"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-all"
            data-testid="loans-main-apply-link"
          >
            Apply for Salary Loan
          </Link>
        </div>

        <div
          className="bg-white rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-blue-600 overflow-hidden"
          data-testid="loans-main-active-card"
        >
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  Active Loan
                </h3>
                <p className="text-sm text-slate-500 mt-1">Home Renovation Advance</p>
              </div>
              <span
                className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-medium"
                data-testid="loans-main-active-badge"
              >
                Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                  Loan Amount
                </p>
                <p className="text-xl font-semibold text-slate-900">$5,000.00</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                  Outstanding Balance
                </p>
                <p className="text-xl font-semibold text-blue-600">$2,500.00</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                  Monthly Installment
                </p>
                <p className="text-xl font-semibold text-slate-900">$500.00</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                  Next Payment Date
                </p>
                <p className="text-xl font-semibold text-slate-900">Jan 28, 2026</p>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-end mb-2 text-sm">
                <div>
                  <span className="font-medium text-slate-700">Repayment Progress</span>
                  <span className="text-slate-400 mx-2">&bull;</span>
                  <span className="text-slate-500">5 installments remaining</span>
                </div>
                <span className="font-semibold text-blue-600">50%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: '50%' }}
                  aria-hidden="true"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 tracking-tight">Loan History</h2>
            <div className="flex gap-2">
              <input data-testid="loans-main-search-input"
                type="text"
                placeholder="Search loans..."
                className="pl-3 pr-4 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-64 placeholder-slate-400 text-slate-600"
              />
            </div>
          </div>
          <div className="p-8">
            <EmptyState
              title="No loan history yet"
              description="Your past loans will appear here after you apply."
              testId="loans-main-history-empty"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
