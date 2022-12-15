import { useEffect, useRef } from "react";
import useAxios from "../../hooks/useAxios";
import { BiSearch } from "react-icons/bi";

import loader from "../../assets/image/loader.svg";
import "./index.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchBox({ onClose }) {
  const [previousController, setPreviousController] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchRef = useRef(null);
  const fetchGames = useAxios();

  function handleSearch(event) {
    previousController?.abort();
    const searchString = event.target.value;
    const controller = new AbortController();
    if (searchString.length === 0) {
      setSearchResult([]);
    }
    if (searchString.length > 2) {
      setLoading(true);
      setError(null);
      fetchGames
        .get("games", {
          params: { search: searchString },
          signal: controller.signal,
        })
        .then((response) => {
          setSearchResult(response.data.results);
        })
        .catch((error) => {
          if (error.name === "CanceledError") return;
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setPreviousController(controller);
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") onClose();
    };
    const outsideClick = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("click", outsideClick, true);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("click", outsideClick, true);
    };
  }, []);
  return (
    <div className="search-box-container">
      <div className="search-box" ref={searchRef}>
        <div className="search-bar">
          <BiSearch />
          <input
            className="search-input"
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
          />
        </div>
        <div className="search-result">
          {error ? (
            <p className="exception-block">
              An error ocurred. <br />
              Please try again later
            </p>
          ) : loading ? (
            <div className="loader-container">
              <img className="loader-svg" src={loader} alt="loader" />
            </div>
          ) : searchResult.length === 0 ? (
            <p className="exception-block">
              No result to show. <br /> Type Something
            </p>
          ) : (
            <>
              {searchResult.map(({ id, name, genres }) => {
                return (
                  <Link to={`/browse/${id}`} key={id} onClick={onClose}>
                    {name} <br />
                    <span className="search-genre">
                      {genres[0]?.name || "No data"}
                    </span>
                  </Link>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
