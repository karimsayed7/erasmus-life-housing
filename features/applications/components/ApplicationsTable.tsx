"use client";
import { getLocalized } from "@/types/GetLocalized";
import { useOptimistic, useState, useTransition } from "react";
import { ChevronDown } from "lucide-react";
import { cancelRoomRequest } from "../actions";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Fragment } from "react";
import RowContent from "./RowContent";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Database } from "@/types/database";

type Room = Database["public"]["Tables"]["rooms"]["Row"];
type Booking = Database["public"]["Tables"]["bookings"]["Row"] & {
  room: Room;
};

export default function ApplicationsTable({
  initialBookings,
  initialError,
}: {
  initialBookings: Booking[];
  initialError: string | null;
}) {
  const locale = useLocale();
  const t = useTranslations("favourites and applications");

  const [optimisticBookings, removeOptimistically] = useOptimistic(
    initialBookings,
    (current, bookingIdToRemove: string) =>
      current.filter((b) => b.id !== bookingIdToRemove)
  );
  const [isPending, startTransition] = useTransition();

  const [openRows, setOpenRows] = useState<Set<string>>(new Set());

  function toggleRow(bookingId: string) {
    setOpenRows((prev) => {
      const next = new Set(prev);
      next.has(bookingId) ? next.delete(bookingId) : next.add(bookingId);
      return next;
    });
  }

  function handleCancel(bookingId: string) {
    startTransition(async () => {
      removeOptimistically(bookingId);
      await cancelRoomRequest(bookingId);
    });
  }

  if (initialError)
    return <p className="text-red-500 text-center">{initialError}</p>;

  return (
    <div className="px-5 sm:px-10 lg:px-20 xl:px-40">
      {optimisticBookings.length == 0 ? (
        <p className="mt-40 text-lg text-center font-semibold text-gray-400">
          No Room Applications Yet
        </p>
      ) : (
        <div className="border-2 rounded-2xl shadow-sm">
          <p className="font-semibold text-[16px] pl-9 py-5">
            {optimisticBookings.length} {t("request")}
          </p>
          <Table>
            <TableHeader>
              <TableRow className="font-semibold">
                <TableHead className="pl-9 font-semibold">{t("room")}</TableHead>
                <TableHead>{t("room type")}</TableHead>
                <TableHead>{t("price")}</TableHead>
                <TableHead>{t("location")}</TableHead>
                <TableHead>{t("application date")}</TableHead>
                <TableHead></TableHead>
                <TableHead>{t("more")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-gray-50">
              {optimisticBookings.map((booking) => {
                const isOpen = openRows.has(booking.id);
                const room = booking.room;
                return (
                  <Fragment key={booking.id}>
                    <TableRow
                      onClick={() => toggleRow(booking.id)}
                      className="cursor-pointer"
                    >
                      <TableCell className="pl-10">
                        <div className="relative h-12 w-20 overflow-hidden rounded-md">
                          {room.images?.[0] ? (
                            <Image
                              src={room.images[0]}
                              alt={getLocalized(room.title, locale)}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center bg-gray-200 justify-center">
                              No image
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getLocalized(room.room_type, locale)}</TableCell>
                      <TableCell>{room.price}€</TableCell>
                      <TableCell>{getLocalized(room.location, locale)}</TableCell>
                      <TableCell>
                        {new Date(booking.created_at).toLocaleDateString(locale)}
                      </TableCell>
                      <TableCell>
                        {getLocalized(booking.approval_status, locale)}
                      </TableCell>
                      <TableCell className="text-left">
                        <ChevronDown
                          className={cn(
                            "size-4 transition-transform",
                            isOpen && "rotate-180"
                          )}
                        />
                      </TableCell>
                    </TableRow>

                    {isOpen && (
                      <TableRow key={`${booking.id}-details`}>
                        <TableCell colSpan={7} className="p-0">
                          <RowContent
                            room={room}
                            booking={booking}
                            handleCancel={handleCancel}
                            isPending={isPending}
                          />
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}