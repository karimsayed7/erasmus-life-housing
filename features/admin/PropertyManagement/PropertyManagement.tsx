import React from 'react'
import { RoomSearchParams } from '@/types/room-search-params'
import ManagementTable from './ManagementTable'
import RoomSearchBar from '../../../components/shared/RoomSearchBar'
import { createSupabaseServerClient } from '@/lib/supabase/server-client'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
const PAGE_SIZE = 9

export default async function PropertyManagement({
  searchParams,
}: {
  searchParams: RoomSearchParams
}) {
  const supabase = await createSupabaseServerClient()
  const t = await getTranslations("dashboard")

  const currentPage = Math.max(1, parseInt(searchParams.page ?? '1', 10))
  const from = (currentPage - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let query = supabase
    .from('rooms')
    .select('*', { count: 'exact' })
    .eq('is_hidden', false)

  const q = searchParams.q?.trim()
  if (q) {
    const term = q.replace(/[%_]/g, '\\$&')
    query = query.or(`title->>en.ilike.%${term}%,title->>pt.ilike.%${term}%`)
  }

  const { data: rooms, error, count } = await query.range(from, to)

  if (error) {
    throw new Error(error.message)
  }

  const roomIds = (rooms ?? []).map((r) => r.id)
  const { data: approvedBookings } = roomIds.length
    ? await supabase
        .from('bookings')
        .select('room_id, date_from, date_to')
        .in('room_id', roomIds)
        .eq('status', 'approved')
    : { data: [] }

  const approvedByRoomId = new Map(
    (approvedBookings ?? []).map((b) => [b.room_id, b])
  )

  const roomsWithBookingInfo = (rooms ?? []).map((room) => ({
    ...room,
    approvedBooking: approvedByRoomId.get(room.id) ?? null,
  }))

  const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE))

  return (
    <div className='border-l-2'>
      <div className="p-8 flex gap-5 items-center justify-end">
        <Link href={"/addRoom"} className='py-2 px-4 bg-blue-900 text-[15px] text-white rounded-lg cursor-pointer transition hover:shadow-lg'>
          {t("add room")}
        </Link>
        <RoomSearchBar />
      </div>
      <ManagementTable
        rooms={roomsWithBookingInfo}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  )
}