import { useState } from "react";
import "./RecipeResults.css";

import recipesData from "../../data/recipes.json";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import IngredientInput from "../../components/IngredientInput/IngredientInput";
import Filters from "../../components/Filters/Filters";
import ImageUpload from "../../components/ImageUpload/ImageUpload";

import { matchRecipes } from "../../services/recipeMatcher";

export default function RecipeResults() {
  const [userIngredients, setUserIngredients] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [diet, setDiet] = useState("");

  const matchedRecipes = matchRecipes(userIngredients, recipesData);

  const applyFilters = (recipes) => {
    return recipes.filter((recipe) => {
      const matchDifficulty = difficulty
        ? recipe.difficulty === difficulty
        : true;

      const matchTime = maxTime ? recipe.cookingTime <= Number(maxTime) : true;

      const matchDiet = diet ? recipe.dietary.includes(diet) : true;

      return matchDifficulty && matchTime && matchDiet;
    });
  };

  const finalRecipes = applyFilters(matchedRecipes);

  const handleSearch = (ingredientList) => {
    setUserIngredients(ingredientList);
  };

  const handleDetectedIngredients = (detected) => {
    setUserIngredients(detected);
  };

  return (
    <div className="recipe-results">
      <h2 className="recipe-results-title">Smart Recipe Suggestions 🍲</h2>
      <p className="recipe-results-subtitle">
        Upload ingredients photo OR type ingredients to find best recipes.
      </p>

      <IngredientInput onSearch={handleSearch} />

      <ImageUpload onDetected={handleDetectedIngredients} />

      <Filters
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        maxTime={maxTime}
        setMaxTime={setMaxTime}
        diet={diet}
        setDiet={setDiet}
      />

      <div style={{ marginTop: "15px", fontWeight: "700", color: "#444" }}>
        Detected / Entered Ingredients:{" "}
        <span style={{ color: "tomato" }}>
          {userIngredients.length > 0 ? userIngredients.join(", ") : "None"}
        </span>
      </div>

      <div className="recipe-grid">
        {finalRecipes.length > 0 ? (
          finalRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p style={{ marginTop: "30px", fontWeight: "600", color: "tomato" }}>
            No recipes found ❌ Try different ingredients.
          </p>
        )}
      </div>
    </div>
  );
}
