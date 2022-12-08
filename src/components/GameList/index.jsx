import useLocalStorage from "../../hooks/useLocalStorage";

import GameCard from "../GameCard";
import SkeletonCard from "../SkeletonCard";

import "swiper/css";

export default function GameList({ listData, loading, listStyle }) {
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
    <div className={`game-list ${listStyle}`}>
      {!loading
        ? listData.map((game) => {
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
  );
}
