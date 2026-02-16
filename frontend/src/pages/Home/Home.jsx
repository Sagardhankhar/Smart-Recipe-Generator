import { useNavigate } from "react-router-dom";
import recipesData from "../../data/recipes.json";
import { getSuggestedRecipes } from "../../services/suggestionEngine";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const suggestedRecipes = getSuggestedRecipes(recipesData);

  return (
    <div className="home">
      <h1 className="home-title">Smart Recipe Generator 🍅</h1>

      <p className="home-subtitle">
        Upload ingredients photo or type ingredients to get smart recipe
        suggestions with nutrition details, cooking time, difficulty level and
        dietary filters.
      </p>

      <button className="home-btn" onClick={() => navigate("/recipes")}>
        Generate Recipes
      </button>

      <h2 style={{ marginTop: "40px", fontSize: "24px", fontWeight: "800" }}>
        ⭐ Recommended for You
      </h2>

      <div
        style={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "22px",
        }}
      >
        {suggestedRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
