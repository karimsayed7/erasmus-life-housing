import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server-client';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // Default to redirect to home page, but normally next will be '/reset_password'
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Redirect to sign in page with error parameter if code exchange fails
  return NextResponse.redirect(`${origin}/sign_in?error=auth-callback-failed`);
}
