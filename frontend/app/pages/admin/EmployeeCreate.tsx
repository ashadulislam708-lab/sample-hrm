import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';

const employeeSchema = z.object({
  fullName: z.string().min(1, 'Full name is required.'),
  email: z.string().email('Please enter a valid email.'),
  phone: z.string().min(1, 'Phone is required.'),
  position: z.string().min(1, 'Position is required.'),
  department: z.string().min(1, 'Department is required.'),
  teamLeader: z.string().min(1, 'Team leader is required.'),
  startDate: z.string().min(1, 'Start date is required.'),
  status: z.string().min(1, 'Status is required.'),
  salary: z.string().min(1, 'Salary is required.'),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  gather: z.string().optional(),
  notion: z.string().optional(),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

export default function EmployeeCreate() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      teamLeader: '',
      startDate: '',
      status: 'active',
      salary: '',
      bankName: '',
      accountNumber: '',
      gather: '',
      notion: '',
    },
  });

  const onSubmit = async (_data: EmployeeFormValues) => {
    // TODO: wire to create employee API in Phase 7 integration
    navigate('/admin/employees');
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="admin-employee-create-page"
    >
      <div className="max-w-[900px] mx-auto p-8">
        <Link
          to="/admin/employees"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-6"
          data-testid="admin-employee-create-back-link"
        >
          <span aria-hidden="true">&larr;</span>
          Back
        </Link>

        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
            Create New Employee
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Fill in the employee details to onboard them.
          </p>
        </header>

        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          data-testid="admin-employee-create-form"
        >
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h2 className="text-base font-semibold text-slate-900">Basic Information</h2>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5 md:col-span-2">
                <button data-testid="admin-employee-create-avatar-upload-btn"
                  type="button"
                  onClick={() => {
                    /* upload avatar — wired in Phase 7 */
                  }}
                  className="h-10 px-4 rounded-lg text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
                >
                  Upload avatar
                </button>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input data-testid="admin-employee-create-fullname-input"
                  id="fullName"
                  type="text"
                  placeholder="e.g. John Doe"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
                  {...register('fullName')}
                />
                {errors.fullName ? (
                  <p className="text-xs text-red-600 font-medium">{errors.fullName.message}</p>
                ) : null}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input data-testid="admin-employee-create-email-input"
                  id="email"
                  type="email"
                  placeholder="e.g. john@potential.ai"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
                  {...register('email')}
                />
                {errors.email ? (
                  <p className="text-xs text-red-600 font-medium">{errors.email.message}</p>
                ) : null}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input data-testid="admin-employee-create-phone-input"
                  id="phone"
                  type="tel"
                  placeholder="555-0123"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
                  {...register('phone')}
                />
                {errors.phone ? (
                  <p className="text-xs text-red-600 font-medium">{errors.phone.message}</p>
                ) : null}
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h2 className="text-base font-semibold text-slate-900">Employment Details</h2>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="position" className="block text-sm font-medium text-slate-700">
                  Position <span className="text-red-500">*</span>
                </label>
                <input data-testid="admin-employee-create-position-input"
                  id="position"
                  type="text"
                  placeholder="e.g. Senior Frontend Developer"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
                  {...register('position')}
                />
                {errors.position ? (
                  <p className="text-xs text-red-600 font-medium">{errors.position.message}</p>
                ) : null}
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-slate-700"
                >
                  Department <span className="text-red-500">*</span>
                </label>
                <select data-testid="admin-employee-create-department-select"
                  id="department"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900"
                  {...register('department')}
                >
                  <option value="">Select department...</option>
                  <option value="engineering">Engineering</option>
                  <option value="product">Product</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="hr">HR</option>
                </select>
                {errors.department ? (
                  <p className="text-xs text-red-600 font-medium">{errors.department.message}</p>
                ) : null}
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="teamLeader"
                  className="block text-sm font-medium text-slate-700"
                >
                  Team Leader <span className="text-red-500">*</span>
                </label>
                <select data-testid="admin-employee-create-team-leader-select"
                  id="teamLeader"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900"
                  {...register('teamLeader')}
                >
                  <option value="">Select team leader...</option>
                  <option value="john-doe">John Doe</option>
                  <option value="sarah-miller">Sarah Miller</option>
                  <option value="lisa-anderson">Lisa Anderson</option>
                </select>
                {errors.teamLeader ? (
                  <p className="text-xs text-red-600 font-medium">{errors.teamLeader.message}</p>
                ) : null}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="startDate" className="block text-sm font-medium text-slate-700">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input data-testid="admin-employee-create-start-date-input"
                  id="startDate"
                  type="date"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900"
                  {...register('startDate')}
                />
                {errors.startDate ? (
                  <p className="text-xs text-red-600 font-medium">{errors.startDate.message}</p>
                ) : null}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="status" className="block text-sm font-medium text-slate-700">
                  Status <span className="text-red-500">*</span>
                </label>
                <select data-testid="admin-employee-create-status-select"
                  id="status"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900"
                  {...register('status')}
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="terminated">Terminated</option>
                </select>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h2 className="text-base font-semibold text-slate-900">Salary &amp; Banking</h2>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="salary" className="block text-sm font-medium text-slate-700">
                  Base Salary (Annual) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                    aria-hidden="true"
                  >
                    $
                  </span>
                  <input data-testid="admin-employee-create-salary-input"
                    id="salary"
                    type="number"
                    placeholder="0.00"
                    className="w-full pl-7 pr-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
                    {...register('salary')}
                  />
                </div>
                {errors.salary ? (
                  <p className="text-xs text-red-600 font-medium">{errors.salary.message}</p>
                ) : null}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="bankName" className="block text-sm font-medium text-slate-700">
                  Bank Name
                </label>
                <input data-testid="admin-employee-create-bank-name-input"
                  id="bankName"
                  type="text"
                  placeholder="e.g. Chase Bank"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
                  {...register('bankName')}
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label
                  htmlFor="accountNumber"
                  className="block text-sm font-medium text-slate-700"
                >
                  Bank Account Number
                </label>
                <input data-testid="admin-employee-create-account-number-input"
                  id="accountNumber"
                  type="text"
                  placeholder="XXXX-XXXX-XXXX"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400 font-mono"
                  {...register('accountNumber')}
                />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h2 className="text-base font-semibold text-slate-900">System Integrations</h2>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="gather" className="block text-sm font-medium text-slate-700">
                  Gather Town Email
                </label>
                <input data-testid="admin-employee-create-gather-input"
                  id="gather"
                  type="email"
                  placeholder="gather@potential.ai"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
                  {...register('gather')}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="notion" className="block text-sm font-medium text-slate-700">
                  Notion User ID
                </label>
                <input data-testid="admin-employee-create-notion-input"
                  id="notion"
                  type="text"
                  placeholder="Notion user id"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
                  {...register('notion')}
                />
              </div>
            </div>
          </section>

          <div className="flex items-center justify-end gap-3">
            <Link
              to="/admin/employees"
              className="h-10 px-4 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 inline-flex items-center justify-center"
              data-testid="admin-employee-create-cancel-link"
            >
              Cancel
            </Link>
            <button data-testid="admin-employee-create-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="h-10 px-5 rounded-lg text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Create Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
