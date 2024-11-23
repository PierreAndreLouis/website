import React, { useContext } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { DataContext } from "../../context/DataContext";

function Actifs_Vehicule({
  showActiveVehicule,
  setshowActiveVehicule,
  vehiculeActiveAjourdhui,
  setshowRapportPupup,
  // formatTimestampToDate,
  // formatTimestampToTime,
  handleClick,
  // selectUTC,
}) {
  const { mergedData, selectUTC,chooseActifs, setCurrentVehicule, setShowListOption } =
    useContext(DataContext);

  const vehicleArray = mergedData ? Object.values(mergedData) : [];
  const totalVehicleCount = vehicleArray.length;

  // const activeVehicleCount =
  //   vehicleArray.filter(
  //     (vehicle) =>
  //       vehicle.vehiculeDetails &&
  //       vehicle.vehiculeDetails[0] &&
  //       vehicle.vehiculeDetails[0].speedKPH > 0
  //   ).length || "0";

  const activeVehicleCount = vehicleArray.filter(
    (vehicle) =>
      vehicle.vehiculeDetails &&
      vehicle.vehiculeDetails[0] &&
      vehicle.vehiculeDetails[0].speedKPH > 0
  );

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
    <div>
      <div className="transition-all">
        <div className="flex flex-col gap-3 mt-3">
          {activeVehicleCount?.length > 0 ? (
            activeVehicleCount?.map((vehicule, index) => {
              return (
                <div
                  onClick={() => {
                    // handleClick(vehicule);
                    // setshowRapportPupup(true);
                    setCurrentVehicule(vehicule);
                    setShowListOption(true);
                  }}
                  key={index}
                  className="bg-white rounded-lg dark:bg-gray-800 dark:shadow-gray-600"
                >
                  <div
                    className={` py-6 bg-green-100/20 dark:border-l-[.5rem] dark:border-green-800 dark:bg-gray-900/50 dark:shadow-gray-700 shadow-md rounded-lg p-3`}
                  >
                    <div className="flex items-stretch relative gap-3 md:py-6--">
                      <div className="flex justify-center border-2 md:pt-6 md:pb-8 bg-green-200/40 dark:bg-green-900 border-white dark:border-green-400 dark:shadow-gray-600 shadow-md shadow-green-200 rounded-md p-2 flex-col items-center md:min-w-32">
                        <div>
                          <img
                            className="dark:hidden  scale-110  min-w-[4.5rem] max-w-[4.5rem] px-2 sm:max-w-[6.5rem]"
                            src="/img/home_icon/active.png"
                            alt=""
                          />
                          <img
                            className="hidden dark:block  scale-110  min-w-[4.5rem] max-w-[4.5rem] px-2 sm:max-w-[6.5rem]"
                            src="/img/home_icon/rapport_active.png"
                            alt=""
                          />
                        </div>
                      </div>

                      <div>
                        <h2
                          className={`text-green-800 dark:text-green-200 text-gray-800-- font-semibold text-md md:text-xl mb-2`}
                        >
                          {vehicule?.description || "non disponible"}
                        </h2>
                        <div className="flex mb-2 gap-4 text-gray-600 text-md">
                          <div className="flex gap-3 items-center dark:text-gray-300">
                            <FaRegCalendarAlt  id="date-icon" className="text-gray-500/80 dark:text-gray-300" />
                            <h3 className="text-sm sm:text-sm md:text-md">
                              {/* {formatTimestampToDate(
                                vehicule?.vehiculeDetails[0]?.timestamp
                              )} */}
                              {vehicule.vehiculeDetails?.[0]?.timestamp
                                ? selectUTC
                                  ? formatTimestampToDateWithTimezone(
                                      vehicule.vehiculeDetails[0].timestamp,
                                      selectUTC
                                    )
                                  : formatTimestampToDate(
                                      vehicule.vehiculeDetails?.[0]?.timestamp
                                    )
                                : "Pas de date disponible"}
                            </h3>
                          </div>
                          <div className="flex items-center gap-1 dark:text-gray-300">
                            <IoMdTime id="time-icon" className="text-gray-500/80 dark:text-gray-300 text-xl" />
                            <h3 className="text-sm sm:text-sm md:text-md">
                              {/* {formatTimestampToTime(
                                vehicule.vehiculeDetails?.[0]?.timestamp || 0
                              )} */}
                              {selectUTC
                                ? formatTimestampToTimeWithTimezone(
                                    vehicule.vehiculeDetails[0].timestamp,
                                    selectUTC
                                  )
                                : formatTimestampToTime(
                                    vehicule.vehiculeDetails?.[0]?.timestamp
                                  )}
                            </h3>
                          </div>
                        </div>

                        <div id="statut-box" className="flex gap-2 items-center">
                          <div>
                            <FaCar id="car-icon" className="text-gray-500/80 dark:text-gray-300" />
                          </div>
                          <span
                            className={`bg-green-300/20 ml-1 dark:text-green-300 text-green-800 pb-[.2rem] px-2 py-0 text-sm rounded-md`}
                          >
                            En déplacement
                          </span>
                        </div>

                        <div className="hidden sm:flex gap-1">
                          <div>
                            <MdLocationPin className="text-xl text-gray-500/80 -translate-x-0.5 mt-3" />
                          </div>

                          <p className="text-md felx sm:flex text-gray-600 dark:text-gray-200 mt-2 md:text-lg">
                            {vehicule.vehiculeDetails[0]?.address ||
                              "adresse non disponible"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 sm:hidden">
                      <p className="text-md felx sm:flex dark:text-gray-300 text-gray-600 mt-2 md:text-lg">
                        <span className="text-green-700 font-bold dark:text-green-200">
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
          ) : chooseActifs ? (
            <p className="text-center dark:text-gray-200">
              Pas de véhicule actif en ce moment
            </p>
          ) : (
            <p className="text-center dark:text-gray-200"></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Actifs_Vehicule;

// export default Actifs_Vehicule
