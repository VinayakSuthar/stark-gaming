import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { MdDragIndicator } from 'react-icons/md';

export default function GameCard({ data, isSelected, buttonValue, onStatusChange, onDragStart, draggable = false }) {
  const { id, background_image: backgroundImage, name, genres } = data;
  return (
    <div
      className="relative max-sm:group-[.popular]:mx-3 max-sm:group-[.popular]:inline-block max-sm:group-[.popular]:w-72"
      draggable={draggable}
      onDragStart={() => onDragStart({ id, background_image: backgroundImage, name, genres })}
    >
      {draggable && <MdDragIndicator className="absolute right-0 top-0 rounded-tr-lg bg-gray-950 text-xl" />}
      <Link to={`/browse/game/${id}`}>
        <img src={backgroundImage} alt="game" className="aspect-video w-full rounded-xl object-cover" />
        <h3 className="mt-2 truncate text-lg font-bold text-slate-200" title={name}>
          {name}
        </h3>
      </Link>
      <p className="text-sm font-medium">{genres[0]?.name}</p>
      <motion.button
        className={`group mt-1 cursor-pointer rounded-md border-none bg-darkBlue px-2 py-1 text-sm font-semibold text-lightBlue outline-none ${
          !isSelected(id) ? '' : 'active-wishlist'
        }`}
        onClick={() => onStatusChange(id, name, genres, backgroundImage)}
        whileHover={{ scale: 1.15 }}
      >
        <FiCheck className="mr-1 hidden align-middle text-[1.1rem] text-lightBlue group-[.active-wishlist]:inline-block" />
        {buttonValue}
      </motion.button>
    </div>
  );
}
