import React, { useContext, useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LuMapPin } from "react-icons/lu";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { DataContext } from "../../context/DataContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logout from "../login/Logout";
import { IoHomeOutline } from "react-icons/io5";
import { FaCar } from "react-icons/fa";

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
    handleTabClick,
    tab,
  } = useContext(DataContext);

  // Hooks pour gérer l'URL et la navigation
  // const location = useLocation();
  // const navigate = useNavigate();
  // const [tab, setTab] = useState("");

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(location.search);
  //   const tabFromUrl = urlParams.get("tab");
  //   if (tabFromUrl) {
  //     setTab(tabFromUrl);
  //   }
  // }, [location.search]);

  // const handleTabClick = (tabName) => {
  //   setTab(tabName);
  //   navigate(`/home?tab=${tabName}`); // met à jour l'URL avec le paramètre `tab`
  // };

  return (
    <div
      className={` ${
        showSideBar && "-translate-x-[100%] "
      } md:hidden--- transition-all bg-black/50--  fixed z-10 inset-0`}
    >
      <div className="overflow-auto transition-all pt-20 relative px-8 max-w-[25rem] h-screen  z-20 bg-white shadow-2xl">
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
          to="/home?tab=acceuil"
          onClick={() => {
            setShowSideBar(true);
            handleTabClick("accueil");
          }}
          className={`flex text-gray-600 border-b border-gray-300 py-4 gap-4 text-lg hover:text-orange-500 cursor-pointer items-center ${
            tab === "acceuil" && "text-orange-500"
          }`}
        >
          <IoHomeOutline />
          <h3>Accueil</h3>
        </Link>

        <Link
          to="/User_Profile?tab=profile"
          onClick={() => {
            setShowSideBar(true);
            handleTabClick("profil");
          }}
          className={`flex text-gray-600 border-b border-gray-300 py-4 gap-4 text-lg hover:text-orange-500 cursor-pointer items-center ${
            tab === "profile" && "text-orange-500"
          }`}
        >
          <FaRegUser />
          <h3>Mon Profil</h3>
        </Link>

        <Link
          to="/ajouter_vehicule?tab=ajouter"
          onClick={() => {
            setShowSideBar(true);
            handleTabClick("ajouter");
          }}
          className={`flex text-gray-600 border-b border-gray-300 py-4 gap-4 text-lg hover:text-orange-500 cursor-pointer items-center ${
            tab === "ajouter" && "text-orange-500"
          }`}
        >
          <IoMdAddCircleOutline />
          <h3>Ajouter un Véhicule</h3>
        </Link>

        <Link
          to="/modifier_vehicule?tab=modifier"
          onClick={() => {
            setShowSideBar(true);
            handleTabClick("modifier");
          }}
          className={`flex text-gray-600 border-b border-gray-300 py-4 gap-4 text-lg hover:text-orange-500 cursor-pointer items-center ${
            tab === "modifier" && "text-orange-500"
          }`}
        >
          <FaRegEdit />
          <h3>Modifier/Supprimer un Véhicule</h3>
        </Link>

        <Link
          onClick={() => {
            setShowSideBar(true);
            handleTabClick("localisation");
          }}
          className={`flex text-gray-600 border-b border-gray-300 py-4 gap-4 text-lg hover:text-orange-500 cursor-pointer items-center ${
            tab === "localisation" && "text-orange-500"
          }`}
        >
          <LuMapPin />
          <h3>Localisation des véhicules</h3>
        </Link>

        <Link
          to="/rapport_vehicule?tab=rapport"
          onClick={() => {
            setShowSideBar(true);
            handleTabClick("rapport");
          }}
          className={`flex text-gray-600 border-b border-gray-300 py-4 gap-4 text-lg hover:text-orange-500 cursor-pointer items-center ${
            tab === "rapport" && "text-orange-500"
          }`}
        >
          <FaCar />
          <h3>Rapport des véhicules</h3>
        </Link>

        <div
          onClick={() => {
            setLogOut(true);
          }}
          className="flex text-red-600 font-semibold border-b border-gray-300 py-4 gap-4 text-lg hover:text-orange-500 cursor-pointer items-center"
        >
          <MdLogout />
          <h3>Déconnexion</h3>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
