"use client"

import Header from "@/components/shared/Header/Header";
import ContactInfos from "./components/forms/ContactInfo/ContactInfos";
import Payment from "./components/forms/Payment/Payment";
import Polices from "./components/forms/Polices/Polices";
import BookingRoomCard from "./components/BookingRoomCard";
import { BookingProcessProps } from "@/types/BookingProps";
import { Accordion } from "@/components/ui/accordion";
import { bookingSchema, getBookingSchema } from "../../schema/BookingSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { bookRoomAction } from "./bookRoom";

export default function BookingProccess({
  room,
  checkIn,
  checkOut,
}: BookingProcessProps) {
  const t = useTranslations("bookingProcess");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(getBookingSchema(t)),
    mode: "onBlur",
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      alone: "yes",
      occupation: "study",
      university: "",
      about: "",
      cardNumber: "",
      expiryDate: "",
      securityNumber: "",
      useDemoCard: false,
      promoCode: "",
    },
  });

  function onSubmit() {
    startTransition(async () => {
      const toastId = toast.loading(t("toast.confirming"), {
        style: { minWidth: "360px" },
      });

      const result = await bookRoomAction(room.id);

      if (!result.success) {
        const messages: Record<string, { title: string; desc: string }> = {
          AUTH_REQUIRED: { title: t("toast.authRequired"), desc: t("toast.authRequiredDesc") },
          VERIFY_FAILED: { title: t("toast.verifyError"), desc: t("toast.verifyErrorDesc") },
          ALREADY_BOOKED: { title: t("toast.alreadyBooked"), desc: t("toast.alreadyBookedDesc") },
          ROOM_UNAVAILABLE: { title: t("toast.roomUnavailable"), desc: t("toast.roomUnavailableDesc") },
        };
        
        const msg = messages[result.error] ?? { title: t("toast.error"), desc: "" };

        if (result.error === "ALREADY_BOOKED") {
          toast.warning(msg.title, { id: toastId, description: msg.desc, style: { minWidth: "360px" } });
        } else {
          toast.error(msg.title, { id: toastId, description: msg.desc, style: { minWidth: "360px" } });
        }
        return;
      }

      toast.success(t("toast.confirmed"), { id: toastId, style: { minWidth: "360px" } });
    });
  }

  return (
    <div>
      <Header />
      <div className="flex lg:flex-row flex-col gap-10 xl:gap-20 py-10 px-5 md:px-20">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full lg:basis-[50%] order-2 lg:order-1"
        >
          <Accordion type="single" collapsible defaultValue="contact">
            <ContactInfos form={form} />
            <Payment form={form} />
            <Polices form={form} />
          </Accordion>
        </form>

        <div className="w-full lg:basis-[50%] order-1 lg:order-2">
          <BookingRoomCard
            checkIn={checkIn}
            checkOut={checkOut}
            room={room}
            form={form}
          />
        </div>
      </div>
    </div>
  );
}