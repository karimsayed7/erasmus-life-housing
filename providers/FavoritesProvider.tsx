"use client";

import {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "@/features/favourites/service/service";

type FavoritesContextType = {
  favoriteIds: string[];
  isLoading: boolean;
  toggleFavorite: (roomId: string) => Promise<void>;
  isFavorite: (roomId: string) => boolean;
};

export const FavoritesContext = createContext<FavoritesContextType | null>(
  null
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations("favourites and applications")
  useEffect(() => {
    let isMounted = true;

    async function load() {
      const supabase = getSupabaseBrowserClient();

      try {
        const [
          {
            data: { user },
          },
          favoriteIds,
        ] = await Promise.all([
          supabase.auth.getUser(),
          getFavorites().catch(() => []),
        ]);

        if (!isMounted) return;

        setUser(user);
        setFavoriteIds(favoriteIds);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    load();

    const supabase = getSupabaseBrowserClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (!isMounted) return;

      setUser(session?.user ?? null);

      if (session?.user) {
        try {
          const ids = await getFavorites();
          if (isMounted) {
            setFavoriteIds(ids);
          }
        } catch {
          if (isMounted) {
            setFavoriteIds([]);
          }
        }
      } else {
        setFavoriteIds([]);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const toggleFavorite = useCallback(
    async (roomId: string) => {
      if (!user) {
        toast.error(t("must sign in"));
        return;
      }

      const wasFavorite = favoriteIds.includes(roomId);

      setFavoriteIds((prev) =>
        wasFavorite ? prev.filter((id) => id !== roomId) : [...prev, roomId]
      );

      try {
        if (wasFavorite) {
          await removeFavorite(roomId);
        } else {
          await addFavorite(roomId);
        }
      } catch {
        setFavoriteIds((prev) =>
          wasFavorite ? [...prev, roomId] : prev.filter((id) => id !== roomId)
        );

        toast.error(t("wrong"));
      }
    },
    [favoriteIds, user]
  );

  const isFavorite = useCallback(
    (roomId: string) => favoriteIds.includes(roomId),
    [favoriteIds]
  );

  return (
    <FavoritesContext.Provider
      value={{ favoriteIds, isLoading, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}