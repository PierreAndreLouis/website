import React, { useContext, useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { DataContext } from "../../context/DataContext";
import { MdLocationPin } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import RapportOptions from "../rapport_vehicule/RapportOptions";
import { IoReload } from "react-icons/io5";
import Liste_options from "./Liste_options";

function RapportVehicule() {
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
  } = useContext(DataContext);

  const [showActiveVehiculeNow, setshowActiveVehiculeNow] = useState(false);
  const [showActiveVehicule, setshowActiveVehicule] = useState(false);
  const [showParkingVehicule, setshowParkingVehicule] = useState(false);
  const [showInactiveVehicule, setshowInactiveVehicule] = useState(false);
  //
  const [showRapportPupup, setshowRapportPupup] = useState(false);

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
    console.log("Véhicule en variable", currentVehicule);
    console.log("Véhicule cliqué", vehicle);
  };



  return (
    <div className="mb-56 mt-[8rem]">
   
      {showListeOption && <Liste_options />}
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
              <h1 className="font-semibold text-center mx-4 mb-16 text-xl">
                Rapport sur les vehicules <br /> Aujourd'hui
                <br />
                <br />
                <span
                  onClick={() => {
                    {
                      setRapportDataLoading(true);
                      firstCallRapportData();
                    }
                  }}
                  className="flex justify-between items-center w-[8rem] mx-auto font-normal text-[1rem] shadow-lg px-4 py-0.5 cursor-pointer bg-orange-100 rounded-md"
                >
                  Rafraichir <IoReload className=" text-md" />
                </span>
              </h1>

              <div className="transition-all">
                <div
                  className="flex gap-4 justify-between items-center px-4 cursor-pointer bg-gray-100 text-gray-700 p-2 mb-3 font-semibold rounded-md"
                  onClick={() => {
                    setshowActiveVehiculeNow(!showActiveVehiculeNow);
                  }}
                >
                  <h2>Vehicules en mouvement actuellement:</h2>
                  <FaChevronDown
                    className={`${
                      showActiveVehiculeNow ? "rotate-180" : "rotate-0"
                    } transition-all`}
                  />
                </div>
                <div
                  onClick={() => {
                    // setshowRapportPupup(true);
                  }}
                  className={` ${
                    showActiveVehiculeNow
                      ? "max-h-[100rem] pb-14 overflow-y-auto transition-all"
                      : "max-h-[0rem] transition-all"
                  } flex   overflow-hidden flex-col gap-4 transition-all `}
                >
                  {/* {vehiculeNotActiveAjourdhui?.length > 0 ? (
                    vehiculeNotActiveAjourdhui?.map((vehicule, index) => { */}
                  {vehiculeActiveMaintenant?.length > 0 ? (
                    vehiculeActiveMaintenant?.map((vehicule, index) => {
                      return (
                        <div
                          onClick={() => {
                            handleClick(vehicule);
                            setshowRapportPupup(true);
                          }}
                          className="bg-white"
                        >
                          <div
                            className={` bg-green-100/20 shadow-md rounded-lg p-3`}
                          >
                            <div className="flex items-stretch relative gap-3 md:py-6--">
                              <div className="flex justify-center border-2 md:pt-6 md:pb-8 bg-green-100 border-white shadow-md shadow-green-200 rounded-md p-2 flex-col items-center md:min-w-32">
                                <div className="">
                                  <img
                                    className="min-w-[4.5rem] max-w-[4.5rem] sm:max-w-[6.5rem]"
                                    src="/img/home_icon/active.png"
                                    alt=""
                                  />
                                </div>
                              </div>

                              <div>
                                <h2
                                  className={`text-green-800 text-gray-800-- font-semibold text-md md:text-xl mb-2 `}
                                >
                                  {vehicule?.description || "non disponible"}
                                </h2>
                                <div className="flex mb-2 gap-4 text-gray-600 text-md">
                                  <div className="flex gap-3 items-center">
                                    <FaRegCalendarAlt className="text-gray-500/80" />
                                    <h3 className="text-sm sm:text-sm md:text-md">
                                      {formatTimestampToDate(
                                        vehicule?.vehiculeDetails[0]?.timestamp
                                      )}
                                    </h3>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <IoMdTime className="text-gray-500/80 text-xl" />
                                    <h3 className="text-sm sm:text-sm md:text-md">
                                      {formatTimestampToTime(
                                        vehicule.vehiculeDetails?.[0]
                                          ?.timestamp || 0
                                      )}
                                    </h3>
                                  </div>
                                </div>

                                {/* <div className="flex gap-2 items-center">
                                  <div>
                                    <MdOutlineSpeed className="text-gray-500/80 text-lg mb-1.5" />
                                  </div>
                                  <span
                                    className={`  text-gray-700 pb-[.42rem] px-1 py-0 text-sm rounded-md `}
                                  >
                                    {vehicule.vehiculeDetails[0]?.speedKPH} km/h
                                  </span>
                                </div> */}

                                <div className="flex gap-2 items-center">
                                  <div>
                                    <FaCar className="text-gray-500/80" />
                                  </div>
                                  <span
                                    className={` bg-green-300/20 ml-1  text-green-800 pb-[.2rem] px-2 py-0 text-sm rounded-md `}
                                  >
                                    En deplacement
                                  </span>
                                </div>

                                <div className="hidden sm:flex gap-1">
                                  <div>
                                    <MdLocationPin className="text-xl text-gray-500/80 -translate-x-0.5 mt-3" />
                                  </div>

                                  <p className="text-md felx sm:flex text-gray-600 mt-2 md:text-lg">
                                    {vehicule.vehiculeDetails[0]?.address ||
                                      "adresse non disponible"}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-1 sm:hidden">
                              <p className="text-md felx sm:flex text-gray-600 mt-2 md:text-lg">
                                <span className="text-green-700 font-bold ">
                                  Adresse :{" "}
                                </span>
                                {vehicule.vehiculeDetails[0]?.address ||
                                  "adresse non disponible"}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-center">
                      Pas de vehicule actif maintenant
                    </p>
                  )}
                </div>
              </div>

              {/* ----------------------------------- */}
              {/* ----------------------------------- */}
              {/* ----------------------------------- */}

              <div className="transition-all">
                <div
                  className="flex gap-4 justify-between items-center px-4 cursor-pointer bg-gray-100 text-gray-700 p-2 mb-3 font-semibold rounded-md"
                  onClick={() => {
                    setshowActiveVehicule(!showActiveVehicule);
                  }}
                >
                  <h2>Vehicules en mouvement aujourd'hui:</h2>
                  <FaChevronDown
                    className={`${
                      showActiveVehicule ? "rotate-180" : "rotate-0"
                    } transition-all`}
                  />
                </div>
                <div
                  onClick={() => {
                    // setshowRapportPupup(true);
                  }}
                  className={` ${
                    showActiveVehicule
                      ? "max-h-[100rem] pb-14 overflow-y-auto transition-all"
                      : "max-h-[0rem] transition-all"
                  } flex   overflow-hidden flex-col gap-4 transition-all `}
                >
                  {/* {vehiculeNotActiveAjourdhui?.length > 0 ? (
                    vehiculeNotActiveAjourdhui?.map((vehicule, index) => { */}
                  {vehiculeActiveAjourdhui?.length > 0 ? (
                    vehiculeActiveAjourdhui?.map((vehicule, index) => {
                      return (
                        <div
                          onClick={() => {
                            handleClick(vehicule);
                            setshowRapportPupup(true);
                          }}
                          className="bg-white"
                        >
                          <div
                            className={` bg-green-100/20 shadow-md rounded-lg p-3`}
                          >
                            <div className="flex items-stretch relative gap-3 md:py-6--">
                              <div className="flex justify-center border-2 md:pt-6 md:pb-8 bg-green-100 border-white shadow-md shadow-green-200 rounded-md p-2 flex-col items-center md:min-w-32">
                                <div className="">
                                  <img
                                    className="min-w-[4.5rem] max-w-[4.5rem] sm:max-w-[6.5rem]"
                                    src="/img/home_icon/active.png"
                                    alt=""
                                  />
                                </div>
                              </div>

                              <div>
                                <h2
                                  className={`text-green-800 text-gray-800-- font-semibold text-md md:text-xl mb-2 `}
                                >
                                  {vehicule?.description || "non disponible"}
                                </h2>
                                <div className="flex mb-2 gap-4 text-gray-600 text-md">
                                  <div className="flex gap-3 items-center">
                                    <FaRegCalendarAlt className="text-gray-500/80" />
                                    <h3 className="text-sm sm:text-sm md:text-md">
                                      {formatTimestampToDate(
                                        vehicule?.vehiculeDetails[0]?.timestamp
                                      )}
                                    </h3>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <IoMdTime className="text-gray-500/80 text-xl" />
                                    <h3 className="text-sm sm:text-sm md:text-md">
                                      {formatTimestampToTime(
                                        vehicule.vehiculeDetails?.[0]
                                          ?.timestamp || 0
                                      )}
                                    </h3>
                                  </div>
                                </div>

                                {/* <div className="flex gap-2 items-center">
                                  <div>
                                    <MdOutlineSpeed className="text-gray-500/80 text-lg mb-1.5" />
                                  </div>
                                  <span
                                    className={`  text-gray-700 pb-[.42rem] px-1 py-0 text-sm rounded-md `}
                                  >
                                    {vehicule.vehiculeDetails[0]?.speedKPH} km/h
                                  </span>
                                </div> */}

                                <div className="flex gap-2">
                                  <div>
                                    <FaCar className="text-gray-500/80" />
                                  </div>
                                  <span
                                    className={` bg-green-300/20 ml-1  text-green-800 pb-[.2rem] px-2 py-0 text-sm rounded-md `}
                                  >
                                    En deplacement
                                  </span>
                                </div>

                                <div className="hidden sm:flex gap-1">
                                  <div>
                                    <MdLocationPin className="text-xl text-gray-500/80 -translate-x-0.5 mt-3" />
                                  </div>

                                  <p className="text-md felx sm:flex text-gray-600 mt-2 md:text-lg">
                                    {vehicule.vehiculeDetails[0]?.address ||
                                      "adresse non disponible"}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-1 sm:hidden">
                              <p className="text-md felx sm:flex text-gray-600 mt-2 md:text-lg">
                                <span className="text-green-700 font-bold ">
                                  Adresse :{" "}
                                </span>
                                {vehicule.vehiculeDetails[0]?.address ||
                                  "adresse non disponible"}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-center">
                      Pas de vehicule actif ajourd'hui
                    </p>
                  )}
                </div>
              </div>

              {/* ----------------------------------- */}
              {/* ----------------------------------- */}
              {/* ----------------------------------- */}

              <div className="transition-all">
                <div
                  onClick={() => {
                    setshowParkingVehicule(!showParkingVehicule);
                  }}
                  className="flex gap-4  justify-between items-center px-4 cursor-pointer bg-gray-100 text-gray-700 p-2 mb-3 font-semibold rounded-md"
                >
                  <h2>Vehicules en Stationnement aujourd'hui:</h2>
                  <FaChevronDown
                    className={`${
                      showParkingVehicule ? "rotate-180" : "rotate-0"
                    } transition-all`}
                  />
                </div>

                <div
                  onClick={() => {
                    // setshowRapportPupup(true);
                  }}
                  className={` ${
                    showParkingVehicule
                      ? "max-h-[100rem] pb-14 overflow-y-auto transition-all"
                      : "max-h-[0rem] transition-all"
                  } flex   overflow-hidden flex-col gap-4 transition-all `}
                >
                  {vehiculeNotActiveAjourdhui?.length > 0 ? (
                    vehiculeNotActiveAjourdhui?.map((vehicule, index) => {
                      return (
                        <div
                          onClick={() => {
                            handleClick(vehicule);
                            setshowRapportPupup(true);
                          }}
                          key={index}
                          className="bg-white"
                        >
                          <div
                            className={` bg-red-100/20 shadow-md rounded-lg p-3`}
                          >
                            <div className="flex items-stretch relative gap-3 md:py-6--">
                              <div className="flex justify-center border-2 md:pt-6 md:pb-8 bg-red-200/40 border-white shadow-md shadow-red-200 rounded-md p-2 flex-col items-center md:min-w-32">
                                <div className="">
                                  <img
                                    className="min-w-[4.5rem] max-w-[4.5rem] px-2 sm:max-w-[6.5rem]"
                                    src="/img/home_icon/rapport_parking2.png"
                                    alt=""
                                  />
                                </div>
                              </div>

                              <div>
                                <h2
                                  className={`text-red-800 text-gray-800-- font-semibold text-md md:text-xl mb-2 `}
                                >
                                  {vehicule?.description || "non disponible"}
                                </h2>
                                <div className="flex mb-2 gap-4 text-gray-600 text-md">
                                  <div className="flex gap-3 items-center">
                                    <FaRegCalendarAlt className="text-gray-500/80" />
                                    <h3 className="text-sm sm:text-sm md:text-md">
                                      {formatTimestampToDate(
                                        vehicule?.vehiculeDetails[0]?.timestamp
                                      )}
                                    </h3>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <IoMdTime className="text-gray-500/80 text-xl" />
                                    <h3 className="text-sm sm:text-sm md:text-md">
                                      {formatTimestampToTime(
                                        vehicule.vehiculeDetails?.[0]
                                          ?.timestamp || 0
                                      )}
                                    </h3>
                                  </div>
                                </div>

                                {/* <div className="flex gap-2 items-center">
                                  <div>
                                    <MdOutlineSpeed className="text-gray-500/80 text-lg mb-1.5" />
                                  </div>
                                  <span
                                    className={`  text-gray-700 pb-[.42rem] px-1 py-0 text-sm rounded-md `}
                                  >
                                    {vehicule.vehiculeDetails[0]?.speedKPH} km/h
                                  </span>
                                </div> */}

                                <div className="flex gap-2 items-center">
                                  <div>
                                    <FaCar className="text-gray-500/80" />
                                  </div>
                                  <span
                                    className={` bg-red-300/20 ml-1  text-red-800 pb-[.2rem] px-2 py-0 text-sm rounded-md `}
                                  >
                                    En Stationnement
                                  </span>
                                </div>

                                <div className="hidden sm:flex gap-1">
                                  <div>
                                    <MdLocationPin className="text-xl text-gray-500/80 -translate-x-0.5 mt-3" />
                                  </div>

                                  <p className="text-md felx sm:flex text-gray-600 mt-2 md:text-lg">
                                    {vehicule.vehiculeDetails[0]?.address ||
                                      "adresse non disponible"}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-1 sm:hidden">
                              <p className="text-md felx sm:flex text-gray-600 mt-2 md:text-lg">
                                <span className="text-red-700 font-bold ">
                                  Adresse :{" "}
                                </span>
                                {vehicule.vehiculeDetails[0]?.address ||
                                  "adresse non disponible"}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-center">
                      Pas de vehicule en stationnement ajourd'hui
                    </p>
                  )}
                </div>
              </div>

              {/* ----------------------------------- */}
              {/* ----------------------------------- */}
              {/* ----------------------------------- */}
              <div className="transition-all">
                <div
                  onClick={() => {
                    setshowInactiveVehicule(!showInactiveVehicule);
                  }}
                  className="flex gap-4 justify-between items-center px-4 cursor-pointer bg-gray-100 text-gray-700 p-2 mb-3 font-semibold rounded-md"
                >
                  <h2>Vehicules hors service :</h2>
                  <FaChevronDown
                    className={`${
                      showInactiveVehicule ? "rotate-180" : "rotate-0"
                    } transition-all`}
                  />
                </div>

                <div
                  onClick={() => {
                    // setshowRapportPupup(true);
                  }}
                  className={` ${
                    showInactiveVehicule
                      ? "max-h-[100rem] pb-14 overflow-y-auto transition-all"
                      : "max-h-[0rem] transition-all"
                  } flex   overflow-hidden flex-col gap-4 transition-all `}
                >
                  {/* {vehiculeNotActiveAjourdhui?.length > 0 ? (
                    vehiculeNotActiveAjourdhui?.map((vehicule, index) => { */}
                  {vehiculeNotActif?.length > 0 ? (
                    vehiculeNotActif?.map((vehicule, index) => {
                      return (
                        <div
                          onClick={() => {
                            handleClick(vehicule);
                            setshowRapportPupup(true);
                          }}
                          className="bg-white"
                        >
                          <div
                            className={` bg-purple-100/30 shadow-md rounded-lg p-3`}
                          >
                            <div className="flex items-stretch relative gap-3 md:py-6--">
                              <div className="flex justify-center border-2 md:pt-6 md:pb-8 bg-purple-200 border-white shadow-md shadow-purple-200 rounded-md p-2 flex-col items-center md:min-w-32">
                                <div className="">
                                  <img
                                    className="min-w-[4.5rem] max-w-[4.5rem] px-2 sm:max-w-[6.5rem]"
                                    src="/img/home_icon/payer.png"
                                    alt=""
                                  />
                                </div>
                              </div>

                              <div>
                                <h2
                                  className={`text-purple-900 text-gray-800-- font-semibold text-md md:text-xl mb-2 `}
                                >
                                  {vehicule?.description || "non disponible"}
                                </h2>
                                <div className="flex mb-2 gap-4 text-gray-600 text-md">
                                  <div className="flex gap-3 items-center">
                                    <FaRegCalendarAlt className="text-gray-500/80" />
                                    <h3 className="text-sm sm:text-sm md:text-md">
                                      {formatTimestampToDate(
                                        vehicule?.vehiculeDetails[0]?.timestamp
                                      )}
                                    </h3>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <IoMdTime className="text-gray-500/80 text-xl" />
                                    <h3 className="text-sm sm:text-sm md:text-md">
                                      {formatTimestampToTime(
                                        vehicule.vehiculeDetails?.[0]
                                          ?.timestamp || 0
                                      )}
                                    </h3>
                                  </div>
                                </div>

                                {/* <div className="flex gap-2 items-center">
                                  <div>
                                    <MdOutlineSpeed className="text-gray-500/80 text-lg mb-1.5" />
                                  </div>
                                  <span
                                    className={`  text-gray-700 pb-[.42rem] px-1 py-0 text-sm rounded-md `}
                                  >
                                    {vehicule.vehiculeDetails[0]?.speedKPH} km/h
                                  </span>
                                </div> */}

                                <div className="flex gap-2">
                                  <div>
                                    <FaCar className="text-gray-500/80" />
                                  </div>
                                  <span
                                    className={` bg-purple-300/50 ml-1  text-purple-800 pb-[.2rem] px-2 py-0 text-sm rounded-md `}
                                  >
                                    Inactif
                                  </span>
                                </div>

                                <div className="hidden sm:flex gap-1">
                                  <div>
                                    <MdLocationPin className="text-xl text-gray-500/80 -translate-x-0.5 mt-3" />
                                  </div>

                                  <p className="text-md felx sm:flex text-gray-600 mt-2 md:text-lg">
                                    {vehicule.vehiculeDetails[0]?.address ||
                                      "adresse non disponible"}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-1 sm:hidden">
                              <p className="text-md felx sm:flex text-gray-600 mt-2 md:text-lg">
                                <span className="text-purple-800 font-bold ">
                                  Adresse :{" "}
                                </span>
                                {vehicule.vehiculeDetails[0]?.address ||
                                  "adresse non disponible"}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-center">
                      Pas de vehicule en hors service
                    </p>
                  )}
                </div>
              </div>
              {/* ----------------------------------- */}
              {/* ----------------------------------- */}
              {/* ----------------------------------- */}
            </div>
            

            {/* ------------------- */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RapportVehicule;
