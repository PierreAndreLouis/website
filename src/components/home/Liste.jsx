import React, { useContext, useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { DataContext } from "../../context/DataContext";

// Fonction pour obtenir l'adresse à partir des coordonnées
async function getAddressFromCoordinates(lat, lon) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
  );
  const data = await response.json();
  return data.address ? `${data.address.road}, ${data.address.city}, ${data.address.country}` : "Adresse non disponible";
}

function Liste({ setShowListOption }) {
  const { vehicleData, isLoading } = useContext(DataContext);
  const [addresses, setAddresses] = useState({});

  // Utilise useEffect pour récupérer l'adresse pour chaque véhicule
  useEffect(() => {
    vehicleData.forEach((vehicle) => {
      if (vehicle.lastValidLatitude && vehicle.lastValidLongitude) {
        const { lastValidLatitude: lat, lastValidLongitude: lon } = vehicle;
        getAddressFromCoordinates(lat, lon).then((address) => {
          setAddresses((prevAddresses) => ({
            ...prevAddresses,
            [vehicle.id]: address, // Utilise l'ID pour éviter les doublons
          }));
        });
      }
    });
  }, [vehicleData]);

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

  return (
    <div>
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
                  <img
                    src={
                      !vehicle.isActive
                        ? "/img/cars/localisation.png"
                        : "/img/cars/localisation.png"
                    }
                    alt=""
                  />
                </div>
                <h2 className="text-orange-500 font-semibold whitespace-nowrap">
                  {parseFloat(vehicle.lastOdometerKM).toFixed(0)} KM
                </h2>
              </div>
              <div>
                <h2 className="text-gray-800 font-semibold text-md md:text-xl mb-2">
                  {vehicle.description}
                  {vehicle.isActive ?
                    <span className=" bg-green-200 ml-1 text-green-700 pb-[.2rem] px-2 py-0 text-sm rounded-md w-14">
                      active
                    </span>
                    :
                    <span className=" bg-red-200 ml-1 text-red-700 pb-[.2rem] px-2 py-0 text-sm rounded-md w-14">
                      inactive
                    </span>
                  }
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
                <p className="text-md text-gray-500 mt-2 md:text-lg">
                  {addresses[vehicle.id] || "Chargement de l'adresse..."}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Liste;
