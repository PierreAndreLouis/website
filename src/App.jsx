import React, { useContext } from "react";
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
  return (
    <div className="dark:bg-gray-700 min-h-screen">
      <div className="dark:bg-slate-800/70 dark:border dark:border-slate-800">
        {/* Composant pour faire défiler vers le haut */}
        {/* <ScrollToTop /> */}
        <Header />
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
