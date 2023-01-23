import Skeleton from 'react-loading-skeleton';

export default function GameDetailSkeleton() {
  return (
    <>
      <Skeleton width={400} height={30} />
      <div className="game-detail-container">
        <div className="game-content">
          <Skeleton style={{ aspectRatio: '16/9' }} />
          <div className="game-info">
            <div>
              <p className="subtitle">Genre: </p>
              <Skeleton className="game-info" />
            </div>
            <div>
              <p className="subtitle">Developer: </p>
              <Skeleton className="game-info" />
            </div>
            <div>
              <p className="subtitle">Publisher: </p>
              <Skeleton className="game-info" />
            </div>
            <div>
              <p className="subtitle">Release Date: </p>
              <Skeleton className="game-info" />
            </div>
          </div>
        </div>
        <div className="game-about">
          <h2>About this Game</h2>
          <Skeleton height={200} />
        </div>
      </div>
    </>
  );
}
