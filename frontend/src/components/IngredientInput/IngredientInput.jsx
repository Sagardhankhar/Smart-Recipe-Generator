import { useState } from "react";
import "./IngredientInput.css";

export default function IngredientInput({ onSearch }) {
  const [ingredients, setIngredients] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const ingredientList = ingredients
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter((item) => item.length > 0);

    onSearch(ingredientList);
  };

  return (
    <form className="ingredient-box" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter ingredients (comma separated) e.g. tomato, onion, potato"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />

      <button type="submit">Search</button>
    </form>
  );
}
