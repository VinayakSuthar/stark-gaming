import { useState } from "react";

import useLocalStorage from "../../hooks/useLocalStorage";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiCheck } from "react-icons/fi";

import "./index.css";

export default function StatusButton({ gameData }) {
  const { gameId, name, background_image, genres } = gameData;
  const intId = parseInt(gameId);
  const [wishlist, setWishlist] = useLocalStorage("wishlist", []);
  const [played, setPlayed] = useLocalStorage("played", []);
  const [playing, setPlaying] = useLocalStorage("playing", []);
  const [showCheck, setShowCheck] = useState(true);
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
        <div className="dropdown-icon">
          <RiArrowDropDownLine />
          <div data-testid="dropdown-content" className="dropdown-content">
            <button onClick={handleStatus}>Want to Play</button>
            <button onClick={handleStatus}>Playing</button>
            <button onClick={handleStatus}>Played</button>
          </div>
        </div>
      </div>
    </div>
  );
}
