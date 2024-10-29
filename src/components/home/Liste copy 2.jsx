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
  return data.address
    ? `${data.address.road}, ${data.address.city}, ${data.address.country}`
    : "Adresse non disponible";
}

function Liste({ setShowListOption }) {
  const { vehicleData, fetchVehicleDetails } = useContext(DataContext);
  const [addresses, setAddresses] = useState({});
  const [vehicleDetailsMap, setVehicleDetailsMap] = useState({});

  // Utiliser useEffect pour charger les détails de chaque véhicule au démarrage
  useEffect(() => {
    if (vehicleData) {
      vehicleData.forEach((vehicle) => {
        // Appeler fetchVehicleDetails pour chaque véhicule avec l'ID et les dates
        const now = new Date();
        const TimeTo = `${now.getFullYear()}-${(now.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now
          .getHours()
          .toString()
          .padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now
          .getSeconds()
          .toString()
          .padStart(2, '0')}`;

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const TimeFrom = `${startOfDay.getFullYear()}-${(startOfDay.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${startOfDay.getDate().toString().padStart(2, '0')} 00:00:00`;

        // fetchVehicleDetails(vehicle.deviceID, TimeFrom, TimeTo).then((details) => {
        //   setVehicleDetailsMap((prevDetails) => ({
        //     ...prevDetails,
        //     [vehicle.deviceID]: details,
        //   }));
        // });

        fetchVehicleDetails("863844052656169", "2020-10-28 00:00:00", "2024-10-28 8:00:59").then((details) => {
          setVehicleDetailsMap((prevDetails) => ({
            ...prevDetails,
            [vehicle.deviceID]: details,
          }));
        });

        fetchVehicleDetails(
          "863844052656169",
          "2020-10-28 00:00:00",
          "2024-10-28 8:00:59"
        );

        // Charger les adresses pour chaque véhicule
        if (vehicle.lastValidLatitude && vehicle.lastValidLongitude) {
          const { lastValidLatitude: lat, lastValidLongitude: lon } = vehicle;
          getAddressFromCoordinates(lat, lon).then((address) => {
            setAddresses((prevAddresses) => ({
              ...prevAddresses,
              [vehicle.deviceID]: address,
            }));
          });
        }
      });
    }
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
          vehicleData.map((vehicle, index) => {
            const details = vehicleDetailsMap[vehicle.deviceID] || {};
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", details)
            return (
              <div
                key={index}
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
                    {parseFloat(vehicle.lastOdometerKM).toFixed(0)} km
                  </h2>
                </div>
                <div>
                  <h2 className="text-gray-800 font-semibold text-md md:text-xl mb-2">
                    {vehicle.description}
                    {vehicle.isActive ? (
                      <span className="bg-green-200 ml-1 text-green-700 pb-[.2rem] px-2 py-0 text-sm rounded-md w-14">
                        active
                      </span>
                    ) : (
                      <span className="bg-red-200 ml-1 text-red-700 pb-[.2rem] px-2 py-0 text-sm rounded-md w-14">
                        inactive
                      </span>
                    )}
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
                    {addresses[vehicle.deviceID] || "Chargement de l'adresse..."}
                  </p>
                  {/* Affichage de toutes les informations provenant de vehicleDetails */}
                  <p className="text-md text-gray-500 mt-2 md:text-lg">
                    <strong>Device ID :</strong> {details.deviceID || "N/A"}
                  </p>
                  <p className="text-md text-gray-500 mt-2 md:text-lg">
                    <strong>Vitesse :</strong> {details.speedKPH || "N/A"} km/h
                  </p>
                  <p className="text-md text-gray-500 mt-2 md:text-lg">
                    <strong>Latitude :</strong> {details.latitude || "N/A"}
                  </p>
                  <p className="text-md text-gray-500 mt-2 md:text-lg">
                    <strong>Longitude :</strong> {details.longitude || "N/A"}
                  </p>
                  <p className="text-md text-gray-500 mt-2 md:text-lg">
                    <strong>Heading :</strong> {details.heading || "N/A"}
                  </p>
                  <p className="text-md text-gray-500 mt-2 md:text-lg">
                    <strong>Status Code :</strong> {details.statusCode || "N/A"}
                  </p>
                  <p className="text-md text-gray-500 mt-2 md:text-lg">
                    <strong>Timestamp :</strong> {formatTimestampToTime(details.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Liste;
