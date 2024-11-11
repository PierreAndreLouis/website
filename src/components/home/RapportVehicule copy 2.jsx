import React, { useContext, useState } from "react";
import Navigation_bar from "./Navigation_bar";
import PC_header from "./PC_header";
import Header from "./Header";
import SideBar from "./SideBar";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { DataContext } from "../../context/DataContext";
import { MdLocationPin } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import RapportOptions from "./RapportOptions";
import Historique from "./Historique";

function RapportVehicule() {
  const {
    vehicleData,
    rapportvehicleDetails,
    rapportDataLoading,
    mergedData,
    isLoading,
  } = useContext(DataContext);

  const [showActiveVehicule, setshowActiveVehicule] = useState(true);
  const [showParkingVehicule, setshowParkingVehicule] = useState(true);
  const [showInactiveVehicule, setshowInactiveVehicule] = useState(true);
  const [showRapportPupup, setshowRapportPupup] = useState(false);
  const [slidePage, setSLidePage] = useState("-translate-x-[0vw]");

  return (
    <div className="mb-56 mt-[8rem]">
      <Navigation_bar />
      <PC_header />
      <Header />
      <SideBar />
      {showRapportPupup && (
        <RapportOptions setshowRapportPupup={setshowRapportPupup} />
      )}
      {rapportDataLoading && (
        <div className="fixed z-30 inset-0 bg-gray-200/50">
          <div className="w-full h-full flex justify-center items-center">
            <div className="border-blue-500 h-20 w-20 animate-spin rounded-full border-8 border-t-gray-100/0" />
          </div>
        </div>
      )}

      <div className="mt-[4.5rem]">
        {/* <div className="fixed px-4 z-10 py-2 top-[3.7rem] bg-white left-0 right-0 flex justify-between items-center gap-2">
          <button
          onClick={() => {setSLidePage("-translate-x-[0vw]")}}
          className={`${slidePage === "-translate-x-[0vw]" && "bg-orange-50 shadow-lg"} w-full border bg-gray-50 text-center rounded-md py-1`}>
            Rapport
          </button>
          <button 
          onClick={() => {setSLidePage("-translate-x-[100vw]")}}
          className={`${slidePage === "-translate-x-[100vw]" && "bg-orange-50 shadow-lg"} w-full border bg-gray-50 text-center rounded-md py-1`}>
            Historique
          </button>
          <button 
          onClick={() => {setSLidePage("-translate-x-[200vw]")}}
          className={`${slidePage === "-translate-x-[200vw]" && "bg-orange-50 shadow-lg"} w-full border bg-gray-50 text-center rounded-md py-1`}>
            Position
          </button>
        </div> */}

        <div className="w-100vw overflow-hidden">
          <div className={` flex min-w-[300vw] ${slidePage} transition-all `}>
            {/* ------------------- */}

            {/* Rapport des vehicule */}
            <div className="min-w-[100vw px-4">
              <h1 className="font-semibold text-center mx-4 mb-16 text-xl">
                Rapport sur les vehicule Aujourd'hui
              </h1>

              <div className="transition-all">
                <div
                  className="flex justify-between items-center px-4 cursor-pointer bg-gray-100 text-gray-700 p-2 mb-3 font-semibold rounded-md"
                  onClick={() => {
                    setshowActiveVehicule(!showActiveVehicule);
                  }}
                >
                  <h2>Vehicules en mouvement :</h2>
                  <FaChevronDown
                    className={`${
                      showActiveVehicule ? "rotate-180" : "rotate-0"
                    } transition-all`}
                  />
                </div>
                <div
                  onClick={() => {
                    setshowRapportPupup(true);
                  }}
                  className={` ${
                    showActiveVehicule
                      ? "max-h-[100rem] pb-14 overflow-y-auto transition-all"
                      : "max-h-[0rem] transition-all"
                  } flex   overflow-hidden flex-col gap-4 transition-all `}
                >
                  <div className="bg-white">
                    <div
                      className={` bg-green-100/20 shadow-md rounded-lg p-3`}
                    >
                      <div className="flex items-stretch relative gap-3 md:py-6--">
                        <div className="flex justify-center border-2 md:pt-6 md:pb-8 bg-green-100 border-white shadow-md shadow-green-200 rounded-md p-2 flex-col items-center md:min-w-32">
                          <div className="">
                            <img
                              className="min-w-[4.5rem] max-w-[4.5rem] sm:max-w-[6.5rem]"
                              src="/img/home_icon/active.png"
                              alt=""
                            />
                          </div>
                        </div>

                        <div>
                          <h2
                            className={`text-green-800 text-gray-800-- font-semibold text-md md:text-xl mb-2 `}
                          >
                            Toyota Land Cruser Prada
                          </h2>
                          <div className="flex mb-2 gap-4 text-gray-600 text-md">
                            <div className="flex gap-3 items-center">
                              <FaRegCalendarAlt className="text-gray-500/80" />
                              <h3 className="text-sm sm:text-sm md:text-md">
                                28-03-2000
                              </h3>
                            </div>
                            <div className="flex items-center gap-1">
                              <IoMdTime className="text-gray-500/80 text-xl" />
                              <h3 className="text-sm sm:text-sm md:text-md">
                                11:43:35
                              </h3>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <div>
                              <FaCar className="text-gray-500/80" />
                            </div>
                            <span
                              className={` bg-green-300/20 ml-1  text-green-800 pb-[.2rem] px-2 py-0 text-sm rounded-md `}
                            >
                              En deplacement
                            </span>
                          </div>

                          <div className="hidden sm:flex gap-1">
                            <div>
                              <MdLocationPin className="text-xl text-gray-500/80 -translate-x-0.5 mt-3" />
                            </div>

                            <p className="text-md felx sm:flex text-gray-600 mt-2 md:text-lg">
                              Delmas 33 en face de l'institution de saint louis
                              de gonzague, rue Lamar, Port-au-prince Haiti
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1 sm:hidden">
                        <p className="text-md felx sm:flex text-gray-600 mt-2 md:text-lg">
                          <span className="text-green-700 font-bold ">
                            Adresse :{" "}
                          </span>
                          Delmas 33 en face de l'institution de saint louis de
                          gonzague, rue Lamar, Port-au-prince Haiti
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white">
                    <div
                      className={` bg-green-100/20 shadow-md rounded-lg p-3`}
                    >
                      <div className="flex items-stretch relative gap-3 md:py-6--">
                        <div className="flex justify-center border-2 md:pt-6 md:pb-8 bg-green-100 border-white shadow-md shadow-green-200 rounded-md p-2 flex-col items-center md:min-w-32">
                          <div className="">
                            <img
                              className="min-w-[4.5rem] max-w-[4.5rem] sm:max-w-[6.5rem]"
                              src="/img/home_icon/active.png"
                              alt=""
                            />
                          </div>
                        </div>

                        <div>
                          <h2
                            className={`text-green-800 text-gray-800-- font-semibold text-md md:text-xl mb-2 `}
                          >
                            Toyota Land Cruser Prada
                          </h2>
                          <div className="flex mb-2 gap-4 text-gray-600 text-md">
                            <div className="flex gap-3 items-center">
                              <FaRegCalendarAlt className="text-gray-500/80" />
                              <h3 className="text-sm sm:text-sm md:text-md">
                                28-03-2000
                              </h3>
                            </div>
                            <div className="flex items-center gap-1">
                              <IoMdTime className="text-gray-500/80 text-xl" />
                              <h3 className="text-sm sm:text-sm md:text-md">
                                11:43:35
                              </h3>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <div>
                              <FaCar className="text-gray-500/80" />
                            </div>
                            <span
                              className={` bg-green-300/20 ml-1  text-green-800 pb-[.2rem] px-2 py-0 text-sm rounded-md `}
                            >
                              En deplacement
                            </span>
                          </div>

                          <div className="hidden sm:flex gap-1">
                            <div>
                              <MdLocationPin className="text-xl text-gray-500/80 -translate-x-0.5 mt-3" />
                            </div>

                            <p className="text-md felx sm:flex text-gray-600 mt-2 md:text-lg">
                              Delmas 33 en face de l'institution de saint louis
                              de gonzague, rue Lamar, Port-au-prince Haiti
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1 sm:hidden">
                        <p className="text-md felx sm:flex text-gray-600 mt-2 md:text-lg">
                          <span className="text-green-700 font-bold ">
                            Adresse :{" "}
                          </span>
                          Delmas 33 en face de l'institution de saint louis de
                          gonzague, rue Lamar, Port-au-prince Haiti
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ----------------------------------- */}
              {/* ----------------------------------- */}
              {/* ----------------------------------- */}

              <div className="transition-all">
                <div
                  onClick={() => {
                    setshowParkingVehicule(!showParkingVehicule);
                  }}
                  className="flex justify-between items-center px-4 cursor-pointer bg-gray-100 text-gray-700 p-2 mb-3 font-semibold rounded-md"
                >
                  <h2>Vehicules en Stationnement :</h2>
                  <FaChevronDown
                    className={`${
                      showParkingVehicule ? "rotate-180" : "rotate-0"
                    } transition-all`}
                  />
                </div>

                <div
                  onClick={() => {
                    setshowRapportPupup(true);
                  }}
                  className={` ${
                    showParkingVehicule
                      ? "max-h-[100rem] pb-14 overflow-y-auto transition-all"
                      : "max-h-[0rem] transition-all"
                  } flex   overflow-hidden flex-col gap-4 transition-all `}
                >
                  <div className="bg-white">
                    <div className={` bg-red-100/20 shadow-md rounded-lg p-3`}>
                      <div className="flex items-stretch relative gap-3 md:py-6--">
                        <div className="flex justify-center border-2 md:pt-6 md:pb-8 bg-red-200/40 border-white shadow-md shadow-red-200 rounded-md p-2 flex-col items-center md:min-w-32">
                          <div className="">
                            <img
                              className="min-w-[4.5rem] max-w-[4.5rem] px-2 sm:max-w-[6.5rem]"
                              src="/img/home_icon/rapport_parking2.png"
                              alt=""
                            />
                          </div>
                        </div>

                        <div>
                          <h2
                            className={`text-red-800 text-gray-800-- font-semibold text-md md:text-xl mb-2 `}
                          >
                            Toyota Land Cruser Prada
                          </h2>
                          <div className="flex mb-2 gap-4 text-gray-600 text-md">
                            <div className="flex gap-3 items-center">
                              <FaRegCalendarAlt className="text-gray-500/80" />
                              <h3 className="text-sm sm:text-sm md:text-md">
                                28-03-2000
                              </h3>
                            </div>
                            <div className="flex items-center gap-1">
                              <IoMdTime className="text-gray-500/80 text-xl" />
                              <h3 className="text-sm sm:text-sm md:text-md">
                                11:43:35
                              </h3>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <div>
                              <FaCar className="text-gray-500/80" />
                            </div>
                            <span
                              className={` bg-red-300/20 ml-1  text-red-800 pb-[.2rem] px-2 py-0 text-sm rounded-md `}
                            >
                              En Stationnement
                            </span>
                          </div>

                          <div className="hidden sm:flex gap-1">
                            <div>
                              <MdLocationPin className="text-xl text-gray-500/80 -translate-x-0.5 mt-3" />
                            </div>

                            <p className="text-md felx sm:flex text-gray-600 mt-2 md:text-lg">
                              Delmas 33 en face de l'institution de saint louis
                              de gonzague, rue Lamar, Port-au-prince Haiti
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1 sm:hidden">
                        <p className="text-md felx sm:flex text-gray-600 mt-2 md:text-lg">
                          <span className="text-red-700 font-bold ">
                            Adresse :{" "}
                          </span>
                          Delmas 33 en face de l'institution de saint louis de
                          gonzague, rue Lamar, Port-au-prince Haiti
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white">
                    <div className={` bg-red-100/20 shadow-md rounded-lg p-3`}>
                      <div className="flex items-stretch relative gap-3 md:py-6--">
                        <div className="flex justify-center border-2 md:pt-6 md:pb-8 bg-red-200/40 border-white shadow-md shadow-red-200 rounded-md p-2 flex-col items-center md:min-w-32">
                          <div className="">
                            <img
                              className="min-w-[4.5rem] max-w-[4.5rem] px-2 sm:max-w-[6.5rem]"
                              src="/img/home_icon/rapport_parking2.png"
                              alt=""
                            />
                          </div>
                        </div>

                        <div>
                          <h2
                            className={`text-red-800 text-gray-800-- font-semibold text-md md:text-xl mb-2 `}
                          >
                            Toyota Land Cruser Prada
                          </h2>
                          <div className="flex mb-2 gap-4 text-gray-600 text-md">
                            <div className="flex gap-3 items-center">
                              <FaRegCalendarAlt className="text-gray-500/80" />
                              <h3 className="text-sm sm:text-sm md:text-md">
                                28-03-2000
                              </h3>
                            </div>
                            <div className="flex items-center gap-1">
                              <IoMdTime className="text-gray-500/80 text-xl" />
                              <h3 className="text-sm sm:text-sm md:text-md">
                                11:43:35
                              </h3>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <div>
                              <FaCar className="text-gray-500/80" />
                            </div>
                            <span
                              className={` bg-red-300/20 ml-1  text-red-800 pb-[.2rem] px-2 py-0 text-sm rounded-md `}
                            >
                              En Stationnement
                            </span>
                          </div>

                          <div className="hidden sm:flex gap-1">
                            <div>
                              <MdLocationPin className="text-xl text-gray-500/80 -translate-x-0.5 mt-3" />
                            </div>

                            <p className="text-md felx sm:flex text-gray-600 mt-2 md:text-lg">
                              Delmas 33 en face de l'institution de saint louis
                              de gonzague, rue Lamar, Port-au-prince Haiti
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1 sm:hidden">
                        <p className="text-md felx sm:flex text-gray-600 mt-2 md:text-lg">
                          <span className="text-red-700 font-bold ">
                            Adresse :{" "}
                          </span>
                          Delmas 33 en face de l'institution de saint louis de
                          gonzague, rue Lamar, Port-au-prince Haiti
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ----------------------------------- */}
              {/* ----------------------------------- */}
              {/* ----------------------------------- */}
              <div className="transition-all">
                <div
                  onClick={() => {
                    setshowInactiveVehicule(!showInactiveVehicule);
                  }}
                  className="flex justify-between items-center px-4 cursor-pointer bg-gray-100 text-gray-700 p-2 mb-3 font-semibold rounded-md"
                >
                  <h2>Vehicules inactives :</h2>
                  <FaChevronDown
                    className={`${
                      showInactiveVehicule ? "rotate-180" : "rotate-0"
                    } transition-all`}
                  />
                </div>

                <div
                  onClick={() => {
                    setshowRapportPupup(true);
                  }}
                  className={` ${
                    showInactiveVehicule
                      ? "max-h-[100rem] pb-14 overflow-y-auto transition-all"
                      : "max-h-[0rem] transition-all"
                  } flex   overflow-hidden flex-col gap-4 transition-all `}
                >
                  <div className="bg-white">
                    <div
                      className={` bg-purple-100/30 shadow-md rounded-lg p-3`}
                    >
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
                            Toyota Land Cruser Prada
                          </h2>
                          <div className="flex mb-2 gap-4 text-gray-600 text-md">
                            <div className="flex gap-3 items-center">
                              <FaRegCalendarAlt className="text-gray-500/80" />
                              <h3 className="text-sm sm:text-sm md:text-md">
                                28-03-2000
                              </h3>
                            </div>
                            <div className="flex items-center gap-1">
                              <IoMdTime className="text-gray-500/80 text-xl" />
                              <h3 className="text-sm sm:text-sm md:text-md">
                                11:43:35
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
                              Delmas 33 en face de l'institution de saint louis
                              de gonzague, rue Lamar, Port-au-prince Haiti
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1 sm:hidden">
                        <p className="text-md felx sm:flex text-gray-600 mt-2 md:text-lg">
                          <span className="text-purple-800 font-bold ">
                            Adresse :{" "}
                          </span>
                          Delmas 33 en face de l'institution de saint louis de
                          gonzague, rue Lamar, Port-au-prince Haiti
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white">
                    <div
                      className={` bg-purple-100/30 shadow-md rounded-lg p-3`}
                    >
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
                            Toyota Land Cruser Prada
                          </h2>
                          <div className="flex mb-2 gap-4 text-gray-600 text-md">
                            <div className="flex gap-3 items-center">
                              <FaRegCalendarAlt className="text-gray-500/80" />
                              <h3 className="text-sm sm:text-sm md:text-md">
                                28-03-2000
                              </h3>
                            </div>
                            <div className="flex items-center gap-1">
                              <IoMdTime className="text-gray-500/80 text-xl" />
                              <h3 className="text-sm sm:text-sm md:text-md">
                                11:43:35
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
                              Delmas 33 en face de l'institution de saint louis
                              de gonzague, rue Lamar, Port-au-prince Haiti
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1 sm:hidden">
                        <p className="text-md felx sm:flex text-gray-600 mt-2 md:text-lg">
                          <span className="text-purple-800 font-bold ">
                            Adresse :{" "}
                          </span>
                          Delmas 33 en face de l'institution de saint louis de
                          gonzague, rue Lamar, Port-au-prince Haiti
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ----------------------------------- */}
              {/* ----------------------------------- */}
              {/* ----------------------------------- */}
            </div>
            {/* Historique des vehicules */}
            <div className="min-w-[100vw]">
               {/* <Historique /> */}
            </div>
            {/* localisation des vehicules */}
            <div className="min-w-[100vw]">
              <h1 className="flex justify-center mt-32">
                Localisatons de vehicules
              </h1>
            </div>

            {/* ------------------- */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RapportVehicule;
