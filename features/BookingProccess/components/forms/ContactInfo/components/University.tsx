"use client"

import { Controller } from "react-hook-form"
import { FormProp } from "@/types/BookingProps"
import { useTranslations } from "next-intl"

import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const universities = [
  { value: "university-of-lisbon" },
  { value: "nova-university-lisbon" },
  { value: "university-of-porto" },
  { value: "porto-polytechnic" },
]

export default function University({ form }: FormProp) {
  const t = useTranslations("bookingProcess.contactInfo");

  return (
    <Controller
      name="university"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel className="text-sm sm:text-base">
            {t("universityQuestion")}
          </FieldLabel>

          <Select
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger className="w-full text-sm sm:text-base">
              <SelectValue placeholder={t("universityPlaceholder")} />
            </SelectTrigger>

            <SelectContent className="border-2 border-gray-500">
              {universities.map((university) => (
                <SelectItem key={university.value} value={university.value}>
                  <div className="flex flex-col text-sm sm:text-base">
                    <span>{t(`universityList.${university.value}`)}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  )
}