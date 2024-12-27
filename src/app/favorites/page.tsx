"use client";

import { CocktailCard } from "@/components/CocktailCard";
import { useFavoritesStore } from "@/store/favorites";

export default function Favorites() {
  const { favorites, removeFavorite } = useFavoritesStore();

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {favorites.map((cocktail) => (
          <CocktailCard
            key={cocktail.idDrink}
            cocktail={cocktail}
            onAction={() => removeFavorite(cocktail.idDrink)}
            actionLabel="Remove from Favorites"
          />
        ))}
      </div>
    </div>
  );
}
