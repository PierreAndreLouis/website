import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Header from "./components/home/Header";
import Footer5 from "./components/home/Footer5";
import Reservation from "./pages/Reservation";
import PortfolioPage from "./pages/PortfolioPage";

// import ScrollToTop from "./components/scrollToTop/ScrollToTop";

function App() {
  const location = useLocation();
  const navigate = useNavigate(); // Utilisation de useNavigate

  React.useEffect(() => {
    // Redirige vers /home si l'utilisateur est authentifié et se rend sur "/login"
    if (location.pathname === "/") {
      navigate("/home?tab=home"); // Utilisation correcte de navigate
    }
  }, [location.pathname, navigate]);

  ////////////////////////////////////////////////////////////////////////////
  const [deferredPrompt, setDeferredPrompt] = useState(null); // Garde une trace de l'événement
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    // Écoute l'événement beforeinstallprompt
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault(); // Empêche le popup automatique de Chrome
      setDeferredPrompt(event); // Enregistre l'événement pour une installation ultérieure
      setShowInstallButton(true); // Affiche le bouton d'installation
    });
  }, []);

  // Fonction pour installer l'application lorsque l'utilisateur clique sur le bouton
  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Affiche le popup d'installation
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("L'utilisateur a accepté l'installation");
        } else {
          console.log("L'utilisateur a refusé l'installation");
        }
        setDeferredPrompt(null); // Réinitialise l'événement
      });
    }
  };

  return (
    <div className="dark:bg-gray-700 min-h-screen">
      <div className="dark:bg-slate-800/70 dark:border dark:border-slate-800">
        {/* Composant pour faire défiler vers le haut */}
        {/* <ScrollToTop /> */}
        <Header />

        {/* {!isInstallable && ( */}
        {/* {showInstallButton && ( */}
        {/* <button onClick={handleInstallClick}>Installer l'application</button> */}
        {/* )}    */}
        {/* )} */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
        <Footer5 />
      </div>
    </div>
  );
}

export default App;
