// "use client";

import Image from "next/image";

import { Heart, BadgeCheck } from "lucide-react";

import { supabase } from "../../../lib/supabase";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export async function Rooms() {
  const { data: rooms, error } = await supabase
    .from("rooms")
    .select("*");

  if (error) {
    return <h1>Error loading rooms</h1>;
  }

  return (
    <section id="rooms" className="px-6 md:px-12 lg:px-20 max-w-[1580px] mx-auto mt-10 mb-30">
      <h1 className="mb-10 text-2xl font-bold">Reserve the Finest  Rooms</h1>
      <div className="grid grid-cols-1 gap-12 lg:gap-18 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <Card key={room.id} className="overflow-hidden pt-0 h-full hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-60 w-full bg-gray-100">
              {room.images?.[0] ? (
                <Image
                  src={room.images[0]}
                  alt={room.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-500">
                  No image available
                </div>
              )}
            </div>

            <CardHeader>
              <CardTitle className="flex justify-between items-center mb-5">
                <p className="font-semibold line-clamp-1">{room.title}</p>

                <Heart className="cursor-pointer flex shrink-0 hover:text-red-600" />
              </CardTitle>

              <CardDescription className="line-clamp-2">
                <p className="text-gray-800">{room.description}</p>
              </CardDescription>
            </CardHeader>

            <CardContent className="flex justify-between items-center">
              <p className="text-lg text-blue-800">{room.price} €</p>

              <div className="px-2 py-1 rounded-full flex items-center justif gap-2 bg-gray-200 text-white">
                <BadgeCheck size={16} fill="#1e2939"/>
                <p className="text-gray-800">ELL Verified</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Rooms;
