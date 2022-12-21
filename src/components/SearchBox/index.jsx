import { useState, useEffect, useRef } from "react";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useDebounce from "../../hooks/useDebounce";
import useOutsideClick from "../../hooks/useOutsideClick";

import { BiSearch } from "react-icons/bi";
import { IoCloseCircleSharp } from "react-icons/io5";
import loader from "../../assets/image/loader.svg";
import "./index.css";

const backdrop = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const dropIn = {
  hidden: {
    y: "-100vh",
  },
  visible: {
    y: 0,
  },
  exit: {
    y: "100vh",
  },
};

export default function SearchBox({ onClose }) {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [noResult, setNoResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const searchRef = useRef(null);
  const fetchGames = useAxios();
  const searchRef = useOutsideClick(onClose);

  useDebounce(() => {
    if (searchValue.length === 0) {
      setSearchResult([]);
    }
    if (searchValue.length > 2) {
      setLoading(true);
      setError(null);
      fetchGames
        .get("games", {
          params: { search: searchValue },
        })
        .then((response) => {
          if (response.data.count === 0) setNoResult(true);
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
  }, searchValue);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  return (
    <motion.div
      key="backdrop"
      className="search-box-container"
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        key="modal"
        className="search-box"
        ref={searchRef}
        variants={dropIn}
      >
        <IoCloseCircleSharp onClick={onClose} className="close-button mobile" />
        <div className="search-bar">
          <BiSearch />
          <input
            className="search-input"
            type="text"
            placeholder="Search..."
            value={searchValue}
            autoFocus
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="search-result">
          {searchValue.length < 3 ? (
            <p className="exception-block">Search Games</p>
          ) : loading ? (
            <div className="loader-container">
              <img className="loader-svg" src={loader} alt="loader" />
            </div>
          ) : error ? (
            <p className="exception-block">
              An error ocurred. <br />
              Please try again later
            </p>
          ) : noResult ? (
            <p className="exception-block">No Result Found</p>
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
      </motion.div>
    </motion.div>
  );
}
