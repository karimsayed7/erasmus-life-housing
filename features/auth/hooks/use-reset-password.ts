import React from 'react'
import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client';
import { useState } from 'react';

function useResetPassword() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async (e: React.FormEvent, password: string, confirmPassword: string) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
        }

        if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
        }

        setLoading(true);

        try {
        const supabase = getSupabaseBrowserClient();
        const { error } = await supabase.auth.updateUser({ password });

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

  return{error, success, loading, handleResetPassword}

}

export default useResetPassword
