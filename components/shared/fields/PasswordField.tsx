"use client";
import React, { useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { FieldProp } from "@/schema/ProfileSchema";

export default function PasswordField<TFieldValues extends FieldValues = FieldValues>({
  form,
  label,
  name,
  transilation,
  autoComplete = "current-password",
}: FieldProp<TFieldValues> & { autoComplete?: string }) {
  const t = useTranslations(transilation);
  const [visible, setVisible] = useState(false);

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`rhf-${name}`} className="text-sm sm:text-base text-gray-700">
            {t(label || "")}
          </FieldLabel>
          <div className="relative">
            <Input
              id={`rhf-${name}`}
              {...field}
              type={visible ? "text" : "password"}
              placeholder="••••••••"
              autoComplete={autoComplete}
              aria-invalid={fieldState.invalid}
              className="text-sm sm:text-base pr-10"
            />
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              tabIndex={-1}
              aria-label={visible ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              {visible ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}