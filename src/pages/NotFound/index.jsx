import { Link } from 'react-router-dom';
import bugGif from '../../assets/image/bug.gif';

export default function NotFound() {
  return (
    <div className="mt-16 flex flex-col items-center gap-5">
      <h1 className="text-2xl font-bold">404 Page Not Found</h1>
      <p className="font-medium">Congrats, you just found the bongo moth!</p>
      <img src={bugGif} alt="bug gif" />
      <Link to="/" className="text-xl font-semibold text-primary">
        Go To Home
      </Link>
    </div>
  );
}
