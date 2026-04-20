import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { z } from 'zod';

import { cn } from '~/lib/utils';

const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(8, 'Password must be at least 8 characters.'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters.'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

type View = 'form' | 'success';

type StrengthLabel = 'Weak' | 'Too short' | 'Fair' | 'Strong';

function computeStrength(value: string): { label: StrengthLabel; width: string; barClass: string; textClass: string } {
  if (value.length === 0) {
    return {
      label: 'Weak',
      width: '0%',
      barClass: 'bg-slate-200',
      textClass: 'text-slate-500',
    };
  }
  if (value.length < 8) {
    return {
      label: 'Too short',
      width: '25%',
      barClass: 'bg-red-500',
      textClass: 'text-red-500',
    };
  }
  let strength = 1;
  if (/[0-9]/.test(value) || /[^a-zA-Z0-9]/.test(value)) strength += 1;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) strength += 1;

  if (strength === 1) {
    return {
      label: 'Fair',
      width: '50%',
      barClass: 'bg-amber-500',
      textClass: 'text-amber-500',
    };
  }
  return {
    label: 'Strong',
    width: '100%',
    barClass: 'bg-emerald-500',
    textClass: 'text-emerald-500',
  };
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const [view, setView] = useState<View>('form');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: '', confirmPassword: '' },
  });

  const newPasswordValue = watch('newPassword') ?? '';
  const confirmPasswordValue = watch('confirmPassword') ?? '';
  const strength = computeStrength(newPasswordValue);
  const isMatch =
    confirmPasswordValue.length > 0 &&
    confirmPasswordValue === newPasswordValue &&
    newPasswordValue.length >= 8;

  const onSubmit = async (_data: ResetPasswordFormValues) => {
    // TODO: wire to /auth/reset-password in Phase 7 integration
    setView('success');
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div
      className="w-full max-w-[420px] bg-white rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_2px_4px_-1px_rgba(0,0,0,0.02)] border border-slate-200 p-8 relative overflow-hidden"
      data-testid="reset-password-page"
    >
      {view === 'form' && (
        <div className="transition-opacity duration-300">
          {/* Logo */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div
              className="w-16 h-16 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 ring-4 ring-blue-50/50"
              aria-hidden="true"
            >
              <span className="text-2xl font-semibold">P</span>
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">
              Create New Password
            </h2>
            <p className="mt-2 text-sm text-slate-500 text-center leading-relaxed">
              Your new password must be different from previous used passwords.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* New Password Input */}
            <div className="space-y-1.5">
              <label htmlFor="new-password" className="block text-sm font-medium text-slate-700">
                New Password
              </label>
              <div className="relative group">
                <input data-testid="reset-password-new-input"
                  type={showNewPassword ? 'text' : 'password'}
                  id="new-password"
                  className="block w-full pl-3 pr-10 h-[44px] border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm transition-all shadow-sm"
                  placeholder="Min. 8 characters"
                  {...register('newPassword')}
                />
                <button data-testid="reset-password-new-toggle-btn"
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                  aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
                >
                  {showNewPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              {/* Strength Indicator */}
              <div className="pt-1">
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={cn('h-full transition-all duration-300', strength.barClass)}
                    style={{ width: strength.width }}
                    data-testid="reset-password-strength-bar"
                  />
                </div>
                <div className="flex justify-between items-center mt-1.5">
                  <span
                    className={cn('text-xs font-medium', strength.textClass)}
                    data-testid="reset-password-strength-text"
                  >
                    {strength.label}
                  </span>
                  <span className="text-xs text-slate-400">Minimum 8 characters</span>
                </div>
              </div>
              {errors.newPassword && (
                <p
                  className="text-xs text-red-600 mt-1 font-medium"
                  data-testid="reset-password-new-error"
                >
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-slate-700"
              >
                Confirm Password
              </label>
              <div className="relative group">
                <input data-testid="reset-password-confirm-input"
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirm-password"
                  className={cn(
                    'block w-full pl-3 pr-16 h-[44px] border rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 text-sm transition-all shadow-sm',
                    isMatch
                      ? 'border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/20'
                      : 'border-slate-300 focus:border-blue-600 focus:ring-blue-600/20',
                  )}
                  placeholder="Re-enter password"
                  {...register('confirmPassword')}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2">
                  {isMatch && (
                    <span
                      className="text-emerald-500 text-sm font-semibold"
                      data-testid="reset-password-match-icon"
                      aria-label="Passwords match"
                    >
                      OK
                    </span>
                  )}
                  <button data-testid="reset-password-confirm-toggle-btn"
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                    aria-label={
                      showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'
                    }
                  >
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              {errors.confirmPassword && (
                <p
                  className="text-xs text-red-500 mt-1 font-medium"
                  data-testid="reset-password-match-error"
                >
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button data-testid="reset-password-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center h-[44px] px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      )}

      {view === 'success' && (
        <div className="text-center py-4" data-testid="reset-password-success-view">
          <div
            className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-green-50/50"
            aria-hidden="true"
          >
            <span className="text-2xl font-semibold">OK</span>
          </div>

          <h2 className="text-2xl font-semibold text-slate-900 tracking-tight mb-2">
            Password Reset
          </h2>

          <p className="text-sm text-slate-500 leading-relaxed mb-8">
            Your password has been successfully reset. <br />
            Click below to log in securely.
          </p>

          <button data-testid="reset-password-back-to-login-btn"
            type="button"
            onClick={handleBackToLogin}
            className="w-full flex items-center justify-center h-[44px] px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors"
          >
            Back to Login
          </button>

          <div className="sr-only">
            <Link to="/login" data-testid="reset-password-back-to-login-link">
              Back to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
