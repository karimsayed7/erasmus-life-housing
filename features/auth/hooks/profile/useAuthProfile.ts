
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
  console.log("1. effect started");
  const supabase = getSupabaseBrowserClient();

  const fetchProfile = async () => {
    try {
      console.log("2. fetching session...");
      const { data: { session } } = await supabase.auth.getSession();
      console.log("3. session:", session);
      
      if (!session) {
        setProfile(null);
        return;
      }
      
      console.log("4. fetching profile row...");
      const { data, error } = await supabase
        .from("profiles")
        .select("name, email, photo")
        .eq("id", session.user.id)
        .single();
      
      console.log("5. profile data:", data, "error:", error);

      setProfile(
        data ?? {
          name: session.user.email ?? null,
          email: session.user.email ?? null,
          photo: null,
        }
      );
    } catch (err) {
      console.error("6. caught error:", err);
      setProfile(null);
    } finally {
      console.log("7. finally - setting isLoading false");
      setIsLoading(false);
    }
  };

  fetchProfile();
  // ...
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