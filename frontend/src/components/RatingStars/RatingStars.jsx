import "./RatingStars.css";

export default function RatingStars({ rating, setRating }) {
  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? "star active" : "star"}
          onClick={() => setRating(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
