import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import useAxios from "../../hooks/useAxios";
import GameList from "../../components/GameList";
import { sanitizeGames } from "../../utils/sanitizedData";

import "./style.css";

const client = useAxios();

function fetchGenres() {
  return client.get(`/genres`, {
    params: {
      populate: "*",
    },
  });
}
function fetchGames() {
  return client.get(`/games`, {
    params: {
      populate: "*",
    },
  });
}
function fetchGamesByGenre({ queryKey }) {
  const genreId = queryKey[1];
  return client.get(`/games`, {
    params: {
      populate: "*",
      filters: {
        genres: {
          id: {
            $eq: genreId,
          },
        },
      },
    },
  });
}

export default function Browse() {
  const [genreId, setGenreId] = useState();
  const [listData, setListData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: genreData } = useQuery("genres", fetchGenres, {
    select: (data) =>
      data.data.data.map((game) => {
        const { name, slug } = game.attributes;
        return { id: game.id, name, slug };
      }),
  });

  const {
    isLoading: isGameLoading,
    isError: isGameError,
    refetch: refetchGames,
  } = useQuery("games", fetchGames, {
    select: sanitizeGames,
    onSuccess: (data) => setListData([...data]),
    refetchOnWindowFocus: false,
  });

  const { refetch: refetchGamesByGenre, isError: isRefetchError } = useQuery(
    ["game", genreId],
    fetchGamesByGenre,
    {
      enabled: false,
      select: sanitizeGames,
      onSuccess: (data) => setListData([...data]),
    }
  );

  function handleGenreClick(id, name) {
    if (activeCategory !== name) {
      setGenreId(id);
      setActiveCategory(name);
    }
  }
  function handleClick() {
    refetchGames();
    setActiveCategory("All");
    setGenreId(0);
  }

  useEffect(() => {
    if (genreId || genreId !== 0) refetchGamesByGenre();
  }, [genreId]);

  if (isGameError || isRefetchError) {
    return <h1>Service Unavailable</h1>;
  }

  return (
    <div >
      <h1>Browse</h1>
      <div className="genres-container">
        <button
          className={`genre ${activeCategory === "All" && "active-category"}`}
          onClick={handleClick}
        >
          All
        </button>
        {genreData?.map(({ id, name }) => {
          return (
            <button
              className={`genre ${
                activeCategory === name && "active-category"
              }`}
              key={id}
              onClick={() => handleGenreClick(id, name)}
            >
              {name}
            </button>
          );
        })}
      </div>
      <GameList
        value={listData}
        loading={isGameLoading}
        listStyle="browse-list"
      />
    </div>
  );
}
