import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client';

function useSignIn() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (email: string, password: string) => {
    setError(null);
    setLoading(true);

    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push('/');
    router.refresh(); // important: re-syncs server session
  };

  const handleGoogleLogin = async () => {
    const supabase = getSupabaseBrowserClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/callback`,
      },
    });

    if (error) console.error(error.message);
  };

  const handleDemoAdmin = async () => {
    setError(null);
    setLoading(true);
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: 'admin@gmail.com',
      password: '011500600',
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push('/');
    router.refresh();
  };

  return { error, loading, handleSignIn, handleGoogleLogin, handleDemoAdmin };
}
export default useSignIn;