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
      <div className="scrollbar-hide sticky top-16 z-[4] snap-x overflow-x-auto whitespace-nowrap bg-[#040f14] pb-3 pt-2">
        <button
          className={`mx-1 inline-block snap-start rounded-md border-2 px-3 font-medium outline-none ${
            genre
              ? ' border-transparent bg-darkBlue text-lightBlue'
              : 'active-genre border-secondary bg-lightBlue text-darkBlue'
          }`}
          onClick={() => handleClick('all')}
          type="button"
        >
          All
        </button>
        {genreList.map(({ id, name, slug }) => (
          <button
            className={`mx-1 inline-block  snap-start rounded-md border-2 border-transparent px-3 font-medium text-lightBlue outline-none ${
              genre === slug
                ? 'active-genre border-secondary bg-lightBlue text-darkBlue'
                : 'border-transparent bg-darkBlue text-lightBlue'
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
