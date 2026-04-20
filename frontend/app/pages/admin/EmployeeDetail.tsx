import { useState } from 'react';

import { Link, useParams } from 'react-router';

type DetailTab = 'personal' | 'employment' | 'documents' | 'attendance' | 'leave';

export default function EmployeeDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<DetailTab>('personal');

  const handleAction = (_action: 'edit' | 'deactivate') => {
    // TODO: wire to employee action API in Phase 7 integration
  };

  const tabClass = (tab: DetailTab) =>
    activeTab === tab
      ? 'py-4 text-sm font-medium text-blue-600 border-b-2 border-blue-600 cursor-pointer'
      : 'py-4 text-sm font-medium text-slate-500 hover:text-slate-700 border-b-2 border-transparent cursor-pointer';

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="admin-employee-detail-page"
    >
      <div className="max-w-[1200px] mx-auto p-8">
        <Link
          to="/admin/employees"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-6"
          data-testid="admin-employee-detail-back-link"
        >
          <span aria-hidden="true">&larr;</span>
          Back to Employee List
        </Link>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
          <div
            className="h-28 bg-gradient-to-r from-blue-600 to-blue-500"
            aria-hidden="true"
          ></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-14">
              <div
                className="w-28 h-28 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-4xl font-bold border-4 border-white shadow-lg"
                aria-hidden="true"
              >
                MC
              </div>
              <div className="flex-1 pt-2 md:pt-0 md:pb-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                        Mike Chen{id ? <span className="text-slate-400 text-sm ml-2">#{id}</span> : null}
                      </h1>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                        Active
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                      Backend Developer &bull; Engineering
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      EMP-2022-0034 &bull; Joined June 15, 2022
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/admin/employees/${id ?? '1'}/edit`}
                      className="h-9 px-4 rounded-lg text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all flex items-center gap-2"
                      data-testid="admin-employee-detail-edit-link"
                    >
                      Edit
                    </Link>
                    <button data-testid="admin-employee-detail-deactivate-btn"
                      type="button"
                      onClick={() => handleAction('deactivate')}
                      className="h-9 px-4 rounded-lg text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      Deactivate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
          <div className="border-b border-slate-200">
            <nav className="flex gap-6 px-6">
              <button data-testid="admin-employee-detail-tab-personal"
                type="button"
                onClick={() => setActiveTab('personal')}
                className={tabClass('personal')}
              >
                Personal Info
              </button>
              <button data-testid="admin-employee-detail-tab-employment"
                type="button"
                onClick={() => setActiveTab('employment')}
                className={tabClass('employment')}
              >
                Employment
              </button>
              <button data-testid="admin-employee-detail-tab-documents"
                type="button"
                onClick={() => setActiveTab('documents')}
                className={tabClass('documents')}
              >
                Documents
              </button>
              <button data-testid="admin-employee-detail-tab-attendance"
                type="button"
                onClick={() => setActiveTab('attendance')}
                className={tabClass('attendance')}
              >
                Attendance
              </button>
              <button data-testid="admin-employee-detail-tab-leave"
                type="button"
                onClick={() => setActiveTab('leave')}
                className={tabClass('leave')}
              >
                Leave
              </button>
            </nav>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-5">
                <h3 className="text-base font-semibold text-slate-900">Personal Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Full Name</p>
                    <p className="text-sm font-medium text-slate-900">Michael Chen</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Date of Birth</p>
                    <p className="text-sm font-medium text-slate-900">March 15, 1992</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Gender</p>
                    <p className="text-sm font-medium text-slate-900">Male</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Nationality</p>
                    <p className="text-sm font-medium text-slate-900">American</p>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <h3 className="text-base font-semibold text-slate-900">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Email</p>
                    <p className="text-sm font-medium text-slate-900">mike.chen@potential.ai</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Phone</p>
                    <p className="text-sm font-medium text-slate-900">+1 (555) 234-5678</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-slate-500 mb-1">Address</p>
                    <p className="text-sm font-medium text-slate-900">
                      456 Oak Avenue, Apt 12B, San Francisco, CA 94102
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <h3 className="text-base font-semibold text-slate-900">Employment Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Department</p>
                    <p className="text-sm font-medium text-slate-900">Engineering</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Position</p>
                    <p className="text-sm font-medium text-slate-900">Backend Developer</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Reports To</p>
                    <p className="text-sm font-medium text-slate-900">John Doe (Team Lead)</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Employment Type</p>
                    <p className="text-sm font-medium text-slate-900">Full Time</p>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <h3 className="text-base font-semibold text-slate-900">Compensation</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Base Salary</p>
                    <p className="text-sm font-medium text-slate-900">$85,000 / year</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Pay Grade</p>
                    <p className="text-sm font-medium text-slate-900">Level 3</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Bank Account</p>
                    <p className="text-sm font-medium text-slate-900">****4567</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Tax ID</p>
                    <p className="text-sm font-medium text-slate-900">***-**-1234</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div
            className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
            data-testid="admin-employee-detail-stat-attendance"
          >
            <p className="text-xs font-medium text-slate-500 uppercase mb-2">Attendance Rate</p>
            <p className="text-2xl font-semibold text-green-600">95%</p>
            <p className="text-xs text-slate-500 mt-1">This month</p>
          </div>
          <div
            className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
            data-testid="admin-employee-detail-stat-leave"
          >
            <p className="text-xs font-medium text-slate-500 uppercase mb-2">Leave Balance</p>
            <p className="text-2xl font-semibold text-slate-900">6 days</p>
            <p className="text-xs text-slate-500 mt-1">Casual remaining</p>
          </div>
          <div
            className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
            data-testid="admin-employee-detail-stat-loans"
          >
            <p className="text-xs font-medium text-slate-500 uppercase mb-2">Active Loans</p>
            <p className="text-2xl font-semibold text-violet-600">$9,375</p>
            <p className="text-xs text-slate-500 mt-1">Outstanding</p>
          </div>
          <div
            className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
            data-testid="admin-employee-detail-stat-performance"
          >
            <p className="text-xs font-medium text-slate-500 uppercase mb-2">Performance</p>
            <p className="text-2xl font-semibold text-blue-600">4.2</p>
            <p className="text-xs text-slate-500 mt-1">Last review</p>
          </div>
        </div>
      </div>
    </div>
  );
}
