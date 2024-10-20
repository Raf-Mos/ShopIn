import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function Ratings({ value, text, color = "yellow-500" }) {
  const fullStars = Math.floor(value);
  const halfStars = value - fullStars > 0.5 ? 1 : 0;
  const emptyStar = 5 - fullStars - halfStars;

  return (
    <div className="flex items-center flex-wrap">
      <div className="flex">
        {[...Array(fullStars)].map((_, index) => (
          <FaStar
            key={index}
            className={`text-${color} text-sm sm:text-base`}
          />
        ))}
        {halfStars === 1 && (
          <FaStarHalfAlt className={`text-${color} text-sm sm:text-base`} />
        )}
        {[...Array(emptyStar)].map((_, index) => (
          <FaRegStar
            key={index}
            className={`text-${color} text-sm sm:text-base`}
          />
        ))}
      </div>
      {text && (
        <span className={`ml-2 text-sm sm:text-base text-${color}`}>
          {text}
        </span>
      )}
    </div>
  );
}
