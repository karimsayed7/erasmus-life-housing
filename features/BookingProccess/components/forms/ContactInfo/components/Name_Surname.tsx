import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import {FormProp} from "@/types/BookingProps"
import { Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"

export default function Name_Surname({ form }: FormProp) {
  const t = useTranslations("bookingProcess.contactInfo");

  return (
    <>
      <Controller name="name" control={form.control} render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="w-full">
          <FieldLabel htmlFor="rhf-name" className="text-sm sm:text-base"> {t("name")} </FieldLabel>
          <Input id="rhf-name" {...field} autoComplete="off" aria-invalid={fieldState.invalid} className="text-sm sm:text-base"/>
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}/>

      <Controller name="surname" control={form.control} render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="w-full">
          <FieldLabel htmlFor="rhf-surname" className="text-sm sm:text-base"> {t("surname")} </FieldLabel>
          <Input id="rhf-surname" {...field} autoComplete="off" aria-invalid={fieldState.invalid} className="text-sm sm:text-base"/>
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}/>
    </>
  )
}