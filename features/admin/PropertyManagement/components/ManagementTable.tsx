"use client";

import { Database } from "@/types/database";
import { useLocale, useTranslations } from "next-intl";
import { getLocalized } from "@/types/GetLocalized";
import { useOptimistic, useTransition } from "react";
import { Trash2, Pencil } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationControls from "@/components/shared/PaginationControls";
import { deleteRoom } from "../action";
import RoomImage from "@/components/shared/RoomCard/RoomImage";

type Props = {
  rooms: Database["public"]["Tables"]["rooms"]["Row"][];
  error: string | null;
  currentPage: number;
  totalPages: number;
};

export default function ManagementTable({ rooms, error, currentPage, totalPages }: Props) {
  const locale = useLocale();
  const t = useTranslations("dashboard");

  const [optimisticRooms, removeOptimistically] = useOptimistic(
    rooms,
    (currentRooms, roomIdToRemove: string) =>
      currentRooms.filter((r) => r.id !== roomIdToRemove)
  );
  const [isPending, startTransition] = useTransition();

  function handleDelete(roomId: string) {
    startTransition(async () => {
      removeOptimistically(roomId);
      const result = await deleteRoom(roomId);
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
              <TableCell className="px-5">{room.price}€</TableCell>
              <TableCell>{getLocalized(room.location, locale)}</TableCell>
              <TableCell>{room.date_from}</TableCell>
              <TableCell className="text-center">
                {(() => {
                  switch ((room.approval_status as { en: string; pt: string } | null)?.en) {
                    case "approved":
                      return (
                        <span className="py-1 px-3 rounded-full bg-green-600 text-white">
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
                  <button
                    type="button"
                    onClick={() => handleDelete(room.id)}
                    disabled={isPending}
                    className="disabled:opacity-50 cursor-pointer"
                    aria-label="delete"
                  >
                    <Trash2 size={20} />
                  </button>
                  <button type="button" aria-label={"edit"} className="cursor-pointer">
                    <Pencil size={20} />
                  </button>
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