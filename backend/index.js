import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));

app.get("/", (req, res) => {
  res.send("Backend Running Successfully ✅");
});

app.post("/detect", async (req, res) => {
  try {
    const { base64 } = req.body;

    if (!base64) {
      return res.status(400).json({ error: "No image provided" });
    }

    const response = await fetch(
      "https://api.clarifai.com/v2/models/food-item-recognition/outputs",
      {
        method: "POST",
        headers: {
          Authorization: `Key ${process.env.CLARIFAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: [
            {
              data: {
                image: { base64 },
              },
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        error: data?.status?.description || "Clarifai API Error",
        full: data,
      });
    }

    const concepts = data.outputs?.[0]?.data?.concepts || [];

    const ingredients = concepts.slice(0, 10).map((item) => item.name);

    res.json({ ingredients });
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend running on http://localhost:${process.env.PORT}`);
});
