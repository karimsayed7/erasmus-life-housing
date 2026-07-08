
import React from 'react'
import { redirect } from 'next/navigation'
import Header from '@/components/shared/Header/Header'
import { createSupabaseServerClient } from '@/lib/supabase/server-client'
import { Database } from '@/types/database'
import FavouritesList from './FavouritesList'
import { getTranslations } from 'next-intl/server'

type Room = Database['public']['Tables']['rooms']['Row']

export default async function Favourites() {
  const supabase = await createSupabaseServerClient()
  const t = await getTranslations("favourites and applications")
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/sign_in')
  }

  const { data, error } = await supabase
    .from('favorites')
    .select('room_id, rooms(*)')

  if (error) {
    console.error('Error fetching favourites:', error.message)
  }

  const initialRooms: Room[] =
    data
      ?.map((fav) => fav.rooms)
      .flat()
      .filter((room): room is Room => room !== null) ?? []

  return (
    <div>
      <Header />
      <h1 className="text-2xl font-bold my-10 text-center">{t("favourites")}</h1>
      <FavouritesList initialRooms={initialRooms} />
    </div>
  )
}