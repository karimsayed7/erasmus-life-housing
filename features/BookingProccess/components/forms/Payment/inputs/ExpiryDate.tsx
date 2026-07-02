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

export default function ExpiryDate({ form }: FormProp) {
  const t = useTranslations("bookingProcess.payment");

  return (
    <>
      <Controller name="expiryDate" control={form.control} render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="w-full">
          <FieldLabel htmlFor="rhf-expiryDate" className="text-sm sm:text-base"> {t("expiryDate")} </FieldLabel>
          <div>
            <Input id="rhf-expiryDate" {...field} autoComplete="off" aria-invalid={fieldState.invalid} placeholder="MM/YY" className="text-sm sm:text-base"/>
          </div>
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}/>
    </>
  )
}