"use client"

import { useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client"

interface UseUploadProfilePhotoResult {
  uploadPhoto: (file: File, userId: string, oldPhotoUrl?: string | null) => Promise<string | null>
  uploading: boolean
  error: string | null
}

export function useUploadProfilePhoto(): UseUploadProfilePhotoResult {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function uploadPhoto(
    file: File,
    userId: string,
    oldPhotoUrl?: string | null
  ): Promise<string | null> {
    setUploading(true)
    setError(null)

    const supabase = getSupabaseBrowserClient()

    const fileExt = file.name.split(".").pop()
    const filePath = `${userId}/${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      })

    if (uploadError) {
      setError(uploadError.message)
      setUploading(false)
      return null
    }

    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath)

    const newPhotoUrl = publicUrlData.publicUrl

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ photo: newPhotoUrl })
      .eq("id", userId)

    if (updateError) {
      setError(updateError.message)
      setUploading(false)
      return null
    }

    if (oldPhotoUrl) {
      const oldPath = oldPhotoUrl.split("/avatars/")[1]
      if (oldPath) {
        await supabase.storage.from("avatars").remove([oldPath])
      }
    }

    setUploading(false)
    return newPhotoUrl
  }

  return { uploadPhoto, uploading, error }
}