"use client"
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import {FormProp} from "@/types/BookingProps"
import { Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"

export default function Phone({ form }: FormProp) {
  const t = useTranslations("bookingProcess.contactInfo");

  return (
    <>
      <Controller name="phone" control={form.control} render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="rhf-phone" className="text-sm sm:text-base"> {t("phone")}  </FieldLabel>
          <Input id="rhf-phone" {...field} autoComplete="off" aria-invalid={fieldState.invalid} placeholder={t("phonePlaceholder")} className="text-sm sm:text-base"/>
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}/>
    </>
  )
}