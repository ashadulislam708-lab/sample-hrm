import { Link } from 'react-router';

export default function Profile() {
  return (
    <div className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600" data-testid="profile-page">
      <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-6">
        <header className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            My Profile
          </h1>
          <p className="text-sm text-slate-500">
            Manage your personal information and account settings.
          </p>
        </header>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative group">
              <div
                className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-semibold text-slate-600 border-2 border-white shadow-md"
                aria-hidden="true"
              >
                JD
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <h2 className="text-xl font-semibold text-slate-900 tracking-tight">John Doe</h2>
                <div className="flex gap-2">
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                    data-testid="profile-role-badge"
                  >
                    Product Designer
                  </span>
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200"
                    data-testid="profile-team-badge"
                  >
                    Design Team
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-500 flex items-center gap-2">San Francisco, CA</p>
            </div>
            <Link
              to="/employee/profile/edit"
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm flex items-center gap-2"
              data-testid="profile-edit-link"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-sm font-semibold text-slate-900">Personal Information</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wide block">
                      Email Address
                    </span>
                    <div className="flex items-center gap-2 text-sm text-slate-900">
                      john.doe@potentialai.com
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wide block">
                      Phone Number
                    </span>
                    <div className="flex items-center gap-2 text-sm text-slate-900">
                      +1 (555) 123-4567
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wide block">
                      Employee ID
                    </span>
                    <div className="flex items-center gap-2 text-sm text-slate-900">
                      EMP-2024-001
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wide block">
                      Joining Date
                    </span>
                    <div className="flex items-center gap-2 text-sm text-slate-900">
                      March 15, 2024
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-sm font-semibold text-slate-900">Connected Services</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between group hover:border-blue-200 hover:shadow-sm transition-all">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg bg-[#2b2d42] flex items-center justify-center shrink-0 text-white text-xs font-semibold"
                        aria-hidden="true"
                      >
                        GT
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Gather Town</p>
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/50">
                          Connected
                        </span>
                      </div>
                    </div>
                    <button data-testid="profile-disconnect-gather-btn"
                      type="button"
                      onClick={() => {
                        /* disconnect gather */
                      }}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 cursor-pointer"
                      title="Disconnect"
                    >
                      Disconnect
                    </button>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between group hover:border-blue-200 hover:shadow-sm transition-all">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm text-slate-800 text-xs font-semibold"
                        aria-hidden="true"
                      >
                        N
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Notion</p>
                        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100/50">
                          Connected
                        </span>
                      </div>
                    </div>
                    <button data-testid="profile-disconnect-notion-btn"
                      type="button"
                      onClick={() => {
                        /* disconnect notion */
                      }}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 cursor-pointer"
                      title="Disconnect"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-sm font-semibold text-slate-900">Work Day Shift</h3>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-slate-500">Current Schedule</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      Monday - Friday
                    </span>
                    <span className="text-sm font-semibold text-slate-900">09:00 AM - 06:00 PM</span>
                  </div>
                </div>
                <Link
                  to="/employee/profile/shift-change"
                  className="mt-4 w-full h-10 inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                  data-testid="profile-shift-change-link"
                >
                  Apply for Shift Change
                </Link>
              </div>
            </section>

            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-sm font-semibold text-slate-900">Account Actions</h3>
              </div>
              <div className="p-6 space-y-2">
                <Link
                  to="/employee/profile/change-password"
                  className="w-full h-10 inline-flex items-center justify-between px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                  data-testid="profile-change-password-link"
                >
                  Change Password <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link
                  to="/employee/notifications"
                  className="w-full h-10 inline-flex items-center justify-between px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-sm font-medium transition-colors"
                  data-testid="profile-notifications-link"
                >
                  Notifications <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
