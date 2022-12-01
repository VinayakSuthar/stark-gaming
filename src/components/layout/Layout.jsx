import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from '../navigation/NavigationBar';

import "./Layout.css";

export default function Layout() {
  return (
    <div className='home-layout'>
      <NavigationBar />
      <Outlet />
    </div>
  )
}
