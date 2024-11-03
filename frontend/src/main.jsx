import React from "react";
import ReactDOM from "react-dom/client";  // Import from "react-dom/client" for React 18
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Get the root element from the HTML
const rootElement = document.getElementById("root");

// Use createRoot instead of ReactDOM.render
const root = ReactDOM.createRoot(rootElement);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
