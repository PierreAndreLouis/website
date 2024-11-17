import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { IoReload } from "react-icons/io5";

function VehiculeActiveMaintenantComponent({
  showActiveVehiculeNow,
  setshowActiveVehiculeNow,
  vehiculeActiveMaintenant,
  setshowRapportPupup,
  formatTimestampToDate,
  formatTimestampToTime,
  handleClick,
}) {
  return (
    <div>
      <div className="transition-all">
        <div
          className="flex gap-4 dark:text-gray-200 dark:bg-gray-900/50 dark:shadow-lg dark:shadow-gray-700 justify-between items-center px-4 cursor-pointer bg-gray-100 text-gray-700 p-2 mb-3 font-semibold rounded-md"
          onClick={() => {
            setshowActiveVehiculeNow(!showActiveVehiculeNow);
          }}
        >
          <h2>Vehicules en mouvement actuellement:</h2>
          <FaChevronDown
            className={`${
              showActiveVehiculeNow ? "rotate-180" : "rotate-0"
            } transition-all`}
          />
        </div>
        <div
          onClick={() => {
            // setshowRapportPupup(true);
          }}
          className={`${
            showActiveVehiculeNow
              ? "max-h-[100rem] pb-14 overflow-y-auto transition-all"
              : "max-h-[0rem] transition-all"
          } flex overflow-hidden flex-col gap-4 transition-all`}
        >
          {vehiculeActiveMaintenant?.length > 0 ? (
            vehiculeActiveMaintenant?.map((vehicule, index) => {
              return (
                <div
                  onClick={() => {
                    handleClick(vehicule);
                    setshowRapportPupup(true);
                  }}
                  key={index}
                  className=" py-6 bg-white rounded-lg dark:bg-gray-800 dark:shadow-gray-600"
                >
                  <div className="bg-green-100/20 dark:border-l-[.5rem] dark:border-green-800 dark:bg-gray-900/50 dark:shadow-gray-700 shadow-md rounded-lg p-3">
                    <div className="flex items-stretch relative gap-3 md:py-6--">
                      <div className="flex justify-center border-2 md:pt-6 md:pb-8 bg-green-200/40 dark:bg-green-900 border-white dark:border-green-400 dark:shadow-gray-600 shadow-md shadow-green-200 rounded-md p-2 flex-col items-center md:min-w-32">
                        <div>
                          <img
                            className="dark:hidden min-w-[4.5rem]  scale-110 max-w-[4.5rem] px-2 sm:max-w-[6.5rem]"
                            src="/img/home_icon/active.png"
                            alt=""
                          />
                          <img
                            className="hidden dark:block min-w-[4.5rem] scale-110 max-w-[4.5rem] px-2 sm:max-w-[6.5rem]"
                            src="/img/home_icon/rapport_active.png"
                            alt=""
                          />
                        </div>
                      </div>

                      <div>
                        <h2 className="text-green-800 dark:text-green-200 text-gray-800-- font-semibold text-md md:text-xl mb-2">
                          {vehicule?.description || "non disponible"}
                        </h2>
                        <div className="flex mb-2 gap-4 text-gray-600 text-md">
                          <div className="flex gap-3 items-center dark:text-gray-300">
                            <FaRegCalendarAlt className="text-gray-500/80 dark:text-gray-300" />
                            <h3 className="text-sm sm:text-sm md:text-md">
                              {formatTimestampToDate(
                                vehicule?.vehiculeDetails[0]?.timestamp
                              )}
                            </h3>
                          </div>
                          <div className="flex items-center gap-1 dark:text-gray-300">
                            <IoMdTime className="text-gray-500/80 dark:text-gray-300 text-xl" />
                            <h3 className="text-sm sm:text-sm md:text-md">
                              {formatTimestampToTime(
                                vehicule.vehiculeDetails?.[0]?.timestamp || 0
                              )}
                            </h3>
                          </div>
                        </div>

                        <div className="flex gap-2 items-center">
                          <div>
                            <FaCar className="text-gray-500/80 dark:text-gray-300" />
                          </div>
                          <span className="bg-green-300/20 ml-1 dark:text-green-300 text-green-800 pb-[.2rem] px-2 py-0 text-sm rounded-md">
                            En deplacement
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
          ) : (
            <p className="text-center dark:text-gray-200">
              Pas de vehicule actif maintenant
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default VehiculeActiveMaintenantComponent;
