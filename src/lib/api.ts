import { Cocktail } from "./../types/cocktail";

export async function getRandomCocktail(): Promise<Cocktail> {
  const response = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  );
  const data = await response.json();
  return data.drinks[0];
}

export async function searchCocktails(query: string): Promise<Cocktail[]> {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
  );
  const data = await response.json();
  return data.drinks || [];
}
