"use client"
import React from 'react'
import type { Database } from "@/types/database";
import Image from 'next/image';
import { getLocalized } from "@/types/GetLocalized";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button"

interface RowProps {
    room: Database["public"]["Tables"]["rooms"]["Row"];
    handleCancel: (roomId : string) => void;
    isPending: boolean;
}

export default function RowContent({room, handleCancel, isPending}: RowProps) {
  const locale = useLocale()  
  const t = useTranslations("favourites and applications");

  return (
    <div className='p-6 flex justify-around w-full bg-gray-100 gap-5'>
      <div className='relative w-60 h-35 overflow-hidden rounded-lg ml-4'>
        {room.images?.[0] ? (
            <Image
                src={room.images[0]}
                alt={getLocalized(room.title, locale)}
                fill
                className="object-cover"
            />
            ) : (
            <div className="flex h-full bg-gray-400 items-center justify-center">
                No image
            </div>
        )}
      </div>
      <div >
        <div className='mb-3'>
            <h3 className='font-semibold text-[16px] mb-1'>{getLocalized(room.title, locale)}</h3>
            <p className='text-gray-400'>{getLocalized(room.location, locale)}</p>
        </div>
        <div>
            <h3 className='font-semibold '>{t("tenants hosted")}</h3>
            <p className='text-gray-400 '>{room.tenants_hosted}</p>
        </div>
      </div>
      <div className='ml-5'>
        <div className='mb-3'>
            <h3 className='font-semibold'>{t("date from")}</h3>
            <p className='text-gray-400'>{room.date_from}</p>
        </div>
        <div>
            <h3 className='font-semibold'>{t("date to")}</h3>
            <p className='text-gray-400'>{room.date_to}</p>
        </div>
      </div>
      <div className='ml-5 '>
        <div>
            <h3 className='font-semibold'>{t("description")}</h3>
            <p className='text-gray-400 text-wrap line-clamp-4 w-80'>{getLocalized(room.description, locale)}</p>
        </div>
        <div className='text-center'>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className='border-2 py-2 hover:bg-gray-200 border-black cursor-pointer rounded-lg font-bold mt-4 mx-auto px-4 bg-white text-black '>{t("cancel")}</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className='text-center p-6'>
                        <div className=' flex items-center justify-end'>
                            <AlertDialogCancel className=' border-0 text-lg' asChild aria-label="Close">
                                <X size={46} className='cursor-pointer p-0'/>
                            </AlertDialogCancel>
                        </div>
                        <div className='relative overflow-hidden rounded-lg h-35 w-full '>
                            {room.images?.[0] ? (
                                <Image
                                    src={room.images[0]}
                                    alt={getLocalized(room.title, locale)}
                                    fill
                                    className="object-cover"
                                />
                                ) : (
                                <div className="flex h-full items-center bg-gray-400 justify-center">
                                    No image
                                </div>
                            )}
                        </div>
                        <AlertDialogTitle className='font-semibold text-lg -mb-3'>
                            {t("cancel")} of {getLocalized(room.title, locale)}
                        </AlertDialogTitle>
                        <AlertDialogDescription className='text-gray-400 text-[16px]'>
                            {t("are you sure")}
                        </AlertDialogDescription>
                        <AlertDialogFooter className='bg-white border-0'>
                            <AlertDialogAction className='px-4 py-6 w-fit cursor-pointer mx-auto text-[16px] hover:bg-red-700 text-white bg-red-600 rounded-lg -mt-3' asChild>
                                <Button disabled={isPending} onClick={() => handleCancel(room.id)}>{t("cancel")}</Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
      </div>
    </div>
  )
}
