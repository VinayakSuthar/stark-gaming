import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import useAxios from "../../hooks/useAxios";
import GameList from "../../components/GameList";

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

function sanitizeData(data) {
  return data?.data?.data?.map((game) => {
    const { Name, genres, background_image } = game.attributes;
    const sanitizedGenres = genres?.data?.map((genre) => {
      const { name, slug } = genre.attributes;
      return { id: genre.id, name, slug };
    });
    return {
      id: game.id,
      name: Name,
      genres: sanitizedGenres,
      background_image: `http://localhost:1337${background_image?.data?.attributes?.url}`,
    };
  });
}

export default function Browse() {
  const [genreId, setGenreId] = useState();
  const [listData, setListData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  const { data: genreData } = useQuery("genres", fetchGenres, {
    select: (data) =>
      data.data.data.map((game) => {
        const { name, slug } = game.attributes;
        return { id: game.id, name, slug };
      }),
  });

  const { isLoading: isGameLoading, isError: isGameError } = useQuery(
    "games",
    fetchGames,
    {
      select: sanitizeData,
      onSuccess: (data) => setListData([...data]),
      refetchOnWindowFocus: false,
    }
  );

  const { refetch: gameRefetch, isError: isRefetchError } = useQuery(
    ["game", genreId],
    fetchGamesByGenre,
    {
      enabled: false,
      select: sanitizeData,
      onSuccess: (data) => setListData([...data]),
    }
  );

  function handleClick(id, name) {
    if (activeCategory !== name) {
      setGenreId(id);
      setActiveCategory(name);
    }
  }

  useEffect(() => {
    if (genreId) gameRefetch();
  }, [genreId]);

  if (isGameError || isRefetchError) {
    return <h1>Service Unavailable</h1>;
  }

  return (
    <div>
      <h1>Browse</h1>
      <div className="genres-container">
        {genreData?.map(({ id, name }) => {
          return (
            <button
              className={`genre ${
                activeCategory === name && "active-category"
              }`}
              key={id}
              onClick={() => handleClick(id, name)}
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
