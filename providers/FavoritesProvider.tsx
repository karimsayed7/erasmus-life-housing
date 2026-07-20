"use client";

import {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { useAuthProfile } from "@/providers/auth-provider";
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
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations("favourites and applications");

  // Reads auth state from the single shared AuthProvider instead of
  // independently calling supabase.auth.getUser()/onAuthStateChange here —
  // that duplicate concurrent call (racing with AuthProvider's own auth
  // call on the same page load) was the root cause of the stuck-loading bug.
  const { userId, isLoading: isAuthLoading } = useAuthProfile();

  useEffect(() => {
    let isMounted = true;

    async function load() {
      if (!userId) {
        setFavoriteIds([]);
        setIsLoading(false);
        return;
      }

      try {
        const ids = await getFavorites();
        if (isMounted) setFavoriteIds(ids);
      } catch {
        if (isMounted) setFavoriteIds([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    if (!isAuthLoading) {
      load();
    }

    return () => {
      isMounted = false;
    };
  }, [userId, isAuthLoading]);

  const toggleFavorite = useCallback(
    async (roomId: string) => {
      if (!userId) {
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
    [favoriteIds, userId, t]
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