import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';

const schema = z.object({
  shift: z.string().min(1, 'Please select a shift.'),
  effectiveDate: z.string().min(1, 'Effective date is required.'),
  duration: z.string().min(1, 'Please select duration.'),
  reason: z.string().min(10, 'Please provide a reason (min 10 characters).'),
});

type FormValues = z.infer<typeof schema>;

export default function ShiftChange() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { shift: '', effectiveDate: '', duration: '', reason: '' },
  });

  const onSubmit = async (_data: FormValues) => {
    // wired to attendance API in Phase 7 integration
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="shift-change-page"
    >
      <div className="max-w-2xl mx-auto p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-4">
          <Link
            to="/employee/profile"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
            data-testid="shift-change-back-link"
          >
            <span aria-hidden="true">&larr;</span>
            Back to Profile
          </Link>
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Apply for Shift Change
          </h1>
          <p className="text-sm text-slate-500 mt-1">Request a change to your work schedule.</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700"
              aria-hidden="true"
            >
              &#9201;
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Current Schedule</h2>
              <p className="text-xs text-slate-500">Your active work schedule</p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">Monday - Friday</p>
                <p className="text-xs text-slate-500 mt-1">Standard Schedule</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900">09:00 AM - 06:00 PM</p>
                <p className="text-xs text-slate-500 mt-1">8 hours/day</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
          <h2 className="text-base font-semibold text-slate-900 mb-6">Request New Schedule</h2>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Select Requested Shift <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 gap-3">
                <label
                  className="relative flex items-start p-4 bg-white border-2 border-slate-200 rounded-xl cursor-pointer hover:border-blue-200 transition-colors"
                  data-testid="shift-change-option-fri-sun"
                >
                  <input data-testid="shift-change-fri-sun-radio"
                    type="radio"
                    value="fri-sun"
                    className="mt-0.5 h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                    {...register('shift')}
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900">Friday - Sunday</p>
                      <span className="text-xs text-slate-500">09:00 AM - 06:00 PM</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Weekend shift schedule</p>
                  </div>
                </label>
                <label
                  className="relative flex items-start p-4 bg-white border-2 border-slate-200 rounded-xl cursor-pointer hover:border-blue-200 transition-colors"
                  data-testid="shift-change-option-tue-sat"
                >
                  <input data-testid="shift-change-tue-sat-radio"
                    type="radio"
                    value="tue-sat"
                    className="mt-0.5 h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                    {...register('shift')}
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900">Tuesday - Saturday</p>
                      <span className="text-xs text-slate-500">09:00 AM - 06:00 PM</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Mid-week start schedule</p>
                  </div>
                </label>
                <label
                  className="relative flex items-start p-4 bg-white border-2 border-slate-200 rounded-xl cursor-pointer hover:border-blue-200 transition-colors"
                  data-testid="shift-change-option-flexible"
                >
                  <input data-testid="shift-change-flexible-radio"
                    type="radio"
                    value="flexible"
                    className="mt-0.5 h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                    {...register('shift')}
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900">Flexible Hours</p>
                      <span className="text-xs text-slate-500">Core: 10:00 AM - 04:00 PM</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Flexible start/end with core hours requirement
                    </p>
                  </div>
                </label>
              </div>
              {errors.shift ? (
                <p
                  className="text-xs text-red-600 mt-1 font-medium"
                  data-testid="shift-change-shift-error"
                >
                  {errors.shift.message}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="effective-date"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Effective From <span className="text-red-500">*</span>
              </label>
              <input data-testid="shift-change-effective-date-input"
                type="date"
                id="effective-date"
                className="block w-full h-11 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm"
                {...register('effectiveDate')}
              />
              <p className="mt-1.5 text-xs text-slate-500">
                Shift changes are effective from the start of the selected week
              </p>
            </div>

            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Duration <span className="text-red-500">*</span>
              </label>
              <select data-testid="shift-change-duration-select"
                id="duration"
                className="block w-full h-11 px-3 pr-10 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm"
                {...register('duration')}
              >
                <option value="">Select duration</option>
                <option value="1month">1 Month</option>
                <option value="3months">3 Months</option>
                <option value="6months">6 Months</option>
                <option value="permanent">Permanent</option>
              </select>
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-slate-700 mb-1.5">
                Reason for Request <span className="text-red-500">*</span>
              </label>
              <textarea data-testid="shift-change-reason-textarea"
                id="reason"
                rows={4}
                placeholder="Please explain why you are requesting this shift change..."
                className="block w-full p-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm placeholder:text-slate-400 resize-none"
                {...register('reason')}
              ></textarea>
              {errors.reason ? (
                <p
                  className="text-xs text-red-600 mt-1 font-medium"
                  data-testid="shift-change-reason-error"
                >
                  {errors.reason.message}
                </p>
              ) : null}
            </div>

            <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-100">
              <span className="text-amber-600 mt-0.5" aria-hidden="true">
                &#9432;
              </span>
              <div className="text-sm text-amber-800">
                <p className="font-medium">Important Note</p>
                <p className="mt-1 text-xs text-amber-700">
                  Shift change requests require manager approval and may take 3-5 business days to
                  process. Your request will be reviewed based on team capacity and operational
                  requirements.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <Link
                to="/employee/profile"
                className="h-11 px-5 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all inline-flex items-center justify-center"
                data-testid="shift-change-cancel-link"
              >
                Cancel
              </Link>
              <button data-testid="shift-change-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="h-11 px-5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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
