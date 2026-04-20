import { Link } from 'react-router';

import EmptyState from '~/components/atoms/EmptyState';

export default function SalaryMain() {
  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="salary-main-page"
    >
      <div className="max-w-[1400px] mx-auto p-8 space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">
              Salary &amp; Payroll
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              View your salary information, payslips, and tax documents.
            </p>
          </div>
          <Link
            to="/employee/salary/breakdown"
            className="h-11 px-5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm flex items-center gap-2"
            data-testid="salary-main-breakdown-link"
          >
            View Salary Breakdown
          </Link>
        </header>

        <div
          className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-8 text-white shadow-lg"
          data-testid="salary-main-summary-card"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-blue-100 text-sm mb-2">Current Monthly Salary</p>
              <h2 className="text-4xl font-bold tracking-tight">$7,500.00</h2>
              <p className="text-blue-100 text-sm mt-2">Net pay after deductions</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-blue-100 mb-1">YTD Earnings</p>
                <p className="text-xl font-semibold">$90,000.00</p>
              </div>
              <div>
                <p className="text-xs text-blue-100 mb-1">Next Payday</p>
                <p className="text-xl font-semibold">Jan 31, 2025</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              Base Salary
            </p>
            <p className="text-2xl font-semibold text-slate-900">$8,000.00</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              Total Bonuses
            </p>
            <p className="text-2xl font-semibold text-emerald-600">$1,200.00</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              Total Deductions
            </p>
            <p className="text-2xl font-semibold text-rose-600">$1,700.00</p>
          </div>
        </div>

        <section className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 tracking-tight">Payslip History</h2>
            <select data-testid="salary-main-year-filter"
              className="h-9 px-3 pr-8 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 shadow-sm"
              defaultValue="2025"
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
          <div className="p-8">
            <EmptyState
              title="No payslips available yet"
              description="Payslips will appear here after each monthly payroll run."
              testId="salary-main-payslips-empty"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
