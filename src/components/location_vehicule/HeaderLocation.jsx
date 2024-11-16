import React from "react";
import { FaChevronDown } from "react-icons/fa6";


function HeaderLocation({

    setShowVehiculeListe,
    selectedVehicle,
    vehicleData,
    setTypeDeVue,
    showAllVehicles
}) {


  return (
    <>
      <div className="fixed bg-white md:bg-white/0 top-12  left-0 right-0 z-[1200] flex flex-col gap-2 p-4">
        <h2
          onClick={() => {
            setShowVehiculeListe(true);
          }}
          id="vehicule_actuel"
          className="flex justify-between items-center border py-2 px-5 rounded-md w-full max-w-[40rem] mx-auto cursor-pointer bg-orange-50 md:bg-white md:border md:border-gray-300  md:shadow-xl"
        >
          {selectedVehicle
            ? vehicleData?.find(
                (vehicle) => vehicle.deviceID === selectedVehicle
              )?.description || "Véhicule non disponible"
            : "Tous les vehicules"}
          <span>
            <FaChevronDown />
          </span>
        </h2>

        <div className="grid  gap-3 w-full max-w-[40rem] mx-auto grid-cols-2 items-center justify-between">
          <div
            onClick={() => {
              setTypeDeVue(true);
            }}
            className="flex items-center md:shadow-xl justify-between gap-1 border px-2 py-1 cursor-pointer bg-orange-50 md:bg-white md:border md:border-gray-300  rounded-md"
          >
            <label htmlFor="mapType">Type de vue </label>
            <FaChevronDown />
          </div>

          <h3
            onClick={() => {
              showAllVehicles();
              setShowVehiculeListe(false);
            }}
            className="text-end md:bg-white md:border md:border-gray-300  md:shadow-xl md:py-1 md:px-4 rounded-lg text-orange-600 font-semibold cursor-pointer underline"
          >
            Tous les vehicules
          </h3>
        </div>
      </div>
    </>
  );
}

export default HeaderLocation;
