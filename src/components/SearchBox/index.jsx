import { BiSearch } from "react-icons/bi";

import "./index.css";

export default function SearchBox() {
  return (
    <div className="search-box-container">
      <div className="search-box">
        <div className="search-bar">
          <BiSearch />
          <input className="search-input" type="text" placeholder="Search..." />
        </div>
        <div className="search-result">No result to show</div>
      </div>
    </div>
  );
}
