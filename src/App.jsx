import { Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="browse" element={<h2>Browse</h2>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
