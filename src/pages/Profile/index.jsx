import { useState } from 'react';
import { Link } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';

import avatar from '../../assets/image/avatar.png';
import './index.css';
import GameCard from '../../components/GameCard';

const defaultDataTransfer = {
  status: '',
  data: {},
};

export default function Profile() {
  const [wishlist, setWishlist] = useLocalStorage('wishlist', []);
  const [played, setPlayed] = useLocalStorage('played', []);
  const [playing, setPlaying] = useLocalStorage('playing', []);
  const [dataTransfer, setDataTransfer] = useState(defaultDataTransfer);

  function addGameToList(list, setList) {
    // eslint-disable-next-line func-names
    return function (id, name, genres, backgroundImage) {
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
            backgroundImage,
          },
        ]);
      }
    };
  }

  function dragStartHandler(status, data) {
    setDataTransfer({ status, data: { ...data } });
  }

  function transferGame(dropStatus) {
    const { data } = dataTransfer;
    switch (dropStatus) {
      case 'wishlist': {
        setWishlist((previousList) => [...previousList, { ...data }]);
        break;
      }
      case 'playing': {
        setPlaying((previousList) => [...previousList, { ...data }]);
        break;
      }
      case 'played': {
        setPlayed((previousList) => [...previousList, { ...data }]);
        break;
      }
      default:
    }
  }

  function dropHandler(dropStatus, event) {
    const { status, data } = dataTransfer;
    event.preventDefault();
    if (dropStatus === status) {
      setDataTransfer(defaultDataTransfer);
      return;
    }
    switch (status) {
      case 'wishlist': {
        setWishlist(wishlist.filter((item) => item.id !== data.id));
        transferGame(dropStatus);
        break;
      }
      case 'playing': {
        setPlaying(playing.filter((item) => item.id !== data.id));
        transferGame(dropStatus);
        break;
      }
      case 'played': {
        setPlayed(played.filter((item) => item.id !== data.id));
        transferGame(dropStatus);
        break;
      }
      default:
    }
    setDataTransfer(defaultDataTransfer);
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
            <span>Playing :</span> <span>{playing.length}</span>
          </p>
          <p>
            <span>Played :</span> <span>{played.length}</span>
          </p>
        </div>
      </div>
      <div className="user-game-list">
        <div
          className={`${dataTransfer.status && dataTransfer.status !== 'wishlist' ? 'dragging' : ''}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => dropHandler('wishlist', e)}
        >
          <h3>Wishlist</h3>
          <div className="browse-list-container">
            {wishlist.length === 0 && (
              <div className="no-games-card">
                No Game to show. <br />
                To add games go to <Link to="/browse">Browse</Link>
              </div>
            )}
            <div data-status="wishlist" className="browse-list">
              {wishlist?.map((game) => (
                <GameCard
                  data={game}
                  key={game.id}
                  draggable
                  onStatusChange={addToWishList}
                  isSelected={() => false}
                  buttonValue="Remove"
                  onDragStart={(data) => dragStartHandler('wishlist', data)}
                />
              ))}
            </div>
          </div>
        </div>
        <div
          className={`${dataTransfer.status && dataTransfer.status !== 'playing' ? 'dragging' : ''}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => dropHandler('playing', e)}
        >
          <h3>Playing</h3>
          <div className="browse-list-container">
            {playing.length === 0 && (
              <div className="no-games-card">
                No Game to show. <br />
                To add games go to <Link to="/browse">Browse</Link>
              </div>
            )}
            <div data-status="playing" className="browse-list">
              {playing?.map((game) => (
                <GameCard
                  data={game}
                  key={game.id}
                  isSelected={() => false}
                  onStatusChange={addToPlaying}
                  buttonValue="Remove"
                  draggable
                  onDragStart={(data) => dragStartHandler('playing', data)}
                />
              ))}
            </div>
          </div>
        </div>
        <div
          className={`${dataTransfer.status && dataTransfer.status !== 'played' ? 'dragging' : ''}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => dropHandler('played', e)}
        >
          <h3>Played</h3>
          <div className="browse-list-container">
            {played.length === 0 && (
              <div className="no-games-card">
                No Game to show. <br />
                To add games go to <Link to="/browse">Browse</Link>
              </div>
            )}
            <div className="browse-list" data-status="played">
              {played?.map((game) => (
                <GameCard
                  data={game}
                  key={game.id}
                  isSelected={() => false}
                  onStatusChange={addToPlayed}
                  buttonValue="Remove"
                  draggable
                  onDragStart={(data) => dragStartHandler('played', data)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
