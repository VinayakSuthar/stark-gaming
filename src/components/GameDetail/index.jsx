import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import parse from "html-react-parser";
import GameDetailSkeleton from "../GameDetailSkeleton";

import useAxios from "../../hooks/useAxios";
import StatusButton from "../StatusButton";

import "react-loading-skeleton/dist/skeleton.css";
import "./index.css";

const client = useAxios();
function fetchGame({ queryKey }) {
  const id = queryKey[1];
  return client.get(`games/${id}`, {
    params: {
      populate: "*",
    },
  });
}

export default function GameDetail() {
  const { id: gameId } = useParams();

  const { data, isError, isLoading, error } = useQuery(
    ["game", gameId],
    fetchGame,
    {
      select: (data) => data.data.data,
    }
  );

  const {
    Name: name,
    background_image,
    description,
    genres,
    Developer: developer,
    Released: released,
    Publisher: publisher,
    website,
  } = data?.attributes || {};

  const sanitizedGenres = genres?.data?.map((genre) => {
    const { name, slug } = genre.attributes;
    return { id: genre.id, name, slug };
  });

  const sanitizedBackgroundImage = `http://localhost:1337${background_image?.data?.attributes?.url}`;

  if (isError) {
    console.log(error);
    if (error?.response.status === 404) {
      return <h1>Game Not Found</h1>;
    } else {
      return <h1>Service unavailable</h1>;
    }
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
              <img
                className="game-image"
                src={sanitizedBackgroundImage}
                alt="game"
              />

              <div className="game-info">
                <div>
                  <p className="subtitle">Genre: </p>
                  <p className="subtitle-data">
                    {sanitizedGenres?.map(({ name }) => name).join(", ") ||
                      `No Data`}
                  </p>
                </div>
                <div>
                  <p className="subtitle">Developers: </p>
                  <p className="subtitle-data">{developer || `No Data`}</p>
                </div>
                <div>
                  <p className="subtitle">Publisher: </p>
                  <p className="subtitle-data">{publisher || `No Data`}</p>
                </div>
                <div>
                  <p className="subtitle">Released Date: </p>
                  <p className="subtitle-data">{released || `No Data`}</p>
                </div>
                <StatusButton
                  gameData={{
                    gameId,
                    name,
                    background_image: sanitizedBackgroundImage,
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
