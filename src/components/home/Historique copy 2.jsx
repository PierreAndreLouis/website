import React, { useContext, useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { DataContext } from "../../context/DataContext";
import { MdLocationPin, MdDateRange } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import Navigation_bar from "./Navigation_bar";
import PC_header from "./PC_header";
import DateTimePicker from "./DateTimePicker";
import { Link } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import Liste_options from "./Liste_options";
import { BsFilterRight } from "react-icons/bs";
import { FaCarRear } from "react-icons/fa6";
import { FiRefreshCw } from "react-icons/fi";


function Historique() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFilter, setshowFilter] = useState(false);

  const {
    mergedData,
    isLoading,
    currentVehicule,
    updateCurrentVehicule,
    loadingHistoriqueFilter,
    setShowListOption,
    showListeOption,
    vehicleDetails,
    vehiclueHistoriqueDetails,
  } = useContext(DataContext);

  const dataFusionee = mergedData ? Object.values(mergedData) : [];

  // Fonctions pour formater le temps et la date
  function formatTimestampToTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  function formatTimestampToDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  }

  // Fonction pour gérer la sélection de véhicule
  const handleVehicleChange = (e) => {
    const selectedVehicleDescription = e.target.value;
    const selectedVehicle = dataFusionee.find(
      (vehicule) => vehicule.description === selectedVehicleDescription
    );
    updateCurrentVehicule(selectedVehicle);
  };

  const [checkboxes, setCheckboxes] = useState({
    tout: true,
    en_marche: true,
    en_ralenti: true,
    en_arret: true,
  });

  const handleCheckboxChange = (name) => {
    let newCheckboxes = { ...checkboxes };

    // Si "Tout" est coché, coche tout le reste.
    if (name === "tout") {
      const newValue = !checkboxes.tout;
      newCheckboxes = {
        tout: newValue,
        en_marche: newValue,
        en_ralenti: newValue,
        en_arret: newValue,
      };
    } else {
      // Sinon, change uniquement l'état de la case cliquée.
      newCheckboxes[name] = !checkboxes[name];

      // Si toutes les autres cases sont cochées, coche aussi "Tout".
      if (
        newCheckboxes.en_marche &&
        newCheckboxes.en_ralenti &&
        newCheckboxes.en_arret
      ) {
        newCheckboxes.tout = true;
      } else {
        newCheckboxes.tout = false;
      }
    }

    setCheckboxes(newCheckboxes);
  };

  // Ajoute cette fonction pour filtrer les données
  const filterVehiclueHistoriqueDetails = () => {
    return vehiclueHistoriqueDetails?.filter((vehicle) => {
      const speed = vehicle.speedKPH || 0;
      if (checkboxes.tout) return true;
      if (checkboxes.en_marche && speed > 20) return true;
      if (checkboxes.en_ralenti && speed >= 1 && speed <= 20) return true;
      if (checkboxes.en_arret && speed < 1) return true;
      return false;
    });
  };

  return (
    <div className="p-4 flex flex-col gap-4 mt-16 mb-32 px-4 sm:px-12 md:px-20 lg:px-40">
      <Navigation_bar />
      <PC_header />
      <Header />
      <SideBar />
      {showListeOption && (
        <div className="absolute z-20">
          <Liste_options />
        </div>
      )}
      {showDatePicker && (
        <div className="z-30">
          <DateTimePicker setShowDatePicker={setShowDatePicker} />
        </div>
      )}

      {loadingHistoriqueFilter && (
        <div className="fixed z-10 inset-0 bg-gray-200/50">
          <div className="w-full h-full flex justify-center items-center">
            <div className="border-blue-500 h-20 w-20 animate-spin rounded-full border-8 border-t-gray-100/0" />
          </div>
        </div>
      )}

      <div className="mb-6 md:mt-16">
        <div className="flex relative justify-center items-center gap-3 w-full">
          <Link
            to="/Single_Vehicule_Location"
            className="min-w-10 border rounded-md flex justify-center items-center py-2 bg-orange-50"
          >
            <MdLocationPin className="text-xl text-orange-600 " />
          </Link>
          <select
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
            onChange={handleVehicleChange}
          >
            {/* <option value="" disabled>
              Choisissez une voiture
            </option> */}
            {dataFusionee.map((vehicule, index) => (
              <option key={index} value={vehicule.description}>
                {vehicule.description}
              </option>
            ))}
          </select>
          {/* <div>
            <div
              onClick={() => setshowFilter(!showFilter)}
              className="min-w-10 cursor-pointer border rounded-md flex justify-center items-center py-2 bg-orange-50"
            >
              <FiRefreshCw className="text-xl text-orange-600/70 " />
            </div>
          </div> */}
          <div>
            <div
              onClick={() => setshowFilter(!showFilter)}
              className="min-w-10 cursor-pointer border rounded-md flex justify-center items-center py-2 bg-orange-50"
            >
              <BsFilterRight className="text-2xl text-orange-600 " />
            </div>
          </div>

          {/* <div
            onClick={() => setShowDatePicker(true)}
            className="flex gap-3 min-w-[9.7rem] shadow-md border border-orange-100 rounded-sm p-2 cursor-pointer bg-orange-50"
          >
            <p className="text-md text-gray-500">Filtre par Date</p>
            <MdDateRange className="text-2xl text-orange-600" />
          </div> */}
          {showFilter && (
            <div className="absolute z-20 w-full max-w-80 p-2 flex flex-col  bg-white top-11 rounded-md right-0 shadow-xl border">
              <div
                onClick={() => {setShowDatePicker(true); setshowFilter(false)}}
                className="flex my-3 p-2 rounded-md hover:bg-orange-100/50 cursor-pointer items-center gap-3"
              >
                <MdDateRange className="text-xl text-orange-600" />
                <h3>Filter par Date</h3>
              </div>
              <hr />
              <form action="" className="p-2">
                <div className="flex mb-4 items-center gap-3">
                  <FaCarRear className="text-xl text-orange-600/90" />
                  <h3>Filter par Status</h3>
                </div>
                <div>
                  <div className="flex flex-row mb-1.5 gap-4 ml-0.5">
                    <input
                      id="tout"
                      type="checkbox"
                      checked={checkboxes.tout}
                      onChange={() => handleCheckboxChange("tout")}
                    />
                    <label htmlFor="tout">Tout</label>
                  </div>
                  <div className="flex flex-row mb-1.5 gap-4 ml-0.5">
                    <input
                      id="en_marche"
                      type="checkbox"
                      checked={checkboxes.en_marche}
                      onChange={() => handleCheckboxChange("en_marche")}
                    />
                    <label htmlFor="en_marche">
                      En marche 
                    </label>
                  </div>
                  <div className="flex flex-row mb-1.5 gap-4 ml-0.5">
                    <input
                      id="en_ralenti"
                      type="checkbox"
                      checked={checkboxes.en_ralenti}
                      onChange={() => handleCheckboxChange("en_ralenti")}
                    />
                    <label htmlFor="en_ralenti">
                      En ralenti 
                    </label>
                  </div>
                  <div className="flex flex-row mb-1.5 gap-4 ml-0.5">
                    <input
                      id="en_arret"
                      type="checkbox"
                      checked={checkboxes.en_arret}
                      onChange={() => handleCheckboxChange("en_arret")}
                    />
                    <label htmlFor="en_arret">En arrêt </label>
                  </div>
                  <p
                    onClick={() => setshowFilter(false)}
                    className="border cursor-pointer border-orange-500 text-center text-orange-600 font-semibold rounded-md pt-1 pb-1.5 px-6 mt-5"
                  >
                    Appliquer
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className="py-7 md:pb-0 md:pt-7 md:w-full text-center">
          <h2 className="text-xl md:text-4xl md:mb-4 text-orange-600">
            Historique
          </h2>
          <button onClick={() => {console.log(filterVehiclueHistoriqueDetails().length)}}>test</button>
          <h2 className="text-gray-800 font-semibold text-lg md:text-xl mb-2">
            {currentVehicule?.description}
          </h2>
          {!loadingHistoriqueFilter && <p className="text-gray-500">

           { checkboxes.tout = true && vehiclueHistoriqueDetails?.length  } {checkboxes.tout = true && "resultats"}
          </p>}
        </div>
      </div>


    

      {loadingHistoriqueFilter ? (
        <p className="text-center">Chargement des données...</p>
      ) : filterVehiclueHistoriqueDetails().length > 0 ? (
        filterVehiclueHistoriqueDetails().map((vehicle, index) => {
          const speed = vehicle.speedKPH || 0;

          // Définir les couleurs en fonction de la vitesse
          let main_text_color,
            lite_bg_color,
            active_bg_color,
            imgClass,
            activeTextColor,
            statut,
            vitess_img;
          if (speed < 1) {
            main_text_color = "text-red-900";
            statut = "en arrêt";
            lite_bg_color = "bg-red-100/40";
            activeTextColor = "text-red-900";
            active_bg_color = "bg-red-200/50";
            vitess_img = "img/cars/orange_vitess.png";
            imgClass = "w-14 sm:w-16 md:w-24";
          } else if (speed >= 1 && speed <= 20) {
            main_text_color = "text-[#555b03]";
            statut = "en ralenti";
            lite_bg_color = "bg-[#ffff001b]";
            activeTextColor = "text-[#555b03]";
            active_bg_color = "bg-yellow-400/20";
            vitess_img = "img/cars/yellow_vitess.png";
            imgClass = "w-12 sm:w-14 md:w-20";
          } else {
            main_text_color = "text-green-700";
            statut = "en marche";
            lite_bg_color = "bg-green-100/50";
            activeTextColor = "text-green-800";
            active_bg_color = "bg-green-300/50";
            vitess_img = "img/cars/green_vitess.png";
            imgClass = "w-12 sm:w-14 md:w-20";
          }

          return (
            <div
              onClick={() => {
                setShowListOption(true);
              }}
              key={index}
              className={` ${lite_bg_color} shadow-md rounded-lg p-3`}
            >
              <div className="flex relative gap-3 md:py-6">
                <div className="flex flex-col items-center md:min-w-32">
                  <div className={`${imgClass} mb-2`}>
                    <img src={vitess_img} alt="" />
                  </div>
                  <h2
                    className={`${main_text_color} sm:text-lg md:text-xl font-semibold whitespace-nowrap`}
                  >
                    {parseFloat(speed).toFixed(0)}
                  </h2>
                  <h2
                    className={`${main_text_color} text-[1rem] sm:text-lg md:text-xl font-semibold whitespace-nowrap`}
                  >
                    Km/h
                  </h2>
                </div>
                <div>
                  <div className="flex mb-2 gap-4 text-gray-600 text-md">
                    <div className="flex gap-3 items-center">
                      <FaRegCalendarAlt className="text-gray-500/80" />
                      <h3 className="text-sm sm:text-sm md:text-md">
                        {formatTimestampToDate(vehicle.timestamp)}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1">
                      <IoMdTime className="text-gray-500/80 text-xl" />
                      <h3 className="text-sm sm:text-sm md:text-md">
                        {formatTimestampToTime(vehicle.timestamp)}
                      </h3>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div>
                      <FaCar className="text-gray-500/80" />
                    </div>
                    <span
                      className={` ${active_bg_color} ml-1  ${activeTextColor} pb-[.2rem] px-2 py-0 text-sm rounded-md `}
                    >
                      {statut}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <div>
                      <MdLocationPin className="text-xl text-gray-500/80 -translate-x-0.5 mt-3" />
                    </div>
                    <p className="text-md flex text-gray-600 mt-2 md:text-lg">
                      {vehicle.address || "Adresse non disponible"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p  className="text-center">Aucune donnée disponible</p>
      )}
    </div>
  );
}

export default Historique;
