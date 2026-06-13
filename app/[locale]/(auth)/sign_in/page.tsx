// app/sign-in/page.tsx
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server-client'
// import Sign_in from '@/features/sign-in/sign_in'
import Sign_in from '@/features/auth/components/sign_in'

export default async function LoginPage() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) redirect('/') // already logged in

  return <Sign_in />
}