import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client';
import { useState } from 'react';

function useSignUp() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (email: string, password: string, phone: string, name: string) => {
    setError(null);
    setLoading(true);

    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          phone,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    
    setSuccess(true);
    setLoading(false);
  };

  return { error, success, loading, handleSignUp };
}

export default useSignUp;