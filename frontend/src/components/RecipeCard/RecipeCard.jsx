import { useNavigate } from "react-router-dom";
import "./RecipeCard.css";

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  return (
    <div className="recipe-card">
      <h3>{recipe.name}</h3>

      <p>
        <b>Ingredients:</b> {recipe.ingredients.slice(0, 5).join(", ")}
        {recipe.ingredients.length > 5 ? "..." : ""}
      </p>

      <div className="recipe-meta">
        <span>⏱ {recipe.cookingTime} min</span>
        <span>🔥 {recipe.difficulty}</span>
      </div>

      {/* Match Percent */}
      <p style={{ marginTop: "8px", fontWeight: "700", color: "green" }}>
        Match: {recipe.matchPercent || 0}%
      </p>

      {/* Missing Ingredients */}
      {recipe.missingIngredients && recipe.missingIngredients.length > 0 && (
        <p style={{ fontSize: "13px", color: "#444" }}>
          <b>Missing:</b> {recipe.missingIngredients.slice(0, 3).join(", ")}
          {recipe.missingIngredients.length > 3 ? "..." : ""}
        </p>
      )}

      <button
        className="recipe-btn"
        onClick={() => navigate(`/recipe/${recipe.id}`)}
      >
        View Recipe
      </button>
    </div>
  );
}
