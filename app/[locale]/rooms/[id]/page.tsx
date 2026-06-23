import React from 'react'
import {createSupabaseServerClient} from "@/lib/supabase/server-client"
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
      {room.images}
    </div>
  )
}

export default page
