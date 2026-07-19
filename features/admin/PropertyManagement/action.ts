'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server-client'
import { revalidatePath } from 'next/cache'

type DeleteRoomResult =
  | { success: true }
  | { success: false; error: string }

export async function deleteRoom(roomId: string): Promise<DeleteRoomResult> {
  if (!roomId) {
    return { success: false, error: 'Room id is required' }
  }

  const supabase = await createSupabaseServerClient()

  const { data: approvedBooking } = await supabase
    .from('bookings')
    .select('id')
    .eq('room_id', roomId)
    .eq('status', 'approved')
    .maybeSingle()

  if (approvedBooking) {
    return { success: false, error: 'ROOM_CURRENTLY_BOOKED' }
  }

  const { error } = await supabase
    .from('rooms')
    .update({ is_hidden: true })
    .eq('id', roomId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/PropertyManagement')

  return { success: true }
}