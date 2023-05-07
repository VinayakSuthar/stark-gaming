import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import useOutsideClick from '../../hooks/useOutsideClick';

import NavigationBar from '../Navigation';
import TopNavigation from '../TopNavigation';

export default function Layout() {
  const [open, setOpen] = useState(window.innerWidth > 480);
  let navRef;

  if (window.innerWidth < 480) {
    navRef = useOutsideClick(() => setOpen(false));
  }

  return (
    <div className="p-5 pt-0 md:pl-20 lg:pl-72">
      <TopNavigation setOpen={setOpen} />
      {open && <NavigationBar setOpen={setOpen} navRef={navRef} />}
      <Outlet />
    </div>
  );
}
