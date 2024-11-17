import React, { useContext, useEffect, useState } from "react";

import { FaChevronDown } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { FaCar } from "react-icons/fa";
import { DataContext } from "../context/DataContext";
import ListeVehicule from "../components/vehicule_details/ListeVehicule";
import VehiculeDetailInformationComponent from "../components/vehicule_details/VehiculeDetailInformationComponent";

function DetailsVehiculePage() {
  const { currentVehicule, mergedData, setCurrentVehicule } =
    useContext(DataContext); // fetchVehicleDetails importée du contexte
  const [showVehiculeListe, setShowVehiculeListe] = useState(false);
  const [showFilter, setshowFilter] = useState(false);

  console.log(currentVehicule?.description || "no data");

  const dataFusionee = mergedData ? Object.values(mergedData) : [];

  const handleVehicleClick = (vehicule) => {
    setCurrentVehicule(vehicule);
    setShowVehiculeListe(!showVehiculeListe);

    console.log("Véhicule en variable", currentVehicule);
    console.log("Véhicule cliqué", vehicule);
    // firstCallHistoriqueData();
  };

  useEffect(() => {
    console.log("Véhicule mis à jour", currentVehicule);
  }, [currentVehicule]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredVehicles = dataFusionee?.filter((vehicule) =>
    vehicule.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 mt-20 pb-20">
      <div>
        <div
          onClick={() => {
            setShowVehiculeListe(!showVehiculeListe);
          }}
          className="relative max-w-[40rem] sm:mx-auto  mx-4 mb-6"
        >
          <div
            className="flex justify-between  cursor-pointer border rounded-md
                 px-3 py-2 bg-orange-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-50 text-center"
          >
            <p className="text-start w-[90%] overflow-hidden whitespace-nowrap text-ellipsis">
              {currentVehicule?.description || "Choisir un vehicule"}
            </p>
            <FaChevronDown className="mt-1" />
          </div>
        </div>

        <ListeVehicule
          showVehiculeListe={showVehiculeListe}
          setShowVehiculeListe={setShowVehiculeListe}
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          filteredVehicles={filteredVehicles}
          handleVehicleClick={handleVehicleClick}
        />

        <div className="flex justify-center items-center">
          <img src="/img/cars/voitrue_details.png" alt="" />
        </div>
        <h1 className="text-center dark:text-gray-200 font-bold text-xl mt-8 text-gray-600">
          {currentVehicule?.displayName || ""}
        </h1>

        <VehiculeDetailInformationComponent currentVehicule={currentVehicule} />
      </div>
    </div>
  );
}

export default DetailsVehiculePage;
