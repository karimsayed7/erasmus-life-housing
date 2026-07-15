"use client"

import { useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client"

interface UseUploadImagesResult {
  uploadImages: (files: File[], pathPrefix: string) => Promise<string[]>
  uploading: boolean
  error: string | null
}

export function useUploadImages(bucket: string): UseUploadImagesResult {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function uploadImages(files: File[], pathPrefix: string): Promise<string[]> {
    setUploading(true)
    setError(null)

    const supabase = getSupabaseBrowserClient()
    const urls: string[] = []

    for (const file of files) {
      const fileExt = file.name.split(".").pop()
      const filePath = `${pathPrefix}/${Date.now()}-${crypto.randomUUID()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, { cacheControl: "3600", upsert: false })

      if (uploadError) {
        setError(uploadError.message)
        setUploading(false)
        return urls // ارجع اللي اترفع فعلاً، متسبش الباقي معلق
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)
      urls.push(data.publicUrl)
    }

    setUploading(false)
    return urls
  }

  return { uploadImages, uploading, error }
}