"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";

export type UserProfile = {
  name: string | null;
  email: string | null;
  photo: string | null;
};

export type UserRole = "admin" | "user" | null;

type AuthContextValue = {
  profile: UserProfile | null;
  role: UserRole;
  isAdmin: boolean;
  isLoading: boolean;
  userId: string | null;
  handleLogout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    let isMounted = true;

    const fetchAuthState = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) return;

      if (!session) {
        setProfile(null);
        setRole(null);
        setUserId(null);
        setIsLoading(false);
        return;
      }

      setUserId(session.user.id);

      const { data } = await supabase
        .from("profiles")
        .select("name, email, photo, role")
        .eq("id", session.user.id)
        .single();

      if (!isMounted) return;

      setProfile(
        data
          ? { name: data.name, email: data.email, photo: data.photo }
          : {
              name: session.user.email ?? null,
              email: session.user.email ?? null,
              photo: null,
            }
      );
      setRole((data?.role as UserRole) ?? "user");
      setIsLoading(false);
    };

    fetchAuthState();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      fetchAuthState();
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
    setRole(null);
    setUserId(null);
    router.push("/");
    router.refresh();
  };

  return (
    <AuthContext.Provider
      value={{ profile, role, isAdmin: role === "admin", isLoading, userId, handleLogout }}
    >
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

export function useUserRole() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useUserRole must be used within <AuthProvider>");
  }
  return { role: ctx.role, isAdmin: ctx.isAdmin, isLoading: ctx.isLoading };
}