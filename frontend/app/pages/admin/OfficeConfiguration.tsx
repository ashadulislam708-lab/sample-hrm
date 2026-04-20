import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

const officeSchema = z.object({
  startTime: z.string().min(1),
  endTime: z.string().min(1),
  gracePeriod: z.string().min(1),
  coreStart: z.string().min(1),
  coreEnd: z.string().min(1),
  workDays: z.array(z.string()),
  weekendDays: z.array(z.string()),
  alternativeShift: z.boolean(),
});

type OfficeFormValues = z.infer<typeof officeSchema>;

export default function OfficeConfiguration() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<OfficeFormValues>({
    resolver: zodResolver(officeSchema),
    defaultValues: {
      startTime: '08:00',
      endTime: '17:00',
      gracePeriod: '10',
      coreStart: '08:00',
      coreEnd: '13:00',
      workDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      weekendDays: ['Sat', 'Sun'],
      alternativeShift: false,
    },
  });

  const onSubmit = async (_data: OfficeFormValues) => {
    // TODO: wire to office config API in Phase 7 integration
  };

  const onReset = () => {
    reset();
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="admin-office-configuration-page"
    >
      <div className="max-w-4xl mx-auto p-6 md:p-8 space-y-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Office Configuration</h1>
          <p className="text-slate-500 text-sm">
            Configure office hours, work days, and time settings.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"
                aria-hidden="true"
              >
                T
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm">Office Time Settings</h3>
                <p className="text-xs text-slate-500">
                  Define standard operating hours and core availability.
                </p>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <label
                    htmlFor="startTime"
                    className="text-xs font-medium text-slate-700 block"
                  >
                    Office Start Time
                  </label>
                  <input data-testid="admin-office-configuration-start-time-input"
                    id="startTime"
                    type="time"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 text-slate-900 font-medium bg-white"
                    {...register('startTime')}
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="endTime" className="text-xs font-medium text-slate-700 block">
                    Office End Time
                  </label>
                  <input data-testid="admin-office-configuration-end-time-input"
                    id="endTime"
                    type="time"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 text-slate-900 font-medium bg-white"
                    {...register('endTime')}
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="gracePeriod"
                    className="text-xs font-medium text-slate-700 block"
                  >
                    Grace Period (Minutes)
                  </label>
                  <input data-testid="admin-office-configuration-grace-period-input"
                    id="gracePeriod"
                    type="number"
                    min={0}
                    max={60}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 text-slate-900 font-medium bg-white"
                    {...register('gracePeriod')}
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="coreStart"
                    className="text-xs font-medium text-slate-700 block"
                  >
                    Core Hours Start
                  </label>
                  <input data-testid="admin-office-configuration-core-start-input"
                    id="coreStart"
                    type="time"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 text-slate-900 font-medium bg-white"
                    {...register('coreStart')}
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="coreEnd" className="text-xs font-medium text-slate-700 block">
                    Core Hours End
                  </label>
                  <input data-testid="admin-office-configuration-core-end-input"
                    id="coreEnd"
                    type="time"
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 text-slate-900 font-medium bg-white"
                    {...register('coreEnd')}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center"
                aria-hidden="true"
              >
                D
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm">Office Days Settings</h3>
                <p className="text-xs text-slate-500">
                  Manage working days, weekends, and shifts.
                </p>
              </div>
            </div>
            <div className="p-6 space-y-8">
              <div className="space-y-3">
                <label className="text-xs font-medium text-slate-700">Standard Work Days</label>
                <Controller
                  name="workDays"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-wrap gap-2">
                      {DAYS.map((d) => {
                        const active = field.value.includes(d);
                        return (
                          <button data-testid={`admin-office-configuration-workday-${d.toLowerCase()}-btn`}
                            key={d}
                            type="button"
                            onClick={() =>
                              field.onChange(
                                active ? field.value.filter((x) => x !== d) : [...field.value, d],
                              )
                            }
                            className={`h-9 px-3 rounded-lg text-sm font-medium border cursor-pointer transition-all ${active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
                          >
                            {d}
                          </button>
                        );
                      })}
                    </div>
                  )}
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-medium text-slate-700">Weekend Days</label>
                <Controller
                  name="weekendDays"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-wrap gap-2">
                      {DAYS.map((d) => {
                        const active = field.value.includes(d);
                        return (
                          <button data-testid={`admin-office-configuration-weekend-${d.toLowerCase()}-btn`}
                            key={d}
                            type="button"
                            onClick={() =>
                              field.onChange(
                                active ? field.value.filter((x) => x !== d) : [...field.value, d],
                              )
                            }
                            className={`h-9 px-3 rounded-lg text-sm font-medium border cursor-pointer transition-all ${active ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
                          >
                            {d}
                          </button>
                        );
                      })}
                    </div>
                  )}
                />
              </div>

              <label className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                <input data-testid="admin-office-configuration-alt-shift-checkbox"
                  type="checkbox"
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  {...register('alternativeShift')}
                />
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Alternative Shift Coverage
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Enable alternative shift scheduling for weekend coverage.
                  </p>
                </div>
              </label>
            </div>
          </section>

          <div className="flex items-center justify-end gap-3">
            <button data-testid="admin-office-configuration-reset-btn"
              type="button"
              onClick={onReset}
              className="h-10 px-4 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer"
            >
              Reset
            </button>
            <button data-testid="admin-office-configuration-save-btn"
              type="submit"
              disabled={isSubmitting}
              className="h-10 px-5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
