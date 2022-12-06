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
  const [activeCategory, setActiveCategory] = useState("");

  const axiosInstance = useAxios();
  function fetchGames(options = {}) {
    setLoading(true);
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

  function handleGenreClick(name, slug) {
    if (activeCategory !== name) {
      fetchGames({ genres: slug });
      setActiveCategory(name);
    }
  }

  if (error) {
    return <h1>Service Unavailable</h1>;
  }

  return (
    <div>
      <h1>Browse</h1>
      <div className="genres-container">
        {genreList.map(({ id, name, slug }) => {
          return (
            <button
              className={`genre ${
                activeCategory === name && "active-category"
              }`}
              key={id}
              onClick={() => handleGenreClick(name, slug)}
            >
              {name}
            </button>
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
