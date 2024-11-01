// src/pages/Home.jsx
import React, { useContext, useEffect, useState } from "react";

import Header from "../components/home/Header";
import Statistics from "../components/home/Statistics";
import Liste from "../components/home/Liste";
import PC_header from "../components/home/PC_header";
import Navigation_bar from "../components/home/Navigation_bar";
import Liste_options from "../components/home/Liste_options";
import Ajouter_vehicule from "../components/ajouter_modifier/Ajouter_vehicule";
import Modifier_vehicule from "../components/ajouter_modifier/Modifier_vehicule";
import Search_bar from "../components/home/Search_bar";
import { DataContext } from "../context/DataContext";
import ExamplePage from "../components/location/ExamplePage";
import SideBar from "../components/home/SideBar";
import { FaRegEdit } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LuMapPin } from "react-icons/lu";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import Logout from "../components/login/Logout";
import { RiWifiOffLine } from "react-icons/ri";

const Home = () => {
  const [showListeOption, setShowListOption] = useState(false);
  const [search, setSearch] = useState(false);
  const [showSideBar, setShowSideBar] = useState(true);

  const { vehicleData, isLoading } = useContext(DataContext);
  const [logOut, setLogOut] = useState(false);

  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    // Détecter la perte de connexion
    const handleOffline = () => setIsOffline(true);
    // Détecter le retour de la connexion
    const handleOnline = () => setIsOffline(false);

    // Ajouter les écouteurs d'événements
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    // Nettoyage des écouteurs d'événements
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return (
    <div className="sm:px-10 md:px-14 lg:px-20">
      <Navigation_bar />
      <PC_header />

      <div
        className={`${
          showSideBar && "hidden"
        } md:hidden fixed z-10 inset-0 bg-black/50`}
      ></div>
      <div
        className={` ${
          showSideBar && "-translate-x-[100%]"
        } md:hidden transition-all fixed z-10 inset-0`}
      >
        <div className="transition-all relative px-8 pt-10 max-w-[25rem] h-screen  z-20 bg-white">
          {logOut && (
            <div className="z-40">
              <Logout setLogOut={setLogOut} />
            </div>
          )}
          {/* <div className={`${showSideBar && " -translate-x-[100%]"} transition-all relative px-8 pt-10 max-w-[25rem] h-screen  z-20 bg-white`}> */}
          <IoCloseSharp
            onClick={() => setShowSideBar(true)}
            className="absolute top-5 right-5 text-2xl text-red-500 cursor-pointer"
          />
          <Link
            to="/User_Profile"
            className="flex text-gray-600 border-b border-gray-300 py-4 gap-4 text-lg hover:text-orange-500 cursor-pointer items-center"
          >
            <FaRegUser />
            <h3>Profile</h3>
          </Link>
          {/* ---------- */}
          <Link
            to="/ajouter_vehicule"
            className="flex text-gray-600 border-b border-gray-300 py-4 gap-4 text-lg hover:text-orange-500 cursor-pointer items-center"
          >
            <IoMdAddCircleOutline />
            <h3>Ajouter</h3>
          </Link>
          {/* ---------- */}
          <Link
            to="/modifier_vehicule"
            className="flex text-gray-600 border-b border-gray-300 py-4 gap-4 text-lg hover:text-orange-500 cursor-pointer items-center"
          >
            <FaRegEdit />
            <h3>Modifier/Supprimer</h3>
          </Link>
          {/* ---------- */}
          <Link
            to="/Groupe_vehicule_location"
            className="flex text-gray-600 border-b border-gray-300 py-4 gap-4 text-lg hover:text-orange-500 cursor-pointer items-center"
          >
            <LuMapPin />
            <h3>Tout les vehicules</h3>
          </Link>
          {/* ---------- */}
          <Link
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

      {/* <SideBar showSideBar={showSideBar} setShowSideBar={setShowSideBar} /> */}
      <div className="md:hidden">
        <Header setSearch={setSearch} setShowSideBar={setShowSideBar} />
        {search && <Search_bar setSearch={setSearch} />}
        <Navigation_bar />
      </div>
      <Statistics />
      {isLoading ||
        (!vehicleData && (
          <div className="fixed inset-0 bg-gray-200/50">
            <div className="w-full h-full flex justify-center items-center">
              <div className="border-blue-500 h-20 w-20 animate-spin rounded-full border-8 border-t-gray-100/0" />
            </div>
          </div>
        ))}
      {isOffline && (
        <div className="shadow-md flex gap-2 justify-center md:gap-6 rounded-lg mx-5 p-3 text-center bg-red-100">
   
            <RiWifiOffLine className="translate-y-0 text-red-700 text-4xl"/>
          <h3 className="text-red-700">
            Vous êtes hors ligne. Veuillez vérifier votre connexion internet.
          </h3>
        </div>
      )}
      <Liste setShowListOption={setShowListOption} />
      {showListeOption && (
        <Liste_options setShowListOption={setShowListOption} />
      )}
    </div>
  );
};

export default Home;
