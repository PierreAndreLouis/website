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
    // setShowListOption,
    // showListeOption,
  } = useContext(DataContext);

  const [showActiveVehiculeNow, setshowActiveVehiculeNow] = useState(false);
  const [showActiveVehicule, setshowActiveVehicule] = useState(false);
  const [showParkingVehicule, setshowParkingVehicule] = useState(false);
  const [showInactiveVehicule, setshowInactiveVehicule] = useState(false);
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
        <div className="fixed z-30 inset-0 bg-gray-200/50">
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
            <div className="min-w-[100vw w-full sm:px-6 md:px-20 px-4">
              <h1 className="font-semibold text-center mx-4 mb-10 text-xl">
                {formatDate(selectedDate)}
              </h1>

              <form className="flex justify-end mb-4 " onSubmit={handleApply}>
                <div className="border rounded-lg px-4 py-2 flex gap-4 items-center shadow-lg">
                  <label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </label>
                  {selectedDate ? (
                    <button
                      className="font-semibold text-orange-500"
                      type="submit"
                    >
                      Appliquer
                    </button>
                  ) : (
                    <div
                      className="cursor-default font-semibold text-orange-500"
                      type="submit"
                    >
                      Appliquer
                    </div>
                  )}
                </div>
              </form>

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

              <VehiculeNotActiveAjourdhuiComponent
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
