import React from "react";
import { MdCenterFocusStrong } from "react-icons/md";
import { TfiMapAlt } from "react-icons/tfi";
import { FaCar } from "react-icons/fa";
import { Chart, registerables } from "chart.js";
import { IoTimeOutline } from "react-icons/io5";
import { GiPathDistance } from "react-icons/gi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { MdOutlineFullscreen } from "react-icons/md";
import { BsTable } from "react-icons/bs";

// Enregistrement des composants nécessaires
Chart.register(...registerables);
import ReactECharts from "echarts-for-react";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import customMarkerIcon from "/img/cars/localisation.png";
// import { DataContext } from "../context/DataContext";
import { RiPinDistanceLine } from "react-icons/ri";
import { SlSpeedometer } from "react-icons/sl";
import TrajetVehicule from "../historique_vehicule/TrajetVehicule";

function RapportPersonnel({
  currentVehicule,
  formattedDate,
  heureActiveDebut,
  heureActiveFin,
  selectUTC,
  formatTimestampToTimeWithTimezone,
  formatTimestampToTime,
  totalMovingHours,
  totalMovingMinutes,
  totalMovingSeconds,
  totalStopHours,
  totalStopMinutes,
  totalStopSeconds,
  longestHours,
  longestMinutes,
  longestSeconds,
  calculateTotalDistance,
  nombreArret,
  averageSpeed,
  maxSpeed,
  zoomCart,
  setzoomCart,
  typeDeVue,
  setTypeDeVue,
  mapType,
  handleMapTypeChange,
  vehicles,
  mapRef,
  tileLayers,
  getMarkerIcon,
  currentLocation,
  positions,
  centerOnFirstMarker,
  showHistoriqueInMap,
  openGoogleMaps,
  options,
  uniqueAddresses,
  uniqueAddressesZerroSpeed,
}) {
  const formatTime = (hours, minutes, seconds) => {
    if (hours > 0 || minutes > 0 || seconds > 0) {
      return `${hours > 0 ? hours + "h " : ""}${
        minutes > 0 ? minutes + "m " : ""
      }${seconds > 0 ? seconds + "s" : ""}`;
    }
    return "0s";
  };

  return (
    <>
      <div className=" px-4 md:max-w-[80vw] w-full">
        <h1 className="text-center mb-10 font-semibold text-xl my-10 dark:text-gray-300">
          Rapport détaillé du véhicule
        </h1>

        <div className="shadow-md dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 py-4  bg-orange-50 p-2 rounded-md flex--- items-start gap-4">
          <div className="flex gap-4 items-center border-b border-orange-600/30 dark:border-gray-600 pb-2 mb-3">
            <IoMdInformationCircleOutline className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
            <h2 className="font-semibold dark:text-orange-50 text-orange-900">
              Informations sur le véhicule
            </h2>
          </div>
          <div>
            <div className="text-gray-700 font-bold flex flex-col gap-2 dark:text-gray-300">
              <p>
                Véhicule :{" "}
                <span className=" dark:text-orange-500 font-normal text-gray-700 pl-3">
                  {currentVehicule?.displayName ||
                    currentVehicule?.description ||
                    "---"}
                </span>
              </p>
              <p>
                Plaque :{" "}
                <span className="font-normal dark:text-orange-500 text-gray-700 pl-3">
                  {currentVehicule?.licensePlate || "---"}
                </span>
              </p>
              <p>
                Date :{" "}
                <span className="font-normal dark:text-orange-500 text-gray-700 pl-3">
                  {formattedDate || "---"}
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
                Heure de départ:{" "}
                <span className="font-bold whitespace-nowrap dark:text-orange-500 text-gray-700 pl-3">
                  {heureActiveDebut
                    ? selectUTC
                      ? formatTimestampToTimeWithTimezone(
                          heureActiveDebut.timestamp,
                          selectUTC
                        )
                      : formatTimestampToTime(heureActiveDebut.timestamp)
                    : "---"}{" "}
                </span>
              </p>
              <p>
                Heure d'arriver:{" "}
                <span className="font-bold whitespace-nowrap dark:text-orange-500 text-gray-700 pl-3">
                  {heureActiveFin
                    ? selectUTC
                      ? formatTimestampToTimeWithTimezone(
                          heureActiveFin.timestamp,
                          selectUTC
                        )
                      : formatTimestampToTime(heureActiveFin.timestamp)
                    : "---"}{" "}
                </span>
              </p>
              <p>
                Durée total en mouvement :{" "}
                <span className="font-bold whitespace-nowrap dark:text-orange-500 text-gray-700 pl-3">
                  {/* {totalMovingHours || "0"}h {totalMovingMinutes || "0"}m{" "}
                  {totalMovingSeconds || "0"}s */}
                  {formatTime(
                    totalMovingHours,
                    totalMovingMinutes,
                    totalMovingSeconds
                  )}
                </span>
              </p>
              <p>
                Durée totale de tous les arrêts :
                <span className="font-bold whitespace-nowrap dark:text-orange-500 text-gray-700 pl-3">
                  {/* {(() => {
                    if (
                      totalStopHours > 0 ||
                      totalStopMinutes > 0 ||
                      totalStopSeconds > 0
                    ) {
                      return `${
                        totalStopHours > 0 ? totalStopHours + "h " : ""
                      }${totalStopMinutes > 0 ? totalStopMinutes + "m " : ""}${
                        totalStopSeconds > 0 ? totalStopSeconds + "s" : ""
                      }`;
                    }
                    return "0s";
                  })()} */}

                  {formatTime(
                    totalStopHours,
                    totalStopMinutes,
                    totalStopSeconds
                  )}
                </span>
              </p>
              <p>
                Duree de l’arrêts le plus long :
                <span className="font-bold whitespace-nowrap dark:text-orange-500 text-gray-700 pl-3">
                  {/* {`${longestHours || "0"}h ${longestMinutes || "0"}mn ${
                    longestSeconds || "0"
                  }s`}{" "} */}
                  {formatTime(longestHours, longestMinutes, longestSeconds)}
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
                  {calculateTotalDistance(
                    currentVehicule?.vehiculeDetails
                  ).toFixed(2)}
                  Km{" "}
                </span>
              </p>
              <p>
                Nombre total d’arrêts :
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {nombreArret || "0"}
                  {/* {stopSequences?.length || "---"} */}
                </span>
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
                  {(averageSpeed && averageSpeed.toFixed(2)) || "0"} Km/h/
                </span>
              </p>
              <p>
                Vitesse maximale:
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {(maxSpeed && maxSpeed.toFixed(2)) || "0"} Km/h
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="shadow-md mt-20  py-3 dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900  bg-orange-50 p-2 rounded-md flex items-center gap-4">
          <GiPathDistance className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
          <h2 className="font-semibold dark:text-orange-50 text-orange-900">
            Trajet du véhicule{" "}
          </h2>
        </div>

        {zoomCart ? (
          <div className=" fixed inset-0 z-[999999999999999999] bg-black/50">
            <div className="relative  rounded-lg  mt-3-- h-[100vh]  overflow-hidden w-full">
              <button
                className="absolute z-[999] top-[1rem] right-[1rem]"
                // onClick={centerOnFirstMarker}
                onClick={() => {
                  setzoomCart(false);
                }}
              >
                <div className="flex justify-center items-center min-w-10 min-h-10 rounded-full bg-red-600 shadow-xl">
                  <IoClose className="text-white text-[1.52rem]" />
                </div>
              </button>
              <div className="absolute-- -top-[11rem]-- rounded-lg  w-full ">
                <div>
                  <TrajetVehicule
                    typeDeVue={typeDeVue}
                    setTypeDeVue={setTypeDeVue}
                    mapType={mapType}
                    handleMapTypeChange={handleMapTypeChange}
                    vehicles={vehicles}
                    mapRef={mapRef}
                    tileLayers={tileLayers}
                    getMarkerIcon={getMarkerIcon}
                    currentLocation={currentLocation}
                    customMarkerIcon={customMarkerIcon}
                    positions={positions}
                    centerOnFirstMarker={centerOnFirstMarker}
                    showHistoriqueInMap={showHistoriqueInMap}
                    openGoogleMaps={openGoogleMaps}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative  rounded-lg  mt-3 h-[40vh] md:h-[60vh] overflow-hidden w-full">
            <button
              className="absolute z-[999] top-[1rem] right-[1rem]"
              // onClick={centerOnFirstMarker}
              onClick={() => {
                setzoomCart(true);
              }}
            >
              <div className="flex justify-center items-center min-w-10 min-h-10 rounded-full bg-white shadow-xl">
                <MdOutlineFullscreen className="text-orange-500 text-[2rem]" />
              </div>
            </button>
            <button
              className="absolute z-[999] top-[4rem] right-[1rem]"
              onClick={centerOnFirstMarker}
            >
              <div className="flex justify-center items-center min-w-10 min-h-10 rounded-full bg-white shadow-xl">
                <MdCenterFocusStrong className="text-orange-500 text-[1.52rem]" />
              </div>
            </button>
            <div className="absolute -top-[11rem] rounded-lg  w-full ">
              <div>
                <TrajetVehicule
                  typeDeVue={typeDeVue}
                  setTypeDeVue={setTypeDeVue}
                  mapType={mapType}
                  handleMapTypeChange={handleMapTypeChange}
                  vehicles={vehicles}
                  mapRef={mapRef}
                  tileLayers={tileLayers}
                  getMarkerIcon={getMarkerIcon}
                  currentLocation={currentLocation}
                  customMarkerIcon={customMarkerIcon}
                  positions={positions}
                  centerOnFirstMarker={centerOnFirstMarker}
                  showHistoriqueInMap={showHistoriqueInMap}
                  openGoogleMaps={openGoogleMaps}
                />
              </div>
            </div>
          </div>
        )}

        {/* {zoomCart && ( */}

        {/* )} */}

        <div className="shadow-md mt-20 mb-8  py-3 dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900  bg-orange-50 p-2 rounded-md flex items-center gap-4">
          <SlSpeedometer className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
          <h2 className="font-semibold dark:text-orange-50 text-orange-900">
            Diagramme du vitesse{" "}
          </h2>
        </div>

        {/* ///////////////////////////////////////// */}
        {/* <div className="transition-all w-full h-[30rem] bg-gray-100 rounded-lg dark:bg-gray-900 dark:text-gray-100">
            <div className=" h-[30rem]">
              <canvas
                className="w-full transition-all dark:bg-gray-900 rounded-lg  h-[30rem] border"
                id="myChart"
              ></canvas>
            </div>
          </div> */}
        {/* ///////////////////////////////////////// */}

        <div
          className="dark:bg-gray-100 pt-5 rounded-lg"
          style={{ width: "100%", height: "400px" }}
        >
          <ReactECharts option={options} style={{ height: "100%" }} />
        </div>

        <div className="shadow-md mt-20 cursor-pointer dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 py-4 hover:bg-orange-100/70 bg-orange-50 p-2 rounded-md flex--- items-start gap-4">
          <div className="flex gap-4 items-center border-b border-orange-600/30 dark:border-gray-600 pb-2 mb-3">
            <TfiMapAlt className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
            <h2 className="font-semibold dark:text-orange-500 text-orange-900">
              Tous les lieux fréquentés
            </h2>
          </div>

          <div>
            <div className="text-gray-600 flex flex-col gap-3">
              {uniqueAddresses?.map((add, index) => {
                return (
                  <p className="dark:text-gray-300">
                    <span className="font-bold dark:text-orange-500 text-black mr-3">
                      *{" "}
                    </span>
                    {add}
                  </p>
                );
              })}{" "}
            </div>
          </div>
        </div>

        <div className="shadow-md mt-4 cursor-pointer dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 py-4 hover:bg-orange-100/70 bg-orange-50 p-2 rounded-md flex--- items-start gap-4">
          <div className="flex gap-4 items-center border-b border-orange-600/30 dark:border-gray-600 pb-2 mb-3">
            <FaCar className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
            <h2 className="font-semibold dark:text-orange-500 text-orange-900">
              Tous les lieux Stationnés
            </h2>
          </div>

          <div>
            <div className="text-gray-600 flex flex-col gap-3">
              {uniqueAddressesZerroSpeed?.map((add, index) => {
                return (
                  <p className="dark:text-gray-300" key={index}>
                    <span className="font-bold dark:text-orange-500 text-black mr-3">
                      *{" "}
                    </span>
                    {add}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RapportPersonnel;
