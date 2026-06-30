"use client"
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller } from "react-hook-form"
import {FormProp} from "@/types/BookingProps"
import { useTranslations } from "next-intl"

export default function Email({ form }: FormProp) {
  const t = useTranslations("bookingProcess.contactInfo");

  return (
    <>
      <Controller name="email" control={form.control} render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="rhf-email" className="text-sm sm:text-base"> {t("email")} </FieldLabel>
          <Input id="rhf-email" {...field} autoComplete="off" aria-invalid={fieldState.invalid} placeholder={t("emailPlaceholder")} className="text-sm sm:text-base"/>
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}/>
    </>
  )
}