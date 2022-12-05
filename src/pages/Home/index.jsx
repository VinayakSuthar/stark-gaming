import { useState, useEffect } from "react";
import axios from "axios";

import Banner from "../../components/Banner";
import MostPopular from "../../components/MostPopular";

export default function Home() {
  const [gameList, setGameList] = useState([]);

  const options = {
    method: "GET",
    url: "https://rawg-video-games-database.p.rapidapi.com/games",
    params: { key: import.meta.env.VITE_RAWG_KEY, page_size: "8" },
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
      "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
    },
  };
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
      <Banner gameList={gameList} />
      <MostPopular gameList={gameList} />
    </div>
  );
}
