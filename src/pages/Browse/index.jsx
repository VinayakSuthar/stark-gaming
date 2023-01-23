import { useState } from 'react';
import { useQuery } from 'react-query';

import useAxios from '../../hooks/useAxios';
import genreList from '../../assets/genres.json';
import GameList from '../../components/GameList';

import './style.css';

const client = useAxios();

function fetchGames({ queryKey }) {
  const genres = queryKey[1];
  const options = {};
  if (genres !== 'all') {
    options.genres = genres;
  }
  return client.get('games', { params: { ...options } });
}

export default function Browse() {
  const [listData, setListData] = useState([]);
  const [genre, setGenre] = useState({
    id: null,
    name: 'All',
    slug: 'all',
  });

  const { isLoading: isGameLoading, isError: isGameError } = useQuery(['games', genre.slug], fetchGames, {
    select: (data) => data.data.results,
    onSuccess: (data) => {
      setListData([...data]);
    },
    refetchOnWindowFocus: false,
  });

  function handleGenreClick(id, name, slug) {
    if (genre.name !== name) {
      setGenre({
        id,
        name,
        slug,
      });
    }
  }
  function handleClick() {
    // refetchGames();
    setGenre(() => ({
      id: null,
      name: 'All',
      slug: 'all',
    }));
  }

  if (isGameError) {
    return <h1>Service Unavailable</h1>;
  }

  return (
    <div>
      <h1>Browse</h1>
      <div className="genres-container">
        <button className={`genre ${genre.name === 'All' && 'active-category'}`} onClick={handleClick} type="button">
          All
        </button>
        {genreList.map(({ id, name, slug }) => (
          <button
            className={`genre ${genre.name === name && 'active-category'}`}
            key={id}
            onClick={() => handleGenreClick(id, name, slug)}
            type="button"
          >
            {name}
          </button>
        ))}
      </div>
      <GameList value={listData} loading={isGameLoading} listStyle="browse-list" />
    </div>
  );
}
