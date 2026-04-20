import { Link } from 'react-router';

export default function SalaryBreakdown() {
  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="salary-breakdown-page"
    >
      <div className="max-w-5xl mx-auto p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-4">
          <Link
            to="/employee/salary"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
            data-testid="salary-breakdown-back-link"
          >
            <span aria-hidden="true">&larr;</span>
            Back to Salary
          </Link>
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Salary Breakdown
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Detailed composition of your current monthly salary.
          </p>
        </div>

        <div
          className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-8 text-white shadow-lg"
          data-testid="salary-breakdown-total-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-2">Monthly Net Pay</p>
              <h2 className="text-4xl font-bold tracking-tight">$7,500.00</h2>
              <p className="text-blue-100 text-sm mt-2">Effective from Jan 2025</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-blue-100 mb-1">Annual Package</p>
              <p className="text-xl font-semibold">$90,000.00</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Earnings</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left pb-3 font-medium text-slate-500 text-xs uppercase">
                  Component
                </th>
                <th className="text-right pb-3 font-medium text-slate-500 text-xs uppercase">
                  Monthly
                </th>
                <th className="text-right pb-3 font-medium text-slate-500 text-xs uppercase">
                  Annual
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 text-slate-600">Base Salary</td>
                <td className="py-3 text-right text-slate-900 font-medium">$6,500.00</td>
                <td className="py-3 text-right text-slate-600">$78,000.00</td>
              </tr>
              <tr>
                <td className="py-3 text-slate-600">House Rent Allowance</td>
                <td className="py-3 text-right text-slate-900 font-medium">$1,000.00</td>
                <td className="py-3 text-right text-slate-600">$12,000.00</td>
              </tr>
              <tr>
                <td className="py-3 text-slate-600">Transport Allowance</td>
                <td className="py-3 text-right text-slate-900 font-medium">$300.00</td>
                <td className="py-3 text-right text-slate-600">$3,600.00</td>
              </tr>
              <tr>
                <td className="py-3 text-slate-600">Performance Bonus</td>
                <td className="py-3 text-right text-slate-900 font-medium">$200.00</td>
                <td className="py-3 text-right text-slate-600">$2,400.00</td>
              </tr>
              <tr className="border-t-2 border-slate-200">
                <td className="pt-3 font-semibold text-slate-900">Total Earnings</td>
                <td className="pt-3 text-right font-semibold text-emerald-600">$8,000.00</td>
                <td className="pt-3 text-right font-semibold text-emerald-600">$96,000.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Deductions</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left pb-3 font-medium text-slate-500 text-xs uppercase">
                  Item
                </th>
                <th className="text-right pb-3 font-medium text-slate-500 text-xs uppercase">
                  Monthly
                </th>
                <th className="text-right pb-3 font-medium text-slate-500 text-xs uppercase">
                  Annual
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 text-slate-600">Income Tax</td>
                <td className="py-3 text-right text-slate-900 font-medium">$400.00</td>
                <td className="py-3 text-right text-slate-600">$4,800.00</td>
              </tr>
              <tr>
                <td className="py-3 text-slate-600">Provident Fund</td>
                <td className="py-3 text-right text-slate-900 font-medium">$100.00</td>
                <td className="py-3 text-right text-slate-600">$1,200.00</td>
              </tr>
              <tr className="border-t-2 border-slate-200">
                <td className="pt-3 font-semibold text-slate-900">Total Deductions</td>
                <td className="pt-3 text-right font-semibold text-rose-600">$500.00</td>
                <td className="pt-3 text-right font-semibold text-rose-600">$6,000.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <button data-testid="salary-breakdown-download-btn"
            type="button"
            onClick={() => {
              /* download pdf */
            }}
            className="h-11 px-5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            Download Breakdown PDF
          </button>
        </div>
      </div>
    </div>
  );
}
