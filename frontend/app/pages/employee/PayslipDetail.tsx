import { Link, useParams } from 'react-router';

export default function PayslipDetail() {
  const { id } = useParams<{ id: string }>();

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="payslip-detail-page"
    >
      <div className="max-w-4xl mx-auto p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-4">
          <Link
            to="/employee/salary"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
            data-testid="payslip-detail-back-link"
          >
            <span aria-hidden="true">&larr;</span>
            Back to Salary
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                Payslip
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Period: December 2024 &bull; Paid on Dec 31, 2024
              </p>
              <p className="text-xs text-slate-400 mt-1">Payslip ID: {id ?? 'PS-2024-12'}</p>
            </div>
            <div className="flex gap-2">
              <button data-testid="payslip-detail-print-btn"
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Print
              </button>
              <button data-testid="payslip-detail-download-btn"
                type="button"
                onClick={() => {
                  /* download pdf */
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors cursor-pointer"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
          <h2 className="text-sm font-semibold text-slate-900 mb-4">Employee Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                Employee
              </p>
              <p className="text-sm font-medium text-slate-900">John Doe (EMP-2024-001)</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                Department
              </p>
              <p className="text-sm font-medium text-slate-900">Design</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                Pay Period
              </p>
              <p className="text-sm font-medium text-slate-900">Dec 1 - Dec 31, 2024</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                Payment Date
              </p>
              <p className="text-sm font-medium text-slate-900">Dec 31, 2024</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Earnings</h3>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 text-slate-600">Base Salary</td>
                  <td className="py-2 text-right text-slate-900 font-medium">$8,000.00</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-600">Project Bonus</td>
                  <td className="py-2 text-right text-slate-900 font-medium">$1,000.00</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-600">Overtime</td>
                  <td className="py-2 text-right text-slate-900 font-medium">$200.00</td>
                </tr>
                <tr className="border-t-2 border-slate-200">
                  <td className="pt-3 font-semibold text-slate-900">Total Earnings</td>
                  <td className="pt-3 text-right font-semibold text-emerald-600">$9,200.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Deductions</h3>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 text-slate-600">Income Tax</td>
                  <td className="py-2 text-right text-slate-900 font-medium">$1,200.00</td>
                </tr>
                <tr>
                  <td className="py-2 text-slate-600">Loan EMI</td>
                  <td className="py-2 text-right text-slate-900 font-medium">$500.00</td>
                </tr>
                <tr className="border-t-2 border-slate-200">
                  <td className="pt-3 font-semibold text-slate-900">Total Deductions</td>
                  <td className="pt-3 text-right font-semibold text-rose-600">$1,700.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-8 text-white shadow-lg flex items-center justify-between"
          data-testid="payslip-detail-net-card"
        >
          <div>
            <p className="text-blue-100 text-sm mb-2">Net Pay</p>
            <h2 className="text-4xl font-bold tracking-tight">$7,500.00</h2>
          </div>
          <div className="text-right">
            <p className="text-xs text-blue-100">Paid to</p>
            <p className="text-sm font-semibold">Acct ****1234</p>
          </div>
        </div>
      </div>
    </div>
  );
}
