import React, { useContext } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
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
import VoitureDetails from "./components/details/VoitureDetails";
import Historique from "./components/home/Historique";
import Delete_vehicule from "./components/delete_vehicule/Delete_vehicule";
import UserProfile from "./components/profile/UserProfile";
import ProtectedChangePassword from "./pages/ProtectedChangePassword";
import RapportVehicule from "./components/home/RapportVehicule";
import Header from "./components/home/Header";
import Navigation_bar from "./components/home/Navigation_bar";
import SideBar from "./components/home/SideBar";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";

function App() {
  const location = useLocation();
  const navigate = useNavigate(); // Utilisation de useNavigate
  const {
    isAuthenticated,
  } = useContext(DataContext);

  React.useEffect(() => {
    // Redirige vers /home si l'utilisateur est authentifié et se rend sur "/login"
    if (isAuthenticated && location.pathname === "/login") {
      navigate("/home"); // Utilisation correcte de navigate
    }
  }, [isAuthenticated, location.pathname, navigate]);

  // Liste des chemins où le footer ne doit pas apparaître
  const hideComponentRoutes = ["/login"];

  // Vérification si le chemin actuel correspond à l'un des chemins dans hideComponentRoutes
  const shouldHideComponent = hideComponentRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div>
      {/* Pupup qui Permet a l'utilisateur de refraich la page quand il y a mise a jour */}
      <div className="z-50 ">{/* <ReloadPrompt /> */}</div>

      {/* Composant pour faire défiler vers le haut */}
      <ScrollToTop />

      {/* Ces composant vont pouvoir apparaitre dans tous les page, sauf dans /login */}
      <div className="absolute z-[100000000000000000000000000]">
        {!shouldHideComponent && <Header />}
        {!shouldHideComponent && <Navigation_bar />}
        {!shouldHideComponent && <SideBar />}
      </div>

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<Login2 />} />
        <Route path="/home" element={<PrivateRoute element={<HomePage />} />} />
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
          path="/Single_Vehicule_Location"
          element={<PrivateRoute element={<Vehicule_location />} />}
        />
        <Route
          path="/Groupe_vehicule_location"
          element={<PrivateRoute element={<Groupe_vehicule_location />} />}
        />
        <Route
          path="/voiture_details"
          element={<PrivateRoute element={<VoitureDetails />} />}
        />
        <Route
          path="/voiture_historique"
          element={<PrivateRoute element={<Historique />} />}
        />
        <Route
          path="/delete_vehicule"
          element={<PrivateRoute element={<Delete_vehicule />} />}
        />
        <Route
          path="/User_Profile"
          element={<PrivateRoute element={<UserProfile />} />}
        />

        <Route
          path="/rapport_vehicule"
          element={<PrivateRoute element={<RapportVehicule />} />}
        />

        <Route path="/Change_Password" element={<ProtectedChangePassword />} />

        <Route path="*" element={<Page_404 />} />
      </Routes>
    </div>
  );
}

export default App;
