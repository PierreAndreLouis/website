import React, { useContext, useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
// import { DataContext } from "../../context/DataContext";
import { MdLocationPin } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
// import RapportOptions from "./RapportOptions";
import { IoReload } from "react-icons/io5";
import { DataContext } from "../context/DataContext";
import RapportOptions from "../components/rapport_vehicule/RapportOptions";
import VehiculeActiveMaintenantComponent from "../components/rapport_vehicule/VehiculeActiveMaintenantComponent";
import VehiculeNotActiveAjourdhuiComponent from "../components/rapport_vehicule/VehiculeNotActiveAjourdhuiComponent";
import VehiculeActiveAjourdhuiComponent from "../components/rapport_vehicule/VehiculeActiveAjourdhuiComponent";
import DateTimePicker from "../components/home/DateTimePicker";
import DateInput from "../components/rapport_vehicule/DateInput";
import VehiculeNotActifComponent from "../components/rapport_vehicule/VehiculeNotActifComponent";
// import { IoReload } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { BsFillCalendar2DateFill } from "react-icons/bs";

function RapportPage() {
  const {
    vehicleData,
    rapportvehicleDetails,
    rapportDataLoading,
    firstCallRapportData,
    mergedData,
    isLoading,
    donneeFusionneeForRapport,
    setdonneeFusionneeForRapport,
    vehiculeActiveAjourdhui,
    setVehiculeActiveAjourdhui,
    vehiculeNotActiveAjourdhui,
    setVehiculeNotActiveAjourdhui,
    vehiculeActiveMaintenant,
    setVehiculeActiveMaintenant,
    vehiculeNotActif,
    setVehiculeNotActif,
    setCurrentVehicule,
    setSelectedVehicle,
    setShowListOption,
    currentVehicule,
    showListeOption,
    setRapportDataLoading,
    envoyerSMS,
    smsError,
    firstCallHistoriqueData,
    setShowHistoriqueInMap,
    setVehiclueHistoriqueDetails,
    searchdonneeFusionneeForRapport,
    fetSearchRapportchVehicleDetails,
    setSearchdonneeFusionneeForRapport,
    // setShowListOption,
    // showListeOption,
  } = useContext(DataContext);

  const [showActiveVehiculeNow, setshowActiveVehiculeNow] = useState(false);
  const [showActiveVehicule, setshowActiveVehicule] = useState(false);
  const [showParkingVehicule, setshowParkingVehicule] = useState(false);
  const [showInactiveVehicule, setshowInactiveVehicule] = useState(false);
  const [showChooseDate, setShowChooseDate] = useState(false);
  //
  const [showRapportPupup, setshowRapportPupup] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (vehiculeActiveAjourdhui.length === 0) {
      setshowActiveVehicule(false);
    } else {
      setshowActiveVehicule(true);
    }

    if (vehiculeActiveMaintenant.length === 0) {
      setshowActiveVehiculeNow(false);
    } else {
      setshowActiveVehiculeNow(true);
    }

    if (vehiculeNotActiveAjourdhui.length === 0) {
      setshowParkingVehicule(false);
    } else {
      setshowParkingVehicule(true);
    }

    if (vehiculeNotActif.length === 0) {
      setshowInactiveVehicule(false);
    } else {
      setshowInactiveVehicule(true);
    }
  }, [
    vehiculeActiveAjourdhui,
    vehiculeNotActiveAjourdhui,
    vehiculeActiveMaintenant,
    vehiculeNotActif,
  ]);

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

  const handleClick = (vehicle) => {
    setCurrentVehicule(vehicle);
    setSelectedVehicle(vehicle.deviceID);
    // setSelectedVehicle(vehicle);  // Ajouter cette ligne
    // setShowListOption(true);
    console.log("Véhicule en variable_________________", currentVehicule);
    console.log("Véhicule cliqué_____________________", vehicle);
  };

  const [selectedDate, setSelectedDate] = useState(""); // Date sélectionnée

  // Fonction pour formater la date sélectionnée
  const formatDate = (dateInput) => {
    if (!dateInput) {
      // Si la date est vide, afficher Aujourd'hui
      const today = new Date();
      return "Rapport Vehicule";
    }

    const selected = new Date(dateInput + "T00:00:00");
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Vérifier si la date correspond à Aujourd'hui
    if (selected.toDateString() === today.toDateString()) {
      return "Aujourd'hui";
    }

    // Vérifier si la date correspond à Hier
    if (selected.toDateString() === yesterday.toDateString()) {
      return "Hier";
    }

    // Sinon, formater la date normalement
    return selected.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Gestion de la soumission
  const handleApply = (e) => {
    e.preventDefault();
    setShowChooseDate(false);
    setRapportDataLoading(true);
    const startTime = "00:00:00";
    const endTime = "23:59:59";

    const timeFrom = `${selectedDate} ${startTime}`;
    const timeTo = `${selectedDate} ${endTime}`;

    if (vehicleData && vehicleData.length > 0) {
      vehicleData.forEach((vehicle) => {
        fetSearchRapportchVehicleDetails(vehicle.deviceID, timeFrom, timeTo);
        console.log("Call the function with:", timeFrom, timeTo);
      });
    }
  };

  return (
    <div className="mb-56 mt-[8rem]">
      {showRapportPupup && (
        <RapportOptions
          setshowRapportPupup={setshowRapportPupup}
          currentVehicule={currentVehicule}
          formatTimestampToTime={formatTimestampToTime}
          envoyerSMS={envoyerSMS}
          smsError={smsError}
          firstCallHistoriqueData={firstCallHistoriqueData}
          setShowHistoriqueInMap={setShowHistoriqueInMap}
          setVehiclueHistoriqueDetails={setVehiclueHistoriqueDetails}
        />
      )}
      {rapportDataLoading && (
        <div className="fixed z-30 inset-0 bg-gray-200/50 dark:bg-gray-900/50">
          <div className="w-full h-full flex justify-center items-center">
            <div className="border-blue-500 h-20 w-20 animate-spin rounded-full border-8 border-t-gray-100/0" />
          </div>
        </div>
      )}
      <div className="mt-[4.5rem]">
        <div className=" overflow-hidden">
          <div className={` transition-all `}>
            {/* ------------------- */}

            {/* Rapport des vehicule */}
            <div className=" w-full sm:px-6 md:px-20 px-4">
              <h1
                onClick={() => {
                  firstCallRapportData();
                }}
                className="font-semibold dark:text-gray-200 text-center mx-4 mb-10 text-xl"
              >
                {formatDate(selectedDate)}
              </h1>

              <div className="flex gap-2 justify-end mb-4 ">
                <button
                  className="bg-orange-50 dark:bg-gray-700 py-1.5 shadow-lg rounded-lg px-3"
                  onClick={() => {
                    setSearchdonneeFusionneeForRapport([]);
                    setRapportDataLoading(true);
                    firstCallRapportData();
                  }}
                >
                  <IoReload className="text-orange-600 text-xl" />
                </button>
                <button
                  className="bg-orange-50 dark:bg-gray-700 shadow-lg rounded-lg px-3"
                  onClick={() => {
                    setShowChooseDate(true);
                  }}
                >
                  <BsFillCalendar2DateFill className="text-orange-600 text-xl" />
                </button>
              </div>

              {showChooseDate && (
                <form
                  onSubmit={handleApply}
                  className="fixed z-10 inset-0 flex justify-center items-center bg-black/50"
                >
                  <div className="border relative flex-col bg-orange-50 dark:bg-gray-800 w-full max-w-[25rem] mx-4 rounded-lg px-4 pl-2 py-1 flex gap-4 shadow-lg">
                    <IoClose
                      onClick={() => {
                        setShowChooseDate(false);
                      }}
                      className="absolute top-4 right-4 text-xl text-red-500 dark:text-red-400 cursor-pointer"
                    />

                    <h2 className="pt-4 pl-4 text-gray-900 dark:text-gray-100">
                      Choisissez une date :
                    </h2>
                    {/* <p> {formatDate(selectedDate)}</p> */}
                    <label className="px-4">
                      <input
                        className="focus:outline-none bg-black/0 border p-2 rounded-lg w-full bg-gray-50 dark:bg-gray-400  dark:border-gray-600 dark:text-gray-200--"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                    </label>
                    <div className="flex mx-4 mb-4">
                      {selectedDate ? (
                        <button
                          className="cursor-pointer font-semibold text-gray-100 px-8 py-1 rounded-md bg-orange-500 dark:bg-orange-600"
                          type="submit"
                        >
                          Rechercher
                        </button>
                      ) : (
                        <div className="cursor-default font-semibold text-gray-100 px-8 py-1 rounded-md bg-orange-500 dark:bg-orange-600">
                          Rechercher
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              )}

              <VehiculeActiveMaintenantComponent
                showActiveVehiculeNow={showActiveVehiculeNow}
                setshowActiveVehiculeNow={setshowActiveVehiculeNow}
                vehiculeActiveMaintenant={vehiculeActiveMaintenant}
                setshowRapportPupup={setshowRapportPupup}
                formatTimestampToDate={formatTimestampToDate}
                formatTimestampToTime={formatTimestampToTime}
                handleClick={handleClick}
              />

              {/* ----------------------------------- */}

              <VehiculeActiveAjourdhuiComponent
                showActiveVehicule={showActiveVehicule}
                setshowActiveVehicule={setshowActiveVehicule}
                vehiculeActiveAjourdhui={vehiculeActiveAjourdhui}
                setshowRapportPupup={setshowRapportPupup}
                formatTimestampToDate={formatTimestampToDate}
                formatTimestampToTime={formatTimestampToTime}
                handleClick={handleClick}
              />

              {/* ----------------------------------- */}

              <VehiculeNotActiveAjourdhuiComponent
                showParkingVehicule={showParkingVehicule}
                setshowParkingVehicule={setshowParkingVehicule}
                vehiculeNotActiveAjourdhui={vehiculeNotActiveAjourdhui}
                setshowRapportPupup={setshowRapportPupup}
                formatTimestampToDate={formatTimestampToDate}
                formatTimestampToTime={formatTimestampToTime}
                handleClick={handleClick}
              />

              {/* ----------------------------------- */}

              <VehiculeNotActifComponent
                showInactiveVehicule={showInactiveVehicule}
                setshowInactiveVehicule={setshowInactiveVehicule}
                vehiculeNotActif={vehiculeNotActif}
                setshowRapportPupup={setshowRapportPupup}
                formatTimestampToDate={formatTimestampToDate}
                formatTimestampToTime={formatTimestampToTime}
                handleClick={handleClick}
              />

              {/* ----------------------------------- */}
            </div>

            {/* ------------------- */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RapportPage;
