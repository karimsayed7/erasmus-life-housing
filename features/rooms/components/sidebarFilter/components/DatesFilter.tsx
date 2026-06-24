import React from 'react';
import { useTranslations } from 'next-intl';

interface DatesFilterProps {
  fromDate: string;
  setFromDate: (value: string | null) => void;
  toDate: string;
  setToDate: (value: string | null) => void;
}

export function DatesFilter({ fromDate, setFromDate, toDate, setToDate }: DatesFilterProps) {
  const t = useTranslations('RentARoom');

  return (
    <div>
      <h3 className='font-bold mt-5 mb-2 text-[16px]'>{t('Filters.dates')}</h3>
      <div className='flex gap-2 '>
        <input 
          type="text" 
          className='p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-500 border border-gray-400 w-25 rounded-lg' 
          placeholder={t('Filters.from')}
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value || null)}
        />
        <input 
          type="text" 
          className='p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-500 border border-gray-400 w-25 rounded-lg' 
          placeholder={t('Filters.to')}
          value={toDate}
          onChange={(e) => setToDate(e.target.value || null)}
        />
      </div>
    </div>
  );
}