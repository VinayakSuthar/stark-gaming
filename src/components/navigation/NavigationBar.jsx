import { Link } from "react-router-dom"

import "./NavigationBar.css"

export default function NavigationBar() {
  return (
      <div className="nav-bar">
        <div className="logo">Stark Gaming</div>
        <div className="nav-menu">
          <Link className="nav-link">Home</Link>
          <Link className="nav-link">Browse</Link>
          <Link className="nav-link">Video</Link>
          <Link className="nav-link">Compatibility</Link>
        </div>
      </div>
  )
}
