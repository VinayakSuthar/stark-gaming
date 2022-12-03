import { Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Game from "./pages/Game";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="browse/">
            <Route index element={<h2>Browse</h2>} />
            <Route path=":id" element={<Game />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
