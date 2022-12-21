import { useState } from "react";
import { motion } from "framer-motion";
import useOutsideClick from "../../hooks/useOutsideClick";

import useLocalStorage from "../../hooks/useLocalStorage";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiCheck } from "react-icons/fi";

import "./index.css";
import { useEffect } from "react";

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
  onHover: {
    paddingLeft: "15px",
  },
};

const arrowAnimate = {
  enter: { rotate: 180 },
  exit: { rotate: 0 },
};

export default function StatusButton({ gameData }) {
  const { gameId, name, background_image, genres } = gameData;
  const intId = parseInt(gameId);
  const [wishlist, setWishlist] = useLocalStorage("wishlist", []);
  const [played, setPlayed] = useLocalStorage("played", []);
  const [playing, setPlaying] = useLocalStorage("playing", []);
  const [showCheck, setShowCheck] = useState(true);
  const [isOpen, setOpen] = useState(false);
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

  const dropdownRef = useOutsideClick(() => setOpen(false));

  function toggleOpen() {
    setOpen((previous) => !previous);
  }

  function toggleStatus(list, setList) {
    if (typeof list.find((game) => game.id === intId) === "object") {
      const newList = list.filter((item) => item.id !== intId);
      setList(newList);
      setShowCheck(false);
    } else {
      setList((previousList) => [
        ...previousList,
        { id: intId, name, background_image, genres },
      ]);
      setShowCheck(true);
    }
  }

  function handleActiveBtnClick(value) {
    switch (value) {
      case "Want to Play": {
        toggleStatus(wishlist, setWishlist);
        setPlaying(playing.filter((item) => item.id !== intId));
        setPlayed(played.filter((item) => item.id !== intId));
        break;
      }
      case "Playing": {
        toggleStatus(playing, setPlaying);
        setPlayed(played.filter((item) => item.id !== intId));
        setWishlist(wishlist.filter((item) => item.id !== intId));
        break;
      }
      case "Played": {
        toggleStatus(played, setPlayed);
        setWishlist(wishlist.filter((item) => item.id !== intId));
        setPlaying(playing.filter((item) => item.id !== intId));
        break;
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
      <div data-testid="dropdown" className="dropdown-icon" ref={dropdownRef}>
        <motion.div className="dropdown-icon">
          <motion.div
            variants={arrowAnimate}
            animate={isOpen ? "enter" : "exit"}
            transition={{ duration: 0.2 }}
            style={{ originY: 0.5 }}
            onClick={toggleOpen}
          >
            <RiArrowDropDownLine />
          </motion.div>
          <motion.div
            data-testid="dropdown-content"
            className="dropdown-content"
            initial="exit"
            variants={dropdownAnimate}
            animate={isOpen ? "enter" : "exit"}
          >
            <motion.button
              variants={statusAnimate}
              whileHover="onHover"
              onClick={handleStatus}
            >
              Want to Play
            </motion.button>
            <motion.button
              variants={statusAnimate}
              whileHover="onHover"
              onClick={handleStatus}
            >
              Playing
            </motion.button>
            <motion.button
              variants={statusAnimate}
              whileHover="onHover"
              onClick={handleStatus}
            >
              Played
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
