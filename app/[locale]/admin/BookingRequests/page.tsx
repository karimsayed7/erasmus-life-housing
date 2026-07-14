import React from 'react'
import BookingRequests from '@/features/admin/BookingRequests/BookingRequests';
import { RoomSearchParams } from '@/types/room-search-params';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<RoomSearchParams>  
}) {
  const params = await searchParams;
  return <BookingRequests searchParams={params} />;
}
