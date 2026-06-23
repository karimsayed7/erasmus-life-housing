import React from 'react';

interface AmentitiesFilterProps {
  amenities: string[];
  toggleAmenities: (value: string) => void;
}

const amenitiesList = ["Heating", "Dryer", "Air conditioning", "Washing Machine", "Dishwasher", "Private bathroom"];

export function AmentitiesFilter({ amenities, toggleAmenities }: AmentitiesFilterProps) {
  return (
    <div>
      <h3 className='font-bold mb-3 text-[16px]'>Amenities</h3>
      {amenitiesList.map((a, index) => (
        <div key={index} className='flex items-center gap-2 mb-2'>
          <input 
            type="checkbox" 
            className='w-4 h-4 accent-blue-400' 
            name={a} 
            id={a} 
            checked={amenities.includes(a)}
            onChange={() => toggleAmenities(a)}
          />
          <label className='text-md text-gray-500 cursor-pointer' htmlFor={a}>{a}</label>
        </div>
      ))}
    </div>
  );
}