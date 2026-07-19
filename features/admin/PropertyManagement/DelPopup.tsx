"use client";

import type { Database } from "@/types/database";
import { useTranslations, useLocale } from "next-intl";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLocalized } from "@/types/GetLocalized";

type Room = Database["public"]["Tables"]["rooms"]["Row"] & {
  approvedBooking: Pick<
    Database["public"]["Tables"]["bookings"]["Row"],
    "date_from" | "date_to"
  > | null;
};

interface DelPopupProps {
  room: Room;
  handleDelete: (roomId: string) => void;
  isPending: boolean;
}

export default function DelPopup({ room, handleDelete, isPending }: DelPopupProps) {
  const t = useTranslations("dashboard");
  const locale = useLocale();

  const isBooked = !!room.approvedBooking;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="cursor-pointer"
          aria-label="delete"
        >
          <Trash2 size={20} />
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="p-6 text-center">
        {isBooked ? (
          <>
            <AlertDialogTitle className="mb-2 text-lg font-semibold">
              {getLocalized(room.title, locale)}
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-2 text-[16px] text-gray-400">
                <div className="text-black">{t("cannot delete booked room")}</div>
              </div>
            </AlertDialogDescription>
            <AlertDialogFooter className="border-0 bg-white">
              <AlertDialogCancel asChild>
                <Button className="mx-auto -mt-3 w-fit cursor-pointer rounded-lg border-2 border-black bg-white px-4 py-6 text-[16px] text-black hover:bg-gray-200">
                  {t("close")}
                </Button>
              </AlertDialogCancel>
            </AlertDialogFooter>
          </>
        ) : (
          <>
            <AlertDialogTitle className="mb-2 text-lg font-semibold">
              {getLocalized(room.title, locale)}
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-2 text-[17px] text-gray-400">
                <div className="pt-2 text-black">{t("delete confirmation")}</div>
                <div className="text-base mb-3">{t("delete description")}</div>
              </div>
            </AlertDialogDescription>
            <AlertDialogFooter className="border-0 bg-white">
              <AlertDialogCancel asChild>
                <Button className="mx-auto -mt-3 w-fit cursor-pointer rounded-lg border-2 border-black bg-white px-4 py-6 text-[16px] text-black hover:bg-gray-200">
                  {t("cancel")}
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  disabled={isPending}
                  onClick={() => handleDelete(room.id)}
                  className="mx-auto -mt-3 w-fit cursor-pointer rounded-lg bg-red-700 px-4 py-6 text-[16px] text-white hover:bg-red-800"
                >
                  {t("delete")}
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}