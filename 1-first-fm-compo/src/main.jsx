// Imports: React starts by mounting the app into the HTML element with id="root".
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  // BrowserRouter gives App access to the browser URL, history, and nested routing.
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
