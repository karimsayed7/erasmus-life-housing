"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

export type UserProfile = {
  name: string | null;
  email: string | null;
  photo: string | null;
};

type AuthContextValue = {
  profile: UserProfile | null;
  isLoading: boolean;
  handleLogout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    let isMounted = true;

    const fetchProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        if (isMounted) {
          setProfile(null);
          setIsLoading(false);
        }
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("name, email, photo")
        .eq("id", session.user.id)
        .single();

      if (!isMounted) return;

      setProfile(
        data ?? {
          name: session.user.email ?? null,
          email: session.user.email ?? null,
          photo: null,
        }
      );
      setIsLoading(false);
    };

    // 1) initial fetch on mount (covers hard refresh)
    fetchProfile();

    // 2) re-run fetchProfile on every auth event (SIGNED_IN, SIGNED_OUT,
    // TOKEN_REFRESHED, and the INITIAL_SESSION event fired right on
    // subscribe) — so the Header updates immediately after sign-in
    // instead of waiting for a remount.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      fetchProfile();
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    setProfile(null);
    router.push("/");
    router.refresh();
  };

  return (
    <AuthContext.Provider value={{ profile, isLoading, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthProfile() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthProfile must be used within <AuthProvider>");
  }
  return ctx;
}