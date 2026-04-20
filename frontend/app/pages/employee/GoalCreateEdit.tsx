import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(1, 'Goal title is required.'),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required.'),
  priority: z.string().min(1, 'Priority is required.'),
  dueDate: z.string().min(1, 'Due date is required.'),
  target: z.string().optional(),
  visibility: z.string().min(1, 'Please select visibility.'),
});

type FormValues = z.infer<typeof schema>;

export default function GoalCreateEdit() {
  const [milestones, setMilestones] = useState<string[]>(['', '', '']);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      priority: '',
      dueDate: '',
      target: '',
      visibility: 'private',
    },
  });

  const onSubmit = async (_data: FormValues) => {
    // wired to performance API in Phase 7
  };

  const addMilestone = () => setMilestones((prev) => [...prev, '']);
  const updateMilestone = (index: number, value: string) =>
    setMilestones((prev) => prev.map((m, i) => (i === index ? value : m)));
  const removeMilestone = (index: number) =>
    setMilestones((prev) => prev.filter((_, i) => i !== index));

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] text-slate-600"
      data-testid="goal-create-edit-page"
    >
      <div className="max-w-3xl mx-auto p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-4">
          <Link
            to="/employee/performance"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
            data-testid="goal-create-edit-back-link"
          >
            <span aria-hidden="true">&larr;</span>
            Back to Performance
          </Link>
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Create New Goal
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Set a new performance goal to track your progress.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1.5">
                Goal Title <span className="text-red-500">*</span>
              </label>
              <input data-testid="goal-create-edit-title-input"
                type="text"
                id="title"
                placeholder="e.g., Complete Q1 Sales Target"
                className="block w-full h-11 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm placeholder:text-slate-400"
                {...register('title')}
              />
              {errors.title ? (
                <p
                  className="text-xs text-red-600 mt-1 font-medium"
                  data-testid="goal-create-edit-title-error"
                >
                  {errors.title.message}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Description
              </label>
              <textarea data-testid="goal-create-edit-description-textarea"
                id="description"
                rows={4}
                placeholder="Describe your goal in detail, including specific targets and milestones..."
                className="block w-full p-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm placeholder:text-slate-400 resize-none"
                {...register('description')}
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <select data-testid="goal-create-edit-category-select"
                  id="category"
                  className="block w-full h-11 px-3 pr-10 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm"
                  {...register('category')}
                >
                  <option value="">Select category</option>
                  <option value="sales">Sales &amp; Revenue</option>
                  <option value="learning">Learning &amp; Development</option>
                  <option value="project">Project Delivery</option>
                  <option value="productivity">Productivity</option>
                  <option value="leadership">Leadership</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Priority <span className="text-red-500">*</span>
                </label>
                <select data-testid="goal-create-edit-priority-select"
                  id="priority"
                  className="block w-full h-11 px-3 pr-10 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm"
                  {...register('priority')}
                >
                  <option value="">Select priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="due-date"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Due Date <span className="text-red-500">*</span>
                </label>
                <input data-testid="goal-create-edit-due-date-input"
                  type="date"
                  id="due-date"
                  className="block w-full h-11 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm"
                  {...register('dueDate')}
                />
              </div>
              <div>
                <label htmlFor="target" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Target Value (Optional)
                </label>
                <input data-testid="goal-create-edit-target-input"
                  type="text"
                  id="target"
                  placeholder="e.g., 100%, $50,000, 10 units"
                  className="block w-full h-11 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm placeholder:text-slate-400"
                  {...register('target')}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-slate-700">
                  Key Results / Milestones
                </label>
                <button data-testid="goal-create-edit-add-milestone-btn"
                  type="button"
                  onClick={addMilestone}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  + Add Milestone
                </button>
              </div>
              <div className="space-y-3">
                {milestones.map((value, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input data-testid={`goal-create-edit-milestone-${index}-input`}
                      type="text"
                      placeholder={`Milestone ${index + 1}`}
                      value={value}
                      onChange={(event) => updateMilestone(index, event.target.value)}
                      className="flex-1 h-10 px-3 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm placeholder:text-slate-400"
                    />
                    <button data-testid={`goal-create-edit-milestone-${index}-remove-btn`}
                      type="button"
                      onClick={() => removeMilestone(index)}
                      aria-label={`Remove milestone ${index + 1}`}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Visibility</label>
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input data-testid="goal-create-edit-visibility-private"
                    type="radio"
                    value="private"
                    className="h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                    {...register('visibility')}
                  />
                  <span className="text-sm text-slate-700">Private (Only me)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input data-testid="goal-create-edit-visibility-manager"
                    type="radio"
                    value="manager"
                    className="h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                    {...register('visibility')}
                  />
                  <span className="text-sm text-slate-700">Manager only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input data-testid="goal-create-edit-visibility-team"
                    type="radio"
                    value="team"
                    className="h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                    {...register('visibility')}
                  />
                  <span className="text-sm text-slate-700">Team members</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <Link
                to="/employee/performance"
                className="h-11 px-5 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all inline-flex items-center justify-center"
                data-testid="goal-create-edit-cancel-link"
              >
                Cancel
              </Link>
              <button data-testid="goal-create-edit-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="h-11 px-5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Create Goal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
