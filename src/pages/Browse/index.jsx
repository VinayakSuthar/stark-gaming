import {useEffect, useState} from "react";
import axios from "axios";

import GameCard from "../../components/GameCard";

import "./style.css";

const options = {
  method: "GET",
  url: "https://rawg-video-games-database.p.rapidapi.com/games",
  params: { key: import.meta.env.VITE_RAWG_KEY, page_size: "40" },
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
    "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
  },
};

export default function Browse() {
  const [gameList, setGameList] = useState([]);
  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setGameList(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Browse</h1>
      <div className="browse-list">
        {gameList.length !== 0 &&
          gameList.map((game) => {
            return <GameCard key={game.id} gameData={game} />;
          })}
        {gameList.length === 0 &&
          Array(40)
            .fill(1)
            .map((item, index) => <GameCard key={index} gameData={{}} />)}
      </div>
    </div>
  );
}