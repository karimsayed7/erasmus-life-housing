"use client"
import React from 'react'
import { FieldProp } from '@/schema/ProfileSchema'
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Controller } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTranslations } from "next-intl"
import { FieldValues } from "react-hook-form"


export default function SelectField<TFieldValues extends FieldValues = FieldValues>({ form, isEditing = true, label, name, arr, transilation }: FieldProp<TFieldValues>) {
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
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={!isEditing}
              name={field.name}
            >
              <SelectTrigger
                id={`rhf-${name}`}
                onBlur={field.onBlur}
                aria-invalid={fieldState.invalid}
                className="text-sm sm:text-base disabled:opacity-50 w-full"
              >
                <SelectValue placeholder={`Select ${name}`} />
              </SelectTrigger>
              <SelectContent>
                {
                    arr?.map((item) => (
                        <div key={item}>
                            <SelectItem value={item}>{item}</SelectItem>
                        </div>
                    ))
                }
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </div>
  )
}