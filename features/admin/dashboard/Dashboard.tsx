import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { redirect } from "next/navigation";
import MapClient from "@/components/shared/map/MapClient";
import { getTranslations } from "next-intl/server"; 
import {
  House,
  BellRing,
  Container,
  type LucideIcon,
} from "lucide-react";

type DashboardCard = {
  label: string;
  icon: LucideIcon;
  num: number;
  description?: string;
};

export default async function Dashboard() {
  const t = await getTranslations("dashboard");

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("name")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/login");
  }

  const { data: allRooms, error: allRoomsError } = await supabase
    .from("rooms")
    .select("*")
    .order("created_at", { ascending: false });

  if (allRoomsError) {
    throw new Error(allRoomsError.message);
  }

  const { data: bookingCounts, error: bookingsError } = await supabase
    .from("bookings")
    .select("status")
    .in("status", ["pending", "approved"]);

  if (bookingsError) {
    throw new Error(bookingsError.message);
  }

  const pendingCount =
    bookingCounts?.filter((b) => b.status === "pending").length ?? 0;
  const approvedCount =
    bookingCounts?.filter((b) => b.status === "approved").length ?? 0;

  const cards: DashboardCard[] = [
    {
      label: t("rooms"),
      icon: Container,
      num: allRooms?.length ?? 0,
    },
    {
      label: t("occupied"),
      icon: House,
      num: approvedCount,
      description: t("booked"),
    },
    {
      label: t("requests"),
      icon: BellRing,
      num: pendingCount,
      description: t("pending"),
    },
  ];

  return (
    <div className="py-8 px-6 sm:mb-0 mb-30 z-50">
      <h1 className="text-2xl font-bold">
        {t("welcome back")},{" "}
        <span className="text-blue-900">{profile.name}</span>
      </h1>

      <p className="mt-1 mb-5 text-gray-500">
        {t("track")}
      </p>

      <section className="flex items-center gap-5 mb-5 flex-wrap">
        {cards.map(({ label, icon: Icon, num, description }) => (
          <div key={label} className="rounded-lg border p-5 flex-1 min-w-[250px]">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">{label}</h2>
              <div>
                <Icon className="h-5 w-5 text-gray-500" />
              </div>
            </div>

            <div className="flex gap-3 items-center mt-5">
              <p className="text-3xl font-bold">{num}</p>
              
              {description && (
                <p className="text-lg text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
          </div>
        ))}
      </section>

      <MapClient rooms={allRooms} />
    </div>
  );
}