import { z } from "zod";
import type { useTranslations } from "next-intl";

type TFunc = ReturnType<typeof useTranslations>;

export const createSignInSchema = (t: TFunc) =>
  z.object({
    email: z.string().min(1, t("emailRequired")).email(t("emailInvalid")),
    password: z.string().min(1, t("passwordRequired")),
    rememberMe: z.boolean().optional(),
  });
export type SignInFormData = z.infer<ReturnType<typeof createSignInSchema>>;

export const createSignUpSchema = (t: TFunc) =>
  z.object({
    name: z.string().min(2, t("nameRequired")),
    email: z.string().min(1, t("emailRequired")).email(t("emailInvalid")),
    phone: z.string().min(8, t("phoneInvalid")),
    password: z.string().min(8, t("passwordMinLength")),
    agreeTerms: z.boolean().refine((v) => v === true, {
      message: t("mustAgreeTerms"),
    }),
  });
export type SignUpFormData = z.infer<ReturnType<typeof createSignUpSchema>>;

export const createForgotPasswordSchema = (t: TFunc) =>
  z.object({
    email: z.string().min(1, t("emailRequired")).email(t("emailInvalid")),
  });
export type ForgotPasswordFormData = z.infer<ReturnType<typeof createForgotPasswordSchema>>;

export const createResetPasswordSchema = (t: TFunc) =>
  z
    .object({
      password: z.string().min(8, t("passwordMinLength")),
      confirmPassword: z.string().min(1, t("confirmPasswordRequired")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwordsDontMatch"),
      path: ["confirmPassword"],
    });
export type ResetPasswordFormData = z.infer<ReturnType<typeof createResetPasswordSchema>>;