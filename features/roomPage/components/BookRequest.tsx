"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useFavorites } from "@/features/favourites/useFavorites";
import { Heart } from "lucide-react";

function addOneMonth(date: Date): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + 1);
  return d;
}

function formatDateValue(date: Date): string {
  return date.toISOString().split("T")[0];
}

interface Prop {
  id: string;
  isLoggedIn: boolean;
  isRoomBooked: boolean;
  myBookingStatus: "none" | "pending" | "approved" | "rejected";
}

export default function BookRequest({ id, isLoggedIn, isRoomBooked, myBookingStatus }: Prop) {
  const t = useTranslations('roomPage');
  const { isFavorite, toggleFavorite } = useFavorites();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [checkIn, setCheckIn] = useState<Date>(today);
  const [checkOut, setCheckOut] = useState<Date>(addOneMonth(today));

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckIn = new Date(e.target.value);
    setCheckIn(newCheckIn);
    setCheckOut(addOneMonth(newCheckIn));
  };

  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckOut(new Date(e.target.value));
  };

  const minCheckOut = addOneMonth(checkIn);

  const isTaken = isRoomBooked;
  const isMyRequestPending = myBookingStatus === "pending";

  const isDisabled = !isLoggedIn || isTaken || isMyRequestPending;

  const buttonLabel = isTaken
    ? t('booked')
    : isMyRequestPending
    ? t('pendingApproval')
    : t('checkBooking');

  return (
    <div className="flex flex-col justify-between border h-125 border-gray-200 rounded-xl p-4 shadow-sm bg-white w-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">{t('bookingRequest')}</h2>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(id);
            }}
          >
            <Heart
              className={`cursor-pointer flex shrink-0 hover:fill-red-500 ${isFavorite(id) ? "fill-red-500 text-red-500" : ""}`}
            />
          </button>
        </div>

        {/* Date Inputs */}
        <div className="flex gap-3 mb-5">
          {/* Check In */}
          <div className="flex-1 border border-gray-200 rounded-lg p-3 hover:border-blue-400 transition-colors">
            <p className="text-md text-gray-500 mb-2">{t('checkIn')}:</p>
            <div>
              <input
                type="date"
                min={formatDateValue(today)}
                value={formatDateValue(checkIn)}
                onChange={handleCheckInChange}
                disabled={isDisabled}
                className="text-md font-medium text-gray-800 border-none outline-none w-full bg-transparent cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
          </div>

          {/* Check Out */}
          <div className="flex-1 border border-gray-200 rounded-lg p-3 hover:border-blue-400 transition-colors">
            <p className="text-md text-gray-500 mb-2">{t('checkOut')}:</p>
            <div className="flex items-center gap-2">
              <input
                type="date"
                min={formatDateValue(minCheckOut)}
                value={formatDateValue(checkOut)}
                onChange={handleCheckOutChange}
                disabled={isDisabled}
                className="text-md font-medium text-gray-800 border-none outline-none w-full bg-transparent cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      {isDisabled ? (
        <span
          aria-disabled="true"
          className="w-full bg-gray-300 cursor-not-allowed text-gray-600 text-center font-semibold py-3 rounded-lg"
        >
          {buttonLabel}
        </span>
      ) : (
        <Link
          href={`/rooms/${id}/booking?checkIn=${formatDateValue(checkIn)}&checkOut=${formatDateValue(checkOut)}`}
          className="w-full bg-[#25409C] hover:bg-[#1e3380] cursor-pointer text-white text-center font-semibold py-3 rounded-lg transition-colors"
        >
          {buttonLabel}
        </Link>
      )}
    </div>
  );
}