// src/pages/Home.jsx
import React, { useContext, useEffect, useState } from "react";
import Statistics from "../components/home/Statistics";
import Liste from "../components/home/Liste";
import Liste_options from "../components/home/Liste_options";
import { DataContext } from "../context/DataContext";
import { RiWifiOffLine } from "react-icons/ri";

// ok
// ok
// ok
// ok
// ok
// dark
// dark
// dark
// dark
// dark
// dark

const Home = () => {
  const { vehicleData, isLoading, showListeOption, setShowListOption } =
    useContext(DataContext);

  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // gestion du message de connextion d'internet
  useEffect(() => {
    // Détecter la perte de connexion
    const handleOffline = () => setIsOffline(true);
    // Détecter le retour de la connexion
    const handleOnline = () => setIsOffline(false);

    // Ajouter les écouteurs d'événements
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    // Nettoyage des écouteurs d'événements
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return (
    <div className="sm:px-10 pt-16 md:px-14 lg:px-20 ">
      {/* Statistic component */}
      <Statistics />

      {/* Chargement quand on login */}
      {isLoading ||
        (!vehicleData && (
          <div className="fixed inset-0 bg-gray-200/50">
            <div className="w-full h-full flex justify-center items-center">
              <div className="border-blue-500 h-20 w-20 animate-spin rounded-full border-8 border-t-gray-100/0" />
            </div>
          </div>
        ))}

      {/* Message quand il n y a pas d'internet */}
      {isOffline && (
        <div className="shadow-md flex gap-2 justify-center md:gap-6 rounded-lg mx-5 p-3 text-center bg-red-100">
          <RiWifiOffLine className="translate-y-0 text-red-700 text-4xl" />
          <h3 className="text-red-700">
            Vous êtes hors ligne. Veuillez vérifier votre connexion internet.
          </h3>
        </div>
      )}

      {/* Liste des vehicules */}
      <Liste setShowListOption={setShowListOption} />

      {/* Option pour chaque vehicule */}
      {showListeOption && <Liste_options />}
    </div>
  );
};

export default Home;
