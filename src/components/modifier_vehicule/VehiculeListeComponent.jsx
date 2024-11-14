import React from "react";
import { FaCar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";


function VehiculeListeComponent({
  showVehiculeListe,
  setShowVehiculeListe,
  searchQuery,
  handleSearchChange,
  filteredVehicles,
  handleVehicleClick,
}) {
  return (
    <>
      {showVehiculeListe && (
        <div className="  fixed flex justify-center items-center inset-0  bg-black/50 z-20 shadow-xl border border-gray-100 rounded-md p-3">
          <div className="pt-28 relative w-full max-w-[30rem] rounded-xl p-4 max-h-[70vh] overflow-y-auto---- overflow-hidden bg-white">
            <IoMdClose
              onClick={() => {
                setShowVehiculeListe(!showVehiculeListe);
              }}
              className="absolute  top-3 cursor-pointer right-1  min-w-14 py-2 text-[2.3rem] text-red-600"
            />

            <h2
              onClick={() => {
                setShowVehiculeListe(!showVehiculeListe);
              }}
              className="absolute left-0 top-4 right-0 font-semibold text-gray-700 mb-2 text-lg pl-7 border-b-2 pb-2 border-gray-600/20"
            >
              Choisir un vehicule
            </h2>
            <div className="absolute top-[3.5rem] left-4 right-4 p-2 ">
              <input
                className="w-full border p-4 py-1.5 rounded-lg"
                type="text"
                placeholder="Recherche"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            <div className="overflow-y-auto overflow-x-hidden h-[80vh] max-h-[58vh] pb-20">
              {filteredVehicles?.map((vehicule) => (
                <div
                  key={vehicule.deviseID}
                  onClick={() => handleVehicleClick(vehicule)}
                  className="cursor-pointer flex gap-4 py-4 items-center border-b border-gray-300 px-3 hover:bg-orange-50"
                >
                  <FaCar className="text-orange-600/80 min-w-8 text-lg" />
                  <p className=" ">{vehicule.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VehiculeListeComponent;
