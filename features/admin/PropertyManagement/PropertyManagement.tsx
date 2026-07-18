import React from 'react'
import { RoomSearchParams } from '@/types/room-search-params'
import ManagementTable from './ManagementTable'
import RoomSearchBar from '../../../components/shared/RoomSearchBar'
import { createSupabaseServerClient } from '@/lib/supabase/server-client'
import Link from 'next/link'
const PAGE_SIZE = 9

export default async function PropertyManagement({
  searchParams,
}: {
  searchParams: RoomSearchParams
}) {
  const supabase = await createSupabaseServerClient()

  const currentPage = Math.max(1, parseInt(searchParams.page ?? '1', 10))
  const from = (currentPage - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let query = supabase
    .from('rooms')
    .select('*', { count: 'exact' })
    .eq('is_hidden', false)
    // .order('created_at', { ascending: false })

  const q = searchParams.q?.trim()
  if (q) {
    const term = q.replace(/[%_]/g, '\\$&')
    query = query.or(`title->>en.ilike.%${term}%,title->>pt.ilike.%${term}%`)
  }

  const { data: rooms, error, count } = await query.range(from, to)

  if (error) {
    throw new Error(error.message)
  }

  const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE))

  return (
    <div className='border-l-2'>
      <div className="p-8 flex gap-5 items-center justify-end">
        <Link href={"/addRoom"} className='py-2 px-4 bg-blue-900 text-[15px] text-white rounded-lg cursor-pointer transition hover:shadow-lg'>
          Add Room
        </Link>
        <RoomSearchBar />
      </div>
      <ManagementTable
        rooms={rooms}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  )
}