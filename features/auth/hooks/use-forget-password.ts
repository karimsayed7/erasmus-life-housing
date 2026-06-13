import React from 'react'
import { useState } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client';

function useForgetPassword() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async (e: React.FormEvent, email: string) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const supabase = getSupabaseBrowserClient();
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/callback?next=/reset_password`,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return {error, success, loading, handleResetPassword};
}

export default useForgetPassword
