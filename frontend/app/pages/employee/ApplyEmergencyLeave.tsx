import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';

const schema = z.object({
  dates: z.string().min(1, 'Leave date is required.'),
  reason: z.string().min(10, 'Please describe the emergency.'),
  returnDate: z.string().min(1, 'Return date is required.'),
  returnTime: z.string().min(1, 'Return time is required.'),
  contact: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function ApplyEmergencyLeave() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      dates: 'Today, Nov 15, 2023',
      reason: '',
      returnDate: '',
      returnTime: '',
      contact: '',
    },
  });

  const onSubmit = async (_data: FormValues) => {
    // wired to leave API + Slack notification in Phase 7
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600 flex items-start justify-center p-6"
      data-testid="apply-emergency-leave-page"
    >
      <div className="w-full max-w-[560px] bg-white rounded-xl shadow-sm border-y border-r border-slate-200 border-l-4 border-l-red-500 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600 flex-shrink-0"
            aria-hidden="true"
          >
            !
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-red-700 tracking-tight">Emergency Leave</h2>
            <p className="text-sm text-slate-500">
              Request urgent time off due to unforeseen circumstances.
            </p>
          </div>
        </div>

        <div
          className="bg-[#FEF2F2] border border-red-100 rounded-lg p-4 mb-8 flex items-start gap-3"
          data-testid="apply-emergency-leave-warning"
        >
          <span className="text-red-500 mt-0.5 flex-shrink-0" aria-hidden="true">
            &#9888;
          </span>
          <p className="text-sm font-medium text-red-800 leading-snug">
            Submitting will immediately notify your team via Slack. Please ensure your current
            tasks are handed off if possible.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label htmlFor="el-dates" className="block text-sm font-medium text-slate-700 mb-1.5">
              Leave Date(s) <span className="text-red-500">*</span>
            </label>
            <input data-testid="apply-emergency-leave-dates-input"
              type="text"
              id="el-dates"
              className="block w-full h-11 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-sm placeholder:text-slate-400"
              placeholder="Select start date"
              {...register('dates')}
            />
            {errors.dates ? (
              <p className="text-xs text-red-600 mt-1 font-medium">{errors.dates.message}</p>
            ) : null}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="el-reason" className="block text-sm font-medium text-slate-700">
                Reason for Emergency <span className="text-red-500">*</span>
              </label>
            </div>
            <textarea data-testid="apply-emergency-leave-reason-textarea"
              id="el-reason"
              className="block w-full h-[150px] p-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-sm resize-none placeholder:text-slate-400"
              placeholder="Please describe the emergency situation..."
              {...register('reason')}
            ></textarea>
            {errors.reason ? (
              <p className="text-xs text-red-600 mt-1 font-medium">{errors.reason.message}</p>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Estimated Return Time <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input data-testid="apply-emergency-leave-return-date-input"
                type="text"
                className="block w-full h-11 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-sm"
                placeholder="Return Date"
                {...register('returnDate')}
              />
              <input data-testid="apply-emergency-leave-return-time-input"
                type="time"
                className="block w-full h-11 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-sm text-slate-500"
                {...register('returnTime')}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="el-contact"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Contact Availability{' '}
              <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input data-testid="apply-emergency-leave-contact-input"
              type="text"
              id="el-contact"
              className="block w-full h-11 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all shadow-sm placeholder:text-slate-400"
              placeholder="Phone number or best way to reach you"
              {...register('contact')}
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <Link
              to="/employee/leave"
              className="h-11 px-6 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all inline-flex items-center justify-center"
              data-testid="apply-emergency-leave-cancel-link"
            >
              Cancel
            </Link>
            <button data-testid="apply-emergency-leave-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="h-11 px-6 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Submit Emergency Leave
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
