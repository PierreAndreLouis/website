import React, { useContext } from "react";
import "./App.css";
import Home from "./pages/Home";
import { ReloadPrompt } from "./pages/Prompt";
import Login2 from "./components/login/Login2";
import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Ajouter_vehicule from "./components/ajouter_modifier/Ajouter_vehicule";
import Modifier_vehicule from "./components/ajouter_modifier/Modifier_vehicule";
import Historique_voiture from "./components/historique/Historique_voiture";
import Paiement_methode from "./components/paiement/Paiement_methode";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Page_404 from "./components/page_404/Page_404";
import { DataContext } from "./context/DataContext";
import Vehicule_location from "./components/location/Vehicule_location";
import Groupe_vehicule_location from "./components/location/Groupe_vehicule_location";

function App() {
  const location = useLocation();
  const navigate = useNavigate(); // Utilisation de useNavigate
  const { isAuthenticated } = useContext(DataContext);

  React.useEffect(() => {
    // Redirige vers /home si l'utilisateur est authentifié et se rend sur "/login"
    if (isAuthenticated && location.pathname === "/login") {
      navigate("/home"); // Utilisation correcte de navigate
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <div>
      <div className="z-50 ">
        <ReloadPrompt />
      </div>
      
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<Login2 />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route
          path="/ajouter_vehicule"
          element={<PrivateRoute element={<Ajouter_vehicule />} />}
        />
        <Route
          path="/modifier_vehicule"
          element={<PrivateRoute element={<Modifier_vehicule />} />}
        />
        <Route
          path="/historique"
          element={<PrivateRoute element={<Historique_voiture />} />}
        />
        <Route
          path="/paiement"
          element={<PrivateRoute element={<Paiement_methode />} />}
        />

        <Route
          path="/Vehicule_location"
          element={<PrivateRoute element={<Vehicule_location />} />}
        />

        <Route
          path="/Groupe_vehicule_location"
          element={<PrivateRoute element={<Groupe_vehicule_location />} />}
        />

        <Route path="*" element={<Page_404 />} />
      </Routes>
    </div>
  );
}

export default App;
