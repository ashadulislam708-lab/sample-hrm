import { useState } from 'react';

import EmptyState from '~/components/atoms/EmptyState';

type ReportType =
  | 'attendance'
  | 'leave'
  | 'payroll'
  | 'directory'
  | 'loan'
  | 'performance'
  | 'headcount'
  | 'daily-notes'
  | 'emergency';

const REPORT_TYPES: { key: ReportType; name: string; description: string }[] = [
  { key: 'attendance', name: 'Attendance Report', description: 'Clock-in / clock-out records.' },
  { key: 'leave', name: 'Leave Report', description: 'Leave balances and requests.' },
  { key: 'payroll', name: 'Payroll Report', description: 'Monthly payroll breakdown.' },
  { key: 'directory', name: 'Employee Directory', description: 'Full employee list.' },
  { key: 'loan', name: 'Loan Report', description: 'Active loans and repayments.' },
  { key: 'performance', name: 'Performance Report', description: 'Review scores and goals.' },
  { key: 'headcount', name: 'Headcount Report', description: 'Department-wise headcount.' },
  { key: 'daily-notes', name: 'Daily Notes Report', description: 'Notion-sourced daily notes.' },
  { key: 'emergency', name: 'Emergency Leave', description: 'Emergency leave history.' },
];

export default function ReportsExport() {
  const [reportType, setReportType] = useState<ReportType>('attendance');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [department, setDepartment] = useState('all');
  const [employeeStatus, setEmployeeStatus] = useState('active');

  const previewRows: Array<Record<string, string>> = [];

  const handleExport = (_format: 'csv' | 'pdf') => {
    // TODO: wire to export API in Phase 7 integration
  };

  const handlePreview = () => {
    // TODO: wire to preview API in Phase 7 integration
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="admin-reports-export-page"
    >
      <div className="max-w-[1400px] mx-auto p-8 space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Reports &amp; Export</h1>
          <p className="text-sm text-slate-500 mt-1">
            Generate and export HR reports in CSV or PDF.
          </p>
        </header>

        <section>
          <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
            Report Type
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {REPORT_TYPES.map((t) => (
              <button data-testid={`admin-reports-export-type-${t.key}-btn`}
                key={t.key}
                type="button"
                onClick={() => setReportType(t.key)}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${reportType === t.key ? 'bg-blue-50 border-blue-600 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'}`}
              >
                <h3 className="text-sm font-semibold text-slate-900">{t.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{t.description}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-900">Configuration</h2>
          </div>
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label htmlFor="start-date" className="block text-sm font-medium text-slate-700">
                Start Date
              </label>
              <input data-testid="admin-reports-export-input-start-date-1"
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="end-date" className="block text-sm font-medium text-slate-700">
                End Date
              </label>
              <input data-testid="admin-reports-export-input-end-date-2"
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="department" className="block text-sm font-medium text-slate-700">
                Department
              </label>
              <select data-testid="admin-reports-export-select-department-1"
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All Departments</option>
                <option value="engineering">Engineering</option>
                <option value="product">Product</option>
                <option value="design">Design</option>
                <option value="hr">HR</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="employee-status"
                className="block text-sm font-medium text-slate-700"
              >
                Employee Status
              </label>
              <select data-testid="admin-reports-export-select-employee-status-2"
                id="employee-status"
                value={employeeStatus}
                onChange={(e) => setEmployeeStatus(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="all">All</option>
                <option value="suspended">Suspended</option>
                <option value="terminated">Terminated</option>
              </select>
            </div>
          </div>
          <div className="px-5 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-2">
            <button data-testid="admin-reports-export-preview-btn"
              type="button"
              onClick={handlePreview}
              className="h-10 px-4 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-all cursor-pointer"
            >
              Preview
            </button>
            <button data-testid="admin-reports-export-csv-btn"
              type="button"
              onClick={() => handleExport('csv')}
              className="h-10 px-4 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer"
            >
              Export CSV
            </button>
            <button data-testid="admin-reports-export-pdf-btn"
              type="button"
              onClick={() => handleExport('pdf')}
              className="h-10 px-4 rounded-lg text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 transition-all cursor-pointer"
            >
              Export PDF
            </button>
          </div>
        </section>

        <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-900">Preview Data</h2>
          </div>
          {previewRows.length === 0 ? (
            <EmptyState
              title="No preview yet"
              description="Run Preview to see data before exporting."
              testId="admin-reports-export-preview-empty"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-left font-medium">
                  <tr>
                    <th className="px-6 py-3 w-1/3">Employee</th>
                    <th className="px-6 py-3">Department</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Check In</th>
                    <th className="px-6 py-3">Check Out</th>
                    <th className="px-6 py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {previewRows.map((r, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50/60 transition-colors"
                      data-testid={`admin-reports-export-preview-row-${idx}`}
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">{r.employee}</td>
                      <td className="px-6 py-4 text-slate-700">{r.department}</td>
                      <td className="px-6 py-4 text-slate-500">{r.date}</td>
                      <td className="px-6 py-4 text-slate-700">{r.checkIn}</td>
                      <td className="px-6 py-4 text-slate-700">{r.checkOut}</td>
                      <td className="px-6 py-4 text-right text-slate-700">{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
