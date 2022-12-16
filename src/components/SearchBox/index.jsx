import { useState, useEffect, useRef } from "react";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
            <p className="exception-block">Type Something</p>
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
