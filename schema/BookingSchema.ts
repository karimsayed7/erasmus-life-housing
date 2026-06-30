import { z } from "zod"
import { UseFormReturn } from "react-hook-form"

// ─── Zod Schema ─────────────────────────────────────────────
export const bookingSchema = z.object({
  // ── Contact Information ──────────────────────────────
  name: z.string().min(2, "Name must be at least 2 characters"),
  surname: z.string().min(2, "Surname must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-()]{7,15}$/, "Please enter a valid phone number"),
  alone: z.enum(["yes", "no"], { message: "Please select an option" }),
  occupation: z.enum(["work", "study"], { message: "Please select an option" }),
  university: z.string().min(1, "Please select your university"),
  about: z
  .string()
  .min(10, "Tell us a bit more (at least 10 characters)")
  .or(z.literal("")),

   // ── Payment ──────────────────────────────────────────

  cardNumber: z
    .string()
    .regex(/^\d{16}$/, "Card number must contain exactly 16 digits"),

  expiryDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Expiry date must be in MM/YY format"
    ),

  securityNumber: z
    .string()
    .regex(/^\d{3}$/, "CVV must contain exactly 3 digits"),

  useDemoCard: z.boolean(),

  promoCode: z.string().optional(),
})

export const getBookingSchema = (t: (key: string) => string) => z.object({
  name: z.string().min(2, t("validation.name")),
  surname: z.string().min(2, t("validation.surname")),
  email: z.string().email(t("validation.email")),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-()]{7,15}$/, t("validation.phone")),
  alone: z.enum(["yes", "no"], { message: t("validation.alone") }),
  occupation: z.enum(["work", "study"], { message: t("validation.occupation") }),
  university: z.string().min(1, t("validation.university")),
  about: z
    .string()
    .min(10, t("validation.about"))
    .or(z.literal("")),

  cardNumber: z
    .string()
    .regex(/^\d{16}$/, t("validation.cardNumber")),

  expiryDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      t("validation.expiryDate")
    ),

  securityNumber: z
    .string()
    .regex(/^\d{3}$/, t("validation.securityNumber")),

  useDemoCard: z.boolean(),

  promoCode: z.string().optional(),
})

export type BookingFormType = z.infer<typeof bookingSchema>

export interface ContactInfosProps {
  form: UseFormReturn<BookingFormType>
}
