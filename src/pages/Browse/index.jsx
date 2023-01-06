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
  const [listData, setListData] = useState([]);
  console.log("🔥 ~ file: index.jsx:45 ~ Browse ~ listData", listData);
  const [genre, setGenre] = useState({
    id: null,
    name: "All",
  });

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
    onSuccess: (data) => {
      console.log("Games");
      setListData([...data]);
    },
    refetchOnWindowFocus: false,
  });

  const { isError: isRefetchError } = useQuery(
    ["game", genre.id],
    fetchGamesByGenre,
    {
      enabled: !!genre.id,
      select: sanitizeGames,
      onSuccess: (data) => {
        setListData([...data]);
      },
    }
  );

  function handleGenreClick(id, name) {
    if (genre.name !== name) {
      setGenre({
        id,
        name,
      });
    }
  }
  function handleClick() {
    refetchGames();
    setGenre((previous) => ({
      id: null,
      name: "All",
    }));
  }

  if (isGameError || isRefetchError) {
    return <h1>Service Unavailable</h1>;
  }

  return (
    <div>
      <h1>Browse</h1>
      <div className="genres-container">
        <button
          className={`genre ${genre.name === "All" && "active-category"}`}
          onClick={handleClick}
        >
          All
        </button>
        {genreData?.map(({ id, name }) => {
          return (
            <button
              className={`genre ${genre.name === name && "active-category"}`}
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
