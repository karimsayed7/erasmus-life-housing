// src/features/applications/hooks/useApplications.ts
"use client";

import { useCallback, useEffect, useState } from "react";
import { getSupabaseBrowserClient as createClient } from "@/lib/supabase/browser-client";
import type { Database } from "@/types/database";

type Room = Database["public"]["Tables"]["rooms"]["Row"];

interface UseApplicationsReturn {
  rooms: Room[];
  loading: boolean;
  error: string | null;
  cancelRequest: (roomId: string) => Promise<void>;
  refetch: () => void;
}

export function useApplications(): UseApplicationsReturn {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  const supabase = createClient();

  useEffect(() => {
    const controller = new AbortController();

    async function fetchApplications() {
      setLoading(true);
      setError(null);

      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;

        if (!user) {
          if (!controller.signal.aborted) setRooms([]);
          return;
        }

        const { data, error: fetchError } = await supabase
          .from("rooms")
          .select("*")
          .eq("owner_id", user.id)
          .order("created_at", { ascending: false });

        if (fetchError) throw fetchError;
        if (!controller.signal.aborted) setRooms(data ?? []);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : "error happend when loading applications");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchApplications();

    return () => controller.abort();
  }, [supabase, refetchIndex]);

  const cancelRequest = useCallback(
    async (roomId: string) => {
      setRooms((prev) => prev.filter((room) => room.id !== roomId));

      const { error: cancelError } = await supabase
        .from("rooms")
        .update({ owner_id: null })
        .eq("id", roomId);

      if (cancelError) {
        setError(cancelError.message);
        setRefetchIndex((i) => i + 1); 
        throw cancelError;
      }
    },
    [supabase]
  );

  const refetch = useCallback(() => setRefetchIndex((i) => i + 1), []);

  return { rooms, loading, error, cancelRequest, refetch };
}