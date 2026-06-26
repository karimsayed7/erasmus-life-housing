import { RoomProp } from "@/types/rooms";

interface BookingProcessProps extends RoomProp {
  checkIn?: string;
  checkOut?: string;
}

export default function BookingProccess({
  room,
  checkIn,
  checkOut,
}: BookingProcessProps) {
  return (
    <div>
      <p>{room.id}</p>
      <p>{checkIn}</p>
      <p>{checkOut}</p>
    </div>
  );
}