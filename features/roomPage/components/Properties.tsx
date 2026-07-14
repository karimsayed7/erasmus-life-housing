import React from 'react'
import { Database } from '@/types/database'
import { getLocalized } from '@/types/GetLocalized';
import { getLocale, getTranslations } from "next-intl/server";
import { MapPinPen } from 'lucide-react';
import PropertyStyle from '@/components/shared/PropertyStyle';

interface Props {
  room: Database['public']['Tables']['rooms']['Row'];
} 

type Attribute = {
  icon: string;
  value?: number;
  name_en: string;
  name_pt: string;
};

type facility = {
  icon: string ;
  name_en: string;
  name_pt: string;
};

type landlord = {
  icon: string ;
  name_en: string;
  name_pt: string;
};

async function Properties({ room }: Props) {
  const attributes = room.attributes as Attribute[];    
  const facilities = room.facilities as unknown as facility[] | undefined;
  const landlords = room.landlord_rules as unknown as landlord[] | undefined;
  const locale = await getLocale();
  
  
  const t = await getTranslations('roomPage');

  return (
    <div className='mt-3'>
      {/* title */}
      <div className='flex items-center justify-between mb-3'>
        <h1 className='text-xl md:text-3xl font-bold'>{getLocalized(room.title, locale)}</h1>
        <p className='text-xl md:text-3xl font-bold'>
          €{room.price}
          <span className='text-lg md:text-2xl text-gray-400'>/{t('month')}</span>
        </p>
      </div>

      {/* room type */}
      <div className='my-3'>
        <span className='text-lg font-semibold'>{t("room type")}:</span>
        <span className='ml-2 text-md text-gray-500'>{getLocalized(room.room_type, locale)}</span>
      </div>

      {/* location */}
      <div className='flex items-center gap-3 mb-1'>
        <MapPinPen fill='#1e2939' className='text-white' size={30}/>
        <p className='text-lg text-gray-500'>{getLocalized(room.title, locale)}</p>
      </div>


      {/* attributes */}
      <div className="flex items-center gap-3 flex-wrap mb-2">
        {attributes?.map((attr: Attribute) => (
          <PropertyStyle
            textcolor='blue'
            bg='blue'
            key={attr.name_en}
            text={
              attr.value !== undefined
                ? `${attr.value} ${locale === "pt" ? attr.name_pt : attr.name_en}`
                : locale === "pt"
                ? attr.name_pt
                : attr.name_en
            }
          />
        ))}
      </div>

      {/* description */}
      <div className='p-4 border-2 border-gray-300 rounded-lg'>
        <h1 className='font-bold text-xl mb-2'>{t('description')}</h1>
        <p>{getLocalized(room.description, locale)}</p>
      </div>

      {/* facilities */}
      <div className='p-4 border-2 border-gray-300 rounded-lg my-3 '>
        <h1 className='font-bold text-xl mb-2'>{t('facilities')}</h1>
        <div className='flex items-center gap-3 flex-wrap'>
          {facilities?.map((f: facility) => (
            <PropertyStyle
              key={f.name_en}
              textcolor='gray'
              bg='gray'
              icon={f.icon}
              text={locale === 'pt' ? f.name_pt : f.name_en}
            />
          ))}
        </div>
      </div>

      {/* availability */}
      <div className='p-4 border-2 border-gray-300 rounded-lg flex flex-col gap-2'>
        <h1 className='font-bold text-xl mb-2'>{t('availability')}</h1>
        <p className='text-gray-600'>
          {t('availableFrom')}: <span className='text-gray-800 font-bold'>{room.available_from}</span>
        </p>
        <p className='text-gray-600'>
          {t('minimumStay')}: <span className='text-gray-800 font-bold'>1 {t('month')}</span>
        </p>
        <p className='text-gray-600'>
          {t('maximumStay')}: <span className='text-gray-800 font-bold'>{t('unlimited')}</span>
        </p>
        <p className='text-gray-600'>
          {t('calendarUpdated')}: <span className='text-gray-800 font-bold'>{room.calendar_updated} {t('weeksAgo')}</span>
        </p>
      </div>

      {/* landlords */}
      <div className='p-4 border-2 border-gray-300 rounded-lg my-3'>
        <h1 className='font-bold text-xl mb-2'>{t('landlordRules')}</h1>
        <div className='flex items-center gap-3 flex-wrap'>
          {landlords?.map((l: landlord) => (
            <PropertyStyle
              key={l.name_en}
              textcolor='gray'
              bg='gray'
              icon={l.icon}
              text={locale === 'pt' ? l.name_pt : l.name_en}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Properties