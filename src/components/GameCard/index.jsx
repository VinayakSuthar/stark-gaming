import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { MdDragIndicator } from 'react-icons/md';

export default function GameCard({ data, isSelected, buttonValue, onStatusChange, onDragStart, draggable = false }) {
  const { id, background_image: backgroundImage, name, genres } = data;
  return (
    <div
      className="game-card relative max-sm:group-[.popular]:inline-block max-sm:group-[.popular]:w-72 max-sm:group-[.popular]:mx-3"
      draggable={draggable}
      onDragStart={() => onDragStart({ id, background_image: backgroundImage, name, genres })}
    >
      {draggable && <MdDragIndicator className="absolute top-0 right-0 text-xl bg-gray-950 rounded-tr-lg" />}
      <Link to={`/browse/game/${id}`}>
        <img src={backgroundImage} alt="game" className="w-full aspect-video object-cover rounded-xl" />
        <h3 className="game-title text-slate-200 truncate" title={name}>
          {name}
        </h3>
      </Link>
      <p className="game-genre font-medium">{genres[0]?.name}</p>
      <motion.button
        className={`wishlist-btn bg-darkBlue text-lightBlue font-semibold text-base border-none outline-none py-1 px-2 rounded-md cursor-pointer mt-1 group ${
          !isSelected(id) ? '' : 'active-wishlist'
        }`}
        onClick={() => onStatusChange(id, name, genres, backgroundImage)}
        whileHover={{ scale: 1.15 }}
      >
        <FiCheck className="hidden group-[.active-wishlist]:inline-block text-lightBlue align-middle text-[1.1rem] mr-1" />
        {buttonValue}
      </motion.button>
    </div>
  );
}
