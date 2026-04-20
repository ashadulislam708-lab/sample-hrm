import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';

const addMemberSchema = z.object({
  employee: z.string().min(1, 'Please select an employee.'),
  teamRole: z.string().min(1, 'Please select a role.'),
  joinDate: z.string().min(1, 'Please select a join date.'),
  reportingTo: z.string().min(1, 'Please select a reporting manager.'),
  notes: z.string().optional(),
  notify: z.boolean(),
});

type AddMemberFormValues = z.infer<typeof addMemberSchema>;

export default function AddMember() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddMemberFormValues>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      employee: '',
      teamRole: 'Team Member',
      joinDate: '',
      reportingTo: 'John Doe (Team Lead)',
      notes: '',
      notify: true,
    },
  });

  const onSubmit = async (_data: AddMemberFormValues) => {
    // TODO: wire to add-member API in Phase 7 integration
    navigate('/team/dashboard');
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="team-add-member-page"
    >
      <div className="max-w-[640px] mx-auto p-8">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/team/dashboard"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
            data-testid="team-add-member-back-link"
          >
            <span aria-hidden="true">&larr;</span>
            Back to Team Overview
          </Link>
        </div>

        <div
          className="relative overflow-hidden rounded-xl bg-white shadow-2xl"
          data-testid="team-add-member-modal"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3
                  id="modal-title"
                  className="text-xl font-semibold text-slate-900 tracking-tight"
                >
                  Add Team Member
                </h3>
                <p className="text-sm text-slate-500 mt-0.5">Add an employee to your team.</p>
              </div>
              <Link
                to="/team/dashboard"
                className="text-slate-400 hover:text-slate-600 transition-colors rounded-lg p-1 hover:bg-slate-50"
                aria-label="Close"
                data-testid="team-add-member-close-link"
              >
                <span aria-hidden="true">&times;</span>
              </Link>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Employee Search/Select */}
              <div>
                <label
                  htmlFor="employee"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Select Employee <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input data-testid="team-add-member-employee-input"
                    type="text"
                    id="employee"
                    className="block w-full h-11 pl-3 pr-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 transition-all shadow-sm placeholder:text-slate-400"
                    placeholder="Search by name or employee ID..."
                    {...register('employee')}
                  />
                </div>
                {errors.employee ? (
                  <p
                    className="mt-1.5 text-xs text-red-600 font-medium"
                    data-testid="team-add-member-employee-error"
                  >
                    {errors.employee.message}
                  </p>
                ) : null}
              </div>

              {/* Role in Team */}
              <div>
                <label
                  htmlFor="team-role"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Role in Team <span className="text-red-500">*</span>
                </label>
                <select data-testid="team-add-member-role-select"
                  id="team-role"
                  className="block w-full h-11 pl-3 pr-10 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 transition-all shadow-sm"
                  {...register('teamRole')}
                >
                  <option value="" disabled>
                    Select a role...
                  </option>
                  <option value="Team Member">Team Member</option>
                  <option value="Senior Member">Senior Member</option>
                  <option value="Tech Lead">Tech Lead</option>
                  <option value="Project Lead">Project Lead</option>
                  <option value="Mentor">Mentor</option>
                </select>
                {errors.teamRole ? (
                  <p
                    className="mt-1.5 text-xs text-red-600 font-medium"
                    data-testid="team-add-member-role-error"
                  >
                    {errors.teamRole.message}
                  </p>
                ) : null}
              </div>

              {/* Join Date */}
              <div>
                <label
                  htmlFor="join-date"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Join Date <span className="text-red-500">*</span>
                </label>
                <input data-testid="team-add-member-joindate-input"
                  type="date"
                  id="join-date"
                  className="block w-full h-11 pl-3 pr-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 transition-all shadow-sm placeholder:text-slate-400"
                  placeholder="Select date"
                  {...register('joinDate')}
                />
                <p className="mt-1.5 text-xs text-slate-500">
                  The date when the member will officially join the team.
                </p>
                {errors.joinDate ? (
                  <p
                    className="mt-1.5 text-xs text-red-600 font-medium"
                    data-testid="team-add-member-joindate-error"
                  >
                    {errors.joinDate.message}
                  </p>
                ) : null}
              </div>

              {/* Reporting To */}
              <div>
                <label
                  htmlFor="reporting-to"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Reporting To
                </label>
                <select data-testid="team-add-member-reporting-select"
                  id="reporting-to"
                  className="block w-full h-11 pl-3 pr-10 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 transition-all shadow-sm"
                  {...register('reportingTo')}
                >
                  <option value="John Doe (Team Lead)">John Doe (Team Lead)</option>
                  <option value="Lisa Anderson (Product Manager)">
                    Lisa Anderson (Product Manager)
                  </option>
                  <option value="Sarah Wilson (Tech Lead)">Sarah Wilson (Tech Lead)</option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Notes <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea data-testid="team-add-member-notes-input"
                  id="notes"
                  className="block w-full h-[80px] p-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 transition-all shadow-sm resize-none placeholder:text-slate-400"
                  placeholder="Any additional notes about this team member..."
                  {...register('notes')}
                />
              </div>

              {/* Notification Checkbox */}
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <input data-testid="team-add-member-notify-checkbox"
                  type="checkbox"
                  id="notify"
                  className="mt-0.5 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  {...register('notify')}
                />
                <div>
                  <label
                    htmlFor="notify"
                    className="text-sm font-medium text-slate-700 cursor-pointer"
                  >
                    Send notification
                  </label>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Notify the employee about being added to this team via email.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex items-center justify-end gap-3">
                <Link
                  to="/team/dashboard"
                  className="h-11 px-5 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all inline-flex items-center justify-center"
                  data-testid="team-add-member-cancel-link"
                >
                  Cancel
                </Link>
                <button data-testid="team-add-member-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 px-5 rounded-lg text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
