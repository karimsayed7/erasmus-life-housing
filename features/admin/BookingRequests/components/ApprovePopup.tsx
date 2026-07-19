"use client";

import type { Database } from "@/types/database";
import { useTranslations } from "next-intl";
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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface RowProps {
  booking: Database["public"]["Tables"]["bookings"]["Row"] & {
    room: Database["public"]["Tables"]["rooms"]["Row"];
    applicant: Pick<
      Database["public"]["Tables"]["profiles"]["Row"],
      "id" | "name" | "email" | "photo"
    > | null;
  };
  handleApprove: (bookingId: string, roomId: string) => void;
  isPending: boolean;
}

export default function ApprovePopup({ booking, handleApprove, isPending }: RowProps) {
  const t = useTranslations("dashboard");

const isApproved = booking.status === "approved";
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={isApproved}>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} disabled={isApproved}>
          <button
            disabled={isApproved}
            className="w-full cursor-pointer text-left disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t("approve")} 
          </button>
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent className="p-6 text-center">
        <AlertDialogTitle className="mb-2 text-lg font-semibold">
          {booking.applicant?.name}
        </AlertDialogTitle>

        <AlertDialogDescription asChild>
          <div className="space-y-2 text-[16px] text-gray-400">
            <div>{booking.applicant?.email}</div>
            <div className="pt-6 text-black">{t("approve confirmation")}</div>
            <div className="text-sm">{t("approve description")}</div>
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
              onClick={() => handleApprove(booking.id, booking.room.id)}
              className="mx-auto -mt-3 w-fit cursor-pointer rounded-lg bg-blue-800 px-4 py-6 text-[16px] text-white hover:bg-blue-900"
            >
              {t("approve")}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}