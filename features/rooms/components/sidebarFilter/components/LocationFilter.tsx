import React from 'react';
import { useTranslations } from 'next-intl';

interface LocationFilterProps {
  locations: string[];
  toggleLocation: (value: string) => void;
}

const locs = ["Porto", "Lisbon"];

export function LocationFilter({ locations, toggleLocation }: LocationFilterProps) {
  const t = useTranslations('RentARoom');

  return (
    <div>
      <h3 className='font-bold mb-3 text-[16px]'>{t('Filters.location')}</h3>
      {locs.map((loc, index) => (
        <div key={index} className='flex items-center gap-2 mb-2'>
          <input 
            type="checkbox" 
            className='w-4 h-4 accent-blue-400' 
            name={loc} 
            id={loc} 
            checked={locations.includes(loc)}
            onChange={() => toggleLocation(loc)}
          />
          <label className='text-md text-gray-500 cursor-pointer' htmlFor={loc}>{loc}</label>
        </div>
      ))}
    </div>
  );
}