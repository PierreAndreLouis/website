import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
// import { DataContext } from "../../context/DataContext";
import { MdLocationPin, MdDateRange } from "react-icons/md";
import { FaCar } from "react-icons/fa";

function HistoriqueMainComponent({
  currentVehicule,
  loadingHistoriqueFilter,
  vehiclueHistoriqueDetails,
  appliedCheckboxes,
  setShowListOption,
  formatTimestampToDate,
  formatTimestampToTime
  
}) {
  return (
    <>
      <div>
        <div className="pb-7 md:pb-0 md:pt-7 md:w-full text-center">
          <h2 className="text-xl md:text-4xl md:mb-4 text-orange-600">
            Historique
          </h2>
          <h2 className="text-gray-800 font-semibold text-lg md:text-xl mb-2">
            {currentVehicule?.description || "Pas de vehiucle"}
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {loadingHistoriqueFilter ? (
            <p className="text-center">Chargement des données...</p>
          ) : vehiclueHistoriqueDetails.length > 0 ? (
            (() => {
              const filteredVehicles = vehiclueHistoriqueDetails.filter(
                (vehicle) =>
                  (appliedCheckboxes.en_marche && vehicle.speedKPH > 20) ||
                  (appliedCheckboxes.en_ralenti &&
                    vehicle.speedKPH >= 1 &&
                    vehicle.speedKPH <= 20) ||
                  (appliedCheckboxes.en_arret && vehicle.speedKPH < 1)
              );

              return filteredVehicles.length > 0 ? (
                filteredVehicles.map((vehicle, index) => {
                  const speed = vehicle.speedKPH || 0;

                  // Définir les couleurs en fonction de la vitesse
                  let main_text_color,
                    lite_bg_color,
                    active_bg_color,
                    imgClass,
                    activeTextColor,
                    statut,
                    vitess_img;
                  if (speed < 1) {
                    main_text_color = "text-red-900";
                    statut = "en arrêt";
                    lite_bg_color = "bg-red-100/40";
                    activeTextColor = "text-red-900";
                    active_bg_color = "bg-red-200/50";
                    vitess_img = "img/cars/orange_vitess.png";
                    imgClass = "w-14 sm:w-16 md:w-24";
                  } else if (speed >= 1 && speed <= 20) {
                    main_text_color = "text-[#555b03]";
                    statut = "en ralenti";
                    lite_bg_color = "bg-[#ffff001b]";
                    activeTextColor = "text-[#555b03]";
                    active_bg_color = "bg-yellow-400/20";
                    vitess_img = "img/cars/yellow_vitess.png";
                    imgClass = "w-12 sm:w-14 md:w-20";
                  } else {
                    main_text_color = "text-green-700";
                    statut = "en marche";
                    lite_bg_color = "bg-green-100/50";
                    activeTextColor = "text-green-800";
                    active_bg_color = "bg-green-300/50";
                    vitess_img = "img/cars/green_vitess.png";
                    imgClass = "w-12 sm:w-14 md:w-20";
                  }

                  return (
                    <div
                      onClick={() => {
                        setShowListOption(true);
                      }}
                      key={index}
                      className={`${lite_bg_color} shadow-md rounded-lg p-3`}
                    >
                      <div className="flex relative gap-3 md:py-6">
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
                          <div className="flex mb-2 gap-4 text-gray-600 text-md">
                            <div className="flex gap-3 items-center">
                              <FaRegCalendarAlt className="text-gray-500/80" />
                              <h3 className="text-sm sm:text-sm md:text-md">
                                {formatTimestampToDate(vehicle.timestamp)}
                              </h3>
                            </div>
                            <div className="flex items-center gap-1">
                              <IoMdTime className="text-gray-500/80 text-xl" />
                              <h3 className="text-sm sm:text-sm md:text-md">
                                {formatTimestampToTime(vehicle.timestamp)}
                              </h3>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <div>
                              <FaCar className="text-gray-500/80" />
                            </div>
                            <span
                              className={` ${active_bg_color} ml-1 ${activeTextColor} pb-[.2rem] px-2 py-0 text-sm rounded-md `}
                            >
                              {statut}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            <div>
                              <MdLocationPin className="text-xl text-gray-500/80 -translate-x-0.5 mt-3" />
                            </div>
                            <p className="text-md flex text-gray-600 mt-2 md:text-lg">
                              {vehicle.address || "Adresse non disponible"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center">
                  Pas de donnée disponible{" "}
                  <span className=" text-orange-600">pour le filtre</span>
                </p>
              );
            })()
          ) : (
            <p className="text-center">Aucune donnée disponible</p>
          )}
        </div>
      </div>
    </>
  );
}

export default HistoriqueMainComponent;
