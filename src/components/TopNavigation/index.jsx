import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUserCircle } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";

import SearchBox from "../SearchBox";

import logo from "../../assets/image/garena-logo.png";
import "./index.css";

export default function TopNavigation({ setOpen }) {
  const [isSearchBoxOpen, setSearchBoxOpen] = useState(false);

  function handleOpen() {
    setOpen((prev) => !prev);
  }

  function handleClick() {
    setSearchBoxOpen((prev) => !prev);
  }

  return (
    <>
      <div className="top-nav">
        <GiHamburgerMenu
          className="mobile"
          size="1.8em"
          color="#c7d5e0"
          onClick={handleOpen}
        />

        <img src={logo} alt="logo" className="logo mobile mobile-logo" />

        <button className="search-bar-button" onClick={handleClick}>
          <BiSearch /> Search
        </button>
        <div>
          <Link to="profile">
            <FaRegUserCircle className="icon" size="1.5em" />
          </Link>
        </div>
      </div>
      <AnimatePresence>
        {isSearchBoxOpen && <SearchBox onClose={handleClick} />}
      </AnimatePresence>
    </>
  );
}
