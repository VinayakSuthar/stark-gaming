import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import Skeleton from "react-loading-skeleton";
import useAxios from "../../hooks/useAxios";

import "react-loading-skeleton/dist/skeleton.css";
import "./index.css";

export default function GameDetail() {
  const { id: gameId } = useParams();
  const [gameData, setGameData] = useState({});
  const [loading, setLoading] = useState(true);
  const fetchGames = useAxios();
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
    // setLoading(true);
    fetchGames(`games/${gameId}`)
      .then((response) => {
        setGameData(response.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="game-detail">
      <h1 className="game-title">{name || <Skeleton width="400px" />}</h1>
      <div className="game-detail-container">
        <div className="game-detail-left">
          {!loading ? (
            <img className="game-image" src={background_image} alt="game" />
          ) : (
            <Skeleton height="400px" width="53vw" />
          )}
          <div className="game-description">
            <h2>About this Game</h2>
            <div>
              {!loading ? parse(`${description}`) : <Skeleton height="200px" />}
            </div>
          </div>
        </div>
        <div className="game-detail-right">
          <div>
            <p className="subtitle">Genre: </p>
            <p className="subtitle-data">
              {!loading ? genres[0]?.name : <Skeleton />}
            </p>
          </div>
          <div>
            <p className="subtitle">Developers: </p>
            <p className="subtitle-data">
              {!loading ? developers[0]?.name : <Skeleton />}
            </p>
          </div>
          <div>
            <p className="subtitle">Publisher: </p>
            <p className="subtitle-data">
              {!loading ? publishers[0]?.name : <Skeleton />}
            </p>
          </div>
          <div>
            <p className="subtitle">Released Date: </p>
            <p className="subtitle-data">{!loading || <Skeleton />}</p>
          </div>
          <a className="game-site-link" target="_blank" href={website}>
            Visit Site
          </a>
        </div>
      </div>
    </div>
  );
}
