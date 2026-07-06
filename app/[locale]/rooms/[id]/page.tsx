import React from 'react'
import {createSupabaseServerClient} from "@/lib/supabase/server-client"
import RoomPage from '@/features/roomPage/RoomPage';
import { FavoritesProvider } from "@/providers/FavoritesProvider";
type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function page({ params }: Props) {
  const { id } = await params;

   const supabase = await createSupabaseServerClient();

  const { data: room } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", id)
    .single();

  return (
    <div>
      <FavoritesProvider>
        <RoomPage room={room}/>
      </FavoritesProvider>
    </div>
  )
}

export default page
