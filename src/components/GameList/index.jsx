import useLocalStorage from "../../hooks/useLocalStorage";

import GameCard from "../GameCard";
import SkeletonCard from "../SkeletonCard";

import "swiper/css";

export default function GameList({ listData, loading, listStyle }) {
  const [wishlist, setWishlist] = useLocalStorage("wishlist", []);

  function addGameToWishlist(id, name, genres, background_image) {
    const isGameInTheList = wishlist.find((item) => item.id === id);
    if (isGameInTheList) {
      const newList = wishlist.filter((item) => item.id !== id);
      setWishlist(newList);
    } else {
      setWishlist((previousList) => [
        ...previousList,
        {
          id,
          name,
          genres,
          background_image,
        },
      ]);
    }
  }

  function isAvailableInTheList(id) {
    return wishlist.find((game) => game.id === id);
  }

  return (
    <div className={`game-list ${listStyle}`}>
      {!loading
        ? listData.map((game) => {
            return (
              <GameCard
                key={game.id}
                data={game}
                isSelected={isAvailableInTheList}
                onStatusChange={addGameToWishlist}
                buttonValue="Want to Play"
              />
            );
          })
        : [...Array(8)].map((item, index) => <SkeletonCard key={index} />)}
    </div>
  );
}
