import React, { useContext, useState } from "react";

import { IoTimeOutline } from "react-icons/io5";
import { GiPathDistance } from "react-icons/gi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";

import { IoClose } from "react-icons/io5";
import { MdOutlineFullscreen } from "react-icons/md";
import { BsTable } from "react-icons/bs";
import { RiPinDistanceLine } from "react-icons/ri";
import { SlSpeedometer } from "react-icons/sl";
import MapComponent from "../location_vehicule/MapComponent";
import { DataContext } from "../../context/DataContext";
import VehiculeActiveAjourdhuiComponent from "../rapport_vehicule/VehiculeActiveAjourdhuiComponent";
import VehiculeNotActiveAjourdhuiComponent from "../rapport_vehicule/VehiculeNotActiveAjourdhuiComponent";
import VehiculeNotActifComponent from "../rapport_vehicule/VehiculeNotActifComponent";

function RapportGroupe({
  formattedDate, // Date formatée pour l'affichage
  currentdataFusionnee, // Liste des véhicules
  vehiculeActiveAjourdhui, // Véhicules actifs aujourd'hui
  vehiculeNotActiveAjourdhui, // Véhicules en stationnement aujourd'hui
  vehiculeNotActif, // Véhicules hors service
  earliestVehicle, // Premier véhicule en mouvement
  latestVehicle, // Dernier véhicule en mouvement
  selectUTC, // Option pour formater l'heure en UTC
  formatTimestampToTime, // Fonction pour formater le timestamp
  formatTimestampToTimeWithTimezone, // Fonction pour formater avec timezone
  result, // Résultats pour le temps d'activité
  result2, // Résultats pour les distances parcourues
  result3, // Résultats pour les arrêts
  result5, // Résultats pour la vitesse
  zoomPosition, // État pour la position zoomée de la carte
  setzoomPosition, // Fonctio
  activePeriods,
  movingTimes,
}) {
  const {
    loadingHistoriqueFilter,
    setShowListOption,
    vehiclueHistoriqueDetails,
    setVehiclueHistoriqueDetails,
    currentVehicule,
  } = useContext(DataContext); // const { currentVehicule } = useContext(DataContext);

  const [voirPlus, setvoirPlus] = useState(false);

  const formatTime = (hours, minutes, seconds) => {
    if (hours > 0 || minutes > 0 || seconds > 0) {
      return `${hours > 0 ? hours + "h " : ""}${
        minutes > 0 ? minutes + "m " : ""
      }${seconds > 0 ? seconds + "s" : ""}`;
    }
    return "0s";
  };

  const donneeVehiculeDetails = currentdataFusionnee.find(
    (vehicule) =>
      vehicule.vehiculeDetails && vehicule.vehiculeDetails.length > 0
  )?.vehiculeDetails;

  const premierDetail =
    donneeVehiculeDetails[donneeVehiculeDetails.length - 1].timestamp;
  const dernierDetails = donneeVehiculeDetails[0].timestamp;

  // Trouver la date du rapport
  // Trouver la date du rapport
  const timestampInSecondsDebut = premierDetail;

  const dateObjectDebut = new Date(timestampInSecondsDebut * 1000);

  // Récupérer le jour, le mois et l'année séparément
  const jourDebut = dateObjectDebut.getUTCDate(); // Obtenir le jour
  const moisDebut = dateObjectDebut.toLocaleString("fr-FR", { month: "long" }); // Obtenir le mois en toutes lettres
  const anneeDebut = dateObjectDebut.getFullYear(); // Obtenir l'année

  // Trouver la date du rapport
  const timestampInSecondsFin = dernierDetails;

  const dateObjectFin = new Date(timestampInSecondsFin * 1000);

  // Récupérer le jour, le mois et l'année séparément
  const jourFin = dateObjectFin.getUTCDate(); // Obtenir le jour
  const moisFin = dateObjectFin.toLocaleString("fr-FR", { month: "long" }); // Obtenir le mois en toutes lettres
  const anneeFin = dateObjectFin.getFullYear(); // Obtenir l'année

  const [showActiveVehicule, setshowActiveVehicule] = useState(true);
  const [showParkingVehicule, setshowParkingVehicule] = useState(true);
  const [showInactiveVehicule, setshowInactiveVehicule] = useState(true);
  const [voirVehiculeListePupup, setvoirVehiculeListePupup] = useState(false);
  const [defineVehiculeListePupup, setdefineVehiculeListePupup] =
    useState("tous");
  const [nothing, setnothing] = useState(false);
  function formatTimestampToDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  }

  const doNothing = () => {
    console.log("");
  };

  const [trajetVehiculePupup, settrajetVehiculePupup] = useState(false);
  const [tableDeplacement, settableDeplacement] = useState(false);
  const [tableDistance, settableDistance] = useState(false);
  const [tableActivite, settableActivite] = useState(false);
  const [tablevitesse, settablevitesse] = useState(false);
  const [tableTrajet, settableTrajet] = useState(false);

  return (
    <>
      <div className=" px-4 pb-20 md:max-w-[80vw] w-full">
        {voirVehiculeListePupup && (
          <div className="fixed z-[9999999999] inset-0 px-2 flex justify-center items-center bg-black/50">
            <div className="bg-white dark:bg-gray-800 rounded-lg pt-3 w-[97vw]  px-2">
              <div className="flex justify-end ">
                <IoClose
                  onClick={() => {
                    setvoirVehiculeListePupup(false);
                  }}
                  className="cursor-pointer text-3xl text-red-500"
                />
              </div>
              <div className="relative h-[80vh] pt-6 rounded-lg overflow-auto bg-white-- md:px-[10vw]">
                {defineVehiculeListePupup === "active" && (
                  <VehiculeActiveAjourdhuiComponent
                    showActiveVehicule={showActiveVehicule}
                    setshowActiveVehicule={setshowActiveVehicule}
                    vehiculeActiveAjourdhui={vehiculeActiveAjourdhui}
                    setshowRapportPupup={setnothing}
                    formatTimestampToDate={formatTimestampToDate}
                    formatTimestampToTime={formatTimestampToTime}
                    handleClick={doNothing}
                    selectUTC={selectUTC}
                  />
                )}
                {/*  */}
                {defineVehiculeListePupup === "notactive" && (
                  <VehiculeNotActiveAjourdhuiComponent
                    showParkingVehicule={showParkingVehicule}
                    setshowParkingVehicule={setshowParkingVehicule}
                    vehiculeNotActiveAjourdhui={vehiculeNotActiveAjourdhui}
                    setshowRapportPupup={setnothing}
                    formatTimestampToDate={formatTimestampToDate}
                    formatTimestampToTime={formatTimestampToTime}
                    handleClick={doNothing}
                    selectUTC={selectUTC}
                  />
                )}
                {/* ----------------------------------- */}
                {defineVehiculeListePupup === "hors_service" && (
                  <VehiculeNotActifComponent
                    showInactiveVehicule={showInactiveVehicule}
                    setshowInactiveVehicule={setshowInactiveVehicule}
                    vehiculeNotActif={vehiculeNotActif}
                    setshowRapportPupup={setnothing}
                    formatTimestampToDate={formatTimestampToDate}
                    formatTimestampToTime={formatTimestampToTime}
                    handleClick={doNothing}
                  />
                )}
                {defineVehiculeListePupup === "tous" && (
                  <div>
                    <VehiculeActiveAjourdhuiComponent
                      showActiveVehicule={showActiveVehicule}
                      setshowActiveVehicule={setshowActiveVehicule}
                      vehiculeActiveAjourdhui={vehiculeActiveAjourdhui}
                      setshowRapportPupup={setnothing}
                      formatTimestampToDate={formatTimestampToDate}
                      formatTimestampToTime={formatTimestampToTime}
                      handleClick={doNothing}
                      selectUTC={selectUTC}
                    />
                    <VehiculeNotActiveAjourdhuiComponent
                      showParkingVehicule={showParkingVehicule}
                      setshowParkingVehicule={setshowParkingVehicule}
                      vehiculeNotActiveAjourdhui={vehiculeNotActiveAjourdhui}
                      setshowRapportPupup={setnothing}
                      formatTimestampToDate={formatTimestampToDate}
                      formatTimestampToTime={formatTimestampToTime}
                      handleClick={doNothing}
                      selectUTC={selectUTC}
                    />
                    <VehiculeNotActifComponent
                      showInactiveVehicule={showInactiveVehicule}
                      setshowInactiveVehicule={setshowInactiveVehicule}
                      vehiculeNotActif={vehiculeNotActif}
                      setshowRapportPupup={setnothing}
                      formatTimestampToDate={formatTimestampToDate}
                      formatTimestampToTime={formatTimestampToTime}
                      handleClick={doNothing}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* <RapportOptions /> */}

        {trajetVehiculePupup && (
          <div className="flex hidden-- z-[499999999990] justify-center items-center px-4 fixed inset-0 bg-black/50">
            <div className="bg-white  rounded-lg p-3--">
              <div className="flex justify-between px-4 pt-3">
                <h2 className="text-xl font-bold">Trajet du vehicule</h2>
                <IoClose
                  onClick={() => {
                    settrajetVehiculePupup(false);
                  }}
                  className="cursor-pointer text-3xl text-red-500"
                />
              </div>
              <div className=" overflow-auto w-[95vw] p-3  max-h-[70vh]">
                <div className="min-h-[60vh] overflow-auto w-full text-left dark:bg-gray-800 dark:text-gray-200">
                  <p className="text-center">Trajet du vehicule ici...</p>
                </div>{" "}
              </div>
            </div>
          </div>
        )}

        {tableDeplacement && (
          <div className="flex hidden-- z-[499999999990] justify-center items-center px-4 fixed inset-0 bg-black/50">
            <div className="bg-white  rounded-lg p-3--">
              <div className="flex justify-between px-4 pt-3">
                <h2 className="text-xl font-bold">Tableau des deplacements</h2>
                <IoClose
                  onClick={() => {
                    settableDeplacement(false);
                  }}
                  className="cursor-pointer text-3xl text-red-500"
                />
              </div>
              <div className=" overflow-auto w-[95vw] p-3  max-h-[70vh]">
                <table className="overflow-auto w-full text-left dark:bg-gray-800 dark:text-gray-200">
                  <thead>
                    <tr className="bg-orange-50 text-gray-700 border-- dark:bg-gray-900 dark:text-gray-100">
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[17rem]">
                        Véhicule
                      </th>
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[15rem]">
                        Date et Heure de départ
                      </th>
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[15rem]">
                        Date et Heure d'arrivée
                      </th>
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[20rem]">
                        Adresse de départ
                      </th>
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[20rem]">
                        Adresse d'arrivée
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentdataFusionnee?.map((vehicule, index) => (
                      <tr key={index} className="border dark:border-gray-600">
                        <td className="border py-3 px-2  bg-gray-50 dark:border-gray-600">
                          {vehicule?.displayName ||
                            vehicule?.description ||
                            "---"}
                        </td>
                        <td className="border py-3 px-2   bg-white dark:border-gray-600">
                          {activePeriods[index]?.startTime
                            ? activePeriods[index].startTime
                            : "---"}

                          {/* {activePeriods[index]?.startTime
                        ? activePeriods[index].startTime.toLocaleTimeString()
                        : "---"} */}
                        </td>
                        <td className="border py-3 px-2   bg-gray-50 dark:border-gray-600">
                          {activePeriods[index]?.endTime
                            ? activePeriods[index].endTime
                            : "---"}
                        </td>

                        <td className="border py-3 px-2   bg-gray-50 dark:border-gray-600">
                          {vehicule.vehiculeDetails[0]?.backupAddress ||
                            vehicule.vehiculeDetails[0]?.address ||
                            "---"}
                        </td>
                        <td className="border py-3 px-2   bg-gray-50 dark:border-gray-600">
                          {vehicule.vehiculeDetails[0]?.backupAddress ||
                            vehicule.vehiculeDetails[0]?.address ||
                            "---"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>{" "}
              </div>
            </div>
          </div>
        )}

        {tableDistance && (
          <div className="flex hidden-- z-[499999999990] justify-center items-center px-4 fixed inset-0 bg-black/50">
            <div className="bg-white  rounded-lg p-3--">
              <div className="flex justify-between px-4 pt-3">
                <h2 className="text-xl font-bold">Tableau des Distances</h2>
                <IoClose
                  onClick={() => {
                    settableDistance(false);
                  }}
                  className="cursor-pointer text-3xl text-red-500"
                />
              </div>
              <div className=" overflow-auto w-[95vw] p-3  max-h-[70vh]">
                <table className="overflow-auto w-full text-left dark:bg-gray-800 dark:text-gray-200">
                  <thead>
                    <tr className="bg-orange-50 text-gray-700 border-- dark:bg-gray-900 dark:text-gray-100">
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[17rem]">
                        Véhicule
                      </th>
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[15rem]">
                        Distance parcoure
                      </th>
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[15rem]">
                        Date et Heure de départ
                      </th>
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[15rem]">
                        Date et Heure d'arrivée
                      </th>

                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[20rem]">
                        Adresse de départ
                      </th>
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[20rem]">
                        Adresse d'arrivée
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentdataFusionnee?.map((vehicule, index) => (
                      <tr key={index} className="border dark:border-gray-600">
                        <td className="border py-3 px-2  bg-gray-50 dark:border-gray-600">
                          {vehicule?.displayName ||
                            vehicule?.description ||
                            "---"}
                        </td>
                        <td className="border py-3 px-2   bg-orange-50 dark:border-gray-600">
                          12 Km
                        </td>
                        <td className="border py-3 px-2   bg-white dark:border-gray-600">
                          {activePeriods[index]?.startTime
                            ? activePeriods[index].startTime
                            : "---"}

                          {/* {activePeriods[index]?.startTime
                        ? activePeriods[index].startTime.toLocaleTimeString()
                        : "---"} */}
                        </td>
                        <td className="border py-3 px-2   bg-gray-50 dark:border-gray-600">
                          {activePeriods[index]?.endTime
                            ? activePeriods[index].endTime
                            : "---"}
                        </td>

                        <td className="border py-3 px-2   bg-gray-50 dark:border-gray-600">
                          {vehicule.vehiculeDetails[0]?.backupAddress ||
                            vehicule.vehiculeDetails[0]?.address ||
                            "---"}
                        </td>
                        <td className="border py-3 px-2   bg-gray-50 dark:border-gray-600">
                          {vehicule.vehiculeDetails[0]?.backupAddress ||
                            vehicule.vehiculeDetails[0]?.address ||
                            "---"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>{" "}
              </div>
            </div>
          </div>
        )}

        {tableActivite && (
          <div className="flex hidden-- z-[499999999990] justify-center items-center px-4 fixed inset-0 bg-black/50">
            <div className="bg-white  rounded-lg p-3--">
              <div className="flex justify-between px-4 pt-3">
                <h2 className="text-xl font-bold">Tableau des activites</h2>
                <IoClose
                  onClick={() => {
                    settableActivite(false);
                  }}
                  className="cursor-pointer text-3xl text-red-500"
                />
              </div>
              <div className=" overflow-auto w-[95vw] p-3  max-h-[70vh]">
                <table className="overflow-auto w-full text-left dark:bg-gray-800 dark:text-gray-200">
                  <thead>
                    <tr className="bg-orange-50 text-gray-700 border-- dark:bg-gray-900 dark:text-gray-100">
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[17rem]">
                        Véhicule
                      </th>
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[15rem]">
                        Duree du trajet
                      </th>
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[15rem]">
                        Date et Heure de départ
                      </th>
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[15rem]">
                        Date et Heure d'arrivée
                      </th>

                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[20rem]">
                        Adresse de départ
                      </th>
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[20rem]">
                        Adresse d'arrivée
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentdataFusionnee?.map((vehicule, index) => (
                      <tr key={index} className="border dark:border-gray-600">
                        <td className="border py-3 px-2  bg-gray-50 dark:border-gray-600">
                          {vehicule?.displayName ||
                            vehicule?.description ||
                            "---"}
                        </td>
                        <td className="border py-3 px-2   bg-orange-50 dark:border-gray-600">
                          1h 30 45s
                        </td>
                        <td className="border py-3 px-2   bg-white dark:border-gray-600">
                          {activePeriods[index]?.startTime
                            ? activePeriods[index].startTime
                            : "---"}

                          {/* {activePeriods[index]?.startTime
                        ? activePeriods[index].startTime.toLocaleTimeString()
                        : "---"} */}
                        </td>
                        <td className="border py-3 px-2   bg-gray-50 dark:border-gray-600">
                          {activePeriods[index]?.endTime
                            ? activePeriods[index].endTime
                            : "---"}
                        </td>

                        <td className="border py-3 px-2   bg-gray-50 dark:border-gray-600">
                          {vehicule.vehiculeDetails[0]?.backupAddress ||
                            vehicule.vehiculeDetails[0]?.address ||
                            "---"}
                        </td>
                        <td className="border py-3 px-2   bg-gray-50 dark:border-gray-600">
                          {vehicule.vehiculeDetails[0]?.backupAddress ||
                            vehicule.vehiculeDetails[0]?.address ||
                            "---"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>{" "}
              </div>
            </div>
          </div>
        )}

        {tablevitesse && (
          <div className="flex hidden-- z-[499999999990] justify-center items-center px-4 fixed inset-0 bg-black/50">
            <div className="bg-white  rounded-lg p-3--">
              <div className="flex justify-between px-4 pt-3">
                <h2 className="text-xl font-bold">Tableau des vitesse</h2>
                <IoClose
                  onClick={() => {
                    settablevitesse(false);
                  }}
                  className="cursor-pointer text-3xl text-red-500"
                />
              </div>
              <div className=" overflow-auto w-[95vw] p-3  max-h-[70vh]">
                <table className="overflow-auto w-full text-left dark:bg-gray-800 dark:text-gray-200">
                  <thead>
                    <tr className="bg-orange-50 text-gray-700 border-- dark:bg-gray-900 dark:text-gray-100">
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[17rem]">
                        Véhicule
                      </th>
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[15rem]">
                        vitesse nimimale
                      </th>
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[15rem]">
                        vitesse maximale
                      </th>
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[15rem]">
                        vitesse moyenne
                      </th>
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[15rem]">
                        Date et Heure de départ
                      </th>
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[15rem]">
                        Date et Heure d'arrivée
                      </th>

                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[20rem]">
                        Adresse de départ
                      </th>
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[20rem]">
                        Adresse d'arrivée
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentdataFusionnee?.map((vehicule, index) => (
                      <tr key={index} className="border dark:border-gray-600">
                        <td className="border py-3 px-2  bg-gray-50 dark:border-gray-600">
                          {vehicule?.displayName ||
                            vehicule?.description ||
                            "---"}
                        </td>
                        <td className="border py-3 px-2   bg-orange-50 dark:border-gray-600">
                          10 km/h
                        </td>
                        <td className="border py-3 px-2   bg-orange-50 dark:border-gray-600">
                          42 km/h
                        </td>
                        <td className="border py-3 px-2   bg-orange-50 dark:border-gray-600">
                          30 km/h
                        </td>
                        <td className="border py-3 px-2   bg-white dark:border-gray-600">
                          {activePeriods[index]?.startTime
                            ? activePeriods[index].startTime
                            : "---"}

                          {/* {activePeriods[index]?.startTime
                        ? activePeriods[index].startTime.toLocaleTimeString()
                        : "---"} */}
                        </td>
                        <td className="border py-3 px-2   bg-gray-50 dark:border-gray-600">
                          {activePeriods[index]?.endTime
                            ? activePeriods[index].endTime
                            : "---"}
                        </td>

                        <td className="border py-3 px-2   bg-gray-50 dark:border-gray-600">
                          {vehicule.vehiculeDetails[0]?.backupAddress ||
                            vehicule.vehiculeDetails[0]?.address ||
                            "---"}
                        </td>
                        <td className="border py-3 px-2   bg-gray-50 dark:border-gray-600">
                          {vehicule.vehiculeDetails[0]?.backupAddress ||
                            vehicule.vehiculeDetails[0]?.address ||
                            "---"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>{" "}
              </div>
            </div>
          </div>
        )}

        {tableTrajet && (
          <div className="flex hidden-- z-[499999999990] justify-center items-center px-4 fixed inset-0 bg-black/50">
            <div className="bg-white  rounded-lg p-3--">
              <div className="flex justify-between px-4 pt-3">
                <h2 className="text-xl font-bold">Tableau du trajet</h2>
                <IoClose
                  onClick={() => {
                    settableTrajet(false);
                  }}
                  className="cursor-pointer text-3xl text-red-500"
                />
              </div>
              <div className=" overflow-auto w-[95vw] p-3  max-h-[70vh]">
                <table className="overflow-auto w-full text-left dark:bg-gray-800 dark:text-gray-200">
                  <thead>
                    <tr className="bg-orange-50 text-gray-700 border-- dark:bg-gray-900 dark:text-gray-100">
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[17rem]">
                        Véhicule
                      </th>
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[15rem]">
                        temps d'activite
                      </th>
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[15rem]">
                        temps d'inactivite
                      </th>
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[15rem]">
                        duree totale des pause
                      </th>
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[15rem]">
                        distance parcourue
                      </th>
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[15rem]">
                        nombre d'arret
                      </th>

                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[20rem]">
                        Adresse de départ
                      </th>
                      <th className="border dark:border-gray-600 py-3 px-2 min-w-[20rem]">
                        Adresse d'arrivée
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentdataFusionnee?.map((vehicule, index) => (
                      <tr key={index} className="border dark:border-gray-600">
                        <td className="border py-3 px-2  bg-gray-50 dark:border-gray-600">
                          {vehicule?.displayName ||
                            vehicule?.description ||
                            "---"}
                        </td>
                        <td className="border py-3 px-2   bg-orange-50 dark:border-gray-600">
                          1h 32m 54s
                        </td>
                        <td className="border py-3 px-2   bg-orange-50 dark:border-gray-600">
                          7h 04m 45s
                        </td>
                        <td className="border py-3 px-2   bg-orange-50 dark:border-gray-600">
                          2h 22m 45s
                        </td>
                        <td className="border py-3 px-2   bg-white dark:border-gray-600">
                          12 km
                        </td>
                        <td className="border py-3 px-2   bg-gray-50 dark:border-gray-600">
                          18 arrets
                        </td>

                        <td className="border py-3 px-2   bg-gray-50 dark:border-gray-600">
                          {vehicule.vehiculeDetails[0]?.backupAddress ||
                            vehicule.vehiculeDetails[0]?.address ||
                            "---"}
                        </td>
                        <td className="border py-3 px-2   bg-gray-50 dark:border-gray-600">
                          {vehicule.vehiculeDetails[0]?.backupAddress ||
                            vehicule.vehiculeDetails[0]?.address ||
                            "---"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>{" "}
              </div>
            </div>
          </div>
        )}

        <h1 className="text-center mb-10 font-semibold text-xl my-10 dark:text-gray-300">
          Rapport détaillé en groupe
        </h1>
        <div className="shadow-md dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 py-4  bg-orange-50 p-2 rounded-md flex-- items-start gap-4">
          <div className="flex gap-4 items-center border-b border-orange-600/30 dark:border-gray-600 pb-2 mb-3">
            <IoMdInformationCircleOutline className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
            <h2 className="font-semibold dark:text-orange-50 text-orange-900">
              Informations sur les véhicules
            </h2>
          </div>

          <div className="text-gray-700 flex flex-col gap-2 dark:text-gray-300">
            <p>
              Date de Recherche :
              <span className="font-bold dark:text-orange-500 text-gray-900 pl-3">
                {
                  // true ||
                  // jourDebut === jourFin &&
                  // moisDebut === moisFin &&
                  // anneeDebut === anneeFin ? (
                  //   <span className="text-[.85rem]-- sm:text-sm md:text-[1rem]  lg:text-lg--">
                  //     <span className="dark:text-orange-500 dark:font-normal font-semibold- text-gray-950">
                  //       Le {jourDebut || ""} {moisDebut || ""}{" "}
                  //       {anneeDebut || ""}
                  //     </span>{" "}
                  //   </span>
                  // ) : (
                  <span className="text-[.85rem]-- sm:text-sm md:text-[1rem]  lg:text-lg--">
                    Du{" "}
                    <span className="dark:text-orange-500 dark:font-normal font-semibold- text-gray-950">
                      {jourDebut} {moisDebut === moisFin ? "" : moisDebut}{" "}
                      {anneeDebut === anneeFin ? "" : anneeDebut}
                    </span>{" "}
                    au{" "}
                    <span className="dark:text-orange-500 dark:font-normal font-semibold- text-gray-950">
                      {jourFin} {moisFin} {anneeFin}
                    </span>
                  </span>
                  // )
                }
              </span>
            </p>

            {/*  */}
            {/*  */}
            {/*  */}
            <div className="border-b my-2 border-orange-400/50 dark:border-gray-700" />
            {/*  */}
            {/*  */}
            {/*  */}

            <div className="flex justify-between items-center pr-3">
              <p>
                Nombre total de véhicules :{" "}
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {currentdataFusionnee?.length || "0"}
                </span>
              </p>
              <p
                onClick={() => {
                  setvoirVehiculeListePupup(true);
                  setdefineVehiculeListePupup("tous");
                }}
                className="text-orange-400 underline cursor-pointer"
              >
                voir
              </p>
            </div>
            <div className="flex justify-between items-center pr-3">
              <p>
                Véhicules actifs aujourd'hui :{" "}
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {vehiculeActiveAjourdhui?.length || "0"}
                </span>
              </p>
              <p
                onClick={() => {
                  setvoirVehiculeListePupup(true);
                  setdefineVehiculeListePupup("active");
                }}
                className="text-orange-400 underline cursor-pointer"
              >
                voir
              </p>
            </div>
            <div className="flex justify-between items-center pr-3">
              <p>
                Véhicule en stationnement :{" "}
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {vehiculeNotActiveAjourdhui?.length || "0"}
                </span>
              </p>
              <p
                onClick={() => {
                  setvoirVehiculeListePupup(true);
                  setdefineVehiculeListePupup("notactive");
                }}
                className="text-orange-400 underline cursor-pointer"
              >
                voir
              </p>
            </div>
            <div className="flex justify-between items-center pr-3">
              <p>
                Véhicule hors service :{" "}
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {vehiculeNotActif?.length || "0"}
                </span>
              </p>
              <p
                onClick={() => {
                  setvoirVehiculeListePupup(true);
                  setdefineVehiculeListePupup("hors_service");
                }}
                className="text-orange-400 underline cursor-pointer"
              >
                voir
              </p>
            </div>
            {!voirPlus && (
              <div>
                <div className="border-b my-2 border-orange-400/50 dark:border-gray-700" />
                <div
                  onClick={() => {
                    setvoirPlus(!voirPlus);
                  }}
                  className="text-orange-600 cursor-pointer"
                >
                  voir Plus
                </div>
              </div>
            )}
            {/*  */}
            {/*  */}
            {/*  */}
            {/*  */}
          </div>
          {/*  */}
          {/*  */}
          {/*  */}
        </div>

        {/* ////////////////////////////////////////////////////// */}
        {/* ////////////////////////////////////////////////////// */}
        {/* ////////////////////////////////////////////////////// */}
        {/* ////////////////////////////////////////////////////// */}
        {/* ////////////////////////////////////////////////////// */}
        <div
          className={`${
            voirPlus ? "max-h-[150rem]" : "max-h-[0rem]"
          } transition-all overflow-hidden `}
        >
          {/* vehicule ayant parcouru la plus grande distance */}
          <div className="shadow-md mt-10 dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 py-4  bg-orange-50 p-2 rounded-md flex-- items-start gap-4">
            <div className="flex gap-4 items-center border-b border-orange-600/30 dark:border-gray-600 pb-2 mb-3">
              {/* <IoMdInformationCircleOutline className="min-w-[2rem] text-[1.82rem] text-orange-400 " /> */}
              <h2 className="font-semibold dark:text-orange-50 text-orange-900">
                Véhicule en mouvement en 1er
              </h2>
            </div>

            <div className="">
              <div className="py-2-">
                <div className="sm:flex gap-10 mt-3-- px-2">
                  <div className="flex gap-0 items-center">
                    <FaRegCalendarAlt className="text-gray-500/80 dark:text-gray-300 text-md mr-1 ml-0.5" />
                    <p className="text-[.9rem]">
                      <span className="font-normal dark:text-orange-500 text-gray-700 pl-3">
                        {
                          // true ||
                          // jourDebut === jourFin &&
                          // moisDebut === moisFin &&
                          // anneeDebut === anneeFin ? (
                          //   <span className="text-[.85rem]-- sm:text-sm md:text-[1rem]  lg:text-lg--">
                          //     <span className="dark:text-orange-500 dark:font-normal font-semibold text-gray-950">
                          //       Le {jourDebut || ""} {moisDebut || ""}{" "}
                          //       {anneeDebut || ""}
                          //     </span>{" "}
                          //   </span>
                          // ) : (
                          <span className="text-[.85rem]-- sm:text-sm md:text-[1rem]  lg:text-lg--">
                            Du{" "}
                            <span className="dark:text-orange-500 dark:font-normal font-semibold text-gray-950">
                              {jourDebut}{" "}
                              {moisDebut === moisFin ? "" : moisDebut}{" "}
                              {anneeDebut === anneeFin ? "" : anneeDebut}
                            </span>{" "}
                            au{" "}
                            <span className="dark:text-orange-500 dark:font-normal font-semibold text-gray-950">
                              {jourFin} {moisFin} {anneeFin}
                            </span>
                          </span>
                          // )
                        }
                      </span>
                    </p>
                  </div>
                </div>

                <div className="px-2 mt-">
                  <div className="flex gap-3 items-center">
                    <IoMdTime className="text-gray-500/80 dark:text-gray-300 text-xl mr-4-" />
                    <p>
                      De <span className="font-semibold"> 08:34 AM </span> a{" "}
                      <span className="font-semibold"> 10:08 PM </span>
                    </p>
                  </div>
                </div>
                {/*  */}
                {/*  */}
                {/*  */}
                <div className="border-b my-2 border-orange-400/50 dark:border-gray-700" />
                {/*  */}
                {/*  */}
                {/*  */}
                <p className="font-semibold pl-2">
                  Nom du vehicule :<br />
                  <span className="font-normal dark:text-orange-500 text-gray-700 pl-5 pr-2">
                    {earliestVehicle?.displayName ||
                      earliestVehicle?.description ||
                      "Pas de véhicule"}
                  </span>
                  {(earliestVehicle?.displayName && " a ") ||
                    (earliestVehicle?.description && " a ")}
                  <span className="font-bold- dark:text-orange-500 text-gray-700 pl-3">
                    {earliestVehicle?.vehiculeDetails[
                      earliestVehicle?.vehiculeDetails.length - 1
                    ].timestamp
                      ? selectUTC
                        ? formatTimestampToTimeWithTimezone(
                            earliestVehicle?.vehiculeDetails[
                              earliestVehicle?.vehiculeDetails.length - 1
                            ].timestamp,
                            selectUTC
                          )
                        : formatTimestampToTime(
                            earliestVehicle?.vehiculeDetails[
                              earliestVehicle?.vehiculeDetails.length - 1
                            ].timestamp
                          )
                      : " "}{" "}
                  </span>
                </p>
                {/*  */}
                {/*  */}
                {/*  */}
                {/* <div className="border-b my-2 border-orange-400/50 dark:border-gray-700" /> */}
                {/*  */}
                {/*  */}
                {/*  */}
                {/* <div className="px-2 mt-2">
                  <p className="flex-- gap-3 items-center">
                    <span className="font-semibold mr-6">Address depart:</span>
                    Rue Ogé, Arrondissement de Port-au-Prince, Département de
                    l'Ouest 6140, Ayiti
                  </p>
                </div>
                <div className="px-2 mt-2">
                  <p className="flex-- gap-3 items-center">
                    <span className="font-semibold mr-6">Address arrivee:</span>
                    Rue Ogé, Arrondissement de Port-au-Prince, Département de
                    l'Ouest 6140, Ayiti
                  </p>
                </div> */}
                {/*  */}
                {/*  */}
                {/*  */}
                <div className="border-b my-2 border-orange-400/50 dark:border-gray-700" />
                {/*  */}
                {/*  */}
                {/*  */}
                <div className="flex gap-6">
                  <button
                    onClick={() => {
                      settrajetVehiculePupup(true);
                    }}
                    className="mx-l px-4 text-white border border-orange-200 shadow-lg-- shadow-gray-400/20-- py-0.5 rounded-lg mt-3 bg-orange-500"
                  >
                    Voir sur la carte
                  </button>
                  <button
                    onClick={() => {
                      settableDeplacement(true);
                    }}
                    className="mx-2-- px-4-- text-orange-600 underline font-semibold shadow-lg-- shadow-gray-400/20-- py-0.5-- rounded-lg-- mt-3 bg-orange-200/50-- border-b- border-b-orange-600"
                  >
                    Plus d'info
                  </button>
                </div>

                {/* //////////////////////////////// */}
                {/*  */}
                {/*  */}
              </div>
            </div>
            {/*  */}
            {/*  */}
            {/*  */}
          </div>
          {/* vehicule en mouvement en premier */}
          <div className="shadow-md mt-10 dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 py-4  bg-orange-50 p-2 rounded-md flex-- items-start gap-4">
            <div className="flex gap-4 items-center border-b border-orange-600/30 dark:border-gray-600 pb-2 mb-3">
              {/* <IoMdInformationCircleOutline className="min-w-[2rem] text-[1.82rem] text-orange-400 " /> */}
              <h2 className="font-semibold dark:text-orange-50 text-orange-900">
                Véhicule ayant parcouru la plus grande distance
              </h2>
            </div>

            <div className="">
              <div className="py-2-">
                <div className="sm:flex gap-10 mt-3-- px-2">
                  <div className="flex gap-0 items-center">
                    <FaRegCalendarAlt className="text-gray-500/80 dark:text-gray-300 text-md mr-1 ml-0.5" />
                    <p className="text-[.9rem]">
                      <span className="font-normal dark:text-orange-500 text-gray-700 pl-3">
                        {
                          // true ||
                          // jourDebut === jourFin &&
                          // moisDebut === moisFin &&
                          // anneeDebut === anneeFin ? (
                          //   <span className="text-[.85rem]-- sm:text-sm md:text-[1rem]  lg:text-lg--">
                          //     <span className="dark:text-orange-500 dark:font-normal font-semibold text-gray-950">
                          //       Le {jourDebut || ""} {moisDebut || ""}{" "}
                          //       {anneeDebut || ""}
                          //     </span>{" "}
                          //   </span>
                          // ) : (
                          <span className="text-[.85rem]-- sm:text-sm md:text-[1rem]  lg:text-lg--">
                            Du{" "}
                            <span className="dark:text-orange-500 dark:font-normal font-semibold text-gray-950">
                              {jourDebut}{" "}
                              {moisDebut === moisFin ? "" : moisDebut}{" "}
                              {anneeDebut === anneeFin ? "" : anneeDebut}
                            </span>{" "}
                            au{" "}
                            <span className="dark:text-orange-500 dark:font-normal font-semibold text-gray-950">
                              {jourFin} {moisFin} {anneeFin}
                            </span>
                          </span>
                          // )
                        }
                      </span>
                    </p>
                  </div>
                </div>

                <div className="px-2 mt-">
                  <div className="flex gap-3 items-center">
                    <IoMdTime className="text-gray-500/80 dark:text-gray-300 text-xl mr-4-" />
                    <p>
                      De <span className="font-semibold"> 08:34 AM </span> a{" "}
                      <span className="font-semibold"> 10:08 PM </span>
                    </p>
                  </div>
                </div>
                {/*  */}
                {/*  */}
                {/*  */}
                <div className="border-b my-2 border-orange-400/50 dark:border-gray-700" />
                {/*  */}
                {/*  */}
                {/*  */}
                <p className="font-semibold pl-2">
                  Nom du vehicule :<br />
                  <span className="font-normal dark:text-orange-500 text-gray-700 pl-5 pr-2">
                    {earliestVehicle?.displayName ||
                      earliestVehicle?.description ||
                      "Pas de véhicule"}
                  </span>{" "}
                  (environ 14 Km)
                  {/* {(earliestVehicle?.displayName && " a ") ||
                    (earliestVehicle?.description && " a ")}
                  <span className="font-bold- dark:text-orange-500 text-gray-700 pl-3">
                    {earliestVehicle?.vehiculeDetails[
                      earliestVehicle?.vehiculeDetails.length - 1
                    ].timestamp
                      ? selectUTC
                        ? formatTimestampToTimeWithTimezone(
                            earliestVehicle?.vehiculeDetails[
                              earliestVehicle?.vehiculeDetails.length - 1
                            ].timestamp,
                            selectUTC
                          )
                        : formatTimestampToTime(
                            earliestVehicle?.vehiculeDetails[
                              earliestVehicle?.vehiculeDetails.length - 1
                            ].timestamp
                          )
                      : " "}{" "}
                  </span> */}
                </p>
                {/*  */}
                {/*  */}
                {/*  */}
                {/* <div className="border-b my-2 border-orange-400/50 dark:border-gray-700" /> */}
                {/*  */}
                {/*  */}
                {/*  */}
                {/* <div className="px-2 mt-2">
                  <p className="flex-- gap-3 items-center">
                    <span className="font-semibold mr-6">Address depart:</span>
                    Rue Ogé, Arrondissement de Port-au-Prince, Département de
                    l'Ouest 6140, Ayiti
                  </p>
                </div>
                <div className="px-2 mt-2">
                  <p className="flex-- gap-3 items-center">
                    <span className="font-semibold mr-6">Address arrivee:</span>
                    Rue Ogé, Arrondissement de Port-au-Prince, Département de
                    l'Ouest 6140, Ayiti
                  </p>
                </div> */}
                {/*  */}
                {/*  */}
                {/*  */}
                <div className="border-b my-2 border-orange-400/50 dark:border-gray-700" />
                {/*  */}
                {/*  */}
                {/*  */}
                <div className="flex gap-6">
                  <button
                    onClick={() => {
                      settrajetVehiculePupup(true);
                    }}
                    className="mx-l px-4 text-white border border-orange-200 shadow-lg-- shadow-gray-400/20-- py-0.5 rounded-lg mt-3 bg-orange-500"
                  >
                    Voir sur la carte
                  </button>
                  <button
                    onClick={() => {
                      settableDistance(true);
                    }}
                    className="mx-2-- px-4-- text-orange-600 underline font-semibold shadow-lg-- shadow-gray-400/20-- py-0.5-- rounded-lg-- mt-3 bg-orange-200/50-- border-b- border-b-orange-600"
                  >
                    Plus d'info
                  </button>
                </div>

                {/* //////////////////////////////// */}
                {/*  */}
                {/*  */}
              </div>
            </div>
            {/*  */}
            {/*  */}
            {/*  */}
          </div>
          {/* vehicule en mouvement plus longtemps */}
          <div className="shadow-md mt-10 dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 py-4  bg-orange-50 p-2 rounded-md flex-- items-start gap-4">
            <div className="flex gap-4 items-center border-b border-orange-600/30 dark:border-gray-600 pb-2 mb-3">
              {/* <IoMdInformationCircleOutline className="min-w-[2rem] text-[1.82rem] text-orange-400 " /> */}
              <h2 className="font-semibold dark:text-orange-50 text-orange-900">
                Véhicule en mouvement plus longtemps
              </h2>
            </div>

            <div className="">
              <div className="py-2-">
                <div className="sm:flex gap-10 mt-3-- px-2">
                  <div className="flex gap-0 items-center">
                    <FaRegCalendarAlt className="text-gray-500/80 dark:text-gray-300 text-md mr-1 ml-0.5" />
                    <p className="text-[.9rem]">
                      <span className="font-normal dark:text-orange-500 text-gray-700 pl-3">
                        {
                          // true ||
                          // jourDebut === jourFin &&
                          // moisDebut === moisFin &&
                          // anneeDebut === anneeFin ? (
                          //   <span className="text-[.85rem]-- sm:text-sm md:text-[1rem]  lg:text-lg--">
                          //     <span className="dark:text-orange-500 dark:font-normal font-semibold text-gray-950">
                          //       Le {jourDebut || ""} {moisDebut || ""}{" "}
                          //       {anneeDebut || ""}
                          //     </span>{" "}
                          //   </span>
                          // ) : (
                          <span className="text-[.85rem]-- sm:text-sm md:text-[1rem]  lg:text-lg--">
                            Du{" "}
                            <span className="dark:text-orange-500 dark:font-normal font-semibold text-gray-950">
                              {jourDebut}{" "}
                              {moisDebut === moisFin ? "" : moisDebut}{" "}
                              {anneeDebut === anneeFin ? "" : anneeDebut}
                            </span>{" "}
                            au{" "}
                            <span className="dark:text-orange-500 dark:font-normal font-semibold text-gray-950">
                              {jourFin} {moisFin} {anneeFin}
                            </span>
                          </span>
                          // )
                        }
                      </span>
                    </p>
                  </div>
                </div>

                <div className="px-2 mt-">
                  <div className="flex gap-3 items-center">
                    <IoMdTime className="text-gray-500/80 dark:text-gray-300 text-xl mr-4-" />
                    <p>
                      De <span className="font-semibold"> 08:34 AM </span> a{" "}
                      <span className="font-semibold"> 10:08 PM </span>
                    </p>
                  </div>
                </div>
                {/*  */}
                {/*  */}
                {/*  */}
                <div className="border-b my-2 border-orange-400/50 dark:border-gray-700" />
                {/*  */}
                {/*  */}
                {/*  */}
                <p className="font-semibold pl-2">
                  Nom du vehicule :<br />
                  <span className="font-normal dark:text-orange-500 text-gray-700 pl-5 pr-2">
                    {earliestVehicle?.displayName ||
                      earliestVehicle?.description ||
                      "Pas de véhicule"}
                  </span>
                  {/* {(earliestVehicle?.displayName && " a ") ||
                    (earliestVehicle?.description && " a ")}
                  <span className="font-bold- dark:text-orange-500 text-gray-700 pl-3">
                    {earliestVehicle?.vehiculeDetails[
                      earliestVehicle?.vehiculeDetails.length - 1
                    ].timestamp
                      ? selectUTC
                        ? formatTimestampToTimeWithTimezone(
                            earliestVehicle?.vehiculeDetails[
                              earliestVehicle?.vehiculeDetails.length - 1
                            ].timestamp,
                            selectUTC
                          )
                        : formatTimestampToTime(
                            earliestVehicle?.vehiculeDetails[
                              earliestVehicle?.vehiculeDetails.length - 1
                            ].timestamp
                          )
                      : " "}{" "}
                  </span> */}
                </p>
                {/*  */}
                {/*  */}
                {/*  */}
                {/* <div className="border-b my-2 border-orange-400/50 dark:border-gray-700" /> */}
                {/*  */}
                {/*  */}
                {/*  */}
                {/* <div className="px-2 mt-2">
                  <p className="flex-- gap-3 items-center">
                    <span className="font-semibold mr-6">Address depart:</span>
                    Rue Ogé, Arrondissement de Port-au-Prince, Département de
                    l'Ouest 6140, Ayiti
                  </p>
                </div>
                <div className="px-2 mt-2">
                  <p className="flex-- gap-3 items-center">
                    <span className="font-semibold mr-6">Address arrivee:</span>
                    Rue Ogé, Arrondissement de Port-au-Prince, Département de
                    l'Ouest 6140, Ayiti
                  </p>
                </div> */}
                {/*  */}
                {/*  */}
                {/*  */}
                <div className="border-b my-2 border-orange-400/50 dark:border-gray-700" />
                {/*  */}
                {/*  */}
                {/*  */}
                <div className="flex gap-6">
                  <button
                    onClick={() => {
                      settrajetVehiculePupup(true);
                    }}
                    className="mx-l px-4 text-white border border-orange-200 shadow-lg-- shadow-gray-400/20-- py-0.5 rounded-lg mt-3 bg-orange-500"
                  >
                    Voir sur la carte
                  </button>
                  <button
                    onClick={() => {
                      settableActivite(true);
                    }}
                    className="mx-2-- px-4-- text-orange-600 underline font-semibold shadow-lg-- shadow-gray-400/20-- py-0.5-- rounded-lg-- mt-3 bg-orange-200/50-- border-b- border-b-orange-600"
                  >
                    Plus d'info
                  </button>
                </div>

                {/* //////////////////////////////// */}
                {/*  */}
                {/*  */}
              </div>
            </div>
            {/*  */}
            {/*  */}
            {/*  */}
          </div>
          {/* vehicule avec la vitesse maximale */}
          <div className="shadow-md mt-10 dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 py-4  bg-orange-50 p-2 rounded-md flex-- items-start gap-4">
            <div className="flex gap-4 items-center border-b border-orange-600/30 dark:border-gray-600 pb-2 mb-3">
              {/* <IoMdInformationCircleOutline className="min-w-[2rem] text-[1.82rem] text-orange-400 " /> */}
              <h2 className="font-semibold dark:text-orange-50 text-orange-900">
                Véhicule avec la vitesse maximale
              </h2>
            </div>

            <div className="">
              <div className="py-2-">
                <div className="sm:flex gap-10 mt-3-- px-2">
                  <div className="flex gap-0 items-center">
                    <FaRegCalendarAlt className="text-gray-500/80 dark:text-gray-300 text-md mr-1 ml-0.5" />
                    <p className="text-[.9rem]">
                      <span className="font-normal dark:text-orange-500 text-gray-700 pl-3">
                        {
                          // true ||
                          // jourDebut === jourFin &&
                          // moisDebut === moisFin &&
                          // anneeDebut === anneeFin ? (
                          //   <span className="text-[.85rem]-- sm:text-sm md:text-[1rem]  lg:text-lg--">
                          //     <span className="dark:text-orange-500 dark:font-normal font-semibold text-gray-950">
                          //       Le {jourDebut || ""} {moisDebut || ""}{" "}
                          //       {anneeDebut || ""}
                          //     </span>{" "}
                          //   </span>
                          // ) : (
                          <span className="text-[.85rem]-- sm:text-sm md:text-[1rem]  lg:text-lg--">
                            Du{" "}
                            <span className="dark:text-orange-500 dark:font-normal font-semibold text-gray-950">
                              {jourDebut}{" "}
                              {moisDebut === moisFin ? "" : moisDebut}{" "}
                              {anneeDebut === anneeFin ? "" : anneeDebut}
                            </span>{" "}
                            au{" "}
                            <span className="dark:text-orange-500 dark:font-normal font-semibold text-gray-950">
                              {jourFin} {moisFin} {anneeFin}
                            </span>
                          </span>
                          // )
                        }
                      </span>
                    </p>
                  </div>
                </div>

                <div className="px-2 mt-">
                  <div className="flex gap-3 items-center">
                    <IoMdTime className="text-gray-500/80 dark:text-gray-300 text-xl mr-4-" />
                    <p>
                      De <span className="font-semibold"> 08:34 AM </span> a{" "}
                      <span className="font-semibold"> 10:08 PM </span>
                    </p>
                  </div>
                </div>
                {/*  */}
                {/*  */}
                {/*  */}
                <div className="border-b my-2 border-orange-400/50 dark:border-gray-700" />
                {/*  */}
                {/*  */}
                {/*  */}
                <p className="font-semibold pl-2">
                  Nom du vehicule :<br />
                  <span className="font-normal dark:text-orange-500 text-gray-700 pl-5 pr-2">
                    {earliestVehicle?.displayName ||
                      earliestVehicle?.description ||
                      "Pas de véhicule"}
                  </span>
                  {(earliestVehicle?.displayName && " a ") ||
                    (earliestVehicle?.description && " a ")}
                  <span className="font-bold- dark:text-orange-500 text-gray-700 pl-3">
                    {earliestVehicle?.vehiculeDetails[
                      earliestVehicle?.vehiculeDetails.length - 1
                    ].timestamp
                      ? selectUTC
                        ? formatTimestampToTimeWithTimezone(
                            earliestVehicle?.vehiculeDetails[
                              earliestVehicle?.vehiculeDetails.length - 1
                            ].timestamp,
                            selectUTC
                          )
                        : formatTimestampToTime(
                            earliestVehicle?.vehiculeDetails[
                              earliestVehicle?.vehiculeDetails.length - 1
                            ].timestamp
                          )
                      : " "}{" "}
                  </span>
                </p>
                {/*  */}
                {/*  */}
                {/*  */}
                {/* <div className="border-b my-2 border-orange-400/50 dark:border-gray-700" /> */}
                {/*  */}
                {/*  */}
                {/*  */}
                {/* <div className="px-2 mt-2">
                  <p className="flex-- gap-3 items-center">
                    <span className="font-semibold mr-6">Address depart:</span>
                    Rue Ogé, Arrondissement de Port-au-Prince, Département de
                    l'Ouest 6140, Ayiti
                  </p>
                </div>
                <div className="px-2 mt-2">
                  <p className="flex-- gap-3 items-center">
                    <span className="font-semibold mr-6">Address arrivee:</span>
                    Rue Ogé, Arrondissement de Port-au-Prince, Département de
                    l'Ouest 6140, Ayiti
                  </p>
                </div> */}
                {/*  */}
                {/*  */}
                {/*  */}
                <div className="border-b my-2 border-orange-400/50 dark:border-gray-700" />
                {/*  */}
                {/*  */}
                {/*  */}
                <div className="flex gap-6">
                  <button
                    onClick={() => {
                      settrajetVehiculePupup(true);
                    }}
                    className="mx-l px-4 text-white border border-orange-200 shadow-lg-- shadow-gray-400/20-- py-0.5 rounded-lg mt-3 bg-orange-500"
                  >
                    Voir sur la carte
                  </button>
                  <button
                    onClick={() => {
                      settablevitesse(true);
                    }}
                    className="mx-2-- px-4-- text-orange-600 underline font-semibold shadow-lg-- shadow-gray-400/20-- py-0.5-- rounded-lg-- mt-3 bg-orange-200/50-- border-b- border-b-orange-600"
                  >
                    Plus d'info
                  </button>
                </div>

                {/* //////////////////////////////// */}
                {/*  */}
                {/*  */}
              </div>
            </div>
            {/*  */}
            {/*  */}
            {/*  */}
          </div>
          {/*  */}
          {/*  */}
          {/*  */}
          {voirPlus && (
            <div
              onClick={() => {
                setvoirPlus(!voirPlus);
                window.scrollTo({
                  top: 200,
                  behavior: "auto", // Défilement fluide
                  // behavior: "smooth", // Défilement fluide
                });
              }}
              className="p-4  py-2 my-4 rounded-lg cursor-pointer shadow-lg shadow-gray-400/20 bg-orange-50 mt-8"
            >
              {/* <div className="border-b my-2 border-orange-400/50 dark:border-gray-700" /> */}
              <div className="text-orange-600  cursor-pointer">voir moins</div>
            </div>
          )}
          {/*  */}
          {/*  */}
          {/*  */}
        </div>
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}

        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        <div className="shadow-md mt-10 dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 py-4  bg-orange-50 p-2 rounded-md flex-- items-start gap-4">
          <div className="flex gap-4 items-center border-b border-orange-600/30 dark:border-gray-600 pb-2 mb-3">
            <RiPinDistanceLine className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
            <h2 className="font-semibold dark:text-orange-50 text-orange-900">
              Informations sur le trajet des vehicules
            </h2>
          </div>

          <div>
            <div className="text-gray-700 flex flex-col gap-2 dark:text-gray-300">
              <p>
                Date de Recherche :{/* <br className="sm:hidden" /> */}
                <span className="font-bold dark:text-orange-500 text-gray-900 pl-5">
                  {
                    // true ||
                    // jourDebut === jourFin &&
                    // moisDebut === moisFin &&
                    // anneeDebut === anneeFin ? (
                    //   <span className="text-[.85rem]-- sm:text-sm md:text-[1rem]  lg:text-lg--">
                    //     <span className="dark:text-orange-500 dark:font-normal font-semibold- text-gray-950">
                    //       Le {jourDebut || ""} {moisDebut || ""}{" "}
                    //       {anneeDebut || ""}
                    //     </span>{" "}
                    //   </span>
                    // ) : (
                    <span className="text-[.85rem]-- sm:text-sm md:text-[1rem]  lg:text-lg--">
                      Du{" "}
                      <span className="dark:text-orange-500 dark:font-normal font-semibold- text-gray-950">
                        {jourDebut} {moisDebut === moisFin ? "" : moisDebut}{" "}
                        {anneeDebut === anneeFin ? "" : anneeDebut}
                      </span>{" "}
                      au{" "}
                      <span className="dark:text-orange-500 dark:font-normal font-semibold- text-gray-950">
                        {jourFin} {moisFin} {anneeFin}
                      </span>
                    </span>
                    // )
                  }
                </span>
              </p>
              {/*  */}
              {/*  */}
              {/*  */}
              <div className="border-b my-2 border-orange-400/50 dark:border-gray-700" />
              {/*  */}
              {/*  */}
              {/*  */}
              {/* <p>
                Heure du Recherche :
                <span className="font-normal dark:text-orange-500 text-gray-700 pl-3">
                  De{" "}
                  <span className="dark:text-orange-500 mx-1 dark:font-normal font-semibold- text-gray-950">
                    {selectUTC
                      ? formatTimestampToTimeWithTimezone(
                          currentVehicule?.vehiculeDetails[
                            currentVehicule?.vehiculeDetails?.length - 1
                          ]?.timestamp,
                          selectUTC
                        )
                      : formatTimestampToTime(
                          currentVehicule?.vehiculeDetails?.[
                            currentVehicule?.vehiculeDetails?.length - 1
                          ]?.timestamp
                        )}
                  </span>{" "}
                  a{" "}
                  <span className="dark:text-orange-500 ml-1 dark:font-normal font-semibold- text-gray-950">
                    {selectUTC
                      ? formatTimestampToTimeWithTimezone(
                          currentVehicule?.vehiculeDetails[0]?.timestamp,
                          selectUTC
                        )
                      : formatTimestampToTime(
                          currentVehicule?.vehiculeDetails?.[0]?.timestamp
                        )}
                  </span>{" "}
                </span>
              </p> */}
              <div className="flex gap-2 justify-between">
                <p>
                  Temps d'activité total :
                  <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                    {formatTime(
                      result?.totalMovingTime.hours,
                      result?.totalMovingTime.minutes,
                      result?.totalMovingTime.seconds
                    )}
                  </span>
                </p>

                <p
                  onClick={() => {
                    settableTrajet(true);
                  }}
                  className="text-orange-400 border-b border-b-orange-400 cursor-pointer"
                >
                  voir plus
                </p>
              </div>
              <p>
                Duree des arrêt lors du deplacement :
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {/* {result?.totalStopTime.hours}h {result?.totalStopTime.minutes}
                  m {result?.totalStopTime.seconds}m{" "} */}
                  {formatTime(
                    result?.totalStopTime.hours,
                    result?.totalStopTime.minutes,
                    result?.totalStopTime.seconds
                  )}
                </span>
              </p>
              {/* <p>
                Duree de L'arrêt le plus long :
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
              
                  {formatTime(
                    result?.longestStopTime.hours,
                    result?.longestStopTime.minutes,
                    result?.longestStopTime.seconds
                  )}
                </span>
              </p> */}
              {/*  */}
              {/*  */}
              {/*  */}
              {/* <div className="border-b my-2 border-orange-400/50 dark:border-gray-700" /> */}
              {/*  */}
              {/*  */}
              {/*  */}
              <div className="flex gap-2 justify-between">
                <p>
                  Distance totale parcourue:
                  <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                    {result2?.totalDistanceAllVehicles.toFixed(2) || "0"} km{" "}
                  </span>
                </p>
                {/* <p className="text-orange-400 border-b border-b-orange-400 cursor-pointer">
                  voir plus
                </p> */}
              </div>
              <p>
                Nombre total d’arrêts :
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {result3.totalStopsAllVehicles}
                </span>
              </p>
              {/*  */}
              {/*  */}
              {/*  */}
              <div className="border-b my-2 border-orange-400/50 dark:border-gray-700" />
              {/*  */}
              {/*  */}
              {/*  */}
              <div className="flex gap-2 justify-between">
                <p>
                  Vitesse minimale:
                  <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                    {result5?.globalStats.minSpeed.toFixed(2) || "---"} Km/h
                  </span>
                </p>{" "}
                <p
                  onClick={() => {
                    settablevitesse(true);
                  }}
                  className="text-orange-400 border-b border-b-orange-400 cursor-pointer"
                >
                  voir plus
                </p>
              </div>
              <p>
                Vitesse maximale:
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {result5?.globalStats.maxSpeed.toFixed(2) || "---"} Km/h Km/h
                </span>
              </p>
              <p>
                Vitesse moyenne:
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {result5?.globalStats.averageSpeed.toFixed(2) || "---"} Km/h
                </span>
              </p>
            </div>
          </div>
        </div>
        {/* <div className="shadow-md mt-4 dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 py-4  bg-orange-50 p-2 rounded-md flex--- items-start gap-4">
          <div className="flex gap-4 items-center border-b border-orange-600/30 dark:border-gray-600 pb-2 mb-3">
            <IoTimeOutline className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
            <h2 className="font-semibold dark:text-orange-50 text-orange-900">
              Temps
            </h2>
          </div>

          <div>
            <div className="text-gray-700 flex flex-col gap-2 dark:text-gray-300"></div>
          </div>
        </div>
        <div className="shadow-md mt-4  dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 py-4  bg-orange-50 p-2 rounded-md flex--- items-start gap-4">
          <div className="flex gap-4 items-center border-b border-orange-600/30 dark:border-gray-600 pb-2 mb-3">
            <RiPinDistanceLine className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
            <h2 className="font-semibold dark:text-orange-50 text-orange-900">
              Distance
            </h2>
          </div>

          <div>
            <div className="text-gray-600 flex flex-col gap-2 dark:text-gray-300"></div>
          </div>
        </div>
        <div className="shadow-md mt-4  dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 py-4  bg-orange-50 p-2 rounded-md flex--- items-start gap-4">
          <div className="flex gap-4 items-center border-b border-orange-600/30 dark:border-gray-600 pb-2 mb-3">
            <SlSpeedometer className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
            <h2 className="font-semibold dark:text-orange-50 text-orange-900">
              Vitesse
            </h2>
          </div>

          <div>
            <div className="text-gray-600 flex flex-col gap-2 dark:text-gray-300"></div>
          </div>
        </div> */}

        <div className="shadow-md mt-20  py-3 dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900  bg-orange-50 p-2 rounded-md flex items-center gap-4">
          <MdLocationPin className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
          <h2 className="font-semibold dark:text-orange-50 text-orange-900">
            Position des véhicules{" "}
          </h2>
        </div>

        {zoomPosition ? (
          <div className="fixed inset-0 z-[9999999999999999999999] bg-black/50">
            <div className="relative  h-[100vh]  rounded-lg mt-3-- overflow-hidden">
              <button
                className="absolute z-[999] top-[1rem] right-[1rem]"
                // onClick={centerOnFirstMarker}
                onClick={() => {
                  setzoomPosition(false);
                }}
              >
                <div className="flex justify-center items-center min-w-10 min-h-10 rounded-full bg-red-600 shadow-xl">
                  <IoClose className="text-white text-[1.52rem]" />
                </div>
              </button>
              <div className=" -translate-y-[10rem]---">
                <MapComponent />
              </div>
            </div>
          </div>
        ) : (
          <div className="relative h-[40vh] md:h-[60vh] rounded-lg mt-3 overflow-hidden">
            <button
              className="absolute shadow-lg shadow-gray-400 rounded-full z-[999] top-[1rem] right-[1rem]"
              // onClick={centerOnFirstMarker}
              onClick={() => {
                setzoomPosition(true);
              }}
            >
              <div className="flex justify-center items-center min-w-10 min-h-10 rounded-full bg-white shadow-xl">
                <MdOutlineFullscreen className="text-orange-500 text-[2rem]" />
              </div>
            </button>
            <div className=" -translate-y-[10rem]">
              <MapComponent />
            </div>
          </div>
        )}

        {/* zoomPosition */}

        <div className="shadow-md mt-20  py-3 dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900  bg-orange-50 p-2 rounded-md flex items-center gap-4">
          <BsTable className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
          <h2 className="font-semibold dark:text-orange-50 text-orange-900">
            Tableau récapitulatif{" "}
          </h2>
        </div>

        <div className="w-full mt-4  overflow-auto">
          <table className="overflow-auto w-full text-left dark:bg-gray-800 dark:text-gray-200">
            <thead>
              <tr className="bg-orange-50 text-gray-700 border-- dark:bg-gray-900 dark:text-gray-100">
                <th className="border dark:border-gray-600 py-3 px-2 min-w-[17rem]">
                  Véhicule
                </th>
                <th className="border dark:border-gray-600 py-3 px-2 min-w-[10rem]">
                  Heure de départ
                </th>
                <th className="border dark:border-gray-600 py-3 px-2 min-w-[10rem]">
                  Heure d'arrivée
                </th>
                <th className="border dark:border-gray-600 py-3 px-2 min-w-[10rem]">
                  Vitesse moyenne
                </th>
                <th className="border dark:border-gray-600 py-3 px-2 min-w-[10rem]">
                  Vitesse maximale
                </th>
                <th className="border dark:border-gray-600 py-3 px-2 min-w-[10rem]">
                  Distance totale
                </th>
                <th className="border dark:border-gray-600 py-3 px-2 min-w-[10rem]">
                  Nombre d'arrêts
                </th>
                <th className="border dark:border-gray-600 py-3 px-2 min-w-[10rem]">
                  Temps actif
                </th>
                <th className="border dark:border-gray-600 py-3 px-2 min-w-[30rem]">
                  Derniere Adresse
                </th>
              </tr>
            </thead>
            <tbody>
              {currentdataFusionnee?.map((vehicule, index) => (
                <tr key={index} className="border dark:border-gray-600">
                  <td className="border py-3 px-2  bg-gray-50  dark:border-gray-600">
                    {vehicule?.displayName || vehicule?.description || "---"}
                  </td>
                  <td className="border py-3 px-2   bg-white dark:border-gray-600">
                    {activePeriods[index]?.startTime
                      ? activePeriods[index].startTime
                      : "---"}

                    {/* {activePeriods[index]?.startTime
                        ? activePeriods[index].startTime.toLocaleTimeString()
                        : "---"} */}
                  </td>
                  <td className="border py-3 px-2   bg-gray-50  dark:border-gray-600">
                    {activePeriods[index]?.endTime
                      ? activePeriods[index].endTime
                      : "---"}
                  </td>
                  <td
                    onClick={() => {
                      console.log(vehicule.vehiculeDetails[0]?.address);
                    }}
                    className="border py-3 px-2 dark:border-gray-600"
                  >
                    {Object.entries(result5.statsByVehicle)[
                      index
                    ][1].averageSpeed.toFixed(2)}{" "}
                    km/h
                  </td>
                  <td className="border py-3 px-2   bg-gray-50  dark:border-gray-600">
                    {Object.entries(result5.statsByVehicle)[
                      index
                    ][1].maxSpeed.toFixed(2)}{" "}
                    km/h
                  </td>
                  <td className="border py-3 px-2 dark:border-gray-600">
                    {Object.entries(result2.distancesByVehicle)[
                      index
                    ][1].toFixed(2)}{" "}
                    km
                  </td>
                  <td className="border py-3 px-2   bg-gray-50  dark:border-gray-600">
                    {Object.entries(result3.stopsByVehicle)[index][1]} arrêts
                  </td>
                  <td className="border py-3 px-2 dark:border-gray-600">
                    {/* {movingTimes[index].totalMovingDuration.hours}h{" "}
                    {movingTimes[index].totalMovingDuration.minutes}m{" "}
                    {movingTimes[index].totalMovingDuration.seconds}s */}

                    {formatTime(
                      movingTimes[index].totalMovingDuration.hours,
                      movingTimes[index].totalMovingDuration.minutes,
                      movingTimes[index].totalMovingDuration.seconds
                    )}
                  </td>
                  <td className="border py-3 px-2   bg-gray-50  dark:border-gray-600">
                    {vehicule.vehiculeDetails[0]?.backupAddress ||
                      vehicule.vehiculeDetails[0]?.address ||
                      "---"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default RapportGroupe;
