import { Link } from 'react-router-dom';
import bugGif from '../../assets/image/bug.gif';

import './index.css';

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404 Page Not Found</h1>
      <p>Congrats, you just found the bongo moth!</p>
      <img src={bugGif} alt="bug gif" />
      <Link to="/">Go To Home</Link>
    </div>
  );
}
