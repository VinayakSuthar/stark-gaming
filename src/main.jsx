import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SkeletonTheme baseColor="#171a21" highlightColor="#040f14">
        <App />
      </SkeletonTheme>
    </BrowserRouter>
  </React.StrictMode>
);
