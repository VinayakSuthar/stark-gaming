import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";
import "./index.css";

export default function GameDetail() {
  const { id: gameId } = useParams();
  const [gameData, setGameData] = useState({});
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

  const options = {
    method: "GET",
    url: `https://rawg-video-games-database.p.rapidapi.com/games/${gameId}`,
    params: { key: import.meta.env.VITE_RAWG_KEY },
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
    },
  };

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.request(options);
        console.log(response.data);
        setGameData(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <SkeletonTheme baseColor="#171a21" highlightColor="#040f14">
      <div className="game-detail">
        <h1 className="game-title">{name || <Skeleton width="400px" />}</h1>
        <div className="game-detail-container">
          <div className="game-detail-left">
            {background_image ? (
              <img className="game-image" src={background_image} alt="game" />
            ) : (
              <Skeleton height="400px" width="53vw" />
            )}
            <div className="game-description">
              <h2>About this Game</h2>
              <div>
                {description ? (
                  parse(`${description}`)
                ) : (
                  <Skeleton height="200px" />
                )}
              </div>
            </div>
          </div>
          <div className="game-detail-right">
            <div>
              <p className="subtitle">Genre: </p>
              <p className="subtitle-data">
                {genres ? genres[0].name : <Skeleton />}
              </p>
            </div>
            <div>
              <p className="subtitle">Developers: </p>
              <p className="subtitle-data">
                {developers ? developers[0].name : <Skeleton />}
              </p>
            </div>
            <div>
              <p className="subtitle">Publisher: </p>
              <p className="subtitle-data">
                {publishers ? publishers[0].name : <Skeleton />}
              </p>
            </div>
            <div>
              <p className="subtitle">Released Date: </p>
              <p className="subtitle-data">{released || <Skeleton />}</p>
            </div>
            <a className="game-site-link" target="_blank" href={website}>Visit Site</a>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}
