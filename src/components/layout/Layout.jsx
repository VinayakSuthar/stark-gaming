import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from '../navigation/NavigationBar';
import {GiHamburgerMenu} from 'react-icons/gi';

import "./Layout.css";

export default function Layout() {
  const [open, setOpen] = useState(window.innerWidth < 601 ? false: true);
  const navRef = useRef(null);
  
  useEffect(()=> {
    const outsideClick = (event) => {
      if(navRef.current && !navRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", outsideClick, true);
    return ()=> {
      document.removeEventListener("click", outsideClick, true);
    }
  },[])
  
  return (
    <div className="home-layout">
      <GiHamburgerMenu className="mobile" size="1.4em" color="#e5414e" onClick={()=>setOpen(!open)}/>
      {open && <NavigationBar navRef={navRef} /> }
      <Outlet />
    </div>
  );
}
