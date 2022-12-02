import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

import "./index.css";

import NavigationBar from "../Navigation";
import TopNavigation from "../TopNavigation";

export default function Layout() {
  const [open, setOpen] = useState(window.innerWidth < 601 ? false : true);
  const navRef = useRef(null);

  useEffect(() => {
    const outsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (window.innerWidth < 600) {
      document.addEventListener("click", outsideClick, true);
      return () => {
        document.removeEventListener("click", outsideClick, true);
      };
    }
  }, []);

  return (
    <div className="home-layout">
      <TopNavigation setOpen={setOpen} />
      {open && <NavigationBar navRef={navRef} />}
      <Outlet />
    </div>
  );
}
