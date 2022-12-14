import { useEffect, useRef } from "react";
import { BiSearch } from "react-icons/bi";

import "./index.css";

export default function SearchBox({ onClose }) {
  const searchRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") onClose();
    };
    const outsideClick = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("click", outsideClick, true);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("click", outsideClick, true);
    };
  }, []);

  return (
    <div className="search-box-container">
      <div className="search-box" ref={searchRef}>
        <div className="search-bar">
          <BiSearch />
          <input className="search-input" type="text" placeholder="Search..." />
        </div>
        <div className="search-result">No result to show</div>
      </div>
    </div>
  );
}
