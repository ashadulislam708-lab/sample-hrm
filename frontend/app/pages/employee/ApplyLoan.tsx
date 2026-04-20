import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';

const schema = z.object({
  amount: z.coerce.number().positive('Amount must be positive.').max(10000, 'Max $10,000.'),
  reason: z.string().min(5, 'Please describe why you need this loan.'),
});

type FormValues = z.infer<typeof schema>;

export default function ApplyLoan() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { amount: 5000, reason: '' },
  });

  const onSubmit = async (_data: FormValues) => {
    // wired to loan API in Phase 7
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600 flex items-start justify-center p-4 md:p-8"
      data-testid="apply-loan-page"
    >
      <div className="w-full max-w-[500px] bg-white rounded-xl shadow-2xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-slate-900 tracking-tight">
              Apply for Salary Loan
            </h3>
            <Link
              to="/employee/loans"
              className="text-slate-400 hover:text-slate-600 transition-colors rounded-lg p-1 hover:bg-slate-50"
              aria-label="Close"
              data-testid="apply-loan-close-link"
            >
              Close
            </Link>
          </div>

          <div
            className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex items-start gap-3"
            data-testid="apply-loan-eligibility-banner"
          >
            <span className="text-blue-600 mt-0.5 shrink-0" aria-hidden="true">
              &#9432;
            </span>
            <div className="text-sm">
              <p className="font-medium text-blue-900">You are eligible to apply</p>
              <p className="text-blue-700 mt-0.5">
                Your maximum available loan amount is{' '}
                <span className="font-semibold">$10,000</span> based on your tenure.
              </p>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-1.5">
                Loan Amount
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-slate-500 text-sm">$</span>
                </div>
                <input data-testid="apply-loan-amount-input"
                  type="number"
                  id="amount"
                  className="block w-full rounded-lg py-2.5 pl-7 pr-12 text-slate-900 border border-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm h-[44px]"
                  placeholder="Enter amount"
                  {...register('amount')}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-slate-500 text-sm">USD</span>
                </div>
              </div>
              <p className="mt-1.5 text-xs text-slate-500">Maximum amount: $10,000</p>
              {errors.amount ? (
                <p className="text-xs text-red-600 mt-1 font-medium">{errors.amount.message}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-slate-700 mb-1.5">
                Reason for Loan
              </label>
              <textarea data-testid="apply-loan-reason-textarea"
                id="reason"
                className="block w-full rounded-lg py-2.5 px-3 text-slate-900 shadow-sm border border-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 text-sm h-[120px] resize-none"
                placeholder="Please describe why you need this loan..."
                {...register('reason')}
              ></textarea>
              {errors.reason ? (
                <p className="text-xs text-red-600 mt-1 font-medium">{errors.reason.message}</p>
              ) : null}
            </div>

            <div
              className="bg-slate-50 border border-slate-100 rounded-lg p-4"
              data-testid="apply-loan-preview"
            >
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Repayment Preview
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Monthly Installment</p>
                  <p className="text-lg font-semibold text-slate-900">
                    $500<span className="text-sm font-normal text-slate-500">/mo</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Duration</p>
                  <p className="text-lg font-semibold text-slate-900">
                    10 <span className="text-sm font-normal text-slate-500">months</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-end gap-3">
              <Link
                to="/employee/loans"
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors inline-flex items-center justify-center"
                data-testid="apply-loan-cancel-link"
              >
                Cancel
              </Link>
              <button data-testid="apply-loan-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
