import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} <span>SmartRecipe</span> | Built by Sagar 🚀
    </footer>
  );
}
