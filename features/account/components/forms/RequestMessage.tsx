"use client"
import React from 'react'
import { useTranslations } from 'next-intl'
import { FormProp } from '@/schema/ProfileSchema'
import TextareaField from '@/components/shared/fields/TextareaField'

export default function RequestMessage({ form, isEditing }: FormProp) {
  const t = useTranslations('account.requestMessage')

  return (
    <div className='space-y-5 mt-5'>
      <h1 className="font-extrabold text-[18px] mb-3">{t('title')}</h1>
      <TextareaField form={form} isEditing={isEditing} label='bookingRequestMessage' name='bookingRequestMessage' transilation='account.requestMessage'/>
    </div>
  )
}