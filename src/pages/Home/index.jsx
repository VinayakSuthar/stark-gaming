import { useState, useEffect } from "react";
import axios from "axios";

import Banner from "../../components/Banner";
import MostPopular from "../../components/MostPopular";
import useAxios from "../../hooks/useAxios";

export default function Home() {
  const [gameList, setGameList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    return <h1>Service Unavailable</h1>;
  }

  return (
    <div>
      <Banner gameList={gameList} loading={loading} />
      <MostPopular gameList={gameList} loading={loading} />
    </div>
  );
}
