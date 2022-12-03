import { Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Game from "./pages/Game";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="browse" element={<h2>Browse</h2>} />
          <Route path="game/:id" element={<Game />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
