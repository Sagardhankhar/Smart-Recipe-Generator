import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import recipesData from "../../data/recipes.json";
import substitutionsData from "../../data/substitutions.json";

import { FavoriteContext } from "../../context/FavoriteContext";
import { getFromLocalStorage, saveToLocalStorage } from "../../utils/localStorage";

import RatingStars from "../../components/RatingStars/RatingStars";

import "./RecipeDetails.css";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const recipe = recipesData.find((r) => r.id === Number(id));

  const { addFavorite, removeFavorite, isFavorite } =
    useContext(FavoriteContext);

  const [servings, setServings] = useState(recipe ? recipe.servings : 1);

  // ✅ Rating initial load directly from localStorage (No setState inside useEffect)
  const [rating, setRating] = useState(() => {
    const savedRatings = getFromLocalStorage("ratings") || {};
    return savedRatings[id] ? Number(savedRatings[id]) : 0;
  });

  // ✅ Save rating whenever rating changes
  useEffect(() => {
    const savedRatings = getFromLocalStorage("ratings") || {};
    savedRatings[id] = rating;
    saveToLocalStorage("ratings", savedRatings);
  }, [rating, id]);

  if (!recipe) {
    return (
      <div className="recipe-details">
        <h1>Recipe Not Found ❌</h1>
        <button className="btn btn-back" onClick={() => navigate("/recipes")}>
          Go Back
        </button>
      </div>
    );
  }

  const servingFactor = servings / recipe.servings;

  const getNutritionValue = (value) => {
    return Math.round(value * servingFactor);
  };

  const missingIngredients = recipe.ingredients.filter(
    (ing) => substitutionsData[ing.toLowerCase()]
  );

  const handleFavoriteClick = () => {
    if (isFavorite(recipe.id)) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <div className="recipe-details">
      <h1>{recipe.name}</h1>

      <div className="recipe-info">
        <span>🍽 Cuisine: {recipe.cuisine}</span>
        <span>⏱ Time: {recipe.cookingTime} min</span>
        <span>🔥 Difficulty: {recipe.difficulty}</span>
        <span>🥗 Diet: {recipe.dietary.join(", ")}</span>
      </div>

      {/* Rating */}
      <div style={{ marginTop: "15px" }}>
        <h3 style={{ fontWeight: "800" }}>⭐ Rate this Recipe</h3>

        <RatingStars rating={rating} setRating={setRating} />

        <p style={{ marginTop: "5px", fontWeight: "600" }}>
          Your Rating: {rating}/5
        </p>
      </div>

      {/* Serving Adjustment */}
      <div className="serving-box">
        <label>
          <b>Servings:</b>
        </label>

        <input
          type="number"
          min="1"
          value={servings}
          onChange={(e) => setServings(Number(e.target.value))}
        />

        <span>(Default: {recipe.servings})</span>
      </div>

      {/* Ingredients */}
      <div className="recipe-section">
        <h2>🧾 Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ing, index) => (
            <li key={index}>{ing}</li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div className="recipe-section">
        <h2>👨‍🍳 Cooking Steps</h2>
        <ul>
          {recipe.steps.map((step, index) => (
            <li key={index}>
              <b>Step {index + 1}:</b> {step}
            </li>
          ))}
        </ul>
      </div>

      {/* Nutrition */}
      <div className="recipe-section">
        <h2>📊 Nutrition (Adjusted)</h2>
        <ul>
          <li>Calories: {getNutritionValue(recipe.nutrition.calories)}</li>
          <li>Protein: {getNutritionValue(recipe.nutrition.protein)} g</li>
          <li>Carbs: {getNutritionValue(recipe.nutrition.carbs)} g</li>
          <li>Fat: {getNutritionValue(recipe.nutrition.fat)} g</li>
        </ul>
      </div>

      {/* Substitutions */}
      <div className="recipe-section">
        <h2>🔄 Substitution Suggestions</h2>

        {missingIngredients.length > 0 ? (
          missingIngredients.map((ing, index) => (
            <div className="sub-box" key={index}>
              <b className="missing">{ing}</b> can be replaced with:{" "}
              <b>{substitutionsData[ing.toLowerCase()].join(", ")}</b>
            </div>
          ))
        ) : (
          <p style={{ color: "green", fontWeight: "700" }}>
            No substitutions needed ✅
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="recipe-actions">
        <button className="btn btn-back" onClick={() => navigate("/recipes")}>
          ⬅ Back
        </button>

        <button className="btn btn-fav" onClick={handleFavoriteClick}>
          {isFavorite(recipe.id) ? "💔 Remove Favorite" : "❤️ Save to Favorites"}
        </button>
      </div>
    </div>
  );
}
