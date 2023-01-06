import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { MdDragIndicator } from 'react-icons/md';

import './index.css';

export default function GameCard({ data, isSelected, buttonValue, onStatusChange, onDragStart, draggable = false }) {
  const { id, background_image: backgroundImage, name, genres } = data;
  return (
    <div
      className="game-card"
      draggable={draggable}
      onDragStart={() => onDragStart({ id, background_image: backgroundImage, name, genres })}
    >
      {draggable && <MdDragIndicator className="drag-icon" />}
      <Link to={`/browse/${id}`}>
        <img src={backgroundImage} alt="game" />
        <h3 className="game-title" title={name}>
          {name}
        </h3>
      </Link>
      <p className="game-genre">{genres[0]?.name}</p>
      <motion.button
        className={`wishlist-btn ${!isSelected(id) ? '' : 'active-wishlist'}`}
        onClick={() => onStatusChange(id, name, genres, backgroundImage)}
        whileHover={{ scale: 1.15 }}
      >
        <FiCheck />
        {buttonValue}
      </motion.button>
    </div>
  );
}
