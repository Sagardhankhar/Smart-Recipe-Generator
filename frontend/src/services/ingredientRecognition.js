export async function detectIngredientsFromImage(imageBase64) {
  const response = await fetch("http://localhost:5000/detect", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ base64: imageBase64 }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Ingredient detection failed");
  }

  return data.ingredients.map((item) => item.toLowerCase());
}
