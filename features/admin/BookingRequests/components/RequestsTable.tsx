"use client";

import { Database } from "@/types/database";
import { useLocale, useTranslations } from "next-intl";
import { getLocalized } from "@/types/GetLocalized";
import { useOptimistic, useTransition } from "react";
import { EllipsisVertical  } from "lucide-react";
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

type Props = {
  rooms: (Database["public"]["Tables"]["rooms"]["Row"] & {
    owner: Pick<Database["public"]["Tables"]["profiles"]["Row"], "id" | "name" | "email" | "photo"> | null;
  })[];
  error: string | null;
  currentPage: number;
  totalPages: number;
};

export default function ManagementTable({ rooms, error, currentPage, totalPages }: Props) {
  const locale = useLocale();
  const t = useTranslations("dashboard");

  const [optimisticRooms, updateOptimistically] = useOptimistic(
    rooms,
    (currentRooms, update: { roomId: string; action: "approve" | "reject" }) =>
      currentRooms.map((r) => {
        if (r.id !== update.roomId) return r;
        if (update.action === "approve") {
          return { ...r, approval_status: { en: "approved", pt: "aprovado" } };
        }
        return { ...r, owner_id: null, owner: null, approval_status: null };
      })
  );
  const [isPending, startTransition] = useTransition();

  function handleApprove(roomId: string) {
    startTransition(async () => {
      updateOptimistically({ roomId, action: "approve" });
      const result = await approveBooking(roomId);
      if (!result.success) {
        console.error(result.error);
      }
    });
  }

  function handleReject(roomId: string) {
    startTransition(async () => {
      updateOptimistically({ roomId, action: "reject" });
      const result = await rejectBooking(roomId);
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
          {optimisticRooms.map((room) => (
            <TableRow key={room.id} className="even:bg-gray-50 hover:bg-transparent even:hover:bg-gray-50">
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
                {room.owner ? (
                  <div  className="flex items-center gap-2">
                    <UserAvatar profile={room.owner} size={30} />
                    <p>{room.owner.name}</p>
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">—</span>
                )}
              </TableCell>
              <TableCell>{getLocalized(room.location, locale)}</TableCell>
              <TableCell>{room.date_from}</TableCell>
              <TableCell className="text-center">
                {(() => {
                  switch ((room.approval_status as { en: string; pt: string } | null)?.en) {
                    case "approved":
                      return (
                        <span className="py-1 px-3 rounded-full bg-green-100 text-green-700">
                          {getLocalized(room.approval_status, locale)}
                        </span>
                      );
                    case "waiting approval":
                      return (
                        <span className="flex items-center gap-1 py-1 px-3 rounded-full bg-yellow-100 text-yellow-600">
                          {getLocalized(room.approval_status, locale)}
                        </span>
                      );
                    default:
                      return <span>-</span>;
                  }
                })()}
              </TableCell>
              <TableCell>
                <div className="flex gap-5 items-center px-5">
                  {room.owner && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button aria-label="actions" className="cursor-pointer">
                          <EllipsisVertical size={20} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="text-[16px]">
                        <ApprovePopup room={room} handleApprove={handleApprove} isPending={isPending} />
                        <RejectPopup room={room} handleReject={handleReject} isPending={isPending} />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <PaginationControls currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}