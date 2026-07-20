"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";

// Known Supabase Auth-JS bug (github.com/supabase/supabase-js/issues/1594 & #2111):
// GoTrueClient serializes auth calls behind navigator.locks with no timeout.
// A no-op lock disables that serialization; safe since we only ever run one
// browser client instance (singleton below).
async function noOpLock<R>(
  _name: string,
  _acquireTimeout: number,
  fn: () => Promise<R>
): Promise<R> {
  return fn();
}

let client: SupabaseClient<Database> | null = null;

export function getSupabaseBrowserClient(): SupabaseClient<Database> {
  if (client) {
    return client;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  client = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      lock: noOpLock,
    },
  });
  return client;
}