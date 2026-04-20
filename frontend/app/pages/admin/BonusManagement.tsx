import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import EmptyState from '~/components/atoms/EmptyState';

interface BonusRow {
  id: string;
  date: string;
  employee: string;
  type: string;
  reference: string;
  amount: string;
  status: string;
}

const bonusSchema = z.object({
  bonusType: z.string().min(1, 'Please select a bonus type.'),
  amount: z.string().min(1, 'Please enter an amount.'),
  reference: z.string().min(1, 'Please enter project/reference.'),
  employees: z.string().min(1, 'Please select employees.'),
  method: z.string().min(1, 'Please select a method.'),
});

type BonusFormValues = z.infer<typeof bonusSchema>;

export default function BonusManagement() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BonusFormValues>({
    resolver: zodResolver(bonusSchema),
    defaultValues: {
      bonusType: '',
      amount: '',
      reference: '',
      employees: '',
      method: '',
    },
  });

  const history: BonusRow[] = [];

  const onSubmit = async (_data: BonusFormValues) => {
    // TODO: wire to bonus process API in Phase 7 integration
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="admin-bonus-management-page"
    >
      <div className="max-w-[1400px] mx-auto p-8 space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Bonus Management</h1>
          <p className="text-sm text-slate-500 mt-1">
            Disburse bonuses and track history across the organization.
          </p>
        </header>

        <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-900">Process New Bonus</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-5 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label
                  htmlFor="bonus-type"
                  className="block text-sm font-medium text-slate-700"
                >
                  Bonus Type <span className="text-red-500">*</span>
                </label>
                <select data-testid="admin-bonus-management-type-select"
                  id="bonus-type"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  {...register('bonusType')}
                >
                  <option value="">Select type...</option>
                  <option value="project">Project</option>
                  <option value="festival">Festival</option>
                </select>
                {errors.bonusType ? (
                  <p className="text-xs text-red-600 font-medium">{errors.bonusType.message}</p>
                ) : null}
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="bonus-amount"
                  className="block text-sm font-medium text-slate-700"
                >
                  Amount per Employee <span className="text-red-500">*</span>
                </label>
                <input data-testid="admin-bonus-management-amount-input"
                  id="bonus-amount"
                  type="number"
                  placeholder="0.00"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  {...register('amount')}
                />
                {errors.amount ? (
                  <p className="text-xs text-red-600 font-medium">{errors.amount.message}</p>
                ) : null}
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="bonus-reference"
                  className="block text-sm font-medium text-slate-700"
                >
                  Project Name / Reference <span className="text-red-500">*</span>
                </label>
                <input data-testid="admin-bonus-management-reference-input"
                  id="bonus-reference"
                  type="text"
                  placeholder="e.g. Q4 Product Launch"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  {...register('reference')}
                />
                {errors.reference ? (
                  <p className="text-xs text-red-600 font-medium">{errors.reference.message}</p>
                ) : null}
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="bonus-employees"
                  className="block text-sm font-medium text-slate-700"
                >
                  Select Employees <span className="text-red-500">*</span>
                </label>
                <input data-testid="admin-bonus-management-employees-input"
                  id="bonus-employees"
                  type="text"
                  placeholder="Search and select employees..."
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  {...register('employees')}
                />
                {errors.employees ? (
                  <p className="text-xs text-red-600 font-medium">{errors.employees.message}</p>
                ) : null}
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label
                  htmlFor="bonus-method"
                  className="block text-sm font-medium text-slate-700"
                >
                  Disbursement Method <span className="text-red-500">*</span>
                </label>
                <select data-testid="admin-bonus-management-method-select"
                  id="bonus-method"
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  {...register('method')}
                >
                  <option value="">Select method...</option>
                  <option value="payroll">Include in Payroll</option>
                  <option value="direct">Direct Transfer</option>
                </select>
                {errors.method ? (
                  <p className="text-xs text-red-600 font-medium">{errors.method.message}</p>
                ) : null}
              </div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <button data-testid="admin-bonus-management-reset-btn"
                type="button"
                onClick={() => reset()}
                className="h-10 px-4 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer"
              >
                Reset
              </button>
              <button data-testid="admin-bonus-management-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="h-10 px-5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Process Bonus
              </button>
            </div>
          </form>
        </section>

        <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-900">Bonus History</h2>
          </div>
          {history.length === 0 ? (
            <EmptyState
              title="No bonus history"
              description="Processed bonuses will appear here."
              testId="admin-bonus-management-history-empty"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-left font-medium">
                  <tr>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Employee</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">Reference / Project</th>
                    <th className="px-6 py-3 text-right">Amount</th>
                    <th className="px-6 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {history.map((b) => (
                    <tr
                      key={b.id}
                      className="hover:bg-slate-50/60 transition-colors"
                      data-testid={`admin-bonus-management-row-${b.id}`}
                    >
                      <td className="px-6 py-4 text-slate-500">{b.date}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">{b.employee}</td>
                      <td className="px-6 py-4 text-slate-700">{b.type}</td>
                      <td className="px-6 py-4 text-slate-700">{b.reference}</td>
                      <td className="px-6 py-4 text-right text-slate-900">{b.amount}</td>
                      <td className="px-6 py-4 text-center text-slate-700">{b.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
