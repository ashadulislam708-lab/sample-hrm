import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';

const schema = z.object({
  date: z.string().min(1, 'Date is required.'),
  clockInTime: z.string().min(1, 'Clock-in time is required.'),
  reason: z.string().min(10, 'Please explain why you were late (min 10 characters).').max(500),
});

type FormValues = z.infer<typeof schema>;

export default function LateAttendanceRequest() {
  const navigate = useNavigate();
  const [reasonLength, setReasonLength] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { date: '2023-10-25', clockInTime: '09:15', reason: '' },
  });

  const onSubmit = async (_data: FormValues) => {
    // wired to attendance API in Phase 7
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600 flex items-start justify-center p-4 md:p-8"
      data-testid="late-attendance-request-page"
    >
      <div className="w-full max-w-[500px] bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 tracking-tight">
            Apply Late Attendance
          </h3>
          <button data-testid="late-attendance-request-close-btn"
            type="button"
            onClick={() => navigate('/employee/attendance')}
            className="text-slate-400 hover:text-slate-600 transition-colors rounded-full p-1 hover:bg-slate-50 cursor-pointer"
            aria-label="Close"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="p-6 overflow-y-auto">
            <div className="space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="late-date" className="text-sm font-medium text-slate-700 block">
                  Date
                </label>
                <input data-testid="late-attendance-request-date-input"
                  type="date"
                  id="late-date"
                  className="w-full h-11 px-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all shadow-sm"
                  {...register('date')}
                />
                {errors.date ? (
                  <p className="text-xs text-red-600 font-medium">{errors.date.message}</p>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="late-time" className="text-sm font-medium text-slate-700 block">
                  Actual Clock-In Time
                </label>
                <input data-testid="late-attendance-request-time-input"
                  type="time"
                  id="late-time"
                  className="w-full h-11 px-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all shadow-sm"
                  {...register('clockInTime')}
                />
                {errors.clockInTime ? (
                  <p className="text-xs text-red-600 font-medium">{errors.clockInTime.message}</p>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="late-reason" className="text-sm font-medium text-slate-700 block">
                    Reason <span className="text-red-500">*</span>
                  </label>
                </div>
                <textarea data-testid="late-attendance-request-reason-textarea"
                  id="late-reason"
                  maxLength={500}
                  className="w-full h-[120px] p-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all shadow-sm resize-none"
                  placeholder="Please explain why you were late. For example: traffic congestion, medical emergency, etc."
                  {...register('reason', {
                    onChange: (event) => setReasonLength(event.target.value.length),
                  })}
                ></textarea>
                <div className="flex justify-between items-center">
                  {errors.reason ? (
                    <p className="text-xs text-red-600 font-medium">{errors.reason.message}</p>
                  ) : (
                    <span></span>
                  )}
                  <span className="text-xs text-slate-400 font-medium">{reasonLength}/500</span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-5 bg-slate-50 border-t border-slate-100 rounded-b-xl flex justify-end items-center gap-3">
            <Link
              to="/employee/attendance"
              className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm inline-flex items-center justify-center"
              data-testid="late-attendance-request-cancel-link"
            >
              Cancel
            </Link>
            <button data-testid="late-attendance-request-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 border border-transparent shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span>Submit Request</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
