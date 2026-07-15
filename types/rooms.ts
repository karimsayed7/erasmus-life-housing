import { Database } from '@/types/database'

export type RoomsProp ={
  rooms: Database['public']['Tables']['rooms']['Row'][];
}

export type RoomProp ={
  room: Database['public']['Tables']['rooms']['Row'];
}

