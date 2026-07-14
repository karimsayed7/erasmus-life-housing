
export type RoomSearchParams = {
  location?: string | string[];
  roomType?: string | string[];
  neighborhood?: string | string[];
  amenities?: string | string[];

  minPrice?: string;
  maxPrice?: string;
  page?: string;
  q?: string;
};