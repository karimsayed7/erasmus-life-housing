"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useForgetPassword from '@/features/auth/hooks/use-forget-password';
import { useTranslations } from "next-intl";

function Forgot_password() {
  const [email, setEmail] = useState('');
  const { error, success, loading, handleResetPassword } = useForgetPassword();
  const t = useTranslations("ForgotPassword");

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full bg-white">
      {/* Left side: Hero Image */}
      <div className="hidden md:block md:w-1/2 relative min-h-screen">
        <Image
          src="/assets/sign in.png"
          alt="Erasmus Life Housing Forgot Password"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Right side: Forgot Password Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-between min-h-screen p-4 md:p-6 lg:p-8 xl:p-10 bg-white">
        <div className="hidden md:block h-8" />

        <div className="flex-1 flex flex-col justify-center max-w-[400px] w-full mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-[#1e3a8a] tracking-tight mb-2">{t("title")}</h1>
            <p className="text-gray-500 text-sm font-medium">{t("subtitle")}</p>
          </div>

          {success ? (
            <div className="text-center space-y-4">
              <div className="text-green-600 bg-green-50 border border-green-200 rounded-lg px-4 py-4 text-sm leading-relaxed">
                ✅ {t("successMessage")}
              </div>
              <Link href="/sign_in" className="inline-block text-sm font-semibold text-[#1e3a8a] hover:text-[#172e6e] transition">
                {t("backToSignIn")}
              </Link>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={(e) => {handleResetPassword(e,email)}}>
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
                {loading ? t("sendingLink") : t("sendResetLink")}
              </button>

              <div className="text-center text-sm text-gray-600 pt-4">
                {t("rememberPassword")}
                <Link href="/sign_in" className="font-semibold text-[#1e3a8a] hover:text-[#172e6e] transition">
                  {t("signIn")}
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

export default Forgot_password;
