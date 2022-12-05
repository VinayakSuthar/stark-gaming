import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

import GameCard from "../../components/GameCard";
import genreList from "../../assets/genres.json";

import "./style.css";

export default function Browse() {
  const [gameList, setGameList] = useState([]);
  const axiosInstance = useAxios();
  function fetchGames(options = {}) {
    axiosInstance
      .get("games", { params: { ...options } })
      .then((response) => {
        console.log(response);
        setGameList(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchGames();
  }, []);

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
        {gameList?.length !== 0
          ? gameList?.map((game) => {
              return <GameCard key={game.id} gameData={game} />;
            })
          : Array(40)
              .fill(1)
              .map((item, index) => <GameCard key={index} gameData={{}} />)}
      </div>
    </div>
  );
}
