import axios from "axios";
import { useState, useEffect } from "react";

import GameCard from "../GameCard";

import "swiper/css";
import "./index.css";

const options = {
  method: "GET",
  url: "https://rawg-video-games-database.p.rapidapi.com/games",
  params: { key: import.meta.env.VITE_RAWG_KEY, page_size: "8" },
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
    "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
  },
};

export default function MostPopular() {
  const [gameList, setGameList] = useState([]);
  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.results);
        setGameList(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <div className="most-popular">
      <h2>Most Popular</h2>
      <div className="popular-list">
        {gameList.length !== 0 &&
          gameList.map((game) => {
            return <GameCard key={game.id} gameData={game} />;
          })}
        {gameList.length === 0 &&
          Array(8)
            .fill(1)
            .map(() => <GameCard gameData={{}}/>)}
      </div>
    </div>
  );
}