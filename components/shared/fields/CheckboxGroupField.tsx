"use client"

import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { useTranslations, useLocale } from "next-intl"
import * as Icons from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { CheckboxOption } from "@/lib/constants/roomOptions"

interface CheckboxGroupFieldProps<TFieldValues extends FieldValues = FieldValues> {
  form: UseFormReturn<TFieldValues>
  name: Path<TFieldValues>
  label: string
  transilation: string
  options: readonly CheckboxOption[]
  variant?: "grid" | "pills"
}

const GRID_COLS = "grid-cols-2 sm:grid-cols-3"

export default function CheckboxGroupField<TFieldValues extends FieldValues = FieldValues>({
  form,
  name,
  label,
  transilation,
  options,
  variant = "grid",
}: CheckboxGroupFieldProps<TFieldValues>) {
  const t = useTranslations(transilation)
  const locale = useLocale() as "en" | "pt"

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => {
        const selected = (field.value as string[]) ?? []

        function toggle(key: string, checked: boolean) {
          field.onChange(checked ? [...selected, key] : selected.filter((k) => k !== key))
        }

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel className="text-[17px] text-gray-800 mb-2 block">
              {t(label)}
            </FieldLabel>

            <div className={variant === "grid" ? `grid ${GRID_COLS} gap-x-6 gap-y-3` : "flex flex-wrap gap-2"}>
              {options.map((option) => {
                const Icon = (Icons[option.icon as keyof typeof Icons] as LucideIcon) ?? Icons.Circle
                const checked = selected.includes(option.key)
                const text = locale === "pt" ? option.pt : option.en

                if (variant === "pills") {
                  return (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => toggle(option.key, !checked)}
                      aria-pressed={checked}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-base transition-colors ${
                        checked ? "bg-blue-50 border-blue-600 text-blue-900" : "bg-gray-50 border-gray-200 text-gray-600"
                      }`}
                    >
                      <Icon size={15} />
                      {text}
                    </button>
                  )
                }

                return (
                  <label key={option.key} className="flex items-center gap-2 cursor-pointer text-base text-gray-700">
                    <Checkbox checked={checked} onCheckedChange={(v) => toggle(option.key, v === true)} />
                    <Icon size={16} className="text-gray-500" />
                    {text}
                  </label>
                )
              })}
            </div>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )
      }}
    />
  )
}