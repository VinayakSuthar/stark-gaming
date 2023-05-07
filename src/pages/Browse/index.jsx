import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import genreList from '../../assets/genres.json';
import GameList from '../../components/GameList';

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
      if (data.length === 0) {
        navigate('/404');
      }
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
    const activeCategory = document.querySelector('.active-genre');
    if (activeCategory) {
      activeCategory.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold">Browse</h1>
      <div className="overflow-x-auto whitespace-nowrap mt-5 py-2 sticky top-[60px] z-[1] bg-[#040f14] scrollbar-hide snap-x">
        <button
          className={`inline-block mx-1 font-medium rounded-md px-3 border-2 outline-none snap-start ${
            genre
              ? ' border-transparent text-lightBlue bg-darkBlue'
              : 'active-genre border-secondary bg-lightBlue text-darkBlue'
          }`}
          onClick={() => handleClick('all')}
          type="button"
        >
          All
        </button>
        {genreList.map(({ id, name, slug }) => (
          <button
            className={`inline-block mx-1  text-lightBlue font-medium rounded-md px-3 border-2 border-transparent outline-none snap-start ${
              genre === slug
                ? 'active-genre border-secondary bg-lightBlue text-darkBlue'
                : 'bg-darkBlue text-lightBlue border-transparent'
            }`}
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
