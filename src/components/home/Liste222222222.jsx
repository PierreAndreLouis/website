import React, { useContext, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { DataContext } from "../../context/DataContext";
import { MdLocationPin } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import "./style.css";

// okk
// okk
// okk
// okk
// okk
// okk
// okk
// dark
// dark
// dark
// dark
// dark
// dark
// dark

function Liste() {
  const {
    mergedData,
    setCurrentVehicule,
    setSelectedVehicle,
    isLoading,
    setShowListOption,
    currentVehicule,
    updateCurrentVehicule,
    searchQuery,
    donneeFusionneeForRapport,
    selectUTC
  } = useContext(DataContext);

  const dataFusionee = mergedData ? Object.values(mergedData) : [];

  // Filtrer les données selon la recherche
  const filteredData = searchQuery
    ? dataFusionee.filter(
        (vehicle) =>
          vehicle.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (vehicle.vehiculeDetails?.[0]?.address &&
            vehicle.vehiculeDetails[0].address
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))
      )
    : dataFusionee;

  useEffect(() => {
    console.log("Véhicule mis à jour", currentVehicule);
  }, [currentVehicule]);

  const handleClick = (vehicle) => {
    setCurrentVehicule(vehicle);
    setSelectedVehicle(vehicle.deviceID);
    setShowListOption(true);
    console.log("Véhicule sélectionné", vehicle);
  };

  // const handleClick = (vehicle) => {
  //   const deviceID = vehicle.deviceID;

  //   // Recherche du véhicule correspondant dans la liste
  //   const foundVehicle = donneeFusionneeForRapport.find((v) => v.deviceID === deviceID);

  //   if (foundVehicle) {
  //     setCurrentVehicule(foundVehicle); // Définit le véhicule actuel
  //     setSelectedVehicle(foundVehicle.deviceID); // Met à jour la sélection
  //     setShowListOption(true); // Affiche la liste d'options si nécessaire
  //     console.log("Véhicule sélectionné", foundVehicle);
  //   } else {
  //     console.error("Véhicule introuvable avec le deviceID :", deviceID);
  //   }
  // };

  // Fonctions pour formater le temps et la date
  // function formatTimestampToTime(timestamp) {
  //   const date = new Date(timestamp * 1000);
  //   const hours = date.getUTCHours().toString().padStart(2, "0");
  //   const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  //   const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  //   return `${hours}:${minutes}:${seconds}`;
  // }

  // function formatTimestampToDate(timestamp) {
  //   const date = new Date(timestamp * 1000);
  //   const day = date.getUTCDate().toString().padStart(2, "0");
  //   const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  //   const year = date.getUTCFullYear();
  //   return `${day}-${month}-${year}`;
  // }

  function convertToTimezone(timestamp, offset) {
    const date = new Date(timestamp * 1000); // Convertir le timestamp en millisecondes
    const [sign, hours, minutes] = offset
      .match(/([+-])(\d{2}):(\d{2})/)
      .slice(1);
    const totalOffsetMinutes =
      (parseInt(hours) * 60 + parseInt(minutes)) * (sign === "+" ? 1 : -1);

    date.setMinutes(date.getMinutes() + totalOffsetMinutes); // Appliquer le décalage
    return date;
  }

  function formatTimestampToDateWithTimezone(timestamp, offset) {
    const date = convertToTimezone(timestamp, offset);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  function formatTimestampToTimeWithTimezone(timestamp, offset) {
    const date = convertToTimezone(timestamp, offset);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  return (
    <div className="p-2 flex flex-col gap-4 mt-4 mb-32 dark:text-white">
      {isLoading ? (
        <p>Chargement des données...</p>
      ) : filteredData.length > 0 ? (
        filteredData.map((vehicle, index) => {
          // const speed = 0;
          const speed = vehicle.vehiculeDetails?.[0]?.speedKPH || 0;

          let main_text_color,
            lite_bg_color,
            active_bg_color,
            imgClass,
            activeTextColor,
            statut,
            vitess_img;
          if (speed < 1) {
            main_text_color = "text-red-900 dark:text-red-300";
            statut = "En arrêt";
            lite_bg_color =
              "bg-red-100/40 dark:bg-gray-900/40 dark:shadow-gray-600/50 dark:shadow-lg dark:border-l-[.5rem] dark:border-red-600/80 shadow-xl shadow-gray-950/20";
            activeTextColor = "text-red-900 dark:text-red-200";
            active_bg_color = "bg-red-200/50 dark:bg-red-600/50";
            vitess_img = "img/cars/orange_vitess.png";
            imgClass = "w-14 sm:w-16 md:w-24";
          } else if (speed >= 1 && speed <= 20) {
            main_text_color = "text-[#555b03] dark:text-yellow-300";
            statut = "En ralenti";
            lite_bg_color =
              "bg-[#ffff001b] dark:bg-gray-900/40 dark:shadow-gray-600/50 dark:shadow-lg dark:border-l-[.5rem] dark:border-yellow-400/80  shadow-xl shadow-gray-950/20";
            activeTextColor = "text-[#555b03] dark:text-yellow-100";
            active_bg_color = "bg-yellow-400/20 dark:bg-yellow-600/20";
            vitess_img = "img/cars/yellow_vitess.png";
            imgClass = "w-12 sm:w-14 md:w-20";
          } else {
            main_text_color = "text-green-700 dark:text-green-400";
            statut = "En marche";
            lite_bg_color =
              "bg-green-100/50 dark:bg-gray-900/40 dark:shadow-gray-600/50 dark:shadow-lg dark:border-l-[.5rem] dark:border-green-600/80  shadow-xl shadow-gray-950/20";
            activeTextColor = "text-green-800 dark:text-green-200";
            active_bg_color = "bg-green-300/50 dark:bg-green-500/50";
            vitess_img = "img/cars/green_vitess.png";
            imgClass = "w-12 sm:w-14 md:w-20";
          }

          return (
            <div className="bg-white dark:bg-gray-800">
              <div
                key={vehicle.deviceID}
                className={` ${lite_bg_color} shadow-md rounded-lg p-3`}
              >
                <div
                  onClick={() => handleClick(vehicle)}
                  className="flex relative gap-3 md:py-6"
                >
                  <div className="flex flex-col items-center md:min-w-32">
                    <div className={`${imgClass} mb-2`}>
                      <img src={vitess_img} alt="" />
                    </div>

                    <h2
                      className={`${main_text_color} sm:text-lg md:text-xl font-semibold whitespace-nowrap`}
                    >
                      {parseFloat(speed).toFixed(0)}
                    </h2>
                    <h2
                      className={`${main_text_color} text-[1rem] sm:text-lg md:text-xl font-semibold whitespace-nowrap`}
                    >
                      Km/h
                    </h2>
                  </div>
                  <div>
                    <h2
                      className={`${activeTextColor} text-gray-800 dark:text-gray-100 font-semibold text-md md:text-xl mb-2 `}
                    >
                      {vehicle.description}
                    </h2>
                    <div className="flex mb-2 gap-4 text-gray-600 text-md dark:text-gray-300">
                      <div className="flex gap-3 items-center">
                        <FaRegCalendarAlt className="text-gray-500/80 dark:text-gray-300" />
                        <h3 className="text-sm sm:text-sm md:text-md">
                          {vehicle.vehiculeDetails?.[0]?.timestamp
                            ? formatTimestampToDateWithTimezone(
                                vehicle.vehiculeDetails[0].timestamp,
                                selectUTC
                              )
                            : "Pas de date disponible"}
                        </h3>
                      </div>

                      {vehicle.vehiculeDetails?.[0]?.timestamp ? (
                        <div className="flex items-center gap-1">
                          <IoMdTime className="text-gray-500/80 dark:text-gray-300 text-xl" />
                          <h3 className="text-sm sm:text-sm md:text-md">
                            {vehicle.vehiculeDetails?.[0]?.timestamp
                              ? formatTimestampToTimeWithTimezone(
                                  vehicle.vehiculeDetails[0].timestamp,
                                  selectUTC
                                )
                              : "Pas d'heure disponible"}
                          </h3>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <div>
                        <FaCar className="text-gray-500/80 dark:text-gray-300" />
                      </div>
                      <span
                        className={` ${active_bg_color} ml-1  ${activeTextColor} pb-[.2rem] px-2 py-0 text-sm rounded-md `}
                      >
                        {statut}
                      </span>
                    </div>

                    <div className="flex gap-1">
                      <div>
                        <MdLocationPin className="text-xl text-gray-500/80 dark:text-gray-300 -translate-x-0.5 mt-3" />
                      </div>

                      <p className="text-md felx sm:flex text-gray-600 mt-2 md:text-lg dark:text-gray-300">
                        {vehicle.vehiculeDetails?.[0]?.address ||
                          "Adresse non disponible"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center dark:text-gray-400">Aucun véhicule trouvé.</p>
      )}
    </div>
  );
}

export default Liste;
