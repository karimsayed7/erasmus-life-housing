import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server-client';
import Forgot_password from '@/features/auth/components/forgot_password';

export default async function ForgotPasswordPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect('/'); // Redirect if already logged in
  }

  return <Forgot_password />;
}
