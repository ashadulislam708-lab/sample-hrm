import { useState } from 'react';

import { Link } from 'react-router';

import EmptyState from '~/components/atoms/EmptyState';

interface LeaveRow {
  id: string;
  employee: string;
  leaveType: string;
  duration: string;
  dateRange: string;
  returnDate: string;
  reason: string;
  status: string;
  approvedBy: string;
}

export default function LeaveManagement() {
  const [search, setSearch] = useState('');
  const [leaveType, setLeaveType] = useState('all');
  const [status, setStatus] = useState('all');
  const [dateRange, setDateRange] = useState('');

  const requests: LeaveRow[] = [];

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="admin-leave-management-page"
    >
      <div className="max-w-[1400px] mx-auto p-8 space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Leave Management</h1>
            <p className="text-sm text-slate-500 mt-1">
              Review and approve leave requests across the organization.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button data-testid="admin-leave-management-export-btn"
              type="button"
              onClick={() => {
                /* export */
              }}
              className="h-10 px-4 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all inline-flex items-center justify-center cursor-pointer"
            >
              Export
            </button>
            <Link
              to="/admin/leave/new"
              className="h-10 px-4 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all inline-flex items-center justify-center"
              data-testid="admin-leave-management-create-link"
            >
              + Create Leave Request
            </Link>
          </div>
        </header>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 grid grid-cols-1 md:grid-cols-4 gap-4">
          <input data-testid="admin-leave-management-input-search-1"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by employee..."
            className="h-10 px-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          />
          <select data-testid="admin-leave-management-type-filter"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="h-10 px-3 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          >
            <option value="all">All Types</option>
            <option value="casual">Casual</option>
            <option value="sick">Sick</option>
            <option value="emergency">Emergency</option>
            <option value="half_day">Half Day</option>
          </select>
          <select data-testid="admin-leave-management-status-filter"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-10 px-3 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <input data-testid="admin-leave-management-input-date-2"
            type="date"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="h-10 px-3 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {requests.length === 0 ? (
            <EmptyState
              title="No leave requests"
              description="Leave requests from employees will appear here."
              testId="admin-leave-management-empty"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-left font-medium">
                  <tr>
                    <th className="px-6 py-3">Employee</th>
                    <th className="px-6 py-3">Leave Type</th>
                    <th className="px-6 py-3">Duration</th>
                    <th className="px-6 py-3">Date Range</th>
                    <th className="px-6 py-3">Return Date</th>
                    <th className="px-6 py-3 max-w-[200px]">Reason</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Approved By</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {requests.map((r) => (
                    <tr
                      key={r.id}
                      className="hover:bg-slate-50/60 transition-colors"
                      data-testid={`admin-leave-management-row-${r.id}`}
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">{r.employee}</td>
                      <td className="px-6 py-4 text-slate-700">{r.leaveType}</td>
                      <td className="px-6 py-4 text-slate-700">{r.duration}</td>
                      <td className="px-6 py-4 text-slate-500">{r.dateRange}</td>
                      <td className="px-6 py-4 text-slate-500">{r.returnDate}</td>
                      <td className="px-6 py-4 text-slate-500 max-w-[200px] truncate">
                        {r.reason}
                      </td>
                      <td className="px-6 py-4">{r.status}</td>
                      <td className="px-6 py-4 text-slate-500">{r.approvedBy}</td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          to={`/admin/leave/${r.id}`}
                          className="text-xs font-medium text-blue-600 hover:text-blue-700"
                          data-testid={`admin-leave-management-view-${r.id}-link`}
                        >
                          View
                        </Link>
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
