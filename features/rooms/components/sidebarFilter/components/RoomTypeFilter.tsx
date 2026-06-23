import React from 'react';

interface RoomTypeFilterProps {
  roomTypes: string[];
  toggleRoomTypes: (value: string) => void;
}

const RoomTypeList = ["Studio", "Apartment", "Private Room"];

export function RoomTypeFilter({ roomTypes, toggleRoomTypes }: RoomTypeFilterProps) {
  return (
    <div>
      <h3 className='font-bold mb-3 text-[16px]'>Room Type</h3>
      {RoomTypeList.map((r, index) => (
        <div key={index} className='flex items-center gap-2 mb-2'>
          <input 
            type="checkbox" 
            className='w-4 h-4 accent-blue-400' 
            name={r} 
            id={r} 
            checked={roomTypes.includes(r)}
            onChange={() => toggleRoomTypes(r)}
          />
          <label className='text-md text-gray-500 cursor-pointer' htmlFor={r}>{r}</label>
        </div>
      ))}
    </div>
  );
}