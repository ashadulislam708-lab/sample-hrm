import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';

const createLeaveSchema = z
  .object({
    employee: z.string().min(1, 'Please select an employee.'),
    leaveType: z.string().min(1, 'Please select a leave type.'),
    durationType: z.string().min(1, 'Please choose a duration type.'),
    startDate: z.string().min(1, 'Please select a start date.'),
    endDate: z.string().min(1, 'Please select an end date.'),
    reason: z.string().min(1, 'Please enter a reason.'),
    adminNotes: z.string().optional(),
    autoApprove: z.boolean(),
    notifyEmployee: z.boolean(),
  })
  .refine((d) => d.endDate >= d.startDate, {
    message: 'End date must be on or after start date.',
    path: ['endDate'],
  });

type CreateLeaveFormValues = z.infer<typeof createLeaveSchema>;

export default function CreateLeaveRequest() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateLeaveFormValues>({
    resolver: zodResolver(createLeaveSchema),
    defaultValues: {
      employee: '',
      leaveType: '',
      durationType: 'full',
      startDate: '',
      endDate: '',
      reason: '',
      adminNotes: '',
      autoApprove: true,
      notifyEmployee: true,
    },
  });

  const onSubmit = async (_data: CreateLeaveFormValues) => {
    // TODO: wire to create leave request API in Phase 7 integration
    navigate('/admin/leave');
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="admin-create-leave-request-page"
    >
      <div className="max-w-3xl mx-auto p-6 md:p-8 space-y-8">
        <nav className="flex items-center text-sm text-slate-500">
          <Link
            to="/admin/leave"
            className="hover:text-blue-600 transition-colors"
            data-testid="admin-create-leave-request-breadcrumb-link"
          >
            Leave Management
          </Link>
          <span aria-hidden="true" className="mx-2 text-slate-400">
            /
          </span>
          <span className="text-slate-900 font-medium">Create Leave Request</span>
        </nav>

        <header>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Create Leave Request
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Submit a leave request on behalf of an employee.
          </p>
        </header>

        <form
          className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="p-6 md:p-8 space-y-6 border-b border-slate-100">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"
                aria-hidden="true"
              >
                1
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Employee Selection</h2>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="employee" className="block text-sm font-medium text-slate-700">
                Select Employee <span className="text-red-500">*</span>
              </label>
              <select data-testid="admin-create-leave-request-employee-select"
                id="employee"
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900"
                {...register('employee')}
              >
                <option value="">Choose an employee...</option>
                <option value="1">Sarah Miller - Engineering Lead</option>
                <option value="2">Mike Chen - Senior Developer</option>
                <option value="3">Emily Johnson - Product Manager</option>
                <option value="4">David Kim - UI/UX Designer</option>
                <option value="5">Lisa Anderson - Marketing Manager</option>
                <option value="6">James Wilson - Data Analyst</option>
              </select>
              {errors.employee ? (
                <p
                  className="text-xs text-red-600 mt-1 font-medium"
                  data-testid="admin-create-leave-request-employee-error"
                >
                  {errors.employee.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6 border-b border-slate-100">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"
                aria-hidden="true"
              >
                2
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Leave Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label
                  htmlFor="leaveType"
                  className="block text-sm font-medium text-slate-700"
                >
                  Leave Type <span className="text-red-500">*</span>
                </label>
                <select data-testid="admin-create-leave-request-type-select"
                  id="leaveType"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900"
                  {...register('leaveType')}
                >
                  <option value="">Select leave type...</option>
                  <option value="annual">Annual Leave</option>
                  <option value="sick">Sick Leave</option>
                  <option value="personal">Personal Leave</option>
                  <option value="bereavement">Bereavement Leave</option>
                  <option value="maternity">Maternity Leave</option>
                  <option value="paternity">Paternity Leave</option>
                  <option value="unpaid">Unpaid Leave</option>
                </select>
                {errors.leaveType ? (
                  <p
                    className="text-xs text-red-600 mt-1 font-medium"
                    data-testid="admin-create-leave-request-type-error"
                  >
                    {errors.leaveType.message}
                  </p>
                ) : null}
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="durationType"
                  className="block text-sm font-medium text-slate-700"
                >
                  Duration Type <span className="text-red-500">*</span>
                </label>
                <select data-testid="admin-create-leave-request-duration-select"
                  id="durationType"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900"
                  {...register('durationType')}
                >
                  <option value="full">Full Day</option>
                  <option value="half_morning">Half Day (Morning)</option>
                  <option value="half_afternoon">Half Day (Afternoon)</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-slate-700"
                >
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input data-testid="admin-create-leave-request-start-date-input"
                  id="startDate"
                  type="date"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900"
                  {...register('startDate')}
                />
                {errors.startDate ? (
                  <p
                    className="text-xs text-red-600 mt-1 font-medium"
                    data-testid="admin-create-leave-request-start-date-error"
                  >
                    {errors.startDate.message}
                  </p>
                ) : null}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="endDate" className="block text-sm font-medium text-slate-700">
                  End Date <span className="text-red-500">*</span>
                </label>
                <input data-testid="admin-create-leave-request-end-date-input"
                  id="endDate"
                  type="date"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900"
                  {...register('endDate')}
                />
                {errors.endDate ? (
                  <p
                    className="text-xs text-red-600 mt-1 font-medium"
                    data-testid="admin-create-leave-request-end-date-error"
                  >
                    {errors.endDate.message}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="reason" className="block text-sm font-medium text-slate-700">
                Reason <span className="text-red-500">*</span>
              </label>
              <textarea data-testid="admin-create-leave-request-reason-textarea"
                id="reason"
                rows={3}
                placeholder="Enter the reason for leave..."
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
                {...register('reason')}
              />
              {errors.reason ? (
                <p
                  className="text-xs text-red-600 mt-1 font-medium"
                  data-testid="admin-create-leave-request-reason-error"
                >
                  {errors.reason.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"
                aria-hidden="true"
              >
                3
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Approval Settings</h2>
            </div>
            <div className="space-y-4">
              <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                <input data-testid="admin-create-leave-request-auto-approve-checkbox"
                  type="checkbox"
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  {...register('autoApprove')}
                />
                <div>
                  <p className="text-sm font-medium text-slate-900">Auto-approve this request</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Since you&apos;re an admin, you can approve this request immediately without
                    further review.
                  </p>
                </div>
              </label>
              <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                <input data-testid="admin-create-leave-request-notify-checkbox"
                  type="checkbox"
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  {...register('notifyEmployee')}
                />
                <div>
                  <p className="text-sm font-medium text-slate-900">Notify employee via email</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Send an email notification to the employee about this leave request.
                  </p>
                </div>
              </label>
              <div className="space-y-1.5">
                <label
                  htmlFor="adminNotes"
                  className="block text-sm font-medium text-slate-700"
                >
                  Admin Notes (Internal)
                </label>
                <textarea data-testid="admin-create-leave-request-admin-notes-textarea"
                  id="adminNotes"
                  rows={2}
                  placeholder="Optional notes for internal reference..."
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 placeholder:text-slate-400"
                  {...register('adminNotes')}
                />
              </div>
            </div>
          </div>

          <div className="px-6 md:px-8 py-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <Link
              to="/admin/leave"
              className="px-4 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-white hover:border-slate-400 transition-all shadow-sm"
              data-testid="admin-create-leave-request-cancel-link"
            >
              Cancel
            </Link>
            <button data-testid="admin-create-leave-request-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Submit Leave Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
