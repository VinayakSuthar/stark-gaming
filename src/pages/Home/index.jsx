import { useState, useEffect } from "react";
import axios from "axios";

import Banner from "../../components/Banner";
import MostPopular from "../../components/MostPopular";
import useAxios from "../../hooks/useAxios";

export default function Home() {
  const [gameList, setGameList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGames = useAxios();
  useEffect(() => {
    fetchGames
      .get("games", {
        params: {
          page_size: 8,
        },
      })
      .then((response) => {
        setGameList(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Banner gameList={gameList} loading={loading} />
      <MostPopular gameList={gameList} loading={loading} />
    </div>
  );
}
