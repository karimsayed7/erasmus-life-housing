import { redirect } from 'next/navigation'
import { createSupabaseServerClient as createClient } from '@/lib/supabase/server-client'

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/sign_in')
  }

  return <>{children}</>
}