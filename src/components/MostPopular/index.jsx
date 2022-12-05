import GameCard from "../GameCard";

import "swiper/css";
import "./index.css";

export default function MostPopular({ gameList }) {
  return (
    <div className="most-popular">
      <h2>Most Popular</h2>
      <div className="popular-list">
        {gameList.length !== 0 &&
          gameList.map((game) => {
            return <GameCard key={game.id} gameData={game} />;
          })}
        {gameList.length === 0 &&
          Array(8)
            .fill(1)
            .map((item, index) => <GameCard key={index} gameData={{}} />)}
      </div>
    </div>
  );
}
