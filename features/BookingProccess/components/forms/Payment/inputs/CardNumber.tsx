"use client"
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import {FormProp} from "@/types/BookingProps"
import { Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { CircleQuestionMark } from 'lucide-react';
import { useTranslations } from "next-intl"

export default function CardNumber({ form }: FormProp) {
  const t = useTranslations("bookingProcess.payment");

  return (
    <>
      <Controller name="cardNumber" control={form.control} render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="rhf-cardNumber" className="text-sm sm:text-base"> {t("cardNumber")} </FieldLabel>
          <div className="relative">
            <Input id="rhf-cardNumber" {...field} autoComplete="off" aria-invalid={fieldState.invalid} placeholder={t("cardNumberPlaceholder")} className="px-12 text-sm sm:text-base"/>
            <Image src={"/assets/credit.svg"} alt="credit" width={37} height={50} className="absolute top-2 left-1"/>
            <CircleQuestionMark size={20} className="absolute right-3 top-3 text-gray-400"/>
          </div>
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}/>
    </>
  )
}