import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
// import { DataContext } from "../../context/DataContext";
import { MdLocationPin } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
// import RapportOptions from "./RapportOptions";
import { IoReload } from "react-icons/io5";

function VehiculeNotActifComponent({
  showInactiveVehicule,
  setshowInactiveVehicule,
  vehiculeNotActif,
  setshowRapportPupup,
  formatTimestampToDate,
  formatTimestampToTime,
  handleClick,
}) {
  return (
    <div>
      <div className="transition-all">
        <div
          onClick={() => {
            setshowInactiveVehicule(!showInactiveVehicule);
          }}
          className="flex gap-4 justify-between items-center px-4 cursor-pointer bg-gray-100 text-gray-700 p-2 mb-3 font-semibold rounded-md"
        >
          <h2>Vehicules hors service :</h2>
          <FaChevronDown
            className={`${
              showInactiveVehicule ? "rotate-180" : "rotate-0"
            } transition-all`}
          />
        </div>

        <div
          onClick={() => {
            // setshowRapportPupup(true);
          }}
          className={` ${
            showInactiveVehicule
              ? "max-h-[100rem] pb-14 overflow-y-auto transition-all"
              : "max-h-[0rem] transition-all"
          } flex   overflow-hidden flex-col gap-4 transition-all `}
        >
          {vehiculeNotActif?.length > 0 ? (
            vehiculeNotActif?.map((vehicule, index) => {
              return (
                <div
                  onClick={() => {
                    handleClick(vehicule);
                    setshowRapportPupup(true);
                  }}
                  className="bg-white"
                >
                  <div className={` bg-purple-100/30 shadow-md rounded-lg p-3`}>
                    <div className="flex items-stretch relative gap-3 md:py-6--">
                      <div className="flex justify-center border-2 md:pt-6 md:pb-8 bg-purple-200 border-white shadow-md shadow-purple-200 rounded-md p-2 flex-col items-center md:min-w-32">
                        <div className="">
                          <img
                            className="min-w-[4.5rem] max-w-[4.5rem] px-2 sm:max-w-[6.5rem]"
                            src="/img/home_icon/payer.png"
                            alt=""
                          />
                        </div>
                      </div>

                      <div>
                        <h2
                          className={`text-purple-900 text-gray-800-- font-semibold text-md md:text-xl mb-2 `}
                        >
                          {vehicule?.description || "non disponible"}
                        </h2>
                        <div className="flex mb-2 gap-4 text-gray-600 text-md">
                          <div className="flex gap-3 items-center">
                            <FaRegCalendarAlt className="text-gray-500/80" />
                            <h3 className="text-sm sm:text-sm md:text-md">
                              {formatTimestampToDate(
                                vehicule?.vehiculeDetails[0]?.timestamp
                              )}
                            </h3>
                          </div>
                          <div className="flex items-center gap-1">
                            <IoMdTime className="text-gray-500/80 text-xl" />
                            <h3 className="text-sm sm:text-sm md:text-md">
                              {formatTimestampToTime(
                                vehicule.vehiculeDetails?.[0]?.timestamp || 0
                              )}
                            </h3>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <div>
                            <FaCar className="text-gray-500/80" />
                          </div>
                          <span
                            className={` bg-purple-300/50 ml-1  text-purple-800 pb-[.2rem] px-2 py-0 text-sm rounded-md `}
                          >
                            Inactif
                          </span>
                        </div>

                        <div className="hidden sm:flex gap-1">
                          <div>
                            <MdLocationPin className="text-xl text-gray-500/80 -translate-x-0.5 mt-3" />
                          </div>

                          <p className="text-md felx sm:flex text-gray-600 mt-2 md:text-lg">
                            {vehicule.vehiculeDetails[0]?.address ||
                              "adresse non disponible"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 sm:hidden">
                      <p className="text-md felx sm:flex text-gray-600 mt-2 md:text-lg">
                        <span className="text-purple-800 font-bold ">
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
            <p className="text-center">Pas de vehicule en hors service</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default VehiculeNotActifComponent;
