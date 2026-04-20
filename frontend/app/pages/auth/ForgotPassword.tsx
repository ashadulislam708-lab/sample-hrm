import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

type View = 'form' | 'success';

export default function ForgotPassword() {
  const [view, setView] = useState<View>('form');
  const [submittedEmail, setSubmittedEmail] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    // TODO: wire to /auth/forgot-password in Phase 7 integration
    setSubmittedEmail(data.email);
    setView('success');
  };

  const handleResend = () => {
    setView('form');
    reset();
  };

  return (
    <div
      className="w-full max-w-[420px] bg-white rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_2px_4px_-1px_rgba(0,0,0,0.02)] border border-slate-200 p-8 relative overflow-hidden"
      data-testid="forgot-password-page"
    >
      {view === 'form' && (
        <div className="transition-opacity duration-300">
          {/* Logo */}
          <div className="flex flex-col items-center justify-center mb-8">
            <div
              className="w-16 h-16 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4"
              aria-hidden="true"
            >
              <span className="text-2xl font-semibold">P</span>
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Reset Password</h2>
            <p className="mt-2 text-sm text-slate-500 text-center leading-relaxed">
              Enter your email and we'll send you a reset link to get back into your account.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Email Input */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <input data-testid="forgot-password-email-input"
                  type="email"
                  id="email"
                  className="block w-full pl-3 pr-3 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm transition-all shadow-sm"
                  placeholder="name@company.com"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p
                  className="text-xs text-red-600 mt-1 font-medium"
                  data-testid="forgot-password-email-error"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button data-testid="forgot-password-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors h-[44px] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Send Reset Link
              </button>

              <div className="text-center">
                <Link
                  to="/login"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center gap-2 group"
                  data-testid="forgot-password-back-to-login-link"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      )}

      {view === 'success' && (
        <div className="text-center py-4" data-testid="forgot-password-success-view">
          <div
            className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
            aria-hidden="true"
          >
            <span className="text-2xl font-semibold">OK</span>
          </div>

          <h2 className="text-2xl font-semibold text-slate-900 tracking-tight mb-2">
            Check your email
          </h2>

          <p className="text-sm text-slate-500 leading-relaxed mb-8">
            We've sent a password reset link to
            <br />
            <strong
              className="text-slate-900 font-medium"
              data-testid="forgot-password-user-email"
            >
              {submittedEmail}
            </strong>
          </p>

          <div className="space-y-4">
            <button data-testid="forgot-password-open-email-btn"
              type="button"
              onClick={handleResend}
              className="w-full flex items-center justify-center py-2.5 px-4 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors h-[44px]"
            >
              Open Email App
            </button>

            <div className="flex items-center justify-center gap-1 text-sm text-slate-500">
              Didn't receive the email?
              <button data-testid="forgot-password-resend-btn"
                type="button"
                onClick={handleResend}
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                Click to resend
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center gap-2"
              data-testid="forgot-password-success-back-to-login-link"
            >
              Back to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
