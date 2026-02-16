import { getFromLocalStorage } from "../utils/localStorage";

export function getSuggestedRecipes(recipes) {
  const ratings = getFromLocalStorage("ratings") || {};

  // Sort recipes based on user rating
  const sorted = [...recipes].sort((a, b) => {
    const ratingA = ratings[a.id] || 0;
    const ratingB = ratings[b.id] || 0;
    return ratingB - ratingA;
  });

  return sorted.slice(0, 5);
}
