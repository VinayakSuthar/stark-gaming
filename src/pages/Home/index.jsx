import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import Banner from '../../components/Banner';
import GameList from '../../components/GameList';
import useAxios from '../../hooks/useAxios';

const client = useAxios();
function fetchGames() {
  return client.get('games', {
    params: {
      page_size: 8,
    },
  });
}

export default function Home() {
  const { data, isError, isLoading } = useQuery('games', fetchGames, {
    select: (data) => data.data.results,
  });

  if (isError) {
    return <h1>Service Unavailable</h1>;
  }

  return (
    <div>
      <Banner value={data?.slice(0, 8)} loading={isLoading} />
      <div>
        <h2 className="text-primary my-5 text-3xl">Most Popular</h2>
        <GameList value={data?.slice(0, 8)} loading={isLoading} listStyle="popular-list" />
      </div>
      <button type="button" className="block mx-auto mt-10 bg-primary border-none rounded py-2 px-3">
        <Link className="text-veryDarkBlue text-xs font-bold" to="/browse">
          Browse all
        </Link>
      </button>
    </div>
  );
}
