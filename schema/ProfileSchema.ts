import { z } from "zod";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

const optionalString = (schema: z.ZodString) =>
  schema
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val));

export const ProfileSchema = z.object({
  firstName: optionalString(
    z.string().min(2, "First name is required").max(50, "First name is too long")
  ),

  lastName: optionalString(
    z.string().min(2, "Last name is required").max(50, "Last name is too long")
  ),

  email: optionalString(z.string().email("Invalid email address")),

  gender: z.enum(["male", "female"]).optional(),

  phone_number: z.string().optional(),

  nationality: z.string().optional(),

  current_address: z.string().optional(),

  bookingRequestMessage: optionalString(
    z.string().max(1000, "Message is too long")
  ),

  employment_status: z.enum(["study", "work"]).optional(),

  where_you_study: z.string().optional(),

  funding_source: z.string().optional(),

  about_yourself: optionalString(
    z.string().max(2000, "Description is too long")
  ),
});

// Shape RHF works with while the user is typing (before the "" -> undefined transform runs).
// Use this for useForm<>, defaultValues, and the FormProp/FieldProp components.
export type ProfileFormValues = z.input<typeof ProfileSchema>;

// Shape you get in onSubmit, after zodResolver parses + transforms the data.
// Use this for the payload you send to Supabase.
export type ProfileFormType = z.output<typeof ProfileSchema>;

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
  type?: string;
}