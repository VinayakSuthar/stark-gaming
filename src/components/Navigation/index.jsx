import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BiHomeAlt, BiSearchAlt } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";

import "./index.css";

export default function NavigationBar({ navRef }) {
  const [activeIndex, setActiveIndex] = useState("home");
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  console.log(
    "🔥 ~ file: index.jsx:12 ~ NavigationBar ~ innerWidth",
    innerWidth
  );

  useEffect(() => {
    window.addEventListener("resize", resize);
  }, []);

  function resize() {
    setInnerWidth(window.innerWidth);
  }

  return (
    <div ref={navRef} className="nav-bar">
      <div className="logo desktop">
        {innerWidth > 992 ? "Stark Gaming" : "SG"}
      </div>
      <div className="nav-menu">
        <div className="top-menu">
          <NavLink to="/" className="nav-link">
            <BiHomeAlt size="1.1em" />
            <span>Home</span>
          </NavLink>
          <NavLink to="browse" className="nav-link">
            <BiSearchAlt />
            <span>Browse</span>
          </NavLink>
        </div>
        <div className="bottom-menu">
          <NavLink to="profile" className="nav-link profile-link">
            <FaRegUserCircle className="icon" size="1.5em" />
            <span>Profile</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
