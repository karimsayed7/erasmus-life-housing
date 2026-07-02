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

export default function SecurityNumber({ form }: FormProp) {
  const t = useTranslations("bookingProcess.payment");

  return (
    <>
      <Controller name="securityNumber" control={form.control} render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="w-full">
          <FieldLabel htmlFor="rhf-securityNumber" className="text-sm sm:text-base"> {t("securityNumber")} </FieldLabel>
          <div>
            <Input id="rhf-securityNumber" {...field} autoComplete="off" aria-invalid={fieldState.invalid} placeholder="XXX" className="text-sm sm:text-base"/>
          </div>
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}/>
    </>
  )
}