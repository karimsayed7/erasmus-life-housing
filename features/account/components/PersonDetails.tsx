"use client"
import React, { useRef } from 'react'
import { useProfileDetails } from '../hooks/UseProfileDetails'
import { useUploadProfilePhoto } from '../hooks/useUploadProfilePhoto'
import { Button } from '@/components/ui/button'
import { UserAvatar } from '@/features/auth/components/profile/UserAvatar'
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from 'next-intl'

export default function PersonDetails() {
  const { profile, setProfile, loading } = useProfileDetails()
  const { uploadPhoto, uploading, error } = useUploadProfilePhoto()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const t = useTranslations('account.personDetails')

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !profile?.id) return

    const newUrl = await uploadPhoto(file, profile.id, profile.photo)

    if (newUrl) {
      setProfile({ ...profile, photo: newUrl })
    }

    e.target.value = ""
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center">
        <Skeleton className="h-[150px] w-[150px] rounded-full bg-gray-200" />

        <Skeleton className="mt-4 h-6 w-40 bg-gray-200" />

        <Skeleton className="mt-2 h-4 w-56 bg-gray-200" />

        <Skeleton className="mt-6 h-12 w-52 rounded-md bg-gray-200" />
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center'>
      {profile && <UserAvatar profile={profile} size={150} />}
      <h3 className='py-3 font-bold'>{profile?.name}</h3>
      <p className='text-gray-500 mb-3'>{profile?.email}</p>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <Button
        className='px-4 py-6 text-[15px] cursor-pointer'
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
      >
        {uploading ? `${t("uploading")}...` : t("uploadPhoto")}
      </Button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}