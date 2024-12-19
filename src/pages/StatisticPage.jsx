import React, { useContext, useState } from "react";
// import VehiculeNotActifComponent from "../components/rapport_vehicule/VehiculeNotActifComponent";
import Inactifs_Vehicules from "../components/statistics_vehicule/Inactifs_Vehicules";
import Stationnement_Vehicules from "../components/statistics_vehicule/Stationnement_Vehicules";
import Actifs_Vehicule from "../components/statistics_vehicule/Actifs_Vehicule";
import { DataContext } from "../context/DataContext";
import { FaChevronDown } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import Liste_options from "../components/home/Liste_options";

// import Stationnement_Vehicules from "../components/statistics_vehicule/Stationnement_Vehicules";

function StatisticPage() {
  const {
    showCategorieListe,
    setshowCategorieListe,
    chooseActifs,
    setchooseActifs,
    chooseStationnement,
    setchooseStationnement,
    chooseInactifs,
    setchooseInactifs,
    chooseALl,
    setchooseALl,
    showListeOption,
  } = useContext(DataContext);

  return (
    <div className="min-w-full min-h-screen pt-40 pb-20 px-2 ">
      <div className="md:max-w-[80vw] mx-auto  ">
        <div className="fixed sm:px-[15vw] z-10 bg-white dark:bg-gray-800  top-[3rem] left-0 right-0">
          <div
            onClick={() => {
              setshowCategorieListe(!showCategorieListe);
            }}
            className="relative pt-5  mx-4 mb-2"
          >
            <div
              className="flex justify-between   cursor-pointer border rounded-md
                 px-3 py-2 bg-orange-50 dark:bg-gray-900/50 dark:border-gray-500  dark:text-gray-300 text-center"
            >
              <p className="text-start w-[90%] dark:text-gray-200 overflow-hidden whitespace-nowrap text-ellipsis">
                {/* {currentVehicule?.description || "Choisis un Véhicule"} */}
                {/* Choisis un Categorie */}
                {chooseALl && "Tous les véhicules"}
                {chooseActifs && "Vehicule en déplacement"}
                {chooseStationnement && "Véhicules en stationnement"}
                {chooseInactifs && "Véhicules hors service"}
              </p>

              <div
                className={`${
                  !showCategorieListe ? "rotate-0" : "rotate-180"
                } transition-all`}
              >
                {!showCategorieListe ? (
                  <FaChevronDown className="mt-1" />
                ) : (
                  <IoMdClose className="mt-1 text-xl text-red-500 -translate-y-[.2rem] -translate-x-[.1rem]" />
                )}
              </div>
            </div>

            {showCategorieListe && (
              <div className="absolute p-4 dark:bg-gray-900 dark:border dark:border-gray-500 dark:shadow-lg dark:shadow-gray-500 text-gray-500 top-20 rounded-lg bg-white right-0 left-0 min-h-20 shadow-lg shadow-gray-600">
                <div
                  onClick={() => {
                    setshowCategorieListe(!showCategorieListe);
                    setchooseALl(true);
                    setchooseActifs(false);
                    setchooseStationnement(false);
                    setchooseInactifs(false);
                  }}
                  className={`${
                    chooseALl && "bg-orange-50 dark:bg-gray-800"
                  } border-b rounded-lg mt-1 cursor-pointer hover:bg-orange-50 dark:hover:bg-gray-800 flex gap-5 items-center border-gray-300 py-3`}
                >
                  <div className="min-w-[2.5rem]">
                    <img
                      className="w-[2em] ml-2"
                      src="/img/home_icon/total.png"
                      alt=""
                    />
                  </div>
                  <h3 className="dark:text-gray-200">Tous les Véhicules</h3>
                </div>
                <div
                  onClick={() => {
                    setshowCategorieListe(!showCategorieListe);
                    setchooseALl(false);
                    setchooseActifs(true);
                    setchooseStationnement(false);
                    setchooseInactifs(false);
                  }}
                  className={`${
                    chooseActifs && "bg-orange-50 dark:bg-gray-800"
                  } border-b rounded-lg mt-1 cursor-pointer hover:bg-orange-50 dark:hover:bg-gray-800 flex gap-5 items-center border-gray-300 py-3`}
                >
                  <div className="min-w-[2.5rem]">
                    <img
                      className="w-[2.5em] "
                      src="/img/home_icon/active.png"
                      alt=""
                    />
                  </div>
                  <h3 className="dark:text-gray-200">
                    Véhicules en déplacement
                  </h3>
                </div>
                <div
                  onClick={() => {
                    setshowCategorieListe(!showCategorieListe);
                    setchooseALl(false);
                    setchooseActifs(false);
                    setchooseStationnement(true);
                    setchooseInactifs(false);
                  }}
                  className={`${
                    chooseStationnement && "bg-orange-50 dark:bg-gray-800"
                  } border-b rounded-lg mt-1 cursor-pointer hover:bg-orange-50 dark:hover:bg-gray-800 flex gap-5 items-center border-gray-300 py-3`}
                >
                  <div className="min-w-[2.5rem]">
                    <img
                      className="w-[2em]  ml-2"
                      src="/img/cars/parking.png"
                      alt=""
                    />
                  </div>
                  <h3 className="dark:text-gray-200">
                    Véhicules en Stationnement
                  </h3>
                </div>
                <div
                  onClick={() => {
                    setshowCategorieListe(!showCategorieListe);
                    setchooseALl(false);
                    setchooseActifs(false);
                    setchooseStationnement(false);
                    setchooseInactifs(true);
                  }}
                  className={`${
                    chooseInactifs && "bg-orange-50 dark:bg-gray-800"
                  } border-b rounded-lg mt-1 cursor-pointer hover:bg-orange-50 dark:hover:bg-gray-800 flex gap-5 items-center border-gray-300 py-3`}
                >
                  <div className="min-w-[2.5rem]">
                    <img
                      className="w-[1.72em]  ml-1"
                      src="/img/home_icon/payer.png"
                      alt=""
                    />
                  </div>
                  <h3 className="dark:text-gray-200">Véhicules hors service</h3>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <h1 className="text-center text-xl text-gray-600 dark:text-gray-200 mb-10 font-semibold">
            {/* Vehicule Inactifs */}
            {chooseALl && "Tous les véhicules"}
            {chooseActifs && "Véhicule en déplacement"}
            {chooseStationnement && "Véhicules en stationnement"}
            {chooseInactifs && "Véhicules hors service"}
          </h1>
          {showListeOption && <Liste_options />}
          {chooseActifs && <Actifs_Vehicule />}
          {chooseStationnement && <Stationnement_Vehicules />}{" "}
          {chooseInactifs && <Inactifs_Vehicules />}{" "}
          {chooseALl && (
            <div>
              <Actifs_Vehicule />
              <Stationnement_Vehicules />
              <Inactifs_Vehicules />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StatisticPage;
