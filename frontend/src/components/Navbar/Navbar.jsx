import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-logo">
        SmartRecipe 🍅
      </NavLink>

      <div className="navbar-menu">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/recipes">
          Recipes
        </NavLink>

        <NavLink to="/favorites">
          Favorites ❤️
        </NavLink>
      </div>
    </nav>
  );
}
