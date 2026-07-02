"use client"
import React from 'react'
import { useTranslations } from 'next-intl'
import { FormProp } from '@/schema/ProfileSchema'
import InputField from '@/components/shared/fields/InputField'
import TextareaField from '@/components/shared/fields/TextareaField'
import SelectField from '@/components/shared/fields/SelectField'

export default function AdditionalDetails({ form, isEditing }: FormProp) {
  const t = useTranslations('account.additionalDetails')

  return (
    <div className='space-y-5 mt-5'>
      <h1 className='font-extrabold text-[18px]'>{t('title')}</h1>
      <SelectField form={form} isEditing={isEditing} label='employment_status' name='employment_status' arr={['study', 'work']} transilation='account.additionalDetails'/>
      <InputField form={form} isEditing={isEditing} label='where_you_study' name='where_you_study' transilation='account.additionalDetails'/>
      <InputField form={form} isEditing={isEditing} label='funding_source' name='funding_source' transilation='account.additionalDetails'/>
      <TextareaField form={form} isEditing={isEditing} label='about_yourself' name='about_yourself' transilation='account.additionalDetails'/>
    </div>
  )
}