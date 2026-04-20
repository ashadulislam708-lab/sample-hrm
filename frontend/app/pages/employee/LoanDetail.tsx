import { Link, useParams } from 'react-router';

export default function LoanDetail() {
  const { id } = useParams<{ id: string }>();

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="loan-detail-page"
    >
      <div className="max-w-[1200px] mx-auto w-full p-8">
        <Link
          to="/employee/loans"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-6 group"
          data-testid="loan-detail-back-link"
        >
          <span aria-hidden="true">&larr;</span>
          Back to Loans
        </Link>

        <header className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 font-semibold">
              $
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                  Personal Loan
                </h1>
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100"
                  data-testid="loan-detail-status-badge"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true"></span>
                  Active
                </span>
              </div>
              <p className="text-sm text-slate-500">Loan ID: #LN-2024-{id ?? '0023'}</p>
            </div>
          </div>
          <button data-testid="loan-detail-download-btn"
            type="button"
            onClick={() => {
              /* download statement — wired in Phase 7 */
            }}
            className="h-10 px-4 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all flex items-center gap-2 cursor-pointer"
          >
            Download Statement
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              Loan Amount
            </p>
            <p className="text-2xl font-semibold text-slate-900">$15,000</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              Outstanding
            </p>
            <p className="text-2xl font-semibold text-violet-600">$9,375</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              Monthly EMI
            </p>
            <p className="text-2xl font-semibold text-slate-900">$625</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              Remaining
            </p>
            <p className="text-2xl font-semibold text-slate-900">
              15 <span className="text-base font-normal text-slate-500">months</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Loan Details</h2>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Loan Type
                    </p>
                    <p className="text-sm font-medium text-slate-900">Personal Loan</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Interest Rate
                    </p>
                    <p className="text-sm font-medium text-slate-900">8.5% p.a.</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Tenure
                    </p>
                    <p className="text-sm font-medium text-slate-900">24 months</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Disbursed Date
                    </p>
                    <p className="text-sm font-medium text-slate-900">March 15, 2024</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      End Date
                    </p>
                    <p className="text-sm font-medium text-slate-900">March 15, 2026</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Purpose
                    </p>
                    <p className="text-sm font-medium text-slate-900">Home Renovation</p>
                  </div>
                </div>
              </div>
            </section>

            <section
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              data-testid="loan-detail-emi-schedule"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-base font-semibold text-slate-900">EMI Schedule</h2>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full bg-green-500"
                      aria-hidden="true"
                    ></span>{' '}
                    Paid
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full bg-amber-500"
                      aria-hidden="true"
                    ></span>{' '}
                    Upcoming
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full bg-slate-300"
                      aria-hidden="true"
                    ></span>{' '}
                    Pending
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-200">
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        EMI #
                      </th>
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Due Date
                      </th>
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Principal
                      </th>
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Interest
                      </th>
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        EMI
                      </th>
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/50">
                      <td className="px-5 py-3 text-sm text-slate-600">1</td>
                      <td className="px-5 py-3 text-sm text-slate-600">Apr 15, 2024</td>
                      <td className="px-5 py-3 text-sm text-slate-900 font-medium">$519</td>
                      <td className="px-5 py-3 text-sm text-slate-600">$106</td>
                      <td className="px-5 py-3 text-sm text-slate-900 font-medium">$625</td>
                      <td className="px-5 py-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                          Paid
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="px-5 py-3 text-sm text-slate-600">2</td>
                      <td className="px-5 py-3 text-sm text-slate-600">May 15, 2024</td>
                      <td className="px-5 py-3 text-sm text-slate-900 font-medium">$523</td>
                      <td className="px-5 py-3 text-sm text-slate-600">$102</td>
                      <td className="px-5 py-3 text-sm text-slate-900 font-medium">$625</td>
                      <td className="px-5 py-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                          Paid
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="px-5 py-3 text-sm text-slate-600">3</td>
                      <td className="px-5 py-3 text-sm text-slate-600">Jun 15, 2024</td>
                      <td className="px-5 py-3 text-sm text-slate-900 font-medium">$527</td>
                      <td className="px-5 py-3 text-sm text-slate-600">$98</td>
                      <td className="px-5 py-3 text-sm text-slate-900 font-medium">$625</td>
                      <td className="px-5 py-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                          Paid
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="px-5 py-3 text-sm text-slate-600">...</td>
                      <td className="px-5 py-3 text-sm text-slate-400" colSpan={5}>
                        8 payments completed
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 bg-amber-50/50">
                      <td className="px-5 py-3 text-sm text-slate-600 font-medium">10</td>
                      <td className="px-5 py-3 text-sm text-amber-700 font-medium">Jan 15, 2025</td>
                      <td className="px-5 py-3 text-sm text-slate-900 font-medium">$548</td>
                      <td className="px-5 py-3 text-sm text-slate-600">$77</td>
                      <td className="px-5 py-3 text-sm text-slate-900 font-medium">$625</td>
                      <td className="px-5 py-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          Due Soon
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="px-5 py-3 text-sm text-slate-400">11</td>
                      <td className="px-5 py-3 text-sm text-slate-400">Feb 15, 2025</td>
                      <td className="px-5 py-3 text-sm text-slate-400">$552</td>
                      <td className="px-5 py-3 text-sm text-slate-400">$73</td>
                      <td className="px-5 py-3 text-sm text-slate-400">$625</td>
                      <td className="px-5 py-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500">
                          Pending
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 border-t border-slate-100 text-center">
                <button data-testid="loan-detail-view-schedule-btn"
                  type="button"
                  onClick={() => {
                    /* view full schedule */
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                >
                  View Full Schedule
                </button>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Repayment Progress</h2>
              </div>
              <div className="p-5">
                <div className="relative pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-600">$5,625 paid</span>
                    <span className="text-xs font-medium text-slate-600">$9,375 remaining</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-violet-500 to-violet-600 h-3 rounded-full"
                      style={{ width: '37.5%' }}
                      aria-hidden="true"
                    ></div>
                  </div>
                  <p className="text-center text-sm font-medium text-slate-900 mt-3">
                    37.5% Complete
                  </p>
                </div>
                <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-green-600">9</p>
                    <p className="text-xs text-slate-500">EMIs Paid</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-slate-400">15</p>
                    <p className="text-xs text-slate-500">EMIs Left</p>
                  </div>
                </div>
              </div>
            </section>

            <section
              className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl p-5 text-white"
              data-testid="loan-detail-next-payment-card"
            >
              <p className="text-violet-100 text-sm mb-1">Next Payment Due</p>
              <p className="text-2xl font-semibold mb-3">January 15, 2025</p>
              <div className="flex items-center justify-between bg-white/10 rounded-lg px-4 py-3">
                <span className="text-sm">EMI Amount</span>
                <span className="text-lg font-semibold">$625</span>
              </div>
              <p className="text-xs text-violet-200 mt-3">Auto-deducted from salary</p>
            </section>

            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Quick Actions</h2>
              </div>
              <div className="p-3 space-y-2">
                <button data-testid="loan-detail-prepayment-btn"
                  type="button"
                  onClick={() => {
                    /* prepayment calc */
                  }}
                  className="w-full h-10 rounded-lg text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Calculate Prepayment
                </button>
                <button data-testid="loan-detail-noc-btn"
                  type="button"
                  onClick={() => {
                    /* request noc */
                  }}
                  className="w-full h-10 rounded-lg text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Request NOC
                </button>
                <button data-testid="loan-detail-contact-hr-btn"
                  type="button"
                  onClick={() => {
                    /* contact hr */
                  }}
                  className="w-full h-10 rounded-lg text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Contact HR
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
