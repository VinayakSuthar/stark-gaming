import { Link } from "react-router-dom";
import { FiCheck } from "react-icons/fi";

import "./index.css";

export default function GameCard({
  data,
  isSelected,
  buttonValue,
  onStatusChange,
}) {
  const { id, background_image, name, genres } = data;
  return (
    <div className="game-card">
      <Link to={`/browse/${id}`}>
        <img src={background_image} alt="game" />
        <h3 className="game-title">{name}</h3>
      </Link>
      <p className="game-genre">{genres[0]?.name}</p>
      <button
        className={`wishlist-btn ${!isSelected(id) ? "" : "active-wishlist"}`}
        onClick={() => onStatusChange(id, name, genres, background_image)}
      >
        <FiCheck />
        {buttonValue}
      </button>
    </div>
  );
}
