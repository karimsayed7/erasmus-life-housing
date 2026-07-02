import { z } from "zod";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export const ProfileSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name is required")
    .max(50, "First name is too long").optional(),

  lastName: z
    .string()
    .min(2, "Last name is required")
    .max(50, "Last name is too long").optional(),

  email: z
    .string()
    .email("Invalid email address").optional(),

  // سيتم تفعيل الـ validation لاحقًا عند إضافة الـ inputs
  gender: z.enum(["male", "female"]).optional(),

  phone_number: z.string().optional(),

  nationality: z.string().optional(),

  current_address: z.string().optional(),

  bookingRequestMessage: z
    .string()
    .max(1000, "Message is too long")
    .optional(),

  employment_status:z.enum(["study", "work"]).optional(),

  where_you_study: z.string().optional(),

  funding_source: z.string().optional(),

  about_yourself: z
    .string()
    .max(2000, "Description is too long")
    .optional(),
});

export type ProfileFormType = z.infer<typeof ProfileSchema>;


export interface FormProp<TFieldValues extends FieldValues = FieldValues> {
  form: UseFormReturn<TFieldValues>;
  isEditing?: boolean;
}

export interface FieldProp<TFieldValues extends FieldValues = FieldValues> {
  form: UseFormReturn<TFieldValues>;
  isEditing?: boolean;
  label?: string;
  name: Path<TFieldValues>;   
  arr?: string[];
  transilation?: string;
}