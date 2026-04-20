import { Link } from 'react-router';

interface PolicyCard {
  slug: string;
  category: string;
  title: string;
  description: string;
  updatedAt: string;
  status: 'acknowledged' | 'requires-action';
  isNew?: boolean;
}

const policies: PolicyCard[] = [
  {
    slug: 'leave-management',
    category: 'Leave',
    title: 'Leave Management System',
    description:
      'Comprehensive guidelines regarding annual leave, sick leave, and casual leave allocation for all permanent employees...',
    updatedAt: 'Jan 10, 2025',
    status: 'acknowledged',
  },
  {
    slug: 'employee-conduct',
    category: 'Conduct',
    title: 'Employee Conduct and Violations',
    description:
      'Standards of professional behavior, code of ethics, and disciplinary procedures for workplace violations and misconduct...',
    updatedAt: 'Dec 15, 2024',
    status: 'acknowledged',
  },
  {
    slug: 'office-hours',
    category: 'Work Hours',
    title: 'Office Hours & Attendance',
    description:
      'Updated core working hours, flexible timing arrangements, and remote work logging requirements for the new fiscal year...',
    updatedAt: 'Jan 5, 2025',
    status: 'requires-action',
    isNew: true,
  },
  {
    slug: 'salary-increment',
    category: 'Compensation',
    title: 'Salary Increment & Promotion',
    description:
      'Guidelines defining eligibility for annual salary appraisals, promotion cycles, and performance bonus calculations...',
    updatedAt: 'Nov 20, 2024',
    status: 'acknowledged',
  },
];

export default function Policies() {
  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600 font-normal"
      data-testid="policies-page"
    >
      <div className="max-w-[1400px] mx-auto p-6 md:p-8 space-y-8">
        <div className="space-y-4">
          <nav className="flex text-sm text-slate-500">
            <span>Policies</span>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-900 font-medium">Overview</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Company Policies
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input data-testid="policies-search-input"
              type="text"
              className="block w-full pl-3 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm shadow-sm"
              placeholder="Search policies..."
            />
          </div>
          <div className="relative min-w-[200px]">
            <select data-testid="policies-category-filter"
              className="block w-full pl-3 pr-10 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm shadow-sm cursor-pointer"
              defaultValue="all"
            >
              <option value="all">All Categories</option>
              <option value="leave">Leave Management</option>
              <option value="conduct">Conduct</option>
              <option value="compensation">Compensation</option>
              <option value="work-hours">Work Hours</option>
              <option value="it-security">IT &amp; Security</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map((policy) => (
            <div
              key={policy.slug}
              className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col h-full relative group"
              data-testid={`policies-card-${policy.slug}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                    {policy.category}
                  </span>
                  {policy.isNew ? (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 tracking-wide">
                      NEW
                    </span>
                  ) : null}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span>{policy.updatedAt}</span>
                </div>
              </div>

              <h4 className="text-base font-semibold text-slate-900 mb-2 tracking-tight">
                {policy.title}
              </h4>
              <p className="text-sm text-slate-500 mb-6 flex-1 line-clamp-2">
                {policy.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <Link
                  to={`/employee/policies/${policy.slug}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-all flex items-center gap-1"
                  data-testid={`policies-read-${policy.slug}-link`}
                >
                  Read Policy <span aria-hidden="true">&rarr;</span>
                </Link>
                {policy.status === 'acknowledged' ? (
                  <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-50">
                    <span className="text-xs font-medium">Acknowledged</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
                    <span className="text-xs font-medium">Requires Action</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
