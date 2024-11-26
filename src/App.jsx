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

import Paiement_methode from "./components/paiement/Paiement_methode";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Page_404 from "./components/page_404/Page_404";
import { DataContext } from "./context/DataContext";

// import Delete_vehicule from "./components/delete_vehicule/Delete_vehicule";
import ProtectedChangePassword from "./pages/ProtectedChangePassword";
import Header from "./components/home/Header";
import Navigation_bar from "./components/home/Navigation_bar";
import SideBar from "./components/home/SideBar";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import ModifierPage from "./pages/ModifierPage";
import AjouterPage from "./pages/AjouterPage";
import ProfilUserPage from "./pages/ProfilUserPage";
import DetailsVehiculePage from "./pages/DetailsVehiculePage";
import RapportPage from "./pages/RapportPage";
import LocationPage from "./pages/LocationPage";
import HistoriquePage from "./pages/HistoriquePage";
import StatisticPage from "./pages/StatisticPage";
import RapportPageDetails from "./pages/RapportPageDetails";

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

  // Liste des chemins où le footer ne doit pas apparaître
  const hideComponentRoutes = ["/login"];

  // Vérification si le chemin actuel correspond à l'un des chemins dans hideComponentRoutes
  const shouldHideComponent = hideComponentRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div className="dark:bg-gray-700">
      <div className="dark:bg-slate-800/70 dark:border dark:border-slate-800">
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

        {/* <Route path="/login" element={<Login2 />} /> */}
        {/* <div> */}
        {/* To be Delete */}
        {/* <Header /> */}
        {/* <HomePage /> */}
        {/* <AjouterPage />
        <Navigation_bar /> */}
        {/* </div> */}

        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/home" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<Login2 />} />
          <Route
            path="/home"
            element={<PrivateRoute element={<HomePage />} />}
          />
          <Route
            path="/ajouter_vehicule"
            element={<PrivateRoute element={<AjouterPage />} />}
          />
          <Route
            path="/modifier_vehicule"
            element={<PrivateRoute element={<ModifierPage />} />}
          />
          {/* <Route
          path="/historique"
          element={<PrivateRoute element={<Historique_voiture />} />}
        /> */}
          <Route
            path="/paiement"
            element={<PrivateRoute element={<Paiement_methode />} />}
          />
          {/* <Route
          path="/Single_Vehicule_Location"
          element={<PrivateRoute element={<Vehicule_location />} />}
        /> */}
          <Route
            path="/Groupe_vehicule_location"
            element={<PrivateRoute element={<LocationPage />} />}
          />
          <Route
            path="/voiture_details"
            element={<PrivateRoute element={<DetailsVehiculePage />} />}
          />
          <Route
            path="/voiture_historique"
            element={<PrivateRoute element={<HistoriquePage />} />}
          />
          {/* <Route
            path="/delete_vehicule"
            element={<PrivateRoute element={<Delete_vehicule />} />}
          /> */}
          <Route
            path="/User_Profile"
            element={<PrivateRoute element={<ProfilUserPage />} />}
          />

          <Route
            path="/rapport_vehicule"
            element={<PrivateRoute element={<RapportPage />} />}
          />

          <Route
            path="/rapport_page_details"
            element={<PrivateRoute element={<RapportPageDetails />} />}
          />

          <Route
            path="/Change_Password"
            element={<ProtectedChangePassword />}
          />

          <Route path="/Statistics_Page" element={<StatisticPage />} />

          <Route path="*" element={<Page_404 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;



// {Device: "863844053509383";
// accountID: "lelevier";
// address: "Delmas 61, Commune de Delmas, Département de l'Ouest 6120, Ayiti";
// city: "Commune de Delmas";
// creationMillis: "1732468878595";
// creationTime: "1732468878";
// deviceID: "863844053509383";
// heading: "0.0";
// latitude: "18.541458833333333";
// longitude: "-72.297372";
// odometerKM: "1273.1891098784806";
// speedKPH: "0.0";
// stateProvince: "Département de l'Ouest";
// statusCode: "0xF952";
// streetAddress: "Delmas 61";
// timestamp: "1732468863";}
