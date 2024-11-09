import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import Navigation_bar from "../home/Navigation_bar";
import PC_header from "../home/PC_header";
import Header from "../home/Header";
import { FaChevronDown } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";


import SideBar from "../home/SideBar";

function VoitureDetails() {
  const { currentVehicule, mergedData, setCurrentVehicule } = useContext(DataContext); // fetchVehicleDetails importée du contexte
  const [showVehiculeListe, setShowVehiculeListe] = useState(false);
  const [showFilter, setshowFilter] = useState(false);

  console.log(currentVehicule?.description || "no data");

  const dataFusionee = mergedData ? Object.values(mergedData) : [];
 
  const handleVehicleClick = (vehicule) => {
    setCurrentVehicule(vehicule);

    console.log("Véhicule en variable", currentVehicule);
    console.log("Véhicule cliqué", vehicule);
    // firstCallHistoriqueData();
  };

    useEffect(() => {
    console.log("Véhicule mis à jour", currentVehicule);
  }, [currentVehicule]);

  return (
    <div className="px-4 mt-20 pb-20">
      <Navigation_bar />
      <PC_header />
      <Header />
      <SideBar />
      
      <div>
      <div
              onClick={() => {
                setShowVehiculeListe(!showVehiculeListe);
              }}
              className="relative max-w-[40rem] sm:mx-auto  mx-4 mb-6"
            >
              <div
                className="flex justify-between  cursor-pointer border rounded-md
                 px-3 py-2 bg-orange-50 text-center"
              >
                <p className="text-start">
                  {currentVehicule?.description || "Choisir un vehicule"}
                </p>
                <FaChevronDown className="mt-1" />
              </div>

              {showVehiculeListe && (
                <div className="  fixed flex justify-center items-center inset-0  bg-black/50 z-20 shadow-xl border border-gray-100 rounded-md p-3">
                  <div className="pt-16 relative w-full max-w-[30rem] rounded-xl p-4 max-h-[70vh] overflow-y-auto---- overflow----- hidden--- bg-white">
                    <IoMdClose
                      onClick={() => {
                        setshowFilter(false);
                      }}
                      className="absolute top-3 cursor-pointer right-1  min-w-14 py-2 text-[2.3rem] text-red-600"
                    />

                    <h2 className="absolute left-0 top-4 right-0 font-semibold text-gray-700 mb-2 text-lg pl-7 border-b-2 pb-2 border-gray-600/20">
                      Choisir un vehicule
                    </h2>

                    <div className="overflow-y-auto overflow-x-hidden h-[80vh] max-h-[58vh] pb-20">
                      {dataFusionee?.map((vehicule) => (
                        <div
                          key={vehicule.deviseID}
                          onClick={() => handleVehicleClick(vehicule)}
                          className="cursor-pointer px-3 py-2 hover:bg-orange-50 rounded-md"
                        >
                          <p>{vehicule.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
        <div className="flex justify-center items-center">
          <img src="/img/cars/voitrue_details.png" alt="" />
        </div>
        <h1 className="text-center font-bold text-xl mt-8 text-gray-600">
          {currentVehicule?.displayName || ""}
        </h1>
        <div className="mt-8 bg-gray-100 py-4 rounded-xl px-4 sm:px-[10vw] flex flex-col gap-2">
          <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2">
            <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] ">
              Imei
            </h3>
            <p className="pl-3 text-gray-500">
              {currentVehicule?.imeiNumber || ""}
            </p>
          </div>
          <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2">
            <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] ">
              Identificateur unique
            </h3>
            <p className="pl-3 text-gray-500">
              {currentVehicule?.uniqueID || ""}
            </p>
          </div>
          <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2">
            <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] ">
              Description du vehicule
            </h3>
            <p className="pl-3 text-gray-500">
              {currentVehicule?.description || ""}
            </p>
          </div>
          <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2">
            <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] ">
              Nom court du vehicule
            </h3>
            <p className="pl-3 text-gray-500">
              {currentVehicule?.displayName || ""}
            </p>
          </div>
          {/* <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2">
            <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] ">
              Chassis du vehicule
            </h3>
            <p className="pl-3 text-gray-500">.....</p>
          </div> */}
          <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2">
            <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] ">
              Plaque du vehicule
            </h3>
            <p className="pl-3 text-gray-500">
              {currentVehicule?.licensePlate || ""}
            </p>
          </div>
          <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2">
            <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] ">
              Type appareil
            </h3>
            <p className="pl-3 text-gray-500">
              {currentVehicule?.equipmentType || ""}
            </p>
          </div>
          <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2">
            <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] ">
              Numero du sim
            </h3>
            <p className="pl-3 text-gray-500">
              {currentVehicule?.simPhoneNumber || ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoitureDetails;
