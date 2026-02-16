import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import RecipeResults from "./pages/RecipeResults/RecipeResults";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
import Favorites from "./pages/Favorites/Favorites";
import NotFound from "./pages/NotFound/NotFound";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<RecipeResults />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
