"use client"

import Header from "@/components/shared/Header/Header";
import ContactInfos from "./components/forms/ContactInfo/ContactInfos";
import Payment from "./components/forms/Payment/Payment";
import Polices from "./components/forms/Polices/Polices";
import BookingRoomCard from "./components/BookingRoomCard/BookingRoomCard";
import { BookingProcessProps } from "@/types/BookingProps";
import { Accordion } from "@/components/ui/accordion";
import { bookingSchema, getBookingSchema } from "../../schema/BookingSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function BookingProccess({
  room,
  checkIn,
  checkOut,
}: BookingProcessProps) {
  const t = useTranslations("bookingProcess");

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

  async function onSubmit() {
    const supabase = getSupabaseBrowserClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      toast.error(t("toast.authRequired"), {
        description: t("toast.authRequiredDesc"),
        style: { minWidth: "360px" },
      });
      return;
    }

    const { data: currentRoom, error: fetchError } = await supabase
      .from("rooms")
      .select("owner_id")
      .eq("id", room.id)
      .single();

    if (fetchError) {
      toast.error(t("toast.verifyError"), {
        description: t("toast.verifyErrorDesc"),
        style: { minWidth: "360px" },
      });
      return;
    }

    if (currentRoom?.owner_id === user.id) {
      toast.warning(t("toast.alreadyBooked"), {
        description: t("toast.alreadyBookedDesc"),
        style: { minWidth: "360px" },
      });
      return;
    }

    if (currentRoom?.owner_id !== null) {
      toast.error(t("toast.roomUnavailable"), {
        description: t("toast.roomUnavailableDesc"),
        style: { minWidth: "360px" },
      });
      return;
    }

    toast.promise(
      Promise.resolve(
        supabase
          .from("rooms")
          .update({ owner_id: user.id })
          .eq("id", room.id)
          .then(({ error }) => {
            if (error) throw error;
          })
      ),
      {
        loading: t("toast.confirming"),
        success: t("toast.confirmed"),
        error: (err) => err?.message ?? t("toast.error"),
        style: { minWidth: "360px" },
      }
    );
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