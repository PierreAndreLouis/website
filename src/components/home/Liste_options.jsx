import React, { useContext } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidLocationPlus } from "react-icons/bi";
import { RiShutDownLine } from "react-icons/ri";
import { FaMicrophone } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { DataContext } from "../../context/DataContext";
import { Link } from "react-router-dom";

function Liste_options({ setShowListOption }) {
  const { vehicleData, vehicleDetails, isLoading, fetchVehicleDetails } =
    useContext(DataContext); // fetchVehicleDetails importée du contexte

  const test = () => {
    console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq", vehicleDetails);
  };
  return (
    <div className="bg-black/50 fixed inset-0 flex justify-center items-center">
      <div className="border bg-white mx-4 rounded-xl overflow-hidden">
        <div className="p-4 py-6 pt-10 bg-orange-200/50 relative">
          <h2 className="text-xl text-center font-semibold">
            Nissan Frontier LTE Pick UP Blanc Siege AA-54552
          </h2>
          <IoMdClose
            onClick={() => {
              setShowListOption(false);
            }}
            className="absolute cursor-pointer top-3 right-3 text-2xl text-red-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 gap-y-8 p-4 py-8">
          <Link
            to="/Groupe_vehicule_location"
            onClick={test}
            className="rounded-md shadow-md hover:text-orange-600 cursor-pointer p-3 flex flex-col items-center"
          >
            <FaLocationDot className="text-3xl" />
            <h3>Derniere Pos.</h3>
          </Link>

          <div className="rounded-md shadow-md hover:text-orange-600 cursor-pointer p-3 flex flex-col items-center">
            <BiSolidLocationPlus className="text-4xl" />
            <h3>Groupe</h3>
          </div>

          <div className="rounded-md shadow-md hover:text-orange-600 cursor-pointer p-3 flex flex-col items-center">
            <RiShutDownLine className="text-3xl" />
            <h3>Eteindre</h3>
          </div>

          <div className="rounded-md shadow-md hover:text-orange-600 cursor-pointer p-3 flex flex-col items-center">
            <FaMicrophone className="text-3xl" />
            <h3>Ecouter</h3>
          </div>

          <div className="rounded-md shadow-md hover:text-orange-600 cursor-pointer p-3 flex flex-col items-center">
            <IoStatsChartSharp className="text-3xl" />
            <h3>Rapport</h3>
          </div>

          <div className="rounded-md shadow-md hover:text-orange-600 cursor-pointer p-3 flex flex-col items-center">
            <FaInfoCircle className="text-3xl" />
            <h3>Informations</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Liste_options;
