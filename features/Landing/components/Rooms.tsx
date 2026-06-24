import Image from "next/image";
import { BadgeCheck, Heart } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getLocale } from "next-intl/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { ScrollReveal } from "@/features/Landing/animations/ScrollReveal";
import { StaggerReveal } from "@/features/Landing/animations/StaggerReveal";

export async function Rooms() {
  const locale = await getLocale();
  const t = await getTranslations("Rooms");
  const supabase = await createSupabaseServerClient();
  const { data: rooms, error } = await supabase.from("rooms").select("*").limit(6);

  if (error) {
    return <h1>{t("error")}</h1>;
  }

  return (
    <section id="rooms" className="px-6 md:px-12 lg:px-20 max-w-[1580px] mx-auto mt-10 mb-30">
      <ScrollReveal direction="up">
        <h1 className="mb-10 text-2xl font-bold">{t("heading")}</h1>
      </ScrollReveal>

      <StaggerReveal
        className="grid grid-cols-1 gap-12 lg:gap-18 sm:grid-cols-2 lg:grid-cols-3"
        staggerDelay={0.1}
      >
        {rooms.map((room) => (
          <Link key={room.id} href={`/rooms/${room.id}`}>
            <Card className="overflow-hidden border-2 border-gray-300 pt-0 h-full hover:shadow-lg transition-shadow duration-300 hover:scale-[1.02] transition-transform">
              <div className="relative h-57 w-full bg-gray-100">
                {room.images?.[0] ? (
                  <Image
                    src={room.images[0]}
                    alt={room.title[locale]}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-500">
                    {t("noImage")}
                  </div>
                )}
              </div>

              <CardHeader>
                <CardTitle className="flex justify-between items-center mb-5">
                  <p className="font-semibold line-clamp-1">{room.title[locale]}</p>
                  <Heart className="cursor-pointer flex shrink-0 hover:text-red-600" />
                </CardTitle>

                <CardDescription className="line-clamp-2">
                  <p className="text-gray-800">{room.description[locale]}</p>
                </CardDescription>
              </CardHeader>

              <CardContent className="flex justify-between items-center">
                <p className="text-lg text-blue-800">
                  {room.price} {t("currency")}
                </p>

                <div className="px-2 py-1 rounded-full flex items-center justif gap-2 bg-gray-200 text-white">
                  <BadgeCheck size={16} fill="#1e2939" />
                  <p className="text-gray-800">{t("verified")}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </StaggerReveal>
    </section>
  );
}

export default Rooms;