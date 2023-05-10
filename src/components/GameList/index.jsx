/* eslint-disable react/prop-types */
import useLocalStorage from '../../hooks/useLocalStorage';

import GameCard from '../GameCard';
import SkeletonCard from '../SkeletonCard';

// eslint-disable-next-line import/no-unresolved
import 'swiper/css';

const styles = {
  'popular-list': 'block max-sm:overflow-x-auto max-sm:whitespace-nowrap max-sm:scrollbar-hide group popular',
  'browse-list': 'mt-5',
};

export default function GameList({ value, loading, listStyle }) {
  const [wishlist, setWishlist] = useLocalStorage('wishlist', []);
  const [played, setPlayed] = useLocalStorage('played', []);
  const [playing, setPlaying] = useLocalStorage('playing', []);

  function addGameToWishlist(id, name, genres, backgroundImage) {
    const isGameInTheList = wishlist.find((item) => item.id === id);
    if (isGameInTheList) {
      const newList = wishlist.filter((item) => item.id !== id);
      setWishlist(newList);
    } else {
      setPlaying(playing.filter((item) => item.id !== id));
      setPlayed(played.filter((item) => item.id !== id));
      setWishlist((previousList) => [
        ...previousList,
        {
          id,
          name,
          genres,
          background_image: backgroundImage,
        },
      ]);
    }
  }

  function isAvailableInTheList(id) {
    return wishlist.find((game) => game.id === id);
  }

  return (
    <div
      className={`game-list flex flex-col gap-y-4 sm:grid sm:grid-cols-2 sm:gap-5 md:grid-cols-3 xl:grid-cols-4 ${styles[listStyle]} `}
    >
      {!loading
        ? value.map((game) => (
            <GameCard
              key={game.id}
              data={game}
              isSelected={isAvailableInTheList}
              onStatusChange={addGameToWishlist}
              buttonValue="Want to Play"
            />
          ))
        : // eslint-disable-next-line react/no-array-index-key
          [...Array(8)].map((item, index) => <SkeletonCard key={index} />)}
    </div>
  );
}
