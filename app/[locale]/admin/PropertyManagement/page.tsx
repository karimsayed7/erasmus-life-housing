import React from 'react'
import PropertyManagement from '@/features/admin/PropertyManagement/PropertyManagement';
import { RoomSearchParams } from '@/types/room-search-params';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<RoomSearchParams>  
}) {
  const params = await searchParams;
  return <PropertyManagement searchParams={params} />;
}
