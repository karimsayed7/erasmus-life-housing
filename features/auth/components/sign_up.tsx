"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import useSignUp from '../../hooks/use-sign-up';
import useSignUp from '../hooks/use-sign-up';

function Sign_up() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const {error, success, loading, handleSignUp} = useSignUp();

  return (
    <div className="h-full flex flex-col md:flex-row w-full bg-white">
      {/* Left side: Hero Image */}
      <div className="hidden md:block md:w-1/2 relative min-h-screen">
        <Image
          src="/assets/sign up.png"
          alt="Erasmus Life Housing Sign Up"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Right side: Sign Up Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-between min-h-screen p-4 md:p-6 lg:p-8 xl:p-10 bg-white">
        <div className="hidden md:block h-8" />

        <div className="flex-1 flex flex-col justify-center max-w-[400px] w-full mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-[#1e3a8a] tracking-tight mb-2">Sign up</h1>
            <p className="text-gray-500 text-sm font-medium">Create your account to get started.</p>
          </div>

          {/* Success state */}
          {success ? (
            <div className="text-center space-y-4">
              <div className="text-green-600 bg-green-50 border border-green-200 rounded-lg px-4 py-4 text-sm">
                ✅ Account created! Check your email to confirm your account.
              </div>
              <button
                onClick={() => router.push('/sign-in')}
                className="text-sm font-semibold text-[#1e3a8a] hover:text-[#172e6e] transition"
              >
                Go to Sign in →
              </button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={(e) => {handleSignUp(e, email, password, phone, name)}}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-sm text-gray-900 placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-sm text-gray-900 placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="535 123 45 67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-sm text-gray-900 placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="password">
                  Password
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

              {/* Error message */}
              {error && (
                <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                  {error}
                </p>
              )}

              <div className="flex items-center text-xs sm:text-sm">
                <label className="flex items-center text-gray-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2 cursor-pointer"
                    required
                  />
                  I agree to the Terms & Conditions
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-[#224294] hover:bg-[#1b3576] active:bg-[#152a5e] text-white font-semibold rounded-lg shadow-sm transition duration-150 ease-in-out cursor-pointer text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Sign up'}
              </button>

              <div className="text-center text-sm text-gray-600 pt-4">
                Already have an account?{' '}
                <Link href="/sign_in" className="font-semibold text-[#1e3a8a] hover:text-[#172e6e] transition">
                  Sign in
                </Link>
              </div>
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

export default Sign_up;