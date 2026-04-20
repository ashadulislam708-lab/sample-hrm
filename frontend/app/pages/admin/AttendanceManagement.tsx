import { useState } from 'react';

import EmptyState from '~/components/atoms/EmptyState';

interface AttendanceRow {
  id: string;
  employee: string;
  date: string;
  department: string;
  clockIn: string;
  source: string;
  status: string;
}

export default function AttendanceManagement() {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('all');
  const [dateRange, setDateRange] = useState('');
  const [status, setStatus] = useState('all');

  const records: AttendanceRow[] = [];

  const handleDecision = (_id: string, _decision: 'approve' | 'reject') => {
    // TODO: wire to attendance decision API in Phase 7 integration
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="admin-attendance-management-page"
    >
      <div className="max-w-[1400px] mx-auto p-8 space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Attendance Management
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Track and review organization-wide attendance.
            </p>
          </div>
          <button data-testid="admin-attendance-management-export-btn"
            type="button"
            onClick={() => {
              /* export CSV */
            }}
            className="h-10 px-4 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all inline-flex items-center justify-center cursor-pointer"
          >
            Export CSV
          </button>
        </header>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 grid grid-cols-1 md:grid-cols-4 gap-4">
          <input data-testid="admin-attendance-management-input-search-1"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by employee..."
            className="h-10 px-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          />
          <select data-testid="admin-attendance-management-department-filter"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="h-10 px-3 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          >
            <option value="all">All Departments</option>
            <option value="engineering">Engineering</option>
            <option value="product">Product</option>
            <option value="design">Design</option>
          </select>
          <input data-testid="admin-attendance-management-input-date-2"
            type="date"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="h-10 px-3 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          />
          <select data-testid="admin-attendance-management-status-filter"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-10 px-3 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          >
            <option value="all">All Statuses</option>
            <option value="on_time">On Time</option>
            <option value="late_grace">Late (Grace)</option>
            <option value="late">Late</option>
            <option value="absent">Absent</option>
          </select>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {records.length === 0 ? (
            <EmptyState
              title="No attendance records"
              description="Records will appear here once employees clock in."
              testId="admin-attendance-management-empty"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-left font-medium">
                  <tr>
                    <th className="px-6 py-3">Employee</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Department</th>
                    <th className="px-6 py-3">Clock In</th>
                    <th className="px-6 py-3">Source</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {records.map((r) => (
                    <tr
                      key={r.id}
                      className="hover:bg-slate-50/60 transition-colors"
                      data-testid={`admin-attendance-management-row-${r.id}`}
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">{r.employee}</td>
                      <td className="px-6 py-4 text-slate-500">{r.date}</td>
                      <td className="px-6 py-4 text-slate-700">{r.department}</td>
                      <td className="px-6 py-4 text-slate-700">{r.clockIn}</td>
                      <td className="px-6 py-4 text-slate-500">{r.source}</td>
                      <td className="px-6 py-4">{r.status}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button data-testid={`admin-attendance-management-approve-${r.id}-btn`}
                            type="button"
                            onClick={() => handleDecision(r.id, 'approve')}
                            className="text-xs font-medium text-green-600 hover:text-green-700 cursor-pointer"
                          >
                            Approve
                          </button>
                          <button data-testid={`admin-attendance-management-reject-${r.id}-btn`}
                            type="button"
                            onClick={() => handleDecision(r.id, 'reject')}
                            className="text-xs font-medium text-red-600 hover:text-red-700 cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
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
