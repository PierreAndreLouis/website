import React, { useContext } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LuMapPin } from "react-icons/lu";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { DataContext } from "../../context/DataContext";
import { Link } from "react-router-dom";
import Logout from "../login/Logout";
import { IoHomeOutline } from "react-icons/io5";


function SideBar() {
  const {
    search,
    setSearch,
    showSideBar,
    setShowSideBar,
    userData,
    handleLogout,
    fetchVehicleData,
    setSearchQuery,
    logOut,
    setLogOut,
  } = useContext(DataContext);
  return (
    <div
      className={` ${
        showSideBar && "-translate-x-[100%] "
      } md:hidden transition-all bg-black/50--  fixed z-10 inset-0`}
    >
      <div className="transition-all pt-28 relative px-8 max-w-[25rem] h-screen  z-20 bg-white shadow-2xl">
        {logOut && (
          <div className="z-40">
            <Logout setLogOut={setLogOut} />
          </div>
        )}
        <IoCloseSharp
          onClick={() => setShowSideBar(true)}
          className="absolute top-20 right-5 text-2xl text-red-500 cursor-pointer"
        />
        <Link
          onClick={() => setShowSideBar(true)}
          to="/home"
          className="flex text-gray-600 border-b border-gray-300 py-4 gap-4 text-lg hover:text-orange-500 cursor-pointer items-center"
        >
          <IoHomeOutline />
          <h3>Home</h3>
        </Link>
        {/* ---------- */}
        <Link
          onClick={() => setShowSideBar(true)}
          to="/User_Profile"
          className="flex text-gray-600 border-b border-gray-300 py-4 gap-4 text-lg hover:text-orange-500 cursor-pointer items-center"
        >
          <FaRegUser />
          <h3>Profile</h3>
        </Link>
        {/* ---------- */}
        <Link
          onClick={() => setShowSideBar(true)}
          to="/ajouter_vehicule"
          className="flex text-gray-600 border-b border-gray-300 py-4 gap-4 text-lg hover:text-orange-500 cursor-pointer items-center"
        >
          <IoMdAddCircleOutline />
          <h3>Ajouter</h3>
        </Link>
        {/* ---------- */}
        <Link
          onClick={() => setShowSideBar(true)}
          to="/modifier_vehicule"
          className="flex text-gray-600 border-b border-gray-300 py-4 gap-4 text-lg hover:text-orange-500 cursor-pointer items-center"
        >
          <FaRegEdit />
          <h3>Modifier/Supprimer</h3>
        </Link>
        {/* ---------- */}
        <Link
          onClick={() => setShowSideBar(true)}
          to="/Groupe_vehicule_location"
          className="flex text-gray-600 border-b border-gray-300 py-4 gap-4 text-lg hover:text-orange-500 cursor-pointer items-center"
        >
          <LuMapPin />
          <h3>Tout les vehicules</h3>
        </Link>
        {/* ---------- */}
        <Link
          onClick={() => setShowSideBar(true)}
          to="/paiement"
          className="flex text-gray-600 border-b border-gray-300 py-4 gap-4 text-lg hover:text-orange-500 cursor-pointer items-center"
        >
          <FaRegMoneyBillAlt />
          <h3>Paiement</h3>
        </Link>
        {/* ---------- */}

        {/* ---------- */}
        <div
          onClick={() => {
            setLogOut(true);
          }}
          className="flex text-red-600 font-semibold border-b border-gray-300 py-4 gap-4 text-lg hover:text-orange-500 cursor-pointer items-center"
        >
          <MdLogout />
          <h3>Se Deconnecter</h3>
        </div>
        {/* ---------- */}
      </div>
    </div>
  );
}

export default SideBar;
