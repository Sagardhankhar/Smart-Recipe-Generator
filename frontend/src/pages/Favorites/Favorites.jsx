import { useContext } from "react";
import { FavoriteContext } from "../../context/FavoriteContext";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

export default function Favorites() {
  const { favorites } = useContext(FavoriteContext);

  return (
    <div style={{ padding: "40px 60px" }}>
      <h2 style={{ fontSize: "32px", fontWeight: "800", color: "tomato" }}>
        ❤️ Your Favorite Recipes
      </h2>

      {favorites.length === 0 ? (
        <p style={{ marginTop: "20px", fontWeight: "700", color: "#444" }}>
          No favorites saved yet ❌
        </p>
      ) : (
        <div
          style={{
            marginTop: "30px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "22px",
          }}
        >
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
