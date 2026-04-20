import { Link, useParams } from 'react-router';

export default function MemberDetail() {
  const { id } = useParams<{ id: string }>();

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="team-member-detail-page"
    >
      <div className="max-w-[1100px] mx-auto p-8">
        <Link
          to="/team/dashboard"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-6 group"
          data-testid="team-member-detail-back-link"
        >
          <span aria-hidden="true">&larr;</span>
          Back to Team Overview
        </Link>

        {/* Profile Header */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
          <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-500" aria-hidden="true" />
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-12">
              <div
                className="w-24 h-24 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl font-bold border-4 border-white shadow-lg"
                aria-hidden="true"
              >
                SW
              </div>
              <div className="flex-1 pt-2 md:pt-0 md:pb-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
                        Sarah Wilson
                      </h1>
                      <span
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100"
                        data-testid="team-member-detail-status-badge"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-green-500"
                          aria-hidden="true"
                        />
                        Online
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                      Frontend Developer &bull; Product Team
                      {id ? <span className="ml-2 text-slate-400">#{id}</span> : null}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button data-testid="team-member-detail-message-btn"
                      type="button"
                      onClick={() => {
                        /* message member — wired in Phase 7 */
                      }}
                      className="h-9 px-4 rounded-lg text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      Message
                    </button>
                    <button data-testid="team-member-detail-schedule-btn"
                      type="button"
                      onClick={() => {
                        /* schedule 1:1 — wired in Phase 7 */
                      }}
                      className="h-9 px-4 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      Schedule 1:1
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Overview */}
            <div
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              data-testid="team-member-detail-performance-card"
            >
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Performance Overview</h2>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <p className="text-2xl font-semibold text-blue-600">4.5</p>
                    <p className="text-xs text-slate-500 mt-1">Avg Rating</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <p className="text-2xl font-semibold text-green-600">12</p>
                    <p className="text-xs text-slate-500 mt-1">Tasks Completed</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <p className="text-2xl font-semibold text-purple-600">98%</p>
                    <p className="text-xs text-slate-500 mt-1">On-Time Delivery</p>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-xl">
                    <p className="text-2xl font-semibold text-amber-600">3</p>
                    <p className="text-xs text-slate-500 mt-1">In Progress</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance Summary */}
            <div
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              data-testid="team-member-detail-attendance-card"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-base font-semibold text-slate-900">Attendance This Month</h2>
                <span className="text-sm text-slate-500">January 2025</span>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-4 gap-4 mb-5">
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-green-600">18</p>
                    <p className="text-xs text-slate-500">Present</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-amber-600">1</p>
                    <p className="text-xs text-slate-500">Late</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-red-600">0</p>
                    <p className="text-xs text-slate-500">Absent</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-blue-600">1</p>
                    <p className="text-xs text-slate-500">Leave</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Attendance Rate:</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: '95%' }}
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-700">95%</span>
                </div>
              </div>
            </div>

            {/* Recent Leave Requests */}
            <div
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              data-testid="team-member-detail-leave-card"
            >
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Recent Leave Requests</h2>
              </div>
              <div className="divide-y divide-slate-100">
                <div className="p-4 flex items-center justify-between hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 text-xs font-semibold"
                      aria-hidden="true"
                    >
                      CL
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Casual Leave</p>
                      <p className="text-xs text-slate-500">Jan 20, 2025 &bull; 1 day</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                    Approved
                  </span>
                </div>
                <div className="p-4 flex items-center justify-between hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600 text-xs font-semibold"
                      aria-hidden="true"
                    >
                      SL
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Sick Leave</p>
                      <p className="text-xs text-slate-500">Dec 15, 2024 &bull; 1 day</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                    Approved
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              data-testid="team-member-detail-contact-card"
            >
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Contact Information</h2>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="text-sm text-slate-900">sarah.wilson@potential.ai</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-xs text-slate-500">Phone</p>
                    <p className="text-sm text-slate-900">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-xs text-slate-500">Location</p>
                    <p className="text-sm text-slate-900">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Employment Details */}
            <div
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              data-testid="team-member-detail-employment-card"
            >
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Employment Details</h2>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <p className="text-xs text-slate-500">Employee ID</p>
                  <p className="text-sm font-medium text-slate-900">EMP-2023-0045</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Department</p>
                  <p className="text-sm font-medium text-slate-900">Product Development</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Join Date</p>
                  <p className="text-sm font-medium text-slate-900">March 15, 2023</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Tenure</p>
                  <p className="text-sm font-medium text-slate-900">1 year, 10 months</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              data-testid="team-member-detail-skills-card"
            >
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">Skills</h2>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                    React
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                    TypeScript
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                    Tailwind CSS
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                    Next.js
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                    GraphQL
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
