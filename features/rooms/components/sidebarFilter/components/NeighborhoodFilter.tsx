import React from 'react';
import { useTranslations } from 'next-intl';

interface NeighborhoodFilterProps {
  neighborhoods: string[];
  toggleNeighborhoods: (value: string) => void;
}

const neighborhoodList = ["Almada", "Anjos", "Amadora"]; 

export function NeighborhoodFilter({ neighborhoods, toggleNeighborhoods }: NeighborhoodFilterProps) {
  const t = useTranslations('RentARoom');

  return (
    <div>
      <h3 className='font-bold my-2 mb-3 text-[16px]'>{t('Filters.neighborhood')}</h3>
      {neighborhoodList.map((n, index) => (
        <div key={index} className='flex items-center gap-2 mb-2'>
          <input 
            type="checkbox" 
            className='w-4 h-4 accent-blue-400' 
            name={n} 
            id={n} 
            checked={neighborhoods.includes(n)}
            onChange={() => toggleNeighborhoods(n)}
          />
          <label className='text-md text-gray-500 cursor-pointer' htmlFor={n}>{n}</label>
        </div>
      ))}
    </div>
  );
}