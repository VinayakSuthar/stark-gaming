import { useQuery } from "react-query";

import Banner from "../../components/Banner";
import GameList from "../../components/GameList";
import useAxios from "../../hooks/useAxios";

import "./index.css";

const client = useAxios();
function fetchGames() {
  return client.get("games", {
    params: {
      populate: "*",
    },
  });
}

export default function Home() {
  const { data, isError, isLoading } = useQuery("games", fetchGames, {
    select: (data) => data.data.data.map((game) => game),
  });

  const sanitizedData = data?.map((game) => {
    const { Name, genres, background_image } = game.attributes;
    const sanitizedGenres = genres.data.map((genre) => {
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

  if (isError) {
    return <h1>Service Unavailable</h1>;
  }

  return (
    <div>
      <Banner value={sanitizedData} loading={isLoading} />
      <div className="most-popular">
        <h2>Most Popular</h2>
        <GameList
          value={sanitizedData}
          loading={isLoading}
          listStyle="popular-list"
        />
      </div>
    </div>
  );
}
