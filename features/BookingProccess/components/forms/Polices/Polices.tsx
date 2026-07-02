"use client"

import { FormProp } from "@/types/BookingProps"
import { useTranslations } from "next-intl"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { useFormState } from "react-hook-form"

export default function Polices({ form }: FormProp) {
  const { isSubmitting, isSubmitted, errors } = useFormState({ control: form.control })
  const hasErrors = isSubmitted && Object.keys(errors).length > 0
  const t = useTranslations("bookingProcess.policies")

  return (
    <AccordionItem
      value="polices"
      className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-5 px-4"
    >
      <AccordionTrigger className="font-bold text-base sm:text-lg">
        {t("title")}
      </AccordionTrigger>
      <AccordionContent className="text-sm sm:text-base text-gray-700 leading-relaxed">
        <p>
          {t("agreement1")}
        </p>
        <p className="mt-4">
          {t("agreement2Prefix")}{" "}
          <span className="text-blue-800 font-medium hover:underline cursor-pointer">
            {t("termsOfService")}
          </span>{" "}
          {t("agreement2Middle")}{" "}
          <span className="text-blue-800 font-medium hover:underline cursor-pointer">
            {t("privacyPolicy")}
          </span>
        </p>
        <div className="text-end mt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto py-5 text-sm sm:text-base font-semibold cursor-pointer mb-3"
          >
            {isSubmitting ? t("processing") : t("confirmAndBook")}
          </Button>
          {hasErrors && (
            <p className="flex items-center justify-center gap-2 text-md text-red-500 text-center">
               {t("validationError")}
            </p>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}