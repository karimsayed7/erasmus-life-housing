"use client"
import React from 'react'
import { BadgeCheck, Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import RoomImage from "@/components/shared/RoomCard/RoomImage"
import { RoomProp } from '@/types/rooms';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getLocalized } from '@/types/GetLocalized';
import { useFavorites } from "@/features/favourites/useFavorites";

interface RoomCardProps extends  RoomProp {
  imgSize: number;
};

export default function RoomCard({room, imgSize}: RoomCardProps) {
  const t2 = useTranslations("RentARoom");
  const t = useTranslations("Rooms");
  const locale = useLocale();
  const { isFavorite, toggleFavorite } = useFavorites()

  return (
    <div>
      <Link key={room.id} href={`/rooms/${room.id}`}>
            <Card className="overflow-hidden border-2 border-gray-300 pt-0 h-full hover:shadow-lg transition-shadow duration-300 hover:scale-[1.02] transition-transform">
              <div className={`relative w-full bg-gray-100`} style={{ height: `${imgSize * 4}px` }}>
                {room.images?.[0] ? (
                    <RoomImage
                        src={room.images[0]}
                        alt={getLocalized(room.title, locale)}
                        noImageText={t2("Filters.noImage")}
                    />
                    ) : (
                        <div className="h-full w-full flex items-center justify-center text-gray-500 text-sm font-medium">
                            {t2("Filters.noImage")}
                        </div>
                )}
              </div>

              <CardHeader>
                <CardTitle className="flex justify-between items-center mb-5">
                  <p className="font-semibold line-clamp-1">{getLocalized(room.title, locale)}</p>
                  <button
                    onClick={(e) => {
                        e.preventDefault(); 
                        e.stopPropagation(); 
                        toggleFavorite(room.id);
                    }}
                    >
                    <Heart
                        className={`cursor-pointer flex shrink-0 hover:fill-red-500 ${
                        isFavorite(room.id) ? "fill-red-500 text-red-500" : ""
                        }`}
                    />
                    </button>
                </CardTitle>

                <CardDescription className="line-clamp-2">
                  <p className="text-gray-800">{getLocalized(room.description, locale)}</p>
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
    </div>
  )
}
