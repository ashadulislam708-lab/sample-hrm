import { useState } from 'react';

import { Link } from 'react-router';

import EmptyState from '~/components/atoms/EmptyState';

interface PayrollRow {
  id: string;
  employee: string;
  basic: string;
  allowances: string;
  deductions: string;
  bonus: string;
  net: string;
  status: string;
}

export default function PayrollManagement() {
  const [month, setMonth] = useState('');
  const [department, setDepartment] = useState('all');
  const [status, setStatus] = useState('all');

  const rows: PayrollRow[] = [];

  const handleRunPayroll = () => {
    // TODO: wire to run-payroll API in Phase 7 integration
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="admin-payroll-management-page"
    >
      <div className="max-w-[1400px] mx-auto p-8 space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Payroll Management</h1>
            <p className="text-sm text-slate-500 mt-1">
              Run monthly payroll, view payslips, and export reports.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button data-testid="admin-payroll-management-export-btn"
              type="button"
              onClick={() => {
                /* export */
              }}
              className="h-10 px-4 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all inline-flex items-center justify-center cursor-pointer"
            >
              Export
            </button>
            <Link
              to="/admin/payroll/salary-config"
              className="h-10 px-4 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all inline-flex items-center justify-center"
              data-testid="admin-payroll-management-salary-config-link"
            >
              Salary Configuration
            </Link>
            <button data-testid="admin-payroll-management-run-btn"
              type="button"
              onClick={handleRunPayroll}
              className="h-10 px-4 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all inline-flex items-center justify-center cursor-pointer"
            >
              Run Payroll
            </button>
          </div>
        </header>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input data-testid="admin-payroll-management-input-month-1"
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="h-10 px-3 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          />
          <select data-testid="admin-payroll-management-department-filter"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="h-10 px-3 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          >
            <option value="all">All Departments</option>
            <option value="engineering">Engineering</option>
            <option value="product">Product</option>
            <option value="design">Design</option>
          </select>
          <select data-testid="admin-payroll-management-status-filter"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-10 px-3 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          >
            <option value="all">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="approved">Approved</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {rows.length === 0 ? (
            <EmptyState
              title="No payroll runs"
              description="Run payroll for a selected month to see records."
              testId="admin-payroll-management-empty"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-left font-medium">
                  <tr>
                    <th className="px-6 py-3">Employee</th>
                    <th className="px-6 py-3 text-right">Basic Salary</th>
                    <th className="px-6 py-3 text-right">Allowances</th>
                    <th className="px-6 py-3 text-right">Deductions</th>
                    <th className="px-6 py-3 text-right">Bonus</th>
                    <th className="px-6 py-3 text-right">Net Salary</th>
                    <th className="px-6 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rows.map((r) => (
                    <tr
                      key={r.id}
                      className="hover:bg-slate-50/60 transition-colors"
                      data-testid={`admin-payroll-management-row-${r.id}`}
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">{r.employee}</td>
                      <td className="px-6 py-4 text-right text-slate-700">{r.basic}</td>
                      <td className="px-6 py-4 text-right text-slate-700">{r.allowances}</td>
                      <td className="px-6 py-4 text-right text-slate-700">{r.deductions}</td>
                      <td className="px-6 py-4 text-right text-slate-700">{r.bonus}</td>
                      <td className="px-6 py-4 text-right font-semibold text-slate-900">
                        {r.net}
                      </td>
                      <td className="px-6 py-4 text-center text-slate-700">{r.status}</td>
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
