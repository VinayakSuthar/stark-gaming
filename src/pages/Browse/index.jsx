import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

import GameCard from "../../components/GameCard";
import genreList from "../../assets/genres.json";

import "./style.css";
import SkeletonCard from "../../components/SkeletonCard";

export default function Browse() {
  const [gameList, setGameList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosInstance = useAxios();
  function fetchGames(options = {}) {
    axiosInstance
      .get("games", { params: { ...options } })
      .then((response) => {
        setGameList(response.data.results);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchGames();
  }, []);

  if (error) {
    return <h1>Service Unavailable</h1>;
  }
  if (!gameList) {
    return <h1>No data found. Please try again later</h1>;
  }

  return (
    <div>
      <h1>Browse</h1>
      <div className="genres-container">
        {genreList.map(({ id, name, slug }) => {
          return (
            <p
              className="genre"
              key={id}
              onClick={() => fetchGames({ genres: slug })}
            >
              {name}
            </p>
          );
        })}
      </div>
      <div className="browse-list">
        {!loading
          ? gameList?.map((game) => {
              return <GameCard key={game.id} gameData={game} />;
            })
          : [...Array(12)].map((item, index) => <SkeletonCard key={index} />)}
      </div>
    </div>
  );
}
