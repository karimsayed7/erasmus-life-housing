import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server-client';
import Reset_password from '@/features/auth/components/reset_password';

export default async function ResetPasswordPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If there is no user session (meaning the user didn't come from a valid recovery link or has expired),
  // redirect them back to the sign in page.
  if (!user) {
    redirect('/sign_in');
  }

  return <Reset_password />;
}
