import useLocalStorage from "../../hooks/useLocalStorage";

import avatar from "../../assets/image/avatar.png";
import "./index.css";
import GameCard from "../../components/GameCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const defaultDataTransfer = {
  status: "",
  data: {},
};

export default function Profile() {
  const [wishlist, setWishlist] = useLocalStorage("wishlist", []);
  const [played, setPlayed] = useLocalStorage("played", []);
  const [playing, setPlaying] = useLocalStorage("playing", []);
  const [dataTransfer, setDataTransfer] = useState(defaultDataTransfer);

  function addGameToList(list, setList) {
    return function (id, name, genres, background_image) {
      const isGameInTheList = list.find((item) => item.id === id);
      if (isGameInTheList) {
        const newList = list.filter((item) => item.id !== id);
        setList(newList);
      } else {
        setList((previousList) => [
          ...previousList,
          {
            id,
            name,
            genres,
            background_image,
          },
        ]);
      }
    };
  }

  function dragStartHandler(status, data) {
    setDataTransfer({ status, data: { ...data } });
  }

  function transferGame(status, dropStatus) {
    const { data } = dataTransfer;
    switch (dropStatus) {
      case "wishlist": {
        if (status === "wishlist") break;
        setWishlist((previousList) => [...previousList, { ...data }]);
        break;
      }
      case "playing": {
        if (status === "playing") break;
        setPlaying((previousList) => [...previousList, { ...data }]);
        break;
      }
      case "played": {
        if (status === "played") break;
        setPlayed((previousList) => [...previousList, { ...data }]);
        break;
      }
    }
  }

  function dropHandler(dropStatus, event) {
    const { status, data } = dataTransfer;
    event.preventDefault();
    switch (status) {
      case "wishlist": {
        setWishlist(wishlist.filter((item) => item.id !== data.id));
        transferGame(status, dropStatus);
        break;
      }
      case "playing": {
        setPlaying(playing.filter((item) => item.id !== data.id));
        transferGame(status, dropStatus);
        break;
      }
      case "played": {
        setPlayed(played.filter((item) => item.id !== data.id));
        transferGame(status, dropStatus);
        break;
      }
    }
  }

  useEffect(() => {
    console.log(dataTransfer);
  }, [dataTransfer]);

  const addToWishList = addGameToList(wishlist, setWishlist);
  const addToPlaying = addGameToList(playing, setPlaying);
  const addToPlayed = addGameToList(played, setPlayed);

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="profile">
        <img src={avatar} alt="avatar" />
        <div className="profile-info">
          <h2>Nathan Drake</h2>
          <p>No recent activity</p>
          <p className="online-status">Online</p>
        </div>
        <div className="status-count">
          <p>
            <span>Wishlist :</span> <span>{wishlist.length}</span>
          </p>
          <p>
            <span>Playing :</span> <span>{playing.length}</span>
          </p>
          <p>
            <span>Played :</span> <span>{played.length}</span>
          </p>
        </div>
      </div>
      <div className="user-game-list">
        <div>
          <h3>Wishlist</h3>
          {wishlist.length === 0 && (
            <p className="no-games-card">
              No Game to show. <br />
              To add games go to <Link to="/browse">Browse</Link>
            </p>
          )}
          <div
            data-status="wishlist"
            className="browse-list"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => dropHandler("wishlist", e)}
          >
            {wishlist?.map((game) => (
              <GameCard
                data={game}
                key={game.id}
                draggable
                onStatusChange={addToWishList}
                isSelected={() => false}
                buttonValue="Remove"
                onDragStart={(data, e) => dragStartHandler("wishlist", data)}
              />
            ))}
          </div>
        </div>
        <div>
          <h3>Playing</h3>
          {playing.length === 0 && (
            <p className="no-games-card">
              No Game to show. <br />
              To add games go to <Link to="/browse">Browse</Link>
            </p>
          )}
          <div
            data-status="playing"
            className="browse-list"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => dropHandler("playing", e)}
          >
            {playing?.map((game) => (
              <GameCard
                data={game}
                key={game.id}
                isSelected={() => false}
                onStatusChange={addToPlaying}
                buttonValue="Remove"
                draggable
                onDragStart={(data) => dragStartHandler("playing", data)}
              />
            ))}
          </div>
        </div>
        <div>
          <h3>Played</h3>
          {played.length === 0 && (
            <p className="no-games-card">
              No Game to show. <br />
              To add games go to <Link to="/browse">Browse</Link>
            </p>
          )}
          <div
            className="browse-list"
            data-status="played"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => dropHandler("played", e)}
          >
            {played?.map((game) => (
              <GameCard
                data={game}
                key={game.id}
                isSelected={() => false}
                onStatusChange={addToPlayed}
                buttonValue="Remove"
                draggable
                onDragStart={(data) => dragStartHandler("played", data)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
