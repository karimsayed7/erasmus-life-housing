import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { getTranslations } from "next-intl/server";

import ApplicationsTable from "./components/ApplicationsTable";
import Header from "@/components/shared/Header/Header";

export default async function Applications() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const t = await getTranslations("favourites and applications");

  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*, room:rooms(*)")
    .eq("user_id", user?.id ?? "")
    .neq("status", "cancelled")
    .order("created_at", { ascending: false });

  return (
    <div>
      <Header />
      <h1 className="text-2xl my-10 mb-20 text-center font-bold">
        {t("room applications")}
      </h1>
      <ApplicationsTable
        initialBookings={bookings ?? []}
        initialError={error?.message ?? null}
      />
    </div>
  );
}