import useLocalStorage from "../../hooks/useLocalStorage";

import GameCard from "../GameCard";
import SkeletonCard from "../SkeletonCard";

import "swiper/css";
import "./index.css";

export default function MostPopular({ gameList, loading }) {
  const [wishlist, setWishlist] = useLocalStorage("wishlist", []);

  function addGameToWishlist(id) {
    if (wishlist.includes(id)) {
      const newList = wishlist.filter((item) => item !== id);
      setWishlist(newList);
    } else {
      setWishlist((previousList) => [...previousList, id]);
    }
  }

  return (
    <div className="most-popular">
      <h2>Most Popular</h2>
      <div className="popular-list">
        {!loading
          ? gameList.map((game) => {
              return (
                <GameCard
                  key={game.id}
                  gameData={game}
                  wishlist={wishlist}
                  addGameToWishlist={addGameToWishlist}
                />
              );
            })
          : [...Array(8)].map((item, index) => <SkeletonCard key={index} />)}
      </div>
    </div>
  );
}
