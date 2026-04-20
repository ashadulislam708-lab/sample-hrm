import { useState } from 'react';

import { Link } from 'react-router';

import EmptyState from '~/components/atoms/EmptyState';

interface LoanRow {
  id: string;
  employee: string;
  amount: string;
  purpose: string;
  requestDate: string;
  repayment: string;
  status: string;
}

export default function LoanManagement() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [dateRange, setDateRange] = useState('');

  const loans: LoanRow[] = [];

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="admin-loan-management-page"
    >
      <div className="max-w-[1400px] mx-auto p-8 space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Loan Management</h1>
            <p className="text-sm text-slate-500 mt-1">
              Approve loans and track repayments across the organization.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button data-testid="admin-loan-management-export-btn"
              type="button"
              onClick={() => {
                /* export */
              }}
              className="h-10 px-4 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all inline-flex items-center justify-center cursor-pointer"
            >
              Export
            </button>
            <button data-testid="admin-loan-management-new-btn"
              type="button"
              onClick={() => {
                /* new loan */
              }}
              className="h-10 px-4 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all inline-flex items-center justify-center cursor-pointer"
            >
              + New Loan
            </button>
          </div>
        </header>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input data-testid="admin-loan-management-input-search-1"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by employee..."
            className="h-10 px-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          />
          <select data-testid="admin-loan-management-status-filter"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-10 px-3 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
          <input data-testid="admin-loan-management-input-date-2"
            type="date"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="h-10 px-3 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {loans.length === 0 ? (
            <EmptyState
              title="No loan applications"
              description="Loan requests will appear here once employees apply."
              testId="admin-loan-management-empty"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-left font-medium">
                  <tr>
                    <th className="px-6 py-3">Employee</th>
                    <th className="px-6 py-3">Amount</th>
                    <th className="px-6 py-3">Purpose</th>
                    <th className="px-6 py-3">Request Date</th>
                    <th className="px-6 py-3">Repayment</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loans.map((l) => (
                    <tr
                      key={l.id}
                      className="hover:bg-slate-50/60 transition-colors"
                      data-testid={`admin-loan-management-row-${l.id}`}
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">{l.employee}</td>
                      <td className="px-6 py-4 text-slate-700">{l.amount}</td>
                      <td className="px-6 py-4 text-slate-700">{l.purpose}</td>
                      <td className="px-6 py-4 text-slate-500">{l.requestDate}</td>
                      <td className="px-6 py-4 text-slate-500">{l.repayment}</td>
                      <td className="px-6 py-4">{l.status}</td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          to={`/admin/loans/${l.id}`}
                          className="text-xs font-medium text-blue-600 hover:text-blue-700"
                          data-testid={`admin-loan-management-view-${l.id}-link`}
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
