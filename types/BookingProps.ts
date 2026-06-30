"use client"

import { RoomProp } from "@/types/rooms";
import { UseFormReturn } from "react-hook-form"
import { BookingFormType } from "../schema/BookingSchema"  

export type FormProp  = {
  form: UseFormReturn<BookingFormType>
}

export interface BookingProcessProps extends RoomProp {
  checkIn?: string;
  checkOut?: string;
}

export interface BookingRoomProcessProps extends BookingProcessProps , FormProp  {} 