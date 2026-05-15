import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kvlpcvsdjmqmsdnqlnqa.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2bHBjdnNkam1xbXNkbnFsbnFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0Mzc2MTEsImV4cCI6MjA5NDAxMzYxMX0.urHAuZtOnRreefMePFbGIz_W0Cw9ayKf9gfq9iQ2NHA";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);