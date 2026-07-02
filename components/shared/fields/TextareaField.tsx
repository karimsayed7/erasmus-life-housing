"use client"
import React from 'react'
import { FieldProp } from '@/schema/ProfileSchema'
import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Controller, FieldValues } from "react-hook-form"
import { useTranslations } from "next-intl"

export default function TextareaField<TFieldValues extends FieldValues = FieldValues>({ form, isEditing, label, name, transilation }: FieldProp<TFieldValues>) {
  const t = useTranslations(transilation)

  return (
    <div className='space-y-5 mt-5'>
      <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`rhf-${name}`} className="text-sm sm:text-base text-gray-700">
              {t(label || '')}
            </FieldLabel>
            <Textarea
              {...field}
              id={`rhf-${name}`}
              aria-invalid={fieldState.invalid}
              placeholder="Enter a Description"
              className="min-h-[200px]"
              readOnly={!isEditing}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </div>
  )
}