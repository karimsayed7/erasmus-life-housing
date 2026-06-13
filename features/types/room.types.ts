export interface IconTextItem {
  iconName: string;
  text: string;
}

export interface BedRoomItem {
  isExist: boolean;
  text: string;
}

export interface TenantHosted {
  user: string;
  photo: string;
}

export interface Room {
  id: string;
  images: string[];
  title: string;
  description: string;
  location: string;
  price: number;
  bills: number;
  fee: number;
  total_price: number;
  security_deposit: number;
  city: string;
  date_from: string;
  date_to: string;
  neighborhood: string;
  room_type: string;
  amenities: string[];
  facilities: IconTextItem[] | Record<string, string> | null;
  specification: string[];
  landlord_rules: IconTextItem[];
  available_from: string;
  minimum_stay: number;
  maximum_stay: number;
  calendar_updated: string;
  attributes: IconTextItem[];
  bedroom: BedRoomItem[];
  kitchen: BedRoomItem[];
  living_room: BedRoomItem[];
  other: BedRoomItem[];
  availability_status: string;
  approval_status: string;
  when_joined_platform: string;
  tenant_message: string;
  tenants_hosted: TenantHosted[];
  listing_id: string;
}