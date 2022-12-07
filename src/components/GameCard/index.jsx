import { Link } from "react-router-dom";
import { FiCheck } from "react-icons/fi";

import "./index.css";

export default function GameCard({ gameData, addGameToWishlist, wishlist }) {
  const { id, background_image, name, genres } = gameData;

  return (
    <div className="game-card">
      <img src={background_image} alt="game" />
      <Link to={`/browse/${id}`}>
        <h3 className="game-title">{name}</h3>
      </Link>
      <p className="game-genre">{genres[0]?.name}</p>
      <button
        className={`wishlist-btn ${wishlist.includes(id) && "active-wishlist"}`}
        onClick={() => addGameToWishlist(id)}
      >
        <FiCheck />
        Want to Play
      </button>
    </div>
  );
}
