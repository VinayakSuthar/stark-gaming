import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import GameDetailSkeleton from "../GameDetailSkeleton";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

import "react-loading-skeleton/dist/skeleton.css";
import "./index.css";

export default function GameDetail() {
  const { id: gameId } = useParams();
  const [gameData, setGameData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchGames = useAxios();
  const navigate = useNavigate();
  const {
    name,
    background_image,
    description,
    genres,
    developers,
    released,
    publishers,
    website,
  } = gameData;

  useEffect(() => {
    fetchGames(`games/${gameId}`)
      .then((response) => {
        setGameData(response.data);
        console.log(response);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    if (error?.response.status === 404) {
      return <h1>Game Not Found</h1>;
    } else {
      return <h1>Service unavailable</h1>;
    }
  }
  return (
    <div className="game-detail">
      {loading ? (
        <GameDetailSkeleton />
      ) : (
        <>
          <h1 className="game-title">{name || <Skeleton width="400px" />}</h1>
          <div className="game-detail-container">
            <div className="game-content">
              <img className="game-image" src={background_image} alt="game" />

              <div className="game-info">
                <div>
                  <p className="subtitle">Genre: </p>
                  <p className="subtitle-data">
                    {genres?.map(({ name }) => name).join(", ") || `No Data`}
                  </p>
                </div>
                <div>
                  <p className="subtitle">Developers: </p>
                  <p className="subtitle-data">
                    {developers?.map(({ name }) => name).join(", ") ||
                      `No Data`}
                  </p>
                </div>
                <div>
                  <p className="subtitle">Publisher: </p>
                  <p className="subtitle-data">
                    {publishers?.map(({ name }) => name).join(", ") ||
                      `No Data`}
                  </p>
                </div>
                <div>
                  <p className="subtitle">Released Date: </p>
                  <p className="subtitle-data">{released || `No Data`}</p>
                </div>
                <a className="game-site-link" target="_blank" href={website}>
                  Visit Site
                </a>
              </div>
            </div>
            <div className="game-about">
              <h2>About this Game</h2>
              <div>{description ? parse(`${description}`) : `No Data`}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
