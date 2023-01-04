import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "react-query";

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

const client = useAxios();
function searchGame({ queryKey }) {
  const searchString = queryKey[1];
  return client.get("/games", {
    params: {
      populate: "*",
      filters: {
        name: {
          $containsi: searchString,
        },
      },
    },
  });
}

function sanitizeData(data) {
  return data?.data?.data?.map((game) => {
    const { Name, genres, background_image } = game.attributes;
    const sanitizedGenres = genres?.data?.map((genre) => {
      const { name, slug } = genre.attributes;
      return { id: genre.id, name, slug };
    });
    return {
      id: game.id,
      name: Name,
      genres: sanitizedGenres,
      background_image: `http://localhost:1337${background_image?.data?.attributes?.url}`,
    };
  });
}

export default function SearchBox({ onClose }) {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [noResult, setNoResult] = useState(false);
  const searchRef = useOutsideClick(onClose);

  const { data, isLoading, isError, refetch } = useQuery(
    ["game", searchValue],
    searchGame,
    {
      enabled: false,
      select: sanitizeData,
      onSuccess: (data) => {
        setSearchResult(data);
        if (data.length === 0) {
          setNoResult(true);
        }
      },
    }
  );

  useDebounce(() => {
    setNoResult(false);
    if (searchValue.length === 0) {
      setSearchResult([]);
    }
    if (searchValue.length > 2) {
      refetch();
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
          ) : isLoading ? (
            <div className="loader-container">
              <img className="loader-svg" src={loader} alt="loader" />
            </div>
          ) : isError ? (
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
