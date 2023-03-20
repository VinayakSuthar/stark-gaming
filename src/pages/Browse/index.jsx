import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import genreList from '../../assets/genres.json';
import GameList from '../../components/GameList';

import './style.css';

const client = useAxios();

function fetchGames({ queryKey }) {
  const genres = queryKey[1];
  const options = {};
  if (genres) {
    options.genres = genres;
  }
  return client.get('games', { params: { ...options } });
}

export default function Browse() {
  const [listData, setListData] = useState([]);
  const { genre } = useParams();
  const navigate = useNavigate();

  const { isLoading: isGameLoading, isError: isGameError } = useQuery(['games', genre], fetchGames, {
    select: (data) => data.data.results,
    onSuccess: (data) => {
      setListData([...data]);
    },
    refetchOnWindowFocus: false,
  });

  function handleClick(slug) {
    if (slug === 'all') navigate('/browse');
    else navigate(`/browse/${slug}`);
  }

  if (isGameError) {
    return <h1>Service Unavailable</h1>;
  }

  useEffect(() => {
    const activeCategory = document.querySelector('.genre.active-category');
    activeCategory.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  }, []);

  return (
    <div>
      <h1>Browse</h1>
      <div className="genres-container">
        <button className={`genre ${genre || 'active-category'}`} onClick={() => handleClick('all')} type="button">
          All
        </button>
        {genreList.map(({ id, name, slug }) => (
          <button
            className={`genre ${genre === slug ? 'active-category' : ''}`}
            key={id}
            onClick={() => handleClick(slug)}
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
