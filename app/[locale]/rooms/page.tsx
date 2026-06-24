import React from 'react'
import Rooms from '../../../features/rooms/Rooms'
import { RoomSearchParams } from '../../../features/rooms/types/room-search-params';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<RoomSearchParams>  
}) {
  const params = await searchParams;
  return <Rooms searchParams={params} />;
}
