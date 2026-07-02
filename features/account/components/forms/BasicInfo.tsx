"use client"
import React from 'react'
import { useTranslations } from 'next-intl'
import { FormProp } from '@/schema/ProfileSchema'
import InputField from '@/components/shared/fields/InputField'
import SelectField from '@/components/shared/fields/SelectField'

export default function BasicInfo({ form, isEditing }: FormProp) {
  const t = useTranslations('account.basicInfo')

  return (
    <div className='space-y-5'>
      <h1 className='font-extrabold text-[18px]'>{t('title')}</h1>
      <div className='flex items-center gap-5'>
        <InputField form={form} isEditing={isEditing} label='firstName' name='firstName' transilation='account.basicInfo'/>
        <InputField form={form} isEditing={isEditing} label='lastName' name='lastName' transilation='account.basicInfo'/>
      </div>
      <SelectField form={form} isEditing={isEditing} label='gender' name='gender' arr={['male', 'female']} transilation='account.basicInfo'/>
      <InputField form={form} isEditing={isEditing} label='email' name='email' transilation='account.basicInfo'/>
      <InputField form={form} isEditing={isEditing} label='phone_number' name='phone_number' transilation='account.basicInfo'/>
      <InputField form={form} isEditing={isEditing} label='nationality' name='nationality' transilation='account.basicInfo'/>
      <InputField form={form} isEditing={isEditing} label='current_address' name='current_address' transilation='account.basicInfo'/>
    </div>
  )
}