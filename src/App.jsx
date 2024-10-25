// import { useContext, useEffect } from "react";
// import "./App.css";
// import Home from "./pages/Home";
// import { ReloadPrompt } from "./pages/Prompt";
// import Login2 from "./components/login/Login2";
// import { Route, Routes, Navigate, useLocation } from "react-router-dom";
// import Ajouter_vehicule from "./components/ajouter_modifier/Ajouter_vehicule";
// import Modifier_vehicule from "./components/ajouter_modifier/Modifier_vehicule";
// import Historique_voiture from "./components/historique/Historique_voiture";
// // import DataContextProvider, { DataContext } from "./context/DataContext";
// import Paiement_methode from "./components/paiement/Paiement_methode";
// import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
// import Page_404 from "./components/page_404/Page_404";
// import DataContextProvider, { DataContext } from "./context/DataContext";

// function App() {
//   const location = useLocation();
//   const { isAuthenticated } = useContext(DataContext);

//   useEffect(() => {
//     // Redirige vers /home si l'utilisateur est authentifié et se rend sur "/login"
//     if (isAuthenticated && location.pathname === "/login") {
//       Navigate("/home");
//     }
//   }, [isAuthenticated, location.pathname]);

//   return (
//     <DataContextProvider>
//       <ReloadPrompt />

//       <Routes>
//         <Route
//           path="/"
//           element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />}
//         />
//         <Route path="/login" element={<Login2 />} />
//         <Route path="/home" element={<PrivateRoute element={<Home />} />} />
//         <Route path="/ajouter_vehicule" element={<PrivateRoute element={<Ajouter_vehicule />} />} />
//         <Route path="/modifier_vehicule" element={<PrivateRoute element={<Modifier_vehicule />} />} />
//         <Route path="/historique" element={<PrivateRoute element={<Historique_voiture />} />} />
//         <Route path="/paiement" element={<PrivateRoute element={<Paiement_methode />} />} />
//         <Route path="*" element={<Page_404 />} />
//       </Routes>
//     </DataContextProvider>
//   );
// }

// export default App;

import { useContext, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import { ReloadPrompt } from "./pages/Prompt";
import Login2 from "./components/login/Login2";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Ajouter_vehicule from "./components/ajouter_modifier/Ajouter_vehicule";
import Modifier_vehicule from "./components/ajouter_modifier/Modifier_vehicule";
import Historique_voiture from "./components/historique/Historique_voiture";
import DataContextProvider, { DataContext } from "./context/DataContext.jsx";
import Paiement_methode from "./components/paiement/Paiement_methode.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import Page_404 from "./components/page_404/Page_404.jsx";

function App() {
  const location = useLocation();
  // const { isAuthenticated } = useContext(DataContext);

  // useEffect(() => {
  //   // Redirige vers /home si l'utilisateur est authentifié et se rend sur "/login"
  //   if (isAuthenticated && location.pathname === "/login") {
  //     Navigate("/home");
  //   }
  // }, [isAuthenticated, location.pathname]);

  return (
    <>
      <DataContextProvider>
        <ReloadPrompt />

        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
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

          <Route path="*" element={<Page_404 />} />
        </Routes>

        {/* } */}
      </DataContextProvider>
    </>
  );
}

export default App;
