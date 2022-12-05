import GameCard from "../GameCard";
import SkeletonCard from "../SkeletonCard";

import "swiper/css";
import "./index.css";

export default function MostPopular({ gameList, loading }) {
  return (
    <div className="most-popular">
      <h2>Most Popular</h2>
      <div className="popular-list">
        {!loading
          ? gameList.map((game) => {
              return <GameCard key={game.id} gameData={game} />;
            })
          : [...Array(8)].map((item, index) => <SkeletonCard key={index} />)}
      </div>
    </div>
  );
}
