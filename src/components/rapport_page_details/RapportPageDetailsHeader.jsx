import React from "react";

import { Chart, registerables } from "chart.js";

import { FaChevronDown } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

// import "leaflet/dist/leaflet.css";

function RapportPageDetailsHeader({
  setShowOptions,
  showOptions,
  currentVehicule,
  setPersonnelDetails,
  vehiculeActiveAjourdhui,
  handleClick,
  vehiculeNotActiveAjourdhui,
  vehiculeNotActif,
  personnelDetails,
}) {
  return (
    <>
      <div
        onClick={() => {
          setShowOptions(!showOptions);
        }}
        className="relative pt-5 mx-4 mb-2"
      >
        <div className="flex justify-between cursor-pointer border rounded-md px-3 py-2 bg-orange-50 dark:bg-gray-900/50 dark:border-gray-500 dark:text-gray-300 text-center">
          <p className="text-start w-[90%] dark:text-gray-200 overflow-hidden whitespace-nowrap text-ellipsis">
            {personnelDetails &&
              !currentVehicule?.description &&
              "Choisissez un véhicule"}

            {personnelDetails && currentVehicule?.description}

            {!personnelDetails && "Rapport en groupe"}
          </p>

          <div
            className={`${
              !showOptions ? "rotate-0" : "rotate-180"
            } transition-all`}
          >
            {!showOptions ? (
              <FaChevronDown className="mt-1" />
            ) : (
              <IoMdClose className="mt-1 text-xl text-red-500 -translate-y-[.2rem] -translate-x-[.1rem]" />
            )}
          </div>
        </div>

        {showOptions && (
          <div className="absolute p-4 dark:bg-gray-900 dark:border dark:border-gray-500 dark:shadow-lg dark:shadow-gray-500 text-gray-500 top-20 rounded-lg bg-white right-0 left-0 min-h-20 shadow-lg shadow-gray-600">
            {/* <div
              onClick={() => {
                setShowOptions(!showOptions);
                setPersonnelDetails(false);
              }}
              className="border-b rounded-lg mt-1 cursor-pointer hover:bg-orange-50 dark:hover:bg-gray-800 flex gap-5 items-center border-gray-300 py-3"
            >
              <div className="min-w-[2.5rem]">
                <img
                  className="w-[2em] ml-2"
                  src="/img/home_icon/total.png"
                  alt="Icône total"
                />
              </div>

              <h3 className="dark:text-gray-200">Rapport de groupe</h3>
            </div> */}

            {vehiculeActiveAjourdhui &&
              vehiculeActiveAjourdhui.map((vehicule, index) => {
                return (
                  <div
                    onClick={() => {
                      setShowOptions(!showOptions);
                      handleClick(vehicule);
                    }}
                    className="border-b rounded-lg mt-1 cursor-pointer hover:bg-orange-50 dark:hover:bg-gray-800 flex gap-5 items-center border-gray-300 py-3"
                  >
                    <div className="min-w-[2.5rem]">
                      <img
                        className="w-[2.5em]"
                        src="/img/home_icon/active.png"
                        alt="Icône actif"
                      />
                    </div>
                    <h3 className="dark:text-gray-200">
                      {/* {!personnelDetails || "Rapport en groupe"}
                      {(personnelDetails && vehicule.description) || "---"} */}
                      {vehicule.description || "---"}
                    </h3>
                  </div>
                );
              })}

            {vehiculeNotActiveAjourdhui &&
              vehiculeNotActiveAjourdhui.map((vehicule, index) => {
                return (
                  <div
                    onClick={() => {
                      setShowOptions(!showOptions);
                      handleClick(vehicule);
                    }}
                    className="border-b rounded-lg mt-1 cursor-pointer hover:bg-orange-50 dark:hover:bg-gray-800 flex gap-5 items-center border-gray-300 py-3"
                  >
                    <div className="min-w-[2.5rem]">
                      <img
                        className="w-[2em] ml-2"
                        src="/img/cars/parking.png"
                        alt="Icône parking"
                      />
                    </div>
                    <h3 className="dark:text-gray-200">
                      {vehicule.description || "---"}
                    </h3>
                  </div>
                );
              })}

            {vehiculeNotActif &&
              vehiculeNotActif.map((vehicule, index) => {
                return (
                  <div
                    onClick={() => {
                      setShowOptions(!showOptions);
                      handleClick(vehicule);
                    }}
                    className="border-b rounded-lg mt-1 cursor-pointer hover:bg-orange-50 dark:hover:bg-gray-800 flex gap-5 items-center border-gray-300 py-3"
                  >
                    <div className="min-w-[2.5rem]">
                      <img
                        className="w-[1.72em] ml-1"
                        src="/img/home_icon/payer.png"
                        alt="Icône paiement"
                      />
                    </div>
                    <h3 className="dark:text-gray-200">
                      {vehicule.description || "---"}
                    </h3>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
}

export default RapportPageDetailsHeader;
