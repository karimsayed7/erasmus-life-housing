"use client"
import React, { useState } from 'react'
import { BookingRoomProcessProps } from "@/types/BookingProps";
import RoomImage from "../../../../components/shared/RoomCard/RoomImage"
import { useLocale } from "next-intl";
import { getLocalized } from '../../../../types/GetLocalized';
import { useTranslations } from "next-intl";
import { MapPinPen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller } from "react-hook-form"

const DEMO_PROMO_CODE = "KARIM7"
const DISCOUNT_PERCENTAGE = 10

export default function BookingRoomCard({
  room,
  checkIn,
  checkOut,
  form
}: BookingRoomProcessProps) {
  const locale = useLocale();
  const t = useTranslations("RentARoom");
  const tBooking = useTranslations("bookingProcess.roomCard");

  const [discountApplied, setDiscountApplied] = useState(false)
  const [promoError, setPromoError] = useState("")

  const discountedTotal = room.total
    ? +(room.total * (1 - DISCOUNT_PERCENTAGE / 100)).toFixed(2)
    : 0

  function handleApplyPromo() {
    const code = form.getValues("promoCode")
    if (code === DEMO_PROMO_CODE) {
      setDiscountApplied(true)
      setPromoError("")
    } else {
      setDiscountApplied(false)
      setPromoError(tBooking("invalidPromo"))
    }
  }

  return ( 
    <div className='rounded-xl border-3 shadow-md border-gray-200 p-3 sm:p-4'>
        <div className="relative h-52 sm:h-60 md:h-70 overflow-hidden rounded-lg bg-gray-100">
            {room.images?.[0] ? (
                <RoomImage
                    src={room.images[0]}
                    alt={getLocalized(room.title, locale)}
                    noImageText={t("Filters.noImage")}
                />
                ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-500 text-xs sm:text-sm font-medium">
                    {t("Filters.noImage")}
                </div>
            )}
        </div>

        {/* Title */}
        <h1 className='my-2 sm:my-3 font-bold text-base sm:text-lg'>
            {getLocalized(room.title, locale)}
        </h1>

        {/* Location */}
        <div className='flex items-center gap-1.5 sm:gap-2'>
            <MapPinPen size={20} fill='#1e2939' className='text-white shrink-0 sm:size-[25px]'/>
            <p className='text-gray-500 text-sm sm:text-base'>{getLocalized(room.location, locale)}</p>
        </div>

        {/* Check in / Check out */}
        <div className='flex items-center justify-between my-4 sm:my-5'>
            <p className='font-bold text-sm sm:text-base'>
                {tBooking("checkIn")}: <span className='text-gray-500 font-medium'>{checkIn}</span>
            </p>
            <p className='font-bold text-sm sm:text-base'>
                {tBooking("checkOut")}: <span className='text-gray-500 font-medium'>{checkOut}</span>
            </p>
        </div>

        {/* Price Details */}
        <h3 className='font-bold mb-3 sm:mb-4 text-sm sm:text-base'>{tBooking("priceDetails")}</h3>
        <div className='space-y-2 sm:space-y-3'>
            <div className='flex items-center justify-between'>
                <p className='text-gray-500 text-xs sm:text-sm md:text-base'>{tBooking("monthly")}</p>
                <span className='font-semibold text-sm sm:text-[15px] md:text-[17px]'>{room.price}€</span>
            </div>
            <div className='flex items-center justify-between'>
                <p className='text-gray-500 text-xs sm:text-sm md:text-base'>{tBooking("bills")}</p>
                <span className='font-semibold text-sm sm:text-[15px] md:text-[17px]'>{room.bills}€</span>
            </div>
            <div className='flex items-center justify-between'>
                <p className='text-gray-500 text-xs sm:text-sm md:text-base'>{tBooking("fee")}</p>
                <span className='font-semibold text-sm sm:text-[15px] md:text-[17px]'>{room.fee}€</span>
            </div>

            {/* Total row */}
            <div className='flex items-center justify-between pt-1 '>
                <p className='font-bold text-sm sm:text-[16px]'>{tBooking("total")}</p>
                <div className='flex items-center gap-1.5 sm:gap-2'>
                    {discountApplied && (
                        <>
                            <span className='font-bold text-base sm:text-[18px] text-green-600'>
                                {discountedTotal}€
                            </span>
                            <span className='line-through text-gray-400 text-sm sm:text-[16px]'>
                                {room.total}€
                            </span>
                        </>
                    )}
                    {!discountApplied && (
                        <span className='font-bold text-base sm:text-[18px]'>{room.total}€</span>
                    )}
                </div>
            </div>

            {/* Discount badge */}
            {discountApplied && (
                <div className='flex justify-end'>
                    <span className='text-xs sm:text-sm text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full'>
                        {tBooking("discountApplied", { discount: DISCOUNT_PERCENTAGE })}
                    </span>
                </div>
            )}
        </div>

        {/* Promo Code */}
        <Controller name="promoCode" control={form.control} render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className='mb-4'>
                <FieldLabel htmlFor="rhf-promoCode" className="text-sm sm:text-[16px] mt-4 sm:mt-5">
                    {tBooking("addPromoCode")}
                </FieldLabel>
                <div className='flex items-center gap-2 sm:gap-3'>
                    <Input
                        id="rhf-promoCode"
                        {...field}
                        autoComplete="off"
                        aria-invalid={fieldState.invalid}
                        placeholder={tBooking("promoPlaceholder")}
                        className="text-sm sm:text-base"
                        onChange={(e) => {
                            field.onChange(e)
                            if (discountApplied) setDiscountApplied(false)
                            setPromoError("")
                        }}
                    />
                    <Button
                        type="button"
                        className='px-3 py-2 sm:p-5 text-sm sm:text-base cursor-pointer shrink-0'
                        onClick={handleApplyPromo}
                    >
                        {tBooking("apply")}
                    </Button>
                </div>

                {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                )}

                {promoError && (
                    <p className='text-xs sm:text-sm text-red-500 mt-1'>{promoError}</p>
                )}

                <p className='mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500'>
                    {tBooking("demoPromoCode")} <span className='font-bold text-gray-800'>KARIM7</span>
                </p>
            </Field>
        )}/>
    </div>
  )
}