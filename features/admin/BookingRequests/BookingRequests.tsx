import React from 'react'
import { RoomSearchParams } from '@/types/room-search-params'
import RequestsTable from './components/RequestsTable'
import RoomSearchBar from '../../../components/shared/RoomSearchBar'
import { createSupabaseServerClient } from '@/lib/supabase/server-client'
import { Database } from "@/types/database";
const PAGE_SIZE = 9

export default async function BookingRequests({
  searchParams,
}: {
  searchParams: RoomSearchParams
}) {
  const supabase = await createSupabaseServerClient()

  const currentPage = Math.max(1, parseInt(searchParams.page ?? '1', 10))
  const from = (currentPage - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  type RoomWithOwner = Database["public"]["Tables"]["rooms"]["Row"] & {
  owner: Pick <
    Database["public"]["Tables"]["profiles"]["Row"],
    "id" | "name" | "email" | "photo"
  > | null;
};

let query = supabase
  .from('rooms')
  .select(
    `*, owner:profiles!rooms_owner_id_fkey(id, name, email, photo)`,
    { count: 'exact' }
  )
  .eq('is_hidden', false)
  .not('owner_id', 'is', null)

const q = searchParams.q?.trim()
if (q) {
  const term = q.replace(/[%_]/g, '\\$&')
  query = query.or(`title->>en.ilike.%${term}%,title->>pt.ilike.%${term}%`)
}

const { data: rooms, error, count } = await query
  .range(from, to)
  .overrideTypes<RoomWithOwner[], { merge: false }>()


  if (error) {
    throw new Error(error.message)
  }

  const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE))

  return (
    <div className='border-l-2'>
      <div className="p-8 flex items-center justify-end">
        <RoomSearchBar />
      </div>
      <RequestsTable
        rooms={rooms}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  )
}