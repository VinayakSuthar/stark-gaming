import { useState } from "react";
import { motion } from "framer-motion";

import useLocalStorage from "../../hooks/useLocalStorage";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiCheck } from "react-icons/fi";

import "./index.css";

const dropdownAnimate = {
  enter: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0% round 10px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
    display: "block",
  },
  exit: {
    opacity: 0,
    clipPath: "inset(10% 50% 90% 50% round 10px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.5,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

const statusAnimate = {
  enter: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
};

const arrowAnimate = {
  enter: { rotate: 180 },
  exit: { rotate: 0 },
};

const MotionArrow = motion(RiArrowDropDownLine);

export default function StatusButton({ gameData }) {
  const { gameId, name, background_image, genres } = gameData;
  const intId = parseInt(gameId);
  const [wishlist, setWishlist] = useLocalStorage("wishlist", []);
  const [played, setPlayed] = useLocalStorage("played", []);
  const [playing, setPlaying] = useLocalStorage("playing", []);
  const [showCheck, setShowCheck] = useState(true);
  const [isHover, setHover] = useState(false);
  const [activeBtn, setActiveBtn] = useState(() => {
    if (played.find((game) => game.id === intId)) {
      return "Played";
    }
    if (playing.find((game) => game.id === intId)) {
      return "Playing";
    }
    if (wishlist.find((game) => game.id === intId)) {
      return "Want to Play";
    }
    setShowCheck(false);
    return "Want to Play";
  });

  function toggleHover() {
    setHover((previous) => !previous);
  }

  function handleActiveBtnClick(value) {
    if (value === "Want to Play") {
      if (typeof wishlist.find((game) => game.id === intId) === "object") {
        const newList = wishlist.filter((item) => item.id !== intId);
        setWishlist(newList);
        setShowCheck(false);
      } else {
        setWishlist((previousList) => [
          ...previousList,
          { id: intId, name, background_image, genres },
        ]);
        setPlaying(playing.filter((item) => item.id !== intId));
        setPlayed(played.filter((item) => item.id !== intId));
        setShowCheck(true);
      }
    } else if (value === "Playing") {
      if (typeof playing.find((game) => game.id === intId) === "object") {
        const newList = playing.filter((item) => item.id !== intId);
        setPlaying(newList);
        setShowCheck(false);
      } else {
        setPlaying((previousList) => [
          ...previousList,
          { id: intId, name, background_image, genres },
        ]);
        setPlayed(played.filter((item) => item.id !== intId));
        setWishlist(wishlist.filter((item) => item.id !== intId));
        setShowCheck(true);
      }
    } else if (value === "Played") {
      if (typeof played.find((game) => game.id === intId) === "object") {
        const newList = played.filter((item) => item.id !== intId);
        setPlayed(newList);
        setShowCheck(false);
      } else {
        setPlayed((previousList) => [
          ...previousList,
          { id: intId, name, background_image, genres },
        ]);
        setWishlist(wishlist.filter((item) => item.id !== intId));
        setPlaying(playing.filter((item) => item.id !== intId));
        setShowCheck(true);
      }
    }
  }

  function handleStatus(event) {
    const value = event.target.innerText;
    setActiveBtn(value);
    handleActiveBtnClick(value);
  }

  return (
    <div className="game-status-btn">
      {showCheck && <FiCheck data-testid="check-icon" />}

      <button
        data-testid="active-status"
        onClick={() => handleActiveBtnClick(activeBtn)}
      >
        {activeBtn}
      </button>
      <div data-testid="dropdown" className="dropdown-icon">
        <motion.div
          className="dropdown-icon"
          onHoverStart={toggleHover}
          onHoverEnd={toggleHover}
        >
          <motion.div
            variants={arrowAnimate}
            animate={isHover ? "enter" : "exit"}
            transition={{ duration: 0.2 }}
            style={{ originY: 0.5 }}
          >
            <MotionArrow />
          </motion.div>
          <motion.div
            data-testid="dropdown-content"
            className="dropdown-content"
            initial="exit"
            variants={dropdownAnimate}
            animate={isHover ? "enter" : "exit"}
          >
            <motion.button variants={statusAnimate} onClick={handleStatus}>
              Want to Play
            </motion.button>
            <motion.button variants={statusAnimate} onClick={handleStatus}>
              Playing
            </motion.button>
            <motion.button variants={statusAnimate} onClick={handleStatus}>
              Played
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
