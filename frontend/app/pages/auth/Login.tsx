import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (_data: LoginFormValues) => {
    // TODO: wire to auth API in Phase 7 integration
  };

  return (
    <div
      className="w-full max-w-[420px] bg-white rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
      data-testid="login-page"
    >
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <div
          className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-sm mb-3"
          aria-hidden="true"
        >
          P
        </div>
        <p className="text-base text-slate-500 font-normal">Potential AI</p>
        <h2 className="text-2xl font-semibold text-slate-900 mt-2 tracking-tight">Sign In</h2>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Email Input */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-[13px] font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative group">
            <input data-testid="login-email-input"
              type="email"
              id="email"
              className="block w-full pl-3 pr-3 h-[44px] rounded-lg border border-slate-200 text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
              placeholder="name@company.com"
              {...register('email')}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-600 mt-1 font-medium" data-testid="login-email-error">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-[13px] font-medium text-gray-700">
            Password
          </label>
          <div className="relative group">
            <input data-testid="login-password-input"
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="block w-full pl-3 pr-10 h-[44px] rounded-lg border border-slate-200 text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
              placeholder="Enter your password"
              {...register('password')}
            />
            <button data-testid="login-password-toggle-btn"
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && (
            <p
              className="text-xs text-red-600 mt-1 font-medium"
              data-testid="login-password-error"
            >
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="pt-2">
          <button data-testid="login-submit-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full h-[44px] flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Sign In
          </button>

          <div className="text-center mt-4">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              data-testid="login-forgot-password-link"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
