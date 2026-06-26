import React from 'react'
import { getLocale } from "next-intl/server";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import Link from 'next/link';
import RoomImage from '@/components/shared/RoomCard/RoomImage';

interface Props {
  city: string | null;
  currentRoomId: string;
}

export default async function SimilarRoomsGrid({ city, currentRoomId }: Props) {
  const supabase = await createSupabaseServerClient();
  const { data: rooms } = await supabase.from("rooms").select("*").eq("city->>en", city).neq("id", currentRoomId).limit(4);
  const roomsList = rooms ?? [];
  const locale = await getLocale();
  
  // استدعاء ملفات الترجمة المطلوبة للكومبوننت
  const t = await getTranslations("Rooms");
  const t2 = await getTranslations("RentARoom");
  const tRoomPage = await getTranslations("roomPage");

  return (
    <div>
      {/* عنوان الغرف المتشابهة مترجم ديناميكياً */}
      <h1 className='text-center my-8 text-xl font-bold'>{tRoomPage('similarRooms')}</h1>
      
      <div className="lg:grid gap-6 lg:gap-10 sm:grid-cols-2 lg:grid-cols-4 px-15 mb-30">
        {roomsList.map((room) => (
          <Link key={room.id} href={`/rooms/${room.id}`}>
            <Card className="overflow-hidden border-2 border-gray-300 pt-0 h-full hover:shadow-lg transition-shadow duration-300 hover:scale-[1.02] transition-transform">
              <div className="relative h-40 w-full bg-gray-100">
                {room.images?.[0] ? (
                  <RoomImage
                    src={room.images[0]}
                    alt={room.title}
                    noImageText={t2("Filters.noImage")}
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-500 text-sm font-medium">
                    {t2("Filters.noImage")}
                  </div>
                )}
              </div>

              <CardHeader>
                <CardTitle className="flex justify-between items-center mb-1">
                  <p className="font-semibold line-clamp-1">{room.title[locale]}</p>
                </CardTitle>

                <CardDescription>
                  <p className="text-gray-500">{room.location[locale]}</p>
                </CardDescription>
              </CardHeader>

              <CardContent className="flex justify-between items-center">
                <p className="text-[16px] text-blue-800">
                  {room.price} {t("currency")}
                </p>

                <div className="px-2 py-1 rounded-full flex items-center gap-2 bg-gray-200 text-white">
                  <p className="text-gray-800">{t("verified")}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}