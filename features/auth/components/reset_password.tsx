"use client";

import Image from 'next/image';
import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
// import useResetPassword from '../../hooks/use-reset-password';
import useResetPassword from '../hooks/use-reset-password';

function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { error, success, loading, handleResetPassword } = useResetPassword();
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full bg-white">
      {/* Left side: Hero Image */}
      <div className="hidden md:block md:w-1/2 relative min-h-screen">
        <Image
          src="/assets/sign in.png"
          alt="Erasmus Life Housing Reset Password"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Right side: Reset Password Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-between min-h-screen p-4 md:p-6 lg:p-8 xl:p-10 bg-white">
        <div className="hidden md:block h-8" />

        <div className="flex-1 flex flex-col justify-center max-w-100 w-full mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-[#1e3a8a] tracking-tight mb-2">Set new password</h1>
            <p className="text-gray-500 text-sm font-medium">Please enter your new password below.</p>
          </div>

          {success ? (
            <div className="text-center space-y-4">
              <div className="text-green-600 bg-green-50 border border-green-200 rounded-lg px-4 py-4 text-sm leading-relaxed">
                ✅ Password updated successfully! You can now log in with your new password.
              </div>
              <button
                onClick={() => router.push('/sign_in')}
                className="w-full py-3 px-4 bg-[#224294] hover:bg-[#1b3576] active:bg-[#152a5e] text-white font-semibold rounded-lg shadow-sm transition duration-150 ease-in-out cursor-pointer text-sm"
              >
                Go to Sign in
              </button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={(e) => {handleResetPassword(e, password, confirmPassword)}}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="password">
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-sm text-gray-900 placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="confirm-password">
                  Confirm New Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-sm text-gray-900 placeholder-gray-400"
                  required
                />
              </div>

              {/* Error message */}
              {error && (
                <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-[#224294] hover:bg-[#1b3576] active:bg-[#152a5e] text-white font-semibold rounded-lg shadow-sm transition duration-150 ease-in-out cursor-pointer text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating password...' : 'Update password'}
              </button>
            </form>
          )}
        </div>

        <div className="text-center text-xs text-gray-400 pt-8">
          © ErasmusLifeHousing
        </div>
      </div>
    </div>
  );
}

function Reset_password() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1e3a8a]"></div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}

export default Reset_password;
