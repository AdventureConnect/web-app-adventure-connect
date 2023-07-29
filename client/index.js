import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { store } from "./store/store.js";
import { Provider } from "react-redux";

import "../styles/tailwind.css";

createRoot(document.querySelector("#root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
