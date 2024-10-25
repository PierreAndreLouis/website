import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Home from "./pages/Home";
import { ReloadPrompt } from "./pages/Prompt";
import NavBar from "./pages/NavBar";
import Login from "./components/login/Login";
import Login2 from "./components/login/Login2";
import { Route, Routes, Navigate } from "react-router-dom";
import Ajouter_vehicule from "./components/ajouter_modifier/Ajouter_vehicule";
import Modifier_vehicule from "./components/ajouter_modifier/Modifier_vehicule";
import Navigation_bar from "./components/home/Navigation_bar";
import Historique_voiture from "./components/historique/Historique_voiture";
// import Paiement from "./components/paiement/paiement";
import DataContextProvider from "./context/DataContext.jsx";

function App() {
  const [count, setCount] = useState(0);
  const [showLogin, setShowLogin] = useState(true)

  return (
    <>
    <DataContextProvider>

      <ReloadPrompt />

      {/* {showLogin ? <Login2 setShowLogin={setShowLogin} /> : */}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login2 />} />
        <Route path="/home" element={<Home />} />
        
        <Route  path="/ajouter_vehicule" element={<Ajouter_vehicule />} />
        <Route  path="/modifier_vehicule" element={<Modifier_vehicule />} />
        <Route  path="/historique" element={<Historique_voiture />} />
        {/* <Route  path="/paiement" element={<Paiement />} /> */}
        {/* <Route path="*" element={<NotFound />} /> Page non trouvée */}
      </Routes>

     {/* } */}
    </DataContextProvider>
    </>
  );
}

export default App;
