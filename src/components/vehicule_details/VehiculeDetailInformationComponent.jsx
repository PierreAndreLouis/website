import React from "react";

function VehiculeDetailInformationComponent({ currentVehicule }) {
  return (
    <>
      <div className="mt-8 bg-gray-100 py-4 rounded-xl px-4 sm:px-[10vw] flex flex-col gap-2 dark:bg-gray-800">
        <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2 dark:border-gray-600">
          <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] dark:text-gray-200">
            IMEI
          </h3>
          <p className="pl-3 text-gray-500 dark:text-gray-400">
            {currentVehicule?.imeiNumber || ""}
          </p>
        </div>

        <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2 dark:border-gray-600">
          <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] dark:text-gray-200">
            Description du véhicule
          </h3>
          <p className="pl-3 text-gray-500 dark:text-gray-400">
            {currentVehicule?.description || ""}
          </p>
        </div>

        <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2 dark:border-gray-600">
          <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] dark:text-gray-200">
            Nom court du véhicule
          </h3>
          <p className="pl-3 text-gray-500 dark:text-gray-400">
            {currentVehicule?.displayName || ""}
          </p>
        </div>

        <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2 dark:border-gray-600">
          <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] dark:text-gray-200">
            Plaque du véhicule
          </h3>
          <p className="pl-3 text-gray-500 dark:text-gray-400">
            {currentVehicule?.licensePlate || ""}
          </p>
        </div>

        <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2 dark:border-gray-600">
          <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] dark:text-gray-200">
            Type d'appareil
          </h3>
          <p className="pl-3 text-gray-500 dark:text-gray-400">
            {currentVehicule?.equipmentType || ""}
          </p>
        </div>

        <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2 dark:border-gray-600">
          <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] dark:text-gray-200">
            Numéro de la SIM
          </h3>
          <p className="pl-3 text-gray-500 dark:text-gray-400">
            {currentVehicule?.simPhoneNumber || ""}
          </p>
        </div>
      </div>
    </>
  );
}

export default VehiculeDetailInformationComponent;
