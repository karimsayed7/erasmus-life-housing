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

export default function RadioOccupatioeQ({ form }: FormProp) {
  const t = useTranslations("bookingProcess.contactInfo");

  return (
    <>
      <Controller name="occupation" control={form.control} render={({ field, fieldState }) => (
        <FieldSet data-invalid={fieldState.invalid}>
          <FieldLegend className="text-sm sm:text-base mb-3"> {t("studyOrWorkQuestion")} </FieldLegend>
          <RadioGroup name={field.name} value={field.value} onValueChange={field.onChange} aria-invalid={fieldState.invalid}>
            <div className="flex gap-5 w-full sm:w-auto">
                <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                    <RadioGroupItem
                        value="work"
                        id="rhf-occupation-work"
                        aria-invalid={fieldState.invalid}
                    />
                    <FieldLabel htmlFor="rhf-occupation-work" className="text-xs sm:text-sm">{t("studyOrWorkWork")}</FieldLabel>
                </Field>

                <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                    <RadioGroupItem
                        value="study"
                        id="rhf-occupation-study"
                        aria-invalid={fieldState.invalid}
                    />
                    <FieldLabel htmlFor="rhf-occupation-study" className="text-xs sm:text-sm">{t("studyOrWorkStudy")}</FieldLabel>
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