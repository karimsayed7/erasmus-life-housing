"use client"
import React from 'react'
import { FieldProp } from '@/schema/ProfileSchema'
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller } from "react-hook-form"
import { useTranslations } from "next-intl"
import { FieldValues } from "react-hook-form"

export default function InputField<TFieldValues extends FieldValues = FieldValues>({
  form, isEditing = true, label, name, transilation, type = "text"
}: FieldProp<TFieldValues>) {
    const t = useTranslations(transilation);
  
  return (
    <div>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`rhf-${name}`} className="text-sm sm:text-base text-gray-700">
              {t(label || '')}
            </FieldLabel>
            <Input
              id={`rhf-${name}`}
              {...field}
              type={type}
              onChange={(e) => {
                if (type === "number") {
                  const val = e.target.valueAsNumber
                  field.onChange(isNaN(val) ? "" : val)
                } else {
                  field.onChange(e.target.value)
                }
              }}
              readOnly={!isEditing}
              autoComplete="off"
              aria-invalid={fieldState.invalid}
              aria-readonly={!isEditing}
              className="text-sm sm:text-base disabled:opacity-50"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </div>
  )
}
