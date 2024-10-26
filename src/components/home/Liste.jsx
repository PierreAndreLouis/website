import React, { useContext } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { DataContext } from "../../context/DataContext";

function Liste({ setShowListOption }) {
  const { vehicleData, isLoading } = useContext(DataContext);

  // Fonction pour convertir le timestamp en format HH:MM:SS
  function formatTimestampToTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  // Fonction pour convertir le timestamp en format jour-mois-année
  function formatTimestampToDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <div>
      {/* Liste des véhicules */}
      <div className="p-4 flex flex-col gap-4 mt-4 mb-32">
        {vehicleData &&
          vehicleData.map((vehicle, index) => (
            <div
              key={index}
              onClick={() => setShowListOption(true)}
              className="flex relative gap-3 shadow-md bg-gray-50 rounded-lg p-3 md:py-6"
            >
              <div className="flex flex-col items-center md:min-w-32">
                <div className="w-8 mb-2">
                  {!vehicle.isActive ? 
                   <img
                    className=""
                    src="/img/cars/localisation.png"
                    alt=""
                  />
                  :
                 <img
                    className=""
                    // src="/img/home_icon/green_location.png"
                    src="/img/cars/localisation.png"

                    alt=""
                  />
                }
                 
                </div>

                {!vehicle.isActive ?
                
                <h2 className="text-orange-500 font-semibold whitespace-nowrap">
                  {parseFloat(vehicle.lastOdometerKM).toFixed(0)} KM
                </h2>
                :
                <h2 className="text-orange-500 font-semibold whitespace-nowrap">
                  {parseFloat(vehicle.lastOdometerKM).toFixed(0)} KM
                </h2>
                }


                
              </div>
              <div>
                <h2 className="text-gray-800 font-semibold text-md md:text-xl mb-2">
                  {vehicle.description}
                  {vehicle.isActive && <span className=" bg-green-200 ml-1 text-green-700 pb-[.2rem] px-2 py-0 text-sm rounded-md w-14">
                active
              </span>}
                </h2>
                <div className="flex gap-4 text-gray-400 text-md">
                  <div className="flex items-center gap-1">
                    <FaRegCalendarAlt className="text-gray-800/80" />
                    <h3 className="text-sm sm:text-sm md:text-md">
                      {formatTimestampToDate(vehicle.lastUpdateTime)}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1">
                    <IoMdTime className="text-gray-800/80 text-xl" />
                    <h3 className="text-sm sm:text-sm md:text-md">
                      {formatTimestampToTime(vehicle.lastGPSTimestamp)}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2 md:text-lg">
                  Rue Oge, Arrondissement de Port-au-Prince, Département de l'Ouest
                  6140, Ayiti
                </p>
              </div>
             
            </div>
          ))}
      </div>
    </div>
  );
}

export default Liste;
