import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';

const schema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required.'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters.'),
    confirmPassword: z.string().min(8, 'Please confirm your new password.'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof schema>;

export default function ChangePassword() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const onSubmit = async (_data: FormValues) => {
    // wired to auth API in Phase 7 integration
  };

  return (
    <div
      className="flex-1 overflow-y-auto bg-[#F8FAFC] flex items-center justify-center p-6"
      data-testid="change-password-page"
    >
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link
            to="/employee/profile"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
            data-testid="change-password-back-link"
          >
            <span aria-hidden="true">&larr;</span>
            Back to Profile
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
          <div className="text-center mb-8">
            <div
              className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4 text-blue-600 text-2xl"
              aria-hidden="true"
            >
              &#128274;
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Change Password</h1>
            <p className="text-sm text-slate-500 mt-1">
              Keep your account secure with a strong password.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label
                htmlFor="current-password"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Current Password
              </label>
              <div className="relative">
                <input data-testid="change-password-current-input"
                  type={showCurrent ? 'text' : 'password'}
                  id="current-password"
                  placeholder="Enter current password"
                  className="block w-full h-11 pl-3 pr-10 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm placeholder:text-slate-400"
                  {...register('currentPassword')}
                />
                <button data-testid="change-password-current-toggle-btn"
                  type="button"
                  onClick={() => setShowCurrent((prev) => !prev)}
                  aria-label={showCurrent ? 'Hide current password' : 'Show current password'}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showCurrent ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.currentPassword ? (
                <p
                  className="text-xs text-red-600 mt-1 font-medium"
                  data-testid="change-password-current-error"
                >
                  {errors.currentPassword.message}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                New Password
              </label>
              <div className="relative">
                <input data-testid="change-password-new-input"
                  type={showNew ? 'text' : 'password'}
                  id="new-password"
                  placeholder="Enter new password"
                  className="block w-full h-11 pl-3 pr-10 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm placeholder:text-slate-400"
                  {...register('newPassword')}
                />
                <button data-testid="change-password-new-toggle-btn"
                  type="button"
                  onClick={() => setShowNew((prev) => !prev)}
                  aria-label={showNew ? 'Hide new password' : 'Show new password'}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showNew ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.newPassword ? (
                <p
                  className="text-xs text-red-600 mt-1 font-medium"
                  data-testid="change-password-new-error"
                >
                  {errors.newPassword.message}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input data-testid="change-password-confirm-input"
                  type={showConfirm ? 'text' : 'password'}
                  id="confirm-password"
                  placeholder="Confirm new password"
                  className="block w-full h-11 pl-3 pr-10 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-sm placeholder:text-slate-400"
                  {...register('confirmPassword')}
                />
                <button data-testid="change-password-confirm-toggle-btn"
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showConfirm ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.confirmPassword ? (
                <p
                  className="text-xs text-red-600 mt-1 font-medium"
                  data-testid="change-password-confirm-error"
                >
                  {errors.confirmPassword.message}
                </p>
              ) : null}
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-xs font-semibold text-slate-700 mb-2">Password Requirements:</p>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="text-emerald-500" aria-hidden="true">
                    &#10004;
                  </span>
                  At least 8 characters
                </li>
                <li className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="text-slate-300" aria-hidden="true">
                    &#10004;
                  </span>
                  One uppercase letter
                </li>
                <li className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="text-slate-300" aria-hidden="true">
                    &#10004;
                  </span>
                  One lowercase letter
                </li>
                <li className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="text-slate-300" aria-hidden="true">
                    &#10004;
                  </span>
                  One number
                </li>
                <li className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="text-slate-300" aria-hidden="true">
                    &#10004;
                  </span>
                  One special character (!@#$%^&amp;*)
                </li>
              </ul>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button data-testid="change-password-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 px-5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Update Password
              </button>
              <Link
                to="/employee/profile"
                className="w-full h-11 px-5 rounded-lg text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all inline-flex items-center justify-center"
                data-testid="change-password-cancel-link"
              >
                Cancel
              </Link>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              data-testid="change-password-forgot-link"
            >
              Forgot your current password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
