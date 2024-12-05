import React from "react";

import { IoTimeOutline } from "react-icons/io5";
import { GiPathDistance } from "react-icons/gi";
import { IoMdInformationCircleOutline } from "react-icons/io";

import { IoClose } from "react-icons/io5";
import { MdOutlineFullscreen } from "react-icons/md";
import { BsTable } from "react-icons/bs";
import { RiPinDistanceLine } from "react-icons/ri";
import { SlSpeedometer } from "react-icons/sl";
import MapComponent from "../location_vehicule/MapComponent";

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
  const formatTime = (hours, minutes, seconds) => {
    if (hours > 0 || minutes > 0 || seconds > 0) {
      return `${hours > 0 ? hours + "h " : ""}${
        minutes > 0 ? minutes + "m " : ""
      }${seconds > 0 ? seconds + "s" : ""}`;
    }
    return "0h 0m 0s";
  };
  return (
    <>
      <div className=" px-4 md:max-w-[80vw] w-full">
        {/* <RapportOptions /> */}

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

          <div>
            <div className="text-gray-700 flex flex-col gap-2 dark:text-gray-300">
              <p>
                Date :{" "}
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {formattedDate || "---"}
                </span>
              </p>
              <p>
                Nombre total de véhicules :{" "}
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {currentdataFusionnee?.length || "---"}
                </span>
              </p>
              <p>
                Véhicules actifs aujourd'hui :{" "}
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {vehiculeActiveAjourdhui?.length || "0"}
                </span>
              </p>
              <p>
                Véhicule en stationnement :{" "}
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {vehiculeNotActiveAjourdhui?.length || "0"}
                </span>
              </p>
              <p>
                Véhicule hors service :{" "}
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {vehiculeNotActif?.length || "0"}
                </span>
              </p>

              <p>
                1er véhicule en mouvement :{" "}
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {earliestVehicle?.displayName ||
                    earliestVehicle?.description ||
                    "Pas de véhicule"}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="shadow-md mt-4 dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 py-4  bg-orange-50 p-2 rounded-md flex--- items-start gap-4">
          <div className="flex gap-4 items-center border-b border-orange-600/30 dark:border-gray-600 pb-2 mb-3">
            <IoTimeOutline className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
            <h2 className="font-semibold dark:text-orange-50 text-orange-900">
              Temps
            </h2>
          </div>

          <div>
            <div className="text-gray-700 flex flex-col gap-2 dark:text-gray-300">
              <p>
                Heure du 1er mouvement:{" "}
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
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
                    : "0h 0m 0s"}{" "}
                </span>
              </p>
              <p>
                Dernière heure de mouvement:{" "}
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {latestVehicle?.vehiculeDetails[0].timestamp
                    ? selectUTC
                      ? formatTimestampToTimeWithTimezone(
                          latestVehicle?.vehiculeDetails[0].timestamp,
                          selectUTC
                        )
                      : formatTimestampToTime(
                          latestVehicle?.vehiculeDetails[0].timestamp
                        )
                    : "0h 0m 0s"}{" "}
                </span>
              </p>
              <p>
                Temps d'activité total :
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {/* {result?.totalMovingTime.hours}h{" "}
                  {result?.totalMovingTime.minutes}m{" "}
                  {result?.totalMovingTime.seconds}m{" "} */}

                  {formatTime(
                    result?.totalMovingTime.hours,
                    result?.totalMovingTime.minutes,
                    result?.totalMovingTime.seconds
                  )}
                </span>
              </p>
              <p>
                Temps d'arrêt total :
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
              <p>
                L'arrêt le plus long :
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {/* {result?.longestStopTime.hours}h{" "}
                  {result?.longestStopTime.minutes}m{" "}
                  {result?.longestStopTime.seconds}m{" "} */}
                  {formatTime(
                    result?.longestStopTime.hours,
                    result?.longestStopTime.minutes,
                    result?.longestStopTime.seconds
                  )}
                </span>
              </p>

              <p>
                Véhicule avec le plus grand arrêt:
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {result.vehicleWithLongestStop || "Pas de vehicule"}{" "}
                </span>
              </p>
              <p>
                Véhicule en mouvement le plus longtemps
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {result.vehicleWithLongestMoving || "Pas de vehicule"}{" "}
                </span>
              </p>
            </div>
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
            <div className="text-gray-600 flex flex-col gap-2 dark:text-gray-300">
              <p>
                Distance totale parcourue:
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {result2?.totalDistanceAllVehicles.toFixed(2) || "0"} km{" "}
                </span>
              </p>
              <p>
                Nombre total d’arrêts :
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {result3.totalStopsAllVehicles}
                </span>
              </p>
              <p>
                Véhicule ayant parcouru la plus grande distance :{" "}
                {result2?.maxDistanceVehicle ? (
                  <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                    {result2?.maxDistanceVehicle}, avec
                    {result2?.maxDistance.toFixed(2)}, "km"
                  </span>
                ) : (
                  <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                    Pas de Véhicule en mouvement
                  </span>
                )}
              </p>
            </div>
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
            <div className="text-gray-600 flex flex-col gap-2 dark:text-gray-300">
              <p>
                Vitesse moyenne:
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {result5?.globalStats.averageSpeed.toFixed(2) || "---"} Km/h
                </span>
              </p>
              <p>
                Vitesse maximale:
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {result5?.globalStats.maxSpeed.toFixed(2) || "---"} Km/h Km/h
                </span>
              </p>
              <p>
                Véhicule avec la vitesse maximale:
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {result5?.maxSpeedVehicle.displayName ||
                    result5?.maxSpeedVehicle.description ||
                    "Pas de vehicule"}{" "}
                </span>
                {result5?.maxSpeedVehicle.displayName ||
                result5?.maxSpeedVehicle.description ? (
                  <p>
                    avec une vitesse de :
                    <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                      {result5?.maxSpeedVehicle.maxSpeed.toFixed(2)} Km/h
                    </span>
                  </p>
                ) : (
                  ""
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="shadow-md mt-20  py-3 dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900  bg-orange-50 p-2 rounded-md flex items-center gap-4">
          <GiPathDistance className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
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
                  Adresse actuelle
                </th>
              </tr>
            </thead>
            <tbody>
              {currentdataFusionnee?.map((vehicule, index) => (
                <tr key={index} className="border dark:border-gray-600">
                  <td className="border py-3 px-2 dark:border-gray-600">
                    {vehicule.displayName || vehicule.description || "---"}
                  </td>
                  <td className="border py-3 px-2 dark:border-gray-600">
                    {activePeriods[index]?.startTime
                      ? activePeriods[index].startTime
                      : "---"}

                    {/* {activePeriods[index]?.startTime
                        ? activePeriods[index].startTime.toLocaleTimeString()
                        : "---"} */}
                  </td>
                  <td className="border py-3 px-2 dark:border-gray-600">
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
                  <td className="border py-3 px-2 dark:border-gray-600">
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
                  <td className="border py-3 px-2 dark:border-gray-600">
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
                  <td className="border py-3 px-2 dark:border-gray-600">
                    {vehicule.vehiculeDetails[0]?.address || "---"}
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
