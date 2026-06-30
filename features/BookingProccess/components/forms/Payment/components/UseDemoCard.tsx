"use client"
import React from 'react'
import {FormProp} from "@/types/BookingProps"
import { Controller } from "react-hook-form"
import { Checkbox } from '@/components/ui/checkbox'
import { useTranslations } from "next-intl"

export default function UseDemoCard({ form }: FormProp) {
  const t = useTranslations("bookingProcess.payment");

  return (
    <>
      <Controller
        name="useDemoCard"
        control={form.control}
        render={({ field }) => (
            <div className="flex items-center gap-2 my-5">
                <Checkbox
                    id="useDemoCardCheckbox" // 1. أضفنا id فريد هنا
                    checked={field.value}
                    onCheckedChange={(checked) => {
                    field.onChange(checked);

                    if (checked) {
                        form.setValue("cardNumber", "4242424242424242");
                        form.setValue("expiryDate", "12/30");
                        form.setValue("securityNumber", "123");
                    } else {
                        form.setValue("cardNumber", "");
                        form.setValue("expiryDate", "");
                        form.setValue("securityNumber", "");
                    }

                    form.trigger([
                        "cardNumber",
                        "expiryDate",
                        "securityNumber",
                    ]);
                    }}
                />

                <label 
                  htmlFor="useDemoCardCheckbox" 
                  className="text-sm sm:text-base cursor-pointer select-none"
                >
                    {t("useDemoCard")}
                </label>
            </div>
        )}
        />
    </>
  )
}