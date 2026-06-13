"use client";
import { useState, useEffect } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client';

export type UserRole = 'admin' | 'user' | null;

export function useUserRole() {
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();

    const fetchRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setRole(null);
        setIsLoading(false);
        return;
      }

      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      setRole((data?.role as UserRole) ?? 'user');
      setIsLoading(false);
    };

    fetchRole();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchRole();
    });

    return () => subscription?.unsubscribe();
  }, []);

  return { role, isAdmin: role === 'admin', isLoading };
}