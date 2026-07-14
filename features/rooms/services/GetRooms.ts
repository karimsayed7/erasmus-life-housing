
import { createSupabaseServerClient } from '@/lib/supabase/server-client';
import { RoomSearchParams } from '../../../types/room-search-params';

export async function getRooms(params: RoomSearchParams) {
  const supabase = await createSupabaseServerClient();

  const toArray = (val?: string | string[]): string[] | null => {
    if (!val) return null;
    const arr = Array.isArray(val)
      ? val
      : val.split(',').map(s => s.trim());
    return arr.filter(Boolean).length > 0 ? arr.filter(Boolean) : null;
  };

  const minPrice = params.minPrice ? parseInt(params.minPrice, 10) : null;
  const maxPrice = params.maxPrice ? parseInt(params.maxPrice, 10) : null;

  const rpcParams = {
    p_cities:        toArray(params.location),
    p_room_types:    toArray(params.roomType),
    p_neighborhoods: toArray(params.neighborhood),
    p_amenities:     toArray(params.amenities),
    p_min_price:     minPrice && !isNaN(minPrice) ? minPrice : null,
    p_max_price:     maxPrice && !isNaN(maxPrice) ? maxPrice : null,
  };

  console.log('RPC params:', JSON.stringify(rpcParams, null, 2));

  const { data, error } = await supabase.rpc('get_filtered_rooms', rpcParams);

  if (error) {
    console.error('RPC error:', error);
    throw error;
  }

  return data ?? [];
}