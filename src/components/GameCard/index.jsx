import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import "./index.css";

export default function GameCard({ gameData }) {
  const { id, background_image, name, genres } = gameData;
  return (
    <div className="game-card">
      {background_image ? (
        <img src={background_image} alt="game" />
      ) : (
        <Skeleton height={141} />
      )}
      {name ? (
        <Link to={`/browse/${id}`}>
          <h3 className="game-title">{name}</h3>
        </Link>
      ) : (
        <Skeleton width="80%" />
      )}
      {genres ? (
        <p className="game-genre">{genres[0].name}</p>
      ) : (
        <Skeleton width="40%" />
      )}
    </div>
  );
}
