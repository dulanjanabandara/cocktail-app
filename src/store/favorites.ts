import { Cocktail } from "./../types/cocktail";
import { create } from "zustand";

interface FavoritesStore {
  favorites: Cocktail[];
  addFavorite: (cocktail: Cocktail) => void;
  removeFavorite: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesStore>((set) => ({
  favorites: [],
  addFavorite: (cocktail) =>
    set((state) => ({
      favorites: state.favorites.some((f) => f.idDrink === cocktail.idDrink)
        ? state.favorites
        : [...state.favorites, cocktail],
    })),
  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((f) => f.idDrink !== id),
    })),
}));
