import { Route, Routes } from 'react-router-dom';
import './App.css';

import Layout from './components/Layout';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Game from './pages/Game';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="browse/">
          <Route index element={<Browse />} />
          <Route path=":genre" element={<Browse />} />
          <Route path="game/:id" element={<Game />} />
        </Route>
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
