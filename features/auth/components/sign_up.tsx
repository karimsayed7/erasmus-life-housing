"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSignUp from "../hooks/use-sign-up";
import { useTranslations } from "next-intl";
import { createSignUpSchema, SignUpFormData } from "@/schema/AuthSchema";
import InputField from "@/components/shared/fields/InputField";
import PasswordField from "@/components/shared/fields/PasswordField";

function Sign_up() {
  const router = useRouter();
  const { error, success, loading, handleSignUp } = useSignUp();
  const t = useTranslations("SignUp");
  const tValidation = useTranslations("Validation");

  const signUpSchema = useMemo(() => createSignUpSchema(tValidation), [tValidation]);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", phone: "", password: "", agreeTerms: false },
    mode: "onTouched",
  });

  const onSubmit = (data: SignUpFormData) => {
    handleSignUp(data.email, data.password, data.phone, data.name);
  };

  return (
    <div className="h-full flex flex-col md:flex-row w-full bg-white">
      <div className="hidden md:block md:w-1/2 relative min-h-screen">
        <Image src="/assets/sign up.png" alt="Erasmus Life Housing Sign Up" fill priority className="object-cover" />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-between min-h-screen p-4 md:p-6 lg:p-8 xl:p-10 bg-white">
        <div className="hidden md:block h-8" />

        <div className="flex-1 flex flex-col justify-center max-w-[400px] w-full mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-[#1e3a8a] tracking-tight mb-2">{t("title")}</h1>
            <p className="text-gray-500 text-sm font-medium">{t("subtitle")}</p>
          </div>

          {success ? (
            <div className="text-center space-y-4">
              <div className="text-green-600 bg-green-50 border border-green-200 rounded-lg px-4 py-4 text-sm">
                ✅ {t("successMessage")}
              </div>
              <button
                onClick={() => router.push("/sign_in")}
                className="text-sm font-semibold text-[#1e3a8a] hover:text-[#172e6e] transition"
              >
                {t("goToSignIn")}
              </button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <InputField form={form} name="name" label="name" transilation="SignUp" />
              <InputField form={form} name="email" label="email" transilation="SignUp" />
              <InputField form={form} name="phone" label="phone" transilation="SignUp" />
              <PasswordField
                form={form}
                name="password"
                label="password"
                transilation="SignUp"
                autoComplete="new-password"
              />

              {error && (
                <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                  {error}
                </p>
              )}

              <div className="flex flex-col text-xs sm:text-sm">
                <label className="flex items-center text-gray-600 cursor-pointer select-none">
                  <Controller
                    name="agreeTerms"
                    control={form.control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        checked={!!field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2 cursor-pointer"
                      />
                    )}
                  />
                  {t("agreeTerms")}
                </label>
                {form.formState.errors.agreeTerms && (
                  <p className="text-red-500 text-xs mt-1">{t("mustAgreeTerms" as never) ?? "Required"}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-[#224294] hover:bg-[#1b3576] active:bg-[#152a5e] text-white font-semibold rounded-lg shadow-sm transition duration-150 ease-in-out cursor-pointer text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? t("creatingAccount") : t("signUp")}
              </button>

              <div className="text-center text-sm text-gray-600 pt-4">
                {t("alreadyHaveAccount")}{" "}
                <Link href="/sign_in" className="font-semibold text-[#1e3a8a] hover:text-[#172e6e] transition">
                  {t("signIn")}
                </Link>
              </div>
            </form>
          )}
        </div>

        <div className="text-center text-xs text-gray-400 pt-8">© ErasmusLifeHousing</div>
      </div>
    </div>
  );
}

export default Sign_up;