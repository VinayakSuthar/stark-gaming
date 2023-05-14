/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { BiSearch } from 'react-icons/bi';
import useAxios from '../../hooks/useAxios';

import useDebounce from '../../hooks/useDebounce';
import useOutsideClick from '../../hooks/useOutsideClick';
import loader from '../../assets/image/loader.svg';

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
    y: '-100vh',
  },
  visible: {
    y: 0,
  },
  exit: {
    y: '100vh',
  },
};

const client = useAxios();
function searchGame({ queryKey }) {
  const searchString = queryKey[1];
  return client.get('games', {
    params: { search: searchString },
  });
}

function SearchResult({ searchValue, isLoading, isError, searchResult, onClose }) {
  if (searchValue.length === 0) {
    return <p className="mt-24 self-center text-xl">Search Games</p>;
  }
  if (isLoading) {
    return (
      <div className="mb-5 grid h-full place-items-center">
        <img className="loader-svg w-2/5" src={loader} alt="loader" />
      </div>
    );
  }
  if (isError) {
    return (
      <p className="mt-24 self-center text-xl">
        An error ocurred. <br />
        Please try again later
      </p>
    );
  }
  if (searchResult?.length === 0) {
    return <p className="mt-24 self-center text-xl">No Result Found</p>;
  }
  if (searchResult?.length > 0) {
    return searchResult?.map(({ id, name, genres, background_image: backgroundImage }) => (
      <Link
        to={`/browse/game/${id}`}
        key={id}
        onClick={onClose}
        className="flex max-w-full gap-x-3 text-xl text-lightBlue"
      >
        <img src={backgroundImage} alt="title" className="aspect-video w-24 rounded-md object-cover" />
        <div className="result-content w-4/5">
          <h4 className="w-4/5 truncate">{name}</h4>
          <span className="text-base text-secondary">{genres[0]?.name || 'No data'}</span>
        </div>
      </Link>
    ));
  }
}

export default function SearchBox({ onClose }) {
  const [searchResult, setSearchResult] = useState();
  const [searchValue, setSearchValue] = useState('');
  const searchRef = useOutsideClick(onClose);

  const { isLoading, isError, refetch } = useQuery(['game', searchValue], searchGame, {
    enabled: false,
    select: (data) => data.data.results,
    onSuccess: (data) => {
      setSearchResult(data);
    },
  });

  useDebounce(() => {
    if (searchValue.length !== 0) {
      refetch();
    }
  }, searchValue);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  return (
    <motion.div
      key="backdrop"
      className="fixed inset-0 z-20 grid h-screen place-items-center bg-black/70 backdrop-blur-sm"
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        key="modal"
        className="relative flex h-[350px] w-[clamp(35%,500px,90%)] flex-col rounded-xl border-2 border-primary/70 bg-veryDarkBlue sm:h-[450px]"
        ref={searchRef}
        variants={dropIn}
      >
        <div className="flex items-center gap-x-2 border-b-2 border-primary/70 px-4">
          <BiSearch size={24} />
          <input
            className="border-none bg-transparent px-2 py-5 text-xl text-lightBlue outline-none"
            type="text"
            placeholder="Search..."
            value={searchValue}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="flex h-full flex-col gap-y-4 overflow-x-auto px-4 py-4">
          <SearchResult
            searchValue={searchValue}
            searchResult={searchResult}
            onClose={onClose}
            isError={isError}
            isLoading={isLoading}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
