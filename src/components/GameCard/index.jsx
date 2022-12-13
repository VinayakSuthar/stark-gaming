import { Link } from "react-router-dom";
import { FiCheck } from "react-icons/fi";

import "./index.css";

export default function GameCard({
  gameData,
  onListChange,
  list,
  buttonValue,
}) {
  const { id, background_image, name, genres } = gameData;
  const isGameInTheList = list.find((item) => item.id === id);
  return (
    <div className="game-card">
      <Link to={`/browse/${id}`}>
        <img src={background_image} alt="game" />
        <h3 className="game-title">{name}</h3>
      </Link>
      <p className="game-genre">{genres[0]?.name}</p>
      <button
        className={`wishlist-btn ${isGameInTheList && "active-wishlist"}`}
        onClick={() => onListChange(id, name, genres, background_image)}
      >
        <FiCheck />
        {buttonValue}
      </button>
    </div>
  );
}
