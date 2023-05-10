import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaRegUserCircle } from 'react-icons/fa';
import { BiSearchAlt } from 'react-icons/bi';

import SearchBox from '../SearchBox';

import logo from '../../assets/image/garena-logo.png';

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
      <div className="sticky top-0 z-[8] flex items-center justify-between bg-[#040f14] px-4 py-2 sm:justify-end sm:py-4">
        <div className="flex items-center gap-x-4 sm:hidden">
          <GiHamburgerMenu size="1.8em" color="#c7d5e0" onClick={() => handleOpen()} />
          <Link to="/">
            <img src={logo} alt="logo" className="w-12 " />
          </Link>
        </div>
        <div className="flex items-center gap-x-4 sm:justify-between">
          <button
            type="button"
            title="search"
            className="flex items-center justify-center gap-x-2 rounded-full bg-slate-800 px-4 py-1 text-lg text-secondary"
            onClick={() => handleClick()}
          >
            <BiSearchAlt /> <span>Search</span>
          </button>
          <Link to="profile" className="flex items-center gap-x-2">
            <FaRegUserCircle className=" text-primary" size={25} />
            <span className="font-semibold max-sm:hidden">Hello, Atreus</span>
          </Link>
        </div>
      </div>
      <AnimatePresence>{isSearchBoxOpen && <SearchBox onClose={() => handleClick()} />}</AnimatePresence>
    </>
  );
}
