"use client"

import { useEffect, useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client"
import type { Profile } from "@/types/profile"

interface UseProfileResult {
  profile: Profile | null
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>
  loading: boolean
  error: string | null
}

export function useProfileDetails(): UseProfileResult {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = getSupabaseBrowserClient()

    async function fetchProfile() {
      setLoading(true)
      setError(null)

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        setError(userError?.message ?? "No authenticated user")
        setLoading(false)
        return
      }

      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (profileError) {
        setError(profileError.message)
      } else {
        setProfile(data)
      }

      setLoading(false)
    }

    fetchProfile()
  }, [])

  return { profile, setProfile, loading, error }
}