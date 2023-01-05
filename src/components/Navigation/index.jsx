import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { BiHomeAlt, BiSearchAlt } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";

import logo from "../../assets/image/garena-logo.png";
import "./index.css";

export default function NavigationBar({ navRef, setOpen }) {
  const [activeIndex, setActiveIndex] = useState("home");
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", resize);
  }, []);

  function resize() {
    setInnerWidth(window.innerWidth);
  }

  function handleClick() {
    if (innerWidth < 448) {
      setOpen(false);
    }
  }

  return (
    <div ref={navRef} className="nav-bar">
      <Link to="/">
        <div className="logo-container">
          <img src={logo} alt="logo" className="logo" />
          {innerWidth > 992 && <h1 className="logo-title">Stark Gaming</h1>}
        </div>
      </Link>
      <div className="nav-menu">
        <div className="top-menu">
          <NavLink to="/" className="nav-link" onClick={handleClick}>
            <BiHomeAlt size="1.1em" />
            <span>Home</span>
          </NavLink>
          <NavLink to="browse" className="nav-link" onClick={handleClick}>
            <BiSearchAlt />
            <span>Browse</span>
          </NavLink>
        </div>
        <div className="bottom-menu">
          <NavLink
            to="profile"
            className="nav-link profile-link"
            onClick={handleClick}
          >
            <FaRegUserCircle className="icon" size="1.5em" />
            <span>Profile</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
