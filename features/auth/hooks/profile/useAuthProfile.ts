// features/auth/hooks/useAuthProfile.ts
"use client";
import { useState, useEffect } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useRouter } from "next/navigation";

export type UserProfile = {
  name: string | null;
  email: string | null;
  photo: string | null;
};

export function useAuthProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setProfile(null);
        setIsLoading(false);
        return;
      }
      const { data } = await supabase
        .from("profiles")
        .select("name, email, photo")
        .eq("id", session.user.id)
        .single();

      setProfile(
        data ?? {
          name: session.user.email ?? null,
          email: session.user.email ?? null,
          photo: null,
        }
      );
      setIsLoading(false);
    };

    fetchProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchProfile();
    });

    return () => subscription?.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    setProfile(null);
    router.push("/");
    router.refresh();
  };

  return { profile, isLoading, handleLogout };
}