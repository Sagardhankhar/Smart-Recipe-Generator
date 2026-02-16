# 🍅 Smart Recipe Generator

Smart Recipe Generator is a web application that suggests recipes based on user-provided ingredients.  
Users can enter ingredients manually or upload an image of ingredients for recognition.

The app generates multiple recipes with details like cooking time, difficulty, dietary filters, nutritional values, and substitution suggestions.

---

## 🚀 Features

✅ Ingredient input (manual + image upload)  
✅ Ingredient recognition from image (Clarifai API)  
✅ Smart recipe matching algorithm (match percentage)  
✅ Recipe filters (difficulty, cooking time, dietary preference)  
✅ Recipe details page with steps + nutrition  
✅ Serving size adjustment (nutrition recalculates)  
✅ Substitution suggestions for missing ingredients  
✅ Favorites system (saved in LocalStorage)  
✅ Rating system (saved in LocalStorage)  
✅ Suggested recipes based on user ratings  
✅ Mobile responsive UI

---

## 🛠 Tech Stack

- React.js (Vite)
- React Router DOM
- LocalStorage
- Clarifai API (Food recognition model)
- CSS (Tomato-style UI)

---

## 📂 Folder Structure

src/
- components/
- pages/
- services/
- context/
- utils/
- data/

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone <your-repo-url>
cd frontend
