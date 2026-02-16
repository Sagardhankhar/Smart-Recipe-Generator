import "./Loader.css";

export default function Loader({ text }) {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>{text || "Loading..."}</p>
    </div>
  );
}
