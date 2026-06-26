import React from 'react'
import {createSupabaseServerClient} from "@/lib/supabase/server-client"
import BookingProccess from '@/features/BookingProccess/BookingProccess';

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    checkIn?: string;
    checkOut?: string;
  }>;
}

export default async function Page({
  params,
  searchParams,
}: Props) {

  const { id } = await params;
  const { checkIn, checkOut } = await searchParams;

   const supabase = await createSupabaseServerClient();
  
    const { data: room } = await supabase
      .from("rooms")
      .select("*")
      .eq("id", id)
      .single();

  return (
    <div>
      <BookingProccess room={room} checkIn={checkIn} checkOut={checkOut}/>
    </div>
  )
}

