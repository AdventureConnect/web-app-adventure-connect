import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "../styles/tailwind.css"

// const domNode = document.getElementById("root");
// const root = createRoot(domNode);
// root.render(<App />);

createRoot(document.querySelector('#root')).render(<App/>)