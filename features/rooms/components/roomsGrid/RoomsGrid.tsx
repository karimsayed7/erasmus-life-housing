"use client"
import React from 'react'
import { Database } from '@/types/database'
import { useFavorites } from "@/features/favourites/useFavorites";
import { BadgeCheck, Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PaginationControls from '../../../../components/shared/PaginationControls'
import Link from "next/link";
import { useLocale } from "next-intl";
import { getLocalized } from '../../../../types/GetLocalized';
import RoomImage from "../../../../components/shared/RoomCard/RoomImage"


const PAGE_SIZE = 6;

type Props = {
  rooms: Database['public']['Tables']['rooms']['Row'][];
  page?: string;
  bookedRoomIds?: string[];
}

function RoomsGrid({ rooms, page, bookedRoomIds = [] }: Props) {
  const locale = useLocale();
  const t = useTranslations("RentARoom");
  const t3 = useTranslations("roomPage");
  const { isFavorite, toggleFavorite } = useFavorites()

  const bookedSet = new Set(bookedRoomIds);

  const currentPage = Math.max(1, parseInt(page ?? '1', 10));
  const totalPages = Math.ceil(rooms.length / PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginatedRooms = rooms.slice(start, start + PAGE_SIZE);

  return (
    <div>
      <h1 className="my-5 text-lg font-bold">{rooms.length} {t('Filters.rooms')}</h1>
      
      <div className="grid grid-cols-1 gap-6 lg:gap-10 sm:grid-cols-2 lg:grid-cols-3 px-3 md:px-15">
        {paginatedRooms.map((room) => {
          const isBooked = bookedSet.has(room.id);
          return (
            <Link key={room.id} href={`/rooms/${room.id}`}>
              <Card className="overflow-hidden p-2 h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-300 relative">

                <div className="relative h-50 overflow-hidden rounded-lg bg-gray-100">
                  {room.images?.[0] ? (
                    <RoomImage
                      src={room.images[0]}
                      alt={getLocalized(room.title, locale)}
                      noImageText={t("Filters.noImage")}
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-500 text-sm font-medium">
                      {t("Filters.noImage")}
                    </div>
                  )}
                </div>

                <button
                      onClick={(e) => {
                          e.preventDefault(); 
                          e.stopPropagation(); 
                          toggleFavorite(room.id);
                      }}
                >
                  <Heart size={30} className={`absolute top-5 right-5 cursor-pointer shrink-0 text-white fill-black hover:fill-red-500 ${isFavorite(room.id) ? "fill-red-500 text-red-500" : ""} transition-colors`}/>
                </button>
              
                <CardHeader>
                  <CardTitle className="flex justify-between items-center -mb-1">
                    <p className="font-semibold line-clamp-1">{getLocalized(room.title, locale)}</p>
                    <div className='flex items-center'>
                      <span className='text-[20px] font-extrabold'>{room.price}€</span>
                      <span className='text-gray-400'>/month</span>
                    </div>
                  </CardTitle>
                </CardHeader>
              
                <CardContent>
                  <p className="text-gray-500 mb-2">{getLocalized(room.location, locale)}</p>
                  <div className='flex items-center justify-between'>
                    <div className="px-2 py-1 mb-2 mt-3 w-fit rounded-full flex items-end gap-2 bg-gray-200 text-white">
                      <BadgeCheck size={16} fill="#1e2939" />
                      <p className="text-gray-800">{t("Filters.verified")}</p>
                    </div>
                    {isBooked && (
                      <p className="text-sm font-semibold py-1 px-3 rounded-lg bg-green-100 text-green-700">
                        {t3("booked")}
                      </p>
                    )}
                  </div>

                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <PaginationControls currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  )
}

export default RoomsGrid