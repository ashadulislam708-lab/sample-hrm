import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';

const schema = z.object({
  leaveType: z.string().min(1, 'Leave type is required.'),
  duration: z.string().min(1),
  dates: z.string().min(1, 'Date range is required.'),
  reason: z.string().min(5, 'Please provide a reason.'),
});

type FormValues = z.infer<typeof schema>;

export default function ApplyLeave() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      leaveType: 'Casual Leave',
      duration: 'full',
      dates: 'Nov 15, 2023 - Nov 16, 2023',
      reason: '',
    },
  });

  const onSubmit = async (_data: FormValues) => {
    // wired to leave API in Phase 7
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600 flex items-start justify-center p-4 md:p-8"
      data-testid="apply-leave-page"
    >
      <div className="w-full max-w-[520px] bg-white rounded-xl shadow-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 tracking-tight">
                Apply for Leave
              </h3>
              <p className="text-sm text-slate-500 mt-0.5">
                Fill in the details to submit your request.
              </p>
            </div>
            <Link
              to="/employee/leave"
              className="text-slate-400 hover:text-slate-600 transition-colors rounded-lg p-1 hover:bg-slate-50"
              aria-label="Close"
              data-testid="apply-leave-close-link"
            >
              Close
            </Link>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label
                htmlFor="leave-type"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Leave Type <span className="text-red-500">*</span>
              </label>
              <select data-testid="apply-leave-type-select"
                id="leave-type"
                className="block w-full h-11 pl-3 pr-10 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 transition-all shadow-sm"
                {...register('leaveType')}
              >
                <option>Casual Leave</option>
                <option>Sick Leave</option>
              </select>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="text-emerald-500" aria-hidden="true">
                  &#10004;
                </span>
                <span className="text-xs font-medium text-emerald-600">8 days available</span>
              </div>
            </div>

            <div>
              <span className="block text-sm font-medium text-slate-700 mb-3">Duration</span>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <label className="inline-flex items-center cursor-pointer group">
                  <input data-testid="apply-leave-duration-full"
                    type="radio"
                    value="full"
                    {...register('duration')}
                  />
                  <span className="ml-2 text-sm text-slate-700 group-hover:text-slate-900">
                    Full Day
                  </span>
                </label>
                <label className="inline-flex items-center cursor-pointer group">
                  <input data-testid="apply-leave-duration-half"
                    type="radio"
                    value="half"
                    {...register('duration')}
                  />
                  <span className="ml-2 text-sm text-slate-700 group-hover:text-slate-900">
                    Half Day (2nd Half)
                  </span>
                </label>
              </div>
              <div className="mt-3 flex items-start gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-400 mt-0.5 shrink-0" aria-hidden="true">
                  &#9432;
                </span>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Half-Day Leave requires core hours (8 AM - 1 PM) completion.
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="dates" className="block text-sm font-medium text-slate-700 mb-1.5">
                Date Range <span className="text-red-500">*</span>
              </label>
              <input data-testid="apply-leave-dates-input"
                type="text"
                id="dates"
                className="block w-full h-11 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 transition-all shadow-sm placeholder:text-slate-400"
                placeholder="Select start and end date"
                {...register('dates')}
              />
              {errors.dates ? (
                <p className="text-xs text-red-600 mt-1 font-medium">{errors.dates.message}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-slate-700 mb-1.5">
                Reason <span className="text-red-500">*</span>
              </label>
              <textarea data-testid="apply-leave-reason-textarea"
                id="reason"
                className="block w-full h-[100px] p-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 transition-all shadow-sm resize-none placeholder:text-slate-400"
                placeholder="Please provide a reason for your leave request..."
                {...register('reason')}
              ></textarea>
              {errors.reason ? (
                <p className="text-xs text-red-600 mt-1 font-medium">{errors.reason.message}</p>
              ) : null}
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <Link
                to="/employee/leave"
                className="h-11 px-5 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all inline-flex items-center justify-center"
                data-testid="apply-leave-cancel-link"
              >
                Cancel
              </Link>
              <button data-testid="apply-leave-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="h-11 px-5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm inline-flex items-center justify-center cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
