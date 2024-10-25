import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./db.js"; // Assurez-vous que le chemin d'accès est correct selon votre structure de dossier
import "./firebaseConfig.js";
import { BrowserRouter as Router } from "react-router-dom";
// import DataContextProvider from "./context/DataContext.js"; // Le provider du contexte

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <DataContextProvider> */}
      <Router>
        <App />
      </Router>
    {/* </DataContextProvider> */}
  </StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}
