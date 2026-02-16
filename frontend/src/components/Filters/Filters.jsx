import "./Filters.css";

export default function Filters({
  difficulty,
  setDifficulty,
  maxTime,
  setMaxTime,
  diet,
  setDiet,
}) {
  return (
    <div className="filters">
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="">All Difficulty</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <select value={maxTime} onChange={(e) => setMaxTime(e.target.value)}>
        <option value="">Any Time</option>
        <option value="10">≤ 10 min</option>
        <option value="20">≤ 20 min</option>
        <option value="30">≤ 30 min</option>
        <option value="45">≤ 45 min</option>
      </select>

      <select value={diet} onChange={(e) => setDiet(e.target.value)}>
        <option value="">All Diet</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="gluten-free">Gluten-Free</option>
        <option value="non-vegetarian">Non-Veg</option>
      </select>
    </div>
  );
}
