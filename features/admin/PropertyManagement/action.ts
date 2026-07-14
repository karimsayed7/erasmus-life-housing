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