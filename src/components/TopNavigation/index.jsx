import { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUserCircle } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";

import SearchBox from "../SearchBox";

import "./index.css";

export default function TopNavigation({ setOpen }) {
  const [searchText, setSearchText] = useState("");

  function handleSearch(e) {
    const { value } = e.target;
    setSearchText(value);
  }

  function handleOpen() {
    setOpen((prev) => !prev);
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

        <p className="mobile mobile-logo">SG</p>

        <button className="search-bar-button">
          <BiSearch /> Search
        </button>
        <div>
          <Link to="profile">
            <FaRegUserCircle className="icon" size="1.5em" />
          </Link>
        </div>
      </div>
      <SearchBox />
    </>
  );
}
