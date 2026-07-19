"use client";

import { Database } from "@/types/database";
import { useLocale, useTranslations } from "next-intl";
import { getLocalized } from "@/types/GetLocalized";
import { useOptimistic, useTransition } from "react";
import { EllipsisVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import PaginationControls from "@/components/shared/PaginationControls";
import ApprovePopup from "./ApprovePopup";
import RoomImage from "@/components/shared/RoomCard/RoomImage";
import { UserAvatar } from "@/features/auth/components/profile/UserAvatar";
import { approveBooking, rejectBooking } from "../action";
import RejectPopup from "./RejectPopup";

type Room = Database["public"]["Tables"]["rooms"]["Row"];
type Applicant = Pick<Database["public"]["Tables"]["profiles"]["Row"], "id" | "name" | "email" | "photo">;
type Booking = Database["public"]["Tables"]["bookings"]["Row"] & {
  room: Room;
  applicant: Applicant | null;
};

type Props = {
  bookings: Booking[];
  error: string | null;
  currentPage: number;
  totalPages: number;
};

export default function RequestsTable({ bookings, error, currentPage, totalPages }: Props) {
  const locale = useLocale();
  const t = useTranslations("dashboard");

  const [optimisticBookings, updateOptimistically] = useOptimistic(
    bookings,
    (current, update: { bookingId: string; roomId: string; action: "approve" | "reject" }) => {
      if (update.action === "approve") {
        return current.map((b) => {
          if (b.id === update.bookingId) {
            return {
              ...b,
              status: "approved",
              approval_status: { en: "booked", pt: "Reservado" },
            };
          }
          if (b.room.id === update.roomId && b.status === "pending") {
            return null;
          }
          return b;
        }).filter((b): b is Booking => b !== null);
      }
      return current.filter((b) => b.id !== update.bookingId);
    }
  );
  const [isPending, startTransition] = useTransition();

  function handleApprove(bookingId: string, roomId: string) {
    startTransition(async () => {
      updateOptimistically({ bookingId, roomId, action: "approve" });
      const result = await approveBooking(bookingId);
      if (!result.success) {
        console.error(result.error);
      }
    });
  }

  function handleReject(bookingId: string, roomId: string) {
    startTransition(async () => {
      updateOptimistically({ bookingId, roomId, action: "reject" });
      const result = await rejectBooking(bookingId);
      if (!result.success) {
        console.error(result.error);
      }
    });
  }

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="pb-20">
      <Table className=" border-b-2">
        <TableHeader>
          <TableRow className="font-semibold">
            <TableHead className="pl-9 font-semibold">{t("room")}</TableHead>
            <TableHead>{t("room type")}</TableHead>
            <TableHead>{t("price")}</TableHead>
            <TableHead>{t("tenants")}</TableHead>
            <TableHead>{t("location")}</TableHead>
            <TableHead>{t("date")}</TableHead>
            <TableHead className="text-center w-20">{t("status")}</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {optimisticBookings.map((booking) => {
            const room = booking.room;
            const isApproved = booking.status === "approved";
            return (
              <TableRow key={booking.id} className="even:bg-gray-50 hover:bg-transparent even:hover:bg-gray-50">
                <TableCell className="pl-9 flex items-center gap-3">
                  <div className="relative h-12 w-20 overflow-hidden rounded-md">
                    {room.images?.[0] ? (
                      <RoomImage
                        src={room.images[0]}
                        alt={getLocalized(room.title, locale)}
                        noImageText="no img"
                      />
                    ) : (
                      <div className="flex h-full items-center bg-gray-200 justify-center text-gray-500 text-sm">
                        no img
                      </div>
                    )}
                  </div>
                  {getLocalized(room.title, locale)}
                </TableCell>
                <TableCell>{getLocalized(room.room_type, locale)}</TableCell>
                <TableCell className="">{room.price}€</TableCell>
                <TableCell>
                  {booking.applicant ? (
                    <div className="flex items-center gap-2">
                      <UserAvatar profile={booking.applicant} size={30} />
                      <p>{booking.applicant.name}</p>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">—</span>
                  )}
                </TableCell>
                <TableCell>{getLocalized(room.location, locale)}</TableCell>
                <TableCell>{new Date(booking.created_at).toLocaleDateString(locale)}</TableCell>
                <TableCell className="text-center">
                  {isApproved ? (
                    <span className="py-1 px-3 rounded-full bg-green-100 text-green-700">
                      {getLocalized(booking.approval_status, locale)}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 py-1 px-3 rounded-full bg-yellow-100 text-yellow-600">
                      {getLocalized(booking.approval_status, locale)}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-5 items-center px-5">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button aria-label="actions" className="cursor-pointer">
                          <EllipsisVertical size={20} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="text-[16px]">
                        <ApprovePopup booking={booking} handleApprove={handleApprove} isPending={isPending} />
                        <RejectPopup booking={booking} handleReject={handleReject} isPending={isPending} />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <PaginationControls currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}