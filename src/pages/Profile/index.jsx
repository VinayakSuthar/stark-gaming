import useLocalStorage from "../../hooks/useLocalStorage";

import avatar from "../../assets/image/avatar.png";
import "./index.css";
import GameCard from "../../components/GameCard";
import { Link } from "react-router-dom";

export default function Profile() {
  const [wishlist, setWishlist] = useLocalStorage("wishlist", []);
  const [played, setPlayed] = useLocalStorage("played", []);
  const [playing, setPlaying] = useLocalStorage("playing", []);

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
  function isAvailableInTheList(list) {
    return function (id) {
      return list.find((game) => game.id === id);
    };
  }

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
            <span>Playing:</span> <span>{playing.length}</span>
          </p>
          <p>
            <span>Played:</span> <span>{played.length}</span>
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
          <div className="browse-list">
            {wishlist?.map((game) => (
              <GameCard
                data={game}
                key={game.id}
                onStatusChange={addToWishList}
                isSelected={(() => isAvailableInTheList(wishlist))()}
                buttonValue="Want to Play"
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
          <div className="browse-list">
            {playing?.map((game) => (
              <GameCard
                data={game}
                key={game.id}
                isSelected={(() => isAvailableInTheList(playing))()}
                onStatusChange={addToPlaying}
                buttonValue="Playing"
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
          <div className="browse-list">
            {played?.map((game) => (
              <GameCard
                data={game}
                key={game.id}
                isSelected={(() => isAvailableInTheList(played))()}
                onStatusChange={addToPlayed}
                buttonValue="Played"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
