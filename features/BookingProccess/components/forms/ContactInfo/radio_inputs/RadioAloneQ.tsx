"use client"
import {
  Field,
  FieldError,
  FieldLabel,
  FieldSet,
  FieldLegend  
} from "@/components/ui/field"
import {FormProp} from "@/types/BookingProps"
import { Controller } from "react-hook-form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useTranslations } from "next-intl"

export default function RadioAloneQ({ form }: FormProp) {
  const t = useTranslations("bookingProcess.contactInfo");

  return (
    <>
      <Controller name="alone" control={form.control} render={({ field, fieldState }) => (
        <FieldSet data-invalid={fieldState.invalid}>
          <FieldLegend className="text-sm sm:text-base mb-3"> {t("comingAloneQuestion")} </FieldLegend>
          <RadioGroup name={field.name} value={field.value} onValueChange={field.onChange} aria-invalid={fieldState.invalid}>
            <div className="flex gap-5 w-full sm:w-auto">
                <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                    <RadioGroupItem
                        value="yes"
                        id="rhf-alone-yes"
                        aria-invalid={fieldState.invalid}
                    />
                    <FieldLabel htmlFor="rhf-alone-yes" className="text-xs sm:text-sm">{t("comingAloneYes")}</FieldLabel>
                </Field>

                <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                    <RadioGroupItem
                        value="no"
                        id="rhf-alone-no"
                        aria-invalid={fieldState.invalid}
                    />
                    <FieldLabel htmlFor="rhf-alone-no" className="text-xs sm:text-sm">{t("comingAloneNo")}</FieldLabel>
                </Field>
            </div>
          </RadioGroup>
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </FieldSet>
      )}/>
    </>
  )
}