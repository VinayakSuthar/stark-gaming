import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import Banner from '../../components/Banner';
import GameList from '../../components/GameList';
import useAxios from '../../hooks/useAxios';
import { sanitizeGames } from '../../utils/sanitizedData';

import './index.css';

const client = useAxios();
function fetchGames() {
  return client.get('games', {
    params: {
      populate: '*',
    },
  });
}

export default function Home() {
  const { data, isError, isLoading } = useQuery('games', fetchGames, {
    select: sanitizeGames,
  });

  if (isError) {
    return <h1>Service Unavailable</h1>;
  }

  return (
    <div>
      <Banner value={data?.slice(0, 8)} loading={isLoading} />
      <div className="most-popular">
        <h2>Most Popular</h2>
        <GameList value={data?.slice(0, 8)} loading={isLoading} listStyle="popular-list" />
      </div>
      <button type="button" className="browse-more">
        <Link to="/browse">Browse all</Link>
      </button>
    </div>
  );
}
