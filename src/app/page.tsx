// "use client";

// import { useEffect, useState } from "react";
// import { getRandomCocktail } from "@/lib/api";
// import { CocktailCard } from "@/components/CocktailCard";
// import { useFavoritesStore } from "@/store/favorites";
// import { Button } from "@/components/ui/button";
// import { Cocktail } from "@/types/cocktail";

// export default function Home() {
//   const [cocktails, setCocktails] = useState<Cocktail[]>([]);
//   const [loading, setLoading] = useState(true);
//   const addFavorite = useFavoritesStore((state) => state.addFavorite);

//   async function loadRandomCocktails() {
//     setLoading(true);
//     try {
//       const promises = Array(5).fill(null).map(getRandomCocktail);
//       const results = await Promise.all(promises);
//       const uniqueResults = Array.from(
//         new Map(results.map((c) => [c.idDrink, c])).values()
//       );
//       setCocktails(uniqueResults);
//     } catch (error) {
//       console.error("Error loading cocktails:", error);
//     }
//     setLoading(false);
//   }

//   useEffect(() => {
//     loadRandomCocktails();
//   }, []);

//   return (
//     <div className="container py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">Random Cocktails</h1>
//         <Button onClick={loadRandomCocktails} disabled={loading}>
//           Refresh
//         </Button>
//       </div>
//       {loading ? (
//         <div className="text-center">Loading...</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
//           {cocktails.map((cocktail) => (
//             <CocktailCard
//               key={cocktail.idDrink}
//               cocktail={cocktail}
//               onAction={() => addFavorite(cocktail)}
//               actionLabel="Add to Favorites"
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState, FormEvent } from "react";
import { getRandomCocktail, searchCocktails } from "@/lib/api";
import { CocktailCard } from "@/components/CocktailCard";
import { useFavoritesStore } from "@/store/favorites";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cocktail } from "@/types/cocktail";

export default function Home() {
  const [randomCocktails, setRandomCocktails] = useState<Cocktail[]>([]);
  const [searchResults, setSearchResults] = useState<Cocktail[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [searching, setSearching] = useState<boolean>(false);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);

  async function loadRandomCocktails() {
    setLoading(true);
    try {
      const promises = Array(5).fill(null).map(getRandomCocktail);
      const results = await Promise.all(promises);
      const uniqueResults = Array.from(
        new Map(results.map((c) => [c.idDrink, c])).values()
      );
      setRandomCocktails(uniqueResults);
    } catch (error) {
      console.error("Error loading cocktails:", error);
    }
    setLoading(false);
  }

  async function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setSearching(true);
    try {
      const results = await searchCocktails(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching cocktails:", error);
      setSearchResults([]);
    }
    setSearching(false);
  }

  useEffect(() => {
    loadRandomCocktails();
  }, []);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-4 max-w-2xl mx-auto">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for cocktails..."
            className="flex-1"
          />
          <Button type="submit" disabled={searching}>
            Search
          </Button>
        </form>
      </div>

      {searchResults.length > 0 ? (
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Search Results</h2>
            <Button onClick={() => setSearchResults([])}>Clear Results</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {searchResults.map((cocktail) => (
              <CocktailCard
                key={cocktail.idDrink}
                cocktail={cocktail}
                onAction={() => addFavorite(cocktail)}
                actionLabel="Add to Favorites"
              />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Random Cocktails</h2>
            <Button onClick={loadRandomCocktails} disabled={loading}>
              Refresh
            </Button>
          </div>
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {randomCocktails.map((cocktail) => (
                <CocktailCard
                  key={cocktail.idDrink}
                  cocktail={cocktail}
                  onAction={() => addFavorite(cocktail)}
                  actionLabel="Add to Favorites"
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
