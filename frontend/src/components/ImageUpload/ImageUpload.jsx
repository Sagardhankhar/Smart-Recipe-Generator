import { useState } from "react";
import "./ImageUpload.css";
import { detectIngredientsFromImage } from "../../services/ingredientRecognition";

export default function ImageUpload({ onDetected }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setError("");
    setLoading(true);

    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        const base64Image = reader.result.split(",")[1];

        const detectedIngredients = await detectIngredientsFromImage(base64Image);

        console.log("Detected Ingredients:", detectedIngredients);

        onDetected(detectedIngredients);
      } catch (err) {
        console.log("Detection Error:", err);
        setError(err.message || "Failed to detect ingredients ❌");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="image-upload">
      <h3>📷 Upload Ingredients Image</h3>

      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {loading && <p className="loading">Detecting ingredients... ⏳</p>}

      {error && <p className="error">{error}</p>}
    </div>
  );
}
