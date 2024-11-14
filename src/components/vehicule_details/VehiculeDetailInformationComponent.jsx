import React from "react";

function VehiculeDetailInformationComponent({ currentVehicule }) {
  return (
    <>
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
    </>
  );
}

export default VehiculeDetailInformationComponent;
