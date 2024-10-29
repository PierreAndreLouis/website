import React, { useContext, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { DataContext } from "../../context/DataContext";
import { MdLocationPin } from "react-icons/md";
import { FaCar } from "react-icons/fa";

function Liste({ setShowListOption }) {
  const { mergedData, isLoading, currentVehicule, updateCurrentVehicule } = useContext(DataContext);
  const dataFusionee = mergedData ? Object.values(mergedData) : [];


  
  useEffect(() => {
    console.log("vehicule mis à jour", currentVehicule);
  }, [currentVehicule]); 




  const handleClick = (vehicle) => {
    updateCurrentVehicule(vehicle); 
    setShowListOption(true);
    console.log("vehicule en variable", currentVehicule)
    console.log("vehicule en cliquer", vehicle)

  };



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

  // const formatTimestampToTime = (timestamp) => {
  //   if (!timestamp) return "Invalid Date";
  //   const date = new Date(parseInt(timestamp) * 1000); // Convertit en millisecondes
  //   return !isNaN(date.getTime())
  //     ? date.toLocaleTimeString("fr-FR", {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //         second: "2-digit",
  //       })
  //     : "Invalid Date";
  // };

  // const formatTimestampToDate = (timestamp) => {
  //   if (!timestamp) return "Invalid Date";
  //   const date = new Date(parseInt(timestamp) * 1000); // Convertit en millisecondes
  //   return !isNaN(date.getTime())
  //     ? date.toLocaleDateString("fr-FR", {
  //         day: "2-digit",
  //         month: "2-digit",
  //         year: "2-digit",
  //       })
  //     : "Invalid Date";
  // };

  return (
    <div className="p-4 flex flex-col gap-4 mt-4 mb-32">
      {isLoading ? (
        <p>Chargement des données...</p>
      ) : dataFusionee.length > 0 ? (
        dataFusionee.map((vehicle, index) => (
          <div className="shadow-md bg-gray-50 rounded-lg p-3 ">
            <div
              key={index}
              onClick={() => handleClick(vehicle)}
              className="flex relative gap-3  md:py-6"
            >
              <div className="flex flex-col items-center md:min-w-32">
                <div className="w-12 sm:w-14 md:w-20 mb-2">
                  <img src="img/cars/vitess.png" alt="" />
                </div>
                <h2 className="text-orange-500 sm:text-lg md:text-xl font-semibold whitespace-nowrap">
                  {parseFloat(
                    vehicle.vehiculeDetails?.[0]?.speedKPH || 0
                  ).toFixed(0)}{" "}
                </h2>
                <h2 className="text-orange-500 text-[.8rem] sm:text-lg md:text-xl font-semibold whitespace-nowrap">
                  SpeedKPH
                </h2>
              </div>
              <div>
                <h2 className="text-gray-800 font-semibold text-md md:text-xl mb-2">
                  {vehicle.description}
                  {/* {vehicle.vehiculeDetails?.[0]?.speedKPH >= 1 ? (
                  <span className="bg-green-200 ml-1 text-green-700 pb-[.2rem] px-2 py-0 text-sm rounded-md w-14">
                    active
                  </span>
                ) : (
                  <span className="bg-red-200 ml-1 text-red-700 pb-[.2rem] px-2 py-0 text-sm rounded-md w-14">
                    inactive
                  </span>
                )} */}
                </h2>
                <div className="flex mb-2 gap-4 text-gray-400 text-md">
                  <div className="flex gap-3 items-center">
                    <FaRegCalendarAlt className="text-gray-500/80" />
                    <h3 className="text-sm sm:text-sm md:text-md">
                      {/* {formatTimestampToDate(
                      vehicle.vehiculeDetails?.[0]?.timestamp
                    )} */}
                      {formatTimestampToDate(vehicle.lastUpdateTime)}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <IoMdTime className="text-gray-500/80 text-xl" />
                    <h3 className="text-sm sm:text-sm md:text-md">
                      {/* {formatTimestampToTime(
                      vehicle.vehiculeDetails?.[0]?.timestamp
                      )} */}
                      {formatTimestampToTime(vehicle.lastGPSTimestamp)}
                    </h3>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div>
                    <FaCar className="text-gray-500/80" />
                  </div>
                  {vehicle.vehiculeDetails?.[0]?.speedKPH >= 1 ? (
                    <span className="bg-green-200/60 ml-1 text-green-700 pb-[.2rem] px-2 py-0 text-sm rounded-md w-14">
                      active
                    </span>
                  ) : (
                    <span className="bg-red-200/50  ml-1 text-red-700 pb-[.1rem] px-2 py-0 text-sm rounded-md ">
                      inactive
                    </span>
                  )}
                </div>

                <p className="text-md (--hidden flex ) sm:flex text-gray-500 mt-2 md:text-lg">
                  <div>
                    <MdLocationPin className="text-xl text-gray-500/80 -translate-x-1 mt-1" />
                  </div>
                  {vehicle.vehiculeDetails?.[0]?.address ||
                    "Adresse non disponible"}
                </p>
              </div>
            </div>
            {/* <p className="text-md md:hidden flex text-gray-500 mt-2 md:text-lg">
              <div>
                <MdLocationPin className="text-xl text-gray-500/80 -translate-x-1 mt-1" />
              </div>
              {vehicle.vehiculeDetails?.[0]?.address ||
                "Adresse non disponible"}
            </p> */}
          </div>
        ))
      ) : (
        <p>Aucune donnée disponible</p>
      )}
    </div>
  );
}

export default Liste;
