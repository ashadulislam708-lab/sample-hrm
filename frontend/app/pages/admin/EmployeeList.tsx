import { useState } from 'react';

import { Link } from 'react-router';

import EmptyState from '~/components/atoms/EmptyState';

interface EmployeeRow {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: string;
  joined: string;
  initials: string;
}

export default function EmployeeList() {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('all');
  const [role, setRole] = useState('all');
  const [status, setStatus] = useState('all');

  // Populated from Redux in Phase 7.
  const employees: EmployeeRow[] = [];

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="admin-employee-list-page"
    >
      <div className="max-w-[1400px] mx-auto p-8 space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Employee Management
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage all employees across the organization.
            </p>
          </div>
          <Link
            to="/admin/employees/new"
            className="h-10 px-4 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm inline-flex items-center justify-center gap-2"
            data-testid="admin-employee-list-create-link"
          >
            + Create Employee
          </Link>
        </header>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 grid grid-cols-1 md:grid-cols-4 gap-4">
          <input data-testid="admin-employee-list-input-search-1"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, ID..."
            className="h-10 px-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          />
          <select data-testid="admin-employee-list-department-filter"
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
          <select data-testid="admin-employee-list-role-filter"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="h-10 px-3 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          >
            <option value="all">All Roles</option>
            <option value="employee">Employee</option>
            <option value="team_leader">Team Leader</option>
            <option value="hr_admin">HR Admin</option>
          </select>
          <select data-testid="admin-employee-list-status-filter"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-10 px-3 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="terminated">Terminated</option>
          </select>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {employees.length === 0 ? (
            <EmptyState
              title="No employees yet"
              description="Create your first employee to get started."
              testId="admin-employee-list-empty"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-left font-medium">
                  <tr>
                    <th className="px-6 py-3 w-10">
                      <input data-testid="admin-employee-list-select-all-checkbox"
                        type="checkbox"
                        aria-label="Select all"
                      />
                    </th>
                    <th className="px-6 py-3">Employee</th>
                    <th className="px-6 py-3">Department</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Joined</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {employees.map((e) => (
                    <tr
                      key={e.id}
                      className="hover:bg-slate-50/60 transition-colors"
                      data-testid={`admin-employee-list-row-${e.id}`}
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          aria-label={`Select ${e.name}`}
                          data-testid={`admin-employee-list-select-${e.id}-checkbox`}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-semibold"
                            aria-hidden="true"
                          >
                            {e.initials}
                          </div>
                          <div>
                            <Link
                              to={`/admin/employees/${e.id}`}
                              className="text-sm font-medium text-slate-900 hover:text-blue-600"
                              data-testid={`admin-employee-list-name-${e.id}-link`}
                            >
                              {e.name}
                            </Link>
                            <p className="text-xs text-slate-500">{e.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-700">{e.department}</td>
                      <td className="px-6 py-4 text-slate-700">{e.role}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                          {e.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{e.joined}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            to={`/admin/employees/${e.id}`}
                            className="text-xs font-medium text-blue-600 hover:text-blue-700"
                            data-testid={`admin-employee-list-view-${e.id}-link`}
                          >
                            View
                          </Link>
                          <Link
                            to={`/admin/employees/${e.id}/edit`}
                            className="text-xs font-medium text-slate-600 hover:text-slate-900"
                            data-testid={`admin-employee-list-edit-${e.id}-link`}
                          >
                            Edit
                          </Link>
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
