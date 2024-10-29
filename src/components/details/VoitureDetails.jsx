import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import Navigation_bar from "../home/Navigation_bar";
import PC_header from "../home/PC_header";

function VoitureDetails() {
  const { currentVehicule } = useContext(DataContext); // fetchVehicleDetails importée du contexte

  console.log(currentVehicule?.description || "no data");

  return (
    <div className="px-4 pb-20">
      <Navigation_bar />
      <PC_header />
      <div>
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
          <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2">
            <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] ">
              Chassis du vehicule
            </h3>
            <p className="pl-3 text-gray-500">.....</p>
          </div>
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
