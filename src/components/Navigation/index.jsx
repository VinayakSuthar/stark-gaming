/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BiHomeAlt, BiSearchAlt } from 'react-icons/bi';
import { FaRegUserCircle } from 'react-icons/fa';

import logo from '../../assets/image/garena-logo.png';

export default function NavigationBar({ navRef, setOpen }) {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  function resize() {
    setInnerWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', resize);
  }, []);

  function handleClick() {
    if (innerWidth < 448) {
      setOpen(false);
    }
  }

  return (
    <div
      ref={navRef}
      className="fixed left-0 top-0 z-[2] flex h-[100dvh] w-44 flex-col bg-veryDarkBlue px-2 pb-4 sm:w-auto sm:px-2 lg:w-60 lg:px-4"
    >
      <Link to="/">
        <div className="mt-4 flex items-center justify-center">
          <img src={logo} alt="logo" className="w-12" />
          {innerWidth > 1024 && <h1 className="py-2 text-center text-xl font-extrabold text-primary">Stark Gaming</h1>}
        </div>
      </Link>
      <div className="mt-3 flex flex-1 flex-col justify-between gap-y-5 sm:mt-12">
        <div className="top-menu">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-x-1 rounded-xl border-2 px-2 py-2 text-xl font-medium text-secondary sm:max-lg:justify-center sm:max-lg:p-2 ${
                isActive ? 'border-primary' : 'border-transparent'
              }`
            }
            onClick={() => handleClick()}
          >
            <BiHomeAlt size="1.1em" />
            <span className="sm:hidden lg:inline-block">Home</span>
          </NavLink>
          <NavLink
            to="browse"
            className={({ isActive }) =>
              `flex items-center gap-x-1 rounded-xl border-2 px-2 py-2 text-xl font-medium text-secondary sm:max-lg:justify-center sm:max-lg:p-2 ${
                isActive ? 'border-primary' : 'border-transparent'
              }`
            }
            onClick={() => handleClick()}
          >
            <BiSearchAlt />
            <span className="sm:hidden lg:inline-block">Browse</span>
          </NavLink>
        </div>
        <div className="bottom-menu">
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `flex items-center justify-center gap-x-1 rounded-xl border-2 px-2 py-2 text-xl font-medium text-secondary sm:max-lg:p-2 ${
                isActive ? 'border-primary' : 'border-transparent'
              }`
            }
            onClick={() => handleClick()}
          >
            <FaRegUserCircle className="icon" size="1.5em" />
            <span className="sm:hidden lg:inline-block">Profile</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
