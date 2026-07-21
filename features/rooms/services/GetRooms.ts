import { createSupabaseServerClient } from '@/lib/supabase/server-client';
import { RoomSearchParams } from '../../../types/room-search-params';

export async function getRooms(params: RoomSearchParams) {
  const supabase = await createSupabaseServerClient();

  const toArray = (val?: string | string[]): string[] | undefined => {
    if (!val) return undefined;
    const arr = Array.isArray(val)
      ? val
      : val.split(',').map(s => s.trim());
    const filtered = arr.filter(Boolean);
    return filtered.length > 0 ? filtered : undefined;
  };

  const minPrice = params.minPrice ? parseInt(params.minPrice, 10) : undefined;
  const maxPrice = params.maxPrice ? parseInt(params.maxPrice, 10) : undefined;

  const rpcParams = {
    p_cities:        toArray(params.location),
    p_room_types:    toArray(params.roomType),
    p_neighborhoods: toArray(params.neighborhood),
    p_amenities:     toArray(params.amenities),
    p_min_price:     minPrice !== undefined && !isNaN(minPrice) ? minPrice : undefined,
    p_max_price:     maxPrice !== undefined && !isNaN(maxPrice) ? maxPrice : undefined,
  };

  console.log('RPC params:', JSON.stringify(rpcParams, null, 2));

  const { data, error } = await supabase
    .rpc('get_filtered_rooms', rpcParams)
    .eq('is_hidden', false);

  if (error) {
    console.error('RPC error:', error);
    throw error;
  }

  return data ?? [];
}