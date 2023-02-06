import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import parse from 'html-react-parser';
import Skeleton from 'react-loading-skeleton';
import GameDetailSkeleton from '../GameDetailSkeleton';

import useAxios from '../../hooks/useAxios';
import StatusButton from '../StatusButton';
import gameImage from '../../assets/image/game.png';

import 'react-loading-skeleton/dist/skeleton.css';
import './index.css';

const client = useAxios();
function fetchGame({ queryKey }) {
  const gameId = queryKey[1];
  return client.get(`games/${gameId}`);
}

export default function GameDetail() {
  const { id: gameId } = useParams();

  const { data, isError, isLoading, error } = useQuery(['game', gameId], fetchGame, {
    select: (data) => data.data,
  });

  const {
    name,
    background_image: backgroundImage,
    description,
    genres,
    developers,
    released,
    publishers,
    website,
  } = data || {};

  if (isError) {
    if (error?.response.status === 404) {
      return <h1>Game Not Found</h1>;
    }
    return <h1>Service unavailable</h1>;
  }
  return (
    <div className="game-detail">
      {isLoading ? (
        <GameDetailSkeleton />
      ) : (
        <>
          <h1 className="game-title">{name || <Skeleton width="400px" />}</h1>
          <div className="game-detail-container">
            <div className="game-content">
              <img className="game-image" src={backgroundImage || gameImage} alt="game" />

              <div className="game-info">
                <div>
                  <p className="subtitle">Genre: </p>
                  <p className="subtitle-data">{genres?.map(({ name }) => name).join(', ') || `No Data`}</p>
                </div>
                <div>
                  <p className="subtitle">Developers: </p>
                  <p className="subtitle-data">{developers?.map(({ name }) => name).join(', ') || `No Data`}</p>
                </div>
                <div>
                  <p className="subtitle">Publisher: </p>
                  <p className="subtitle-data">{publishers?.map(({ name }) => name).join(', ') || `No Data`}</p>
                </div>
                <div>
                  <p className="subtitle">Released Date: </p>
                  <p className="subtitle-data">{released || `No Data`}</p>
                </div>
                <div>
                  <a className="game-site-link" target="_blank" href={website} rel="noreferrer">
                    Visit Site
                  </a>
                </div>
                <StatusButton
                  gameData={{
                    gameId,
                    name,
                    background_image: backgroundImage,
                    genres,
                  }}
                />
              </div>
            </div>
            <div className="game-about">
              <h2>About this Game</h2>
              <div>{description ? parse(`${description}`) : `No Data`}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
