import { useState, useEffect } from "react";
import axios from "axios";

import Banner from "../../components/Banner";
import GameList from "../../components/GameList";
import useAxios from "../../hooks/useAxios";

import "./index.css";

export default function Home() {
  const [listData, setListData] = useState([]);
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
        setListData(response.data.results);
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
      <Banner listData={listData} loading={loading} />
      <div className="most-popular">
        <h2>Most Popular</h2>
        <GameList
          listData={listData}
          loading={loading}
          listStyle="popular-list"
        />
      </div>
    </div>
  );
}
