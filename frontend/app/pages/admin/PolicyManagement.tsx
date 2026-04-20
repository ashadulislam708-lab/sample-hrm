import { useState } from 'react';

import EmptyState from '~/components/atoms/EmptyState';

interface PolicyRow {
  id: string;
  title: string;
  category: string;
  status: string;
  lastUpdated: string;
  acknowledgments: string;
}

export default function PolicyManagement() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');

  const policies: PolicyRow[] = [];

  const handleCreate = () => {
    // TODO: wire to create-policy API in Phase 7 integration
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="admin-policy-management-page"
    >
      <div className="max-w-[1400px] mx-auto p-8 space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Policy Management</h1>
            <p className="text-sm text-slate-500 mt-1">
              Create, update, and archive organization policies.
            </p>
          </div>
          <button data-testid="admin-policy-management-create-btn"
            type="button"
            onClick={handleCreate}
            className="h-10 px-4 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            + Create Policy
          </button>
        </header>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input data-testid="admin-policy-management-input-search-1"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search policies..."
            className="h-10 px-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          />
          <select data-testid="admin-policy-management-category-filter"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-10 px-3 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          >
            <option value="all">All Categories</option>
            <option value="hr">HR</option>
            <option value="leave">Leave</option>
            <option value="security">Security</option>
            <option value="workplace">Workplace</option>
          </select>
          <select data-testid="admin-policy-management-status-filter"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-10 px-3 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-900">All Policies</h2>
          </div>
          {policies.length === 0 ? (
            <EmptyState
              title="No policies yet"
              description="Create your first policy to publish to employees."
              testId="admin-policy-management-empty"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-left font-medium">
                  <tr>
                    <th className="px-6 py-3 w-[30%]">Policy Title</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Last Updated</th>
                    <th className="px-6 py-3 w-[20%]">Acknowledgment</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {policies.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-50/60 transition-colors"
                      data-testid={`admin-policy-management-row-${p.id}`}
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">{p.title}</td>
                      <td className="px-6 py-4 text-slate-700">{p.category}</td>
                      <td className="px-6 py-4 text-slate-700">{p.status}</td>
                      <td className="px-6 py-4 text-slate-500">{p.lastUpdated}</td>
                      <td className="px-6 py-4 text-slate-700">{p.acknowledgments}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button data-testid={`admin-policy-management-edit-${p.id}-btn`}
                            type="button"
                            onClick={() => {
                              /* edit */
                            }}
                            className="text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
                          >
                            Edit
                          </button>
                          <button data-testid={`admin-policy-management-archive-${p.id}-btn`}
                            type="button"
                            onClick={() => {
                              /* archive */
                            }}
                            className="text-xs font-medium text-red-600 hover:text-red-700 cursor-pointer"
                          >
                            Archive
                          </button>
                        </div>
                      </td>
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
