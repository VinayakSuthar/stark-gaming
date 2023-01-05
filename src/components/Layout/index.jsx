import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import useOutsideClick from "../../hooks/useOutsideClick";

import "./index.css";

import NavigationBar from "../Navigation";
import TopNavigation from "../TopNavigation";

export default function Layout() {
  const [open, setOpen] = useState(window.innerWidth < 480 ? false : true);
  let navRef;

  if (window.innerWidth < 480) {
    navRef = useOutsideClick(() => setOpen(false));
  }

  return (
    <div className="home-layout">
      <TopNavigation setOpen={setOpen} />
      {open && <NavigationBar setOpen={setOpen} navRef={navRef} />}
      <Outlet />
    </div>
  );
}
