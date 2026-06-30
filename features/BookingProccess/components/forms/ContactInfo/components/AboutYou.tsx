"use client"
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import {FormProp} from "@/types/BookingProps"
import { Controller } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { useTranslations } from "next-intl"

export default function AboutYou({ form }: FormProp) {
  const t = useTranslations("bookingProcess.contactInfo");

  return (
    <>
      <Controller name="about" control={form.control} render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="rhf-about" className="text-sm sm:text-base"> {t("aboutYou")} </FieldLabel>
          <Textarea
            {...field}
            id="form-rhf-textarea-about"
            aria-invalid={fieldState.invalid}
            placeholder={t("aboutYouPlaceholder")}
            className="min-h-[120px] mb-3 text-sm sm:text-base"
          />
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}/>
    </>
  )
}