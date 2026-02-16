import { createContext, useEffect, useState } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "../utils/localStorage";

const FavoriteContext = createContext();
export { FavoriteContext };

export default function FavoriteProvider({ children }) {
  // ✅ Load initial favorites directly in useState (no useEffect needed)
  const [favorites, setFavorites] = useState(() => {
    const savedFav = getFromLocalStorage("favorites");
    return savedFav && Array.isArray(savedFav) ? savedFav : [];
  });

  // ✅ Save whenever favorites changes
  useEffect(() => {
    saveToLocalStorage("favorites", favorites);
  }, [favorites]);

  const addFavorite = (recipe) => {
    const exists = favorites.some((fav) => fav.id === recipe.id);

    if (!exists) {
      setFavorites((prev) => [...prev, recipe]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  const isFavorite = (id) => {
    return favorites.some((fav) => fav.id === id);
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
