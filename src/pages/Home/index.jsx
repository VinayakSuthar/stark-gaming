import { useState, useEffect } from "react";
import axios from "axios";

import Banner from "../../components/Banner";
import MostPopular from "../../components/MostPopular";
import useAxios from "../../hooks/useAxios";

export default function Home() {
  const [gameList, setGameList] = useState([]);

  const fetchGames = useAxios();
  useEffect(() => {
    fetchGames
      .get("games", {
        params: {
          page_size: 8,
        },
      })
      .then((response) => {
        console.log(response);
        setGameList(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Banner gameList={gameList} />
      <MostPopular gameList={gameList} />
    </div>
  );
}
