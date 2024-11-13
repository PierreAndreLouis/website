import React, { useContext, useEffect, useState } from "react";
import { IoMdHome } from "react-icons/io";
import { FaPlus, FaRegEdit, FaListUl, FaCar } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { DataContext } from "../../context/DataContext";

function Navigation_bar({ setAddVehicule, setModifierVehicule }) {
  const {
    firstCallRapportData,
    vehicleData,
    mergedData,
    isLoading,
    handleTabClick,
    tab,
  } = useContext(DataContext);



  return (
    <div className="md:hidden z-[1] grid grid-cols-5 gap-4 justify-between px-4 bg-gray-200 py-0 fixed bottom-0 left-0 right-0 ">
      <Link
        to="/home?tab=acceuil"
        onClick={() => handleTabClick("acceuil")}
        className={`${
          tab === "acceuil" && "text-orange-500"
        } flex flex-col cursor-pointer hover:text-orange-500 justify-center items-center text-gray-600 `}
      >
        <IoMdHome className="text-xl" />
        <h3 className="text-sm">Home</h3>
      </Link>

      <Link
        to="/modifier_vehicule?tab=modifier"
        onClick={() => handleTabClick("modifier")}
        className={`${
          tab === "modifier" && "text-orange-500"
        } flex flex-col cursor-pointer hover:text-orange-500 justify-center items-center text-gray-600`}
      >
        <FaRegEdit className="text-xl" />
        <h3 className="text-sm">Modifier</h3>
      </Link>

      <div className="flex justify-center items-center">
        <Link
          to="/ajouter_vehicule?tab=ajouter"
          onClick={() => handleTabClick("ajouter")}
          className="min-w-14 h-14 cursor-pointer -translate-y-3 border-4 border-gray-200 bg-orange-500 flex justify-center items-center rounded-full "
        >
          <FaPlus className="text-white text-xl" />
        </Link>
      </div>

      <Link
        to="/rapport_vehicule?tab=rapport"
        onClick={() => handleTabClick("rapport")}
        className={`${
          tab === "rapport" && "text-orange-500"
        } flex flex-col cursor-pointer hover:text-orange-500 justify-center items-center text-gray-600`}
      >
        <FaCar className="text-xl" />
        <h3 className="text-sm">Rapport</h3>
      </Link>

      <Link
        to="/User_Profile?tab=profile"
        onClick={() => handleTabClick("profile")}
        className={`${
          tab === "profile" && "text-orange-500"
        } flex flex-col cursor-pointer hover:text-orange-500 justify-center items-center text-gray-600`}
      >
        <FaRegCircleUser className="text-xl" />
        <h3 className="text-sm">Profile</h3>
      </Link>
    </div>
  );
}

export default Navigation_bar;
