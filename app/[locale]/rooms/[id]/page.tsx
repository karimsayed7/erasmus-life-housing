import React from 'react'
import { notFound } from 'next/navigation'
import { createSupabaseServerClient } from "@/lib/supabase/server-client"
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

  const [{ data: room }, { data: { user } }] = await Promise.all([
    supabase.from("rooms").select("*").eq("id", id).single(),
    supabase.auth.getUser(),
  ]);

  if (!room) {
    notFound();
  }

  return (
    <div>
      <FavoritesProvider>
        <RoomPage room={room} isLoggedIn={!!user} />
      </FavoritesProvider>
    </div>
  )
}

export default page