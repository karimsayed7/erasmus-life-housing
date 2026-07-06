"use client";

import {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
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

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const ids = await getFavorites();
        if (isMounted) setFavoriteIds(ids);
      } catch {
        if (isMounted) setFavoriteIds([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleFavorite = useCallback(
    async (roomId: string) => {
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
      }
    },
    [favoriteIds]
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