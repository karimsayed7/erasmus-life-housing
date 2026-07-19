import React from 'react'
import Favourites from '@/features/favourites/Favourites'
import { FavoritesProvider } from "@/providers/FavoritesProvider";

export default function Page() {
  return (
    <div>
        <FavoritesProvider>
            <Favourites />
        </FavoritesProvider>
    </div>
  )
}
