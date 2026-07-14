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
  room: Database["public"]["Tables"]["rooms"]["Row"] & {
    owner: Pick<Database["public"]["Tables"]["profiles"]["Row"], "id" | "name" | "email" | "photo"> | null;
  };
  handleApprove: (roomId: string) => void;
  isPending: boolean;
}

export default function ApprovePopup({ room, handleApprove, isPending }: RowProps) {
  const t = useTranslations("dashboard");

  const isApproved =
    (room.approval_status as { en?: string; pt?: string } | null)?.en === "approved";

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild disabled={isApproved}>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} disabled={isApproved}>
          <button
            className="cursor-pointer w-full text-left disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isApproved}
          >
            {t("approve")}
          </button>
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent className="text-center p-6">
        <AlertDialogTitle className="font-semibold text-lg -mb-3">
          <p>{room.owner?.name}</p>
        </AlertDialogTitle>
        <AlertDialogDescription className="text-gray-400 text-[16px]">
          <>
            <p>{room.owner?.email}</p>
            <p className="mt-8 text-black">{t("approve confirmation")}</p>
            <p className="my-2 text-sm">{t("approve description")}</p>
          </>
        </AlertDialogDescription>
        <AlertDialogFooter className="bg-white border-0">
          <AlertDialogCancel asChild>
            <Button className="px-4 py-6 w-fit cursor-pointer mx-auto text-[16px] hover:bg-gray-200 text-black bg-white border-2 border-black rounded-lg -mt-3">
              {t("cancel")}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              disabled={isPending}
              onClick={() => handleApprove(room.id)}
              className="px-4 py-6 w-fit cursor-pointer mx-auto text-[16px] hover:bg-blue-900 text-white bg-blue-800 rounded-lg -mt-3"
            >
              {t("approve")}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}