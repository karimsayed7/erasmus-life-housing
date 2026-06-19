"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useSignIn from '../hooks/use-sign-in';
import { useTranslations } from "next-intl";

function Sign_in() {
  const t = useTranslations("SignIn");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {handleDemoAdmin, handleGoogleLogin, handleSignIn, error, loading} = useSignIn();

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full bg-white">
      {/* Left side: Hero Image */}
      <div className="hidden md:block md:w-1/2 relative min-h-screen">
        <Image
          src="/assets/sign in.png"
          alt="Erasmus Life Housing"
          fill
          preload
          className="object-cover"
        />
      </div>

      {/* Right side: Sign In Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-between min-h-screen p-4 md:p-6 lg:p-8 xl:p-10 bg-white">
        <div className="hidden md:block h-8" />

        <div className="flex-1 flex flex-col justify-center max-w-100 w-full mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-[#1e3a8a] tracking-tight mb-2">{t("title")}</h1>
            <p className="text-gray-500 text-sm font-medium">{t("subtitle")}</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => {
            handleSignIn(e,email, password);
          }}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">
                {t("email")}
              </label>
              <input
                id="email"
                type="email"
                placeholder={t("emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition text-sm text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="password">
                {t("password")}
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

            <div className="flex items-center justify-between text-xs sm:text-sm">
              <label className="flex items-center text-gray-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2 cursor-pointer"
                />
                {t("rememberMe")}
              </label>
              <Link href="/forgot_password" className="font-semibold text-[#1e3a8a] hover:text-[#172e6e] transition">
                {t("forgotPassword")}
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#224294] hover:bg-[#1b3576] active:bg-[#152a5e] text-white font-semibold rounded-lg shadow-sm transition duration-150 ease-in-out cursor-pointer text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? t("signingIn") : t("signIn")}
            </button>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <button
                type="button"
                className="flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                onClick={handleGoogleLogin}
              >
                <Image src="/assets/google.png" alt="Google" width={30} height={20} className=" w-auto object-contain" />
                <p className='text-blue-900'>{t("continueWithGoogle")}</p>
              </button>
              <button
                type="button"
                onClick={handleDemoAdmin}
                disabled={loading}
                className="flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer disabled:opacity-60"
              >
                <p>
                  {t("continueAsDemoAdmin")}
                </p>
              </button>
            </div>

            <div className="text-center text-sm text-gray-600 pt-4">
              {t("dontHaveAccount")}
              <Link href="/sign_up" className="font-semibold text-[#1e3a8a] hover:text-[#172e6e] transition">
                {t("signUp")}
              </Link>
            </div>
          </form>
        </div>

        <div className="text-center text-xs text-gray-400 pt-8">
          © ErasmusLifeHousing
        </div>
      </div>
    </div>
  );
}

export default Sign_in;