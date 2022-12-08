import { useState, useEffect, useRef } from "react";

import useLocalStorage from "../../hooks/useLocalStorage";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiCheck } from "react-icons/fi";

import "./index.css";

export default function StatusButton({ id }) {
  const intId = parseInt(id);
  const [wishlist, setWishlist] = useLocalStorage("wishlist", []);
  const [played, setPlayed] = useLocalStorage("played", []);
  const [playing, setPlaying] = useLocalStorage("playing", []);
  const [showCheck, setShowCheck] = useState(true);
  const [activeBtn, setActiveBtn] = useState(() => {
    if (played.includes(intId)) {
      return "Played";
    }
    if (playing.includes(intId)) {
      return "Playing";
    }
    if (wishlist.includes(intId)) {
      return "Want to Play";
    }
    setShowCheck(false);
    return "Want to Play";
  });

  function handleActiveBtnClick(value) {
    if (value === "Want to Play") {
      if (wishlist.includes(intId)) {
        const newList = wishlist.filter((item) => item !== intId);
        setWishlist(newList);
        setShowCheck(false);
      } else {
        setWishlist((previousList) => [...previousList, intId]);
        setPlaying(playing.filter((item) => item !== intId));
        setPlayed(played.filter((item) => item !== intId));
        setShowCheck(true);
      }
    } else if (value === "Playing") {
      if (playing.includes(intId)) {
        const newList = playing.filter((item) => item !== intId);
        setPlaying(newList);
        setShowCheck(false);
      } else {
        setPlaying((previousList) => [...previousList, intId]);
        setPlayed(played.filter((item) => item !== intId));
        setWishlist(wishlist.filter((item) => item !== intId));
        setShowCheck(true);
      }
    } else if (value === "Played") {
      if (played.includes(intId)) {
        const newList = played.filter((item) => item !== intId);
        setPlayed(newList);
        setShowCheck(false);
      } else {
        setPlayed((previousList) => [...previousList, intId]);
        setWishlist(wishlist.filter((item) => item !== intId));
        setPlaying(playing.filter((item) => item !== intId));
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
      {showCheck && <FiCheck />}
      <div onClick={() => handleActiveBtnClick(activeBtn)}>{activeBtn}</div>
      <div className="dropdown-icon">
        <RiArrowDropDownLine />
        <div className="dropdown-content">
          <p onClick={handleStatus}>Want to Play</p>
          <p onClick={handleStatus}>Playing</p>
          <p onClick={handleStatus}>Played</p>
        </div>
      </div>
    </div>
  );
}
