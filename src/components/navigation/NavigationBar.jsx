import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BiHomeAlt, BiSearchAlt } from "react-icons/bi";
import {
  MdSlowMotionVideo,
  MdOutlineFactCheck,
} from "react-icons/md";

import "./NavigationBar.css";

export default function NavigationBar() {
  const [activeIndex, setActiveIndex] = useState("home");
  
  return (
    <div className="nav-bar">
      <div className="logo">Stark Gaming</div>
      <div className="nav-menu">
        <NavLink to="/" className="nav-link">
          <BiHomeAlt size="1.1em" />
          Home
        </NavLink>
        <NavLink to="browse" className="nav-link">
          <BiSearchAlt />
          Browse
        </NavLink>
        <Link className="nav-link">
          <MdSlowMotionVideo />
          Video
        </Link>
        <Link className="nav-link">
          <MdOutlineFactCheck />
          Compatibility
        </Link>
      </div>
    </div>
  );
}
