import { useState } from 'react';

import { Link } from 'react-router';

import EmptyState from '~/components/atoms/EmptyState';

interface JobRow {
  id: string;
  title: string;
  department: string;
  postedDate: string;
  applications: number;
  status: string;
}

export default function RecruitmentManagement() {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('all');
  const [status, setStatus] = useState('all');

  const jobs: JobRow[] = [];

  const handlePostJob = () => {
    // TODO: wire to create job posting API in Phase 7 integration
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="admin-recruitment-management-page"
    >
      <div className="max-w-[1400px] mx-auto p-8 space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Recruitment Management
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage open job postings and hiring pipelines.
            </p>
          </div>
          <button data-testid="admin-recruitment-management-post-btn"
            type="button"
            onClick={handlePostJob}
            className="h-10 px-4 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            + Post Job
          </button>
        </header>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input data-testid="admin-recruitment-management-input-search-1"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title..."
            className="h-10 px-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          />
          <select data-testid="admin-recruitment-management-department-filter"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="h-10 px-3 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          >
            <option value="all">All Departments</option>
            <option value="engineering">Engineering</option>
            <option value="product">Product</option>
            <option value="design">Design</option>
            <option value="hr">HR</option>
          </select>
          <select data-testid="admin-recruitment-management-status-filter"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-10 px-3 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-900">Job Postings</h2>
          </div>
          {jobs.length === 0 ? (
            <EmptyState
              title="No job postings"
              description="Create a new job posting to start receiving applications."
              testId="admin-recruitment-management-empty"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-left font-medium">
                  <tr>
                    <th className="px-6 py-3">Job Title</th>
                    <th className="px-6 py-3">Department</th>
                    <th className="px-6 py-3">Posted Date</th>
                    <th className="px-6 py-3">Applications</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {jobs.map((j) => (
                    <tr
                      key={j.id}
                      className="hover:bg-slate-50/60 transition-colors"
                      data-testid={`admin-recruitment-management-job-row-${j.id}`}
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">
                        <Link
                          to={`/admin/recruitment/jobs/${j.id}`}
                          className="hover:text-blue-600"
                          data-testid={`admin-recruitment-management-job-link-${j.id}`}
                        >
                          {j.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-slate-700">{j.department}</td>
                      <td className="px-6 py-4 text-slate-500">{j.postedDate}</td>
                      <td className="px-6 py-4 text-slate-700">{j.applications}</td>
                      <td className="px-6 py-4 text-slate-700">{j.status}</td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          to={`/admin/recruitment/jobs/${j.id}`}
                          className="text-xs font-medium text-blue-600 hover:text-blue-700"
                          data-testid={`admin-recruitment-management-view-${j.id}-link`}
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
