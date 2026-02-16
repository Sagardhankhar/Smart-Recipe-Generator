import substitutions from "../data/substitutions.json";

export function matchRecipes(userIngredients, recipes) {
  if (!userIngredients || userIngredients.length === 0) {
    return recipes.map((r) => ({
      ...r,
      matchScore: 0,
      matchPercent: 0,
      missingIngredients: [],
      substitutions: {},
    }));
  }

  const userSet = new Set(userIngredients.map((x) => x.toLowerCase()));

  const results = recipes.map((recipe) => {
    const recipeIngredients = recipe.ingredients.map((x) => x.toLowerCase());

    let matched = 0;
    let missing = [];

    recipeIngredients.forEach((ing) => {
      if (userSet.has(ing)) matched++;
      else missing.push(ing);
    });

    const score = matched / recipeIngredients.length;
    const percent = Math.round(score * 100);

    let subs = {};
    missing.forEach((m) => {
      if (substitutions[m]) {
        subs[m] = substitutions[m];
      }
    });

    return {
      ...recipe,
      matchScore: score,
      matchPercent: percent,
      missingIngredients: missing,
      substitutions: subs,
    };
  });

  // Sort by best match first
  results.sort((a, b) => b.matchScore - a.matchScore);

  return results;
}
