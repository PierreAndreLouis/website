import React, { useContext, useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import Logout from "../login/Logout";
import { IoMdClose } from "react-icons/io";
import { HiOutlineViewList } from "react-icons/hi";
import Search_bar from "./Search_bar";
import Navigation_bar from "./Navigation_bar";
import { toggleTheme } from "../../theme/themeSlice";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

function Header() {
  const {
    userData,
    search,
    handleLogout,
    setShowSideBar,
    showSideBar,
    fetchVehicleData,
    setSearchQuery,
    tab,
    handleTabClick,
  } = useContext(DataContext);
  const navigate = useNavigate();

  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const location = useLocation();

  const { currentUser } = useSelector((state) => state.user);

  const [logOut, setLogOut] = useState(false);
  const [searchVehicule, setSearchVehicule] = useState(() => {
    const savedValue = localStorage.getItem("searchVehicule");
    return savedValue ? JSON.parse(savedValue) : false;
  });

  useEffect(() => {
    localStorage.setItem("searchVehicule", JSON.stringify(searchVehicule));
  }, [searchVehicule]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = () => {
    setSearchQuery(searchTerm);
  };

  useEffect(() => {
    if (searchTerm) {
      handleSearchSubmit();
    }
  }, [searchTerm]);

  return (
    <div className="fixed md:shadow-md md:py-1 md:px-20 z-50 bg-white dark:bg-gray-800 top-0 left-0 right-0 pb-2">
      {logOut && <Logout setLogOut={setLogOut} />}
      {searchVehicule && (
        <form className="fixed flex justify-center items-center -top-2 left-0 lg:left-[15rem] lg:right-[15rem] right-0 bg-white lg:bg-white/0 dark:bg-gray-800 dark:text-white">
          <div className="mt-4 px-4 max-w-[34rem] w-full">
            <div className="border-2 bg-white dark:bg-gray-700 flex gap-3 justify-center items-center rounded-lg overflow-hidden">
              <input
                className="p-2 focus:outline-none w-full dark:bg-gray-600 dark:text-white"
                type="text"
                placeholder="Recherche"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IoSearch
                onClick={() => {
                  navigate("/home");
                }}
                className="text-2xl text-gray-500 dark:text-gray-200 cursor-pointer"
              />
              <IoMdClose
                onClick={() => {
                  setSearchVehicule(false);
                  setSearchTerm("");
                  setSearchQuery("");
                }}
                className="text-3xl text-red-500 dark:text-red-400 cursor-pointer mr-4"
              />
            </div>
          </div>
        </form>
      )}
      <div className="flex justify-between px-4 py-1 items-center dark:text-white">
        <div className="flex items-center gap-4">
          <Link onClick={() => handleTabClick("acceuil")} to="/home?tab=acceuil">
            <img src="/img/cars/logo.png" className="w-10" alt="Logo" />
          </Link>
          <div>
            <h3 onClick={fetchVehicleData} className="text-gray-500 dark:text-gray-300 text-sm">
              Hello...
            </h3>
            <h2 className="font-semibold text-lg text-gray-600 dark:text-gray-200 leading-5">
              {(userData && userData.contactName) || "Nom vide"}
            </h2>
          </div>
        </div>
        <div className="hidden lg:flex justify-center items-center gap-5 font-semibold text-gray-700 dark:text-gray-300">
          <Link
            onClick={() => handleTabClick("acceuil")}
            to="/home?tab=acceuil"
            className={`${
              tab === "acceuil" && "text-orange-500"
            } hover:text-orange-500 cursor-pointer`}
          >
            Accueil
          </Link>
          <Link
            onClick={() => handleTabClick("ajouter")}
            to="/ajouter_vehicule?tab=ajouter"
            className={`${
              tab === "ajouter" && "text-orange-500"
            } hover:text-orange-500 cursor-pointer`}
          >
            Ajouter
          </Link>
          <Link
            onClick={() => handleTabClick("modifier")}
            to="/modifier_vehicule?tab=modifier"
            className={`${
              tab === "modifier" && "text-orange-500"
            } hover:text-orange-500 cursor-pointer`}
          >
            Modifier/Supprimer
          </Link>
          <Link
            to="/Groupe_vehicule_location?tab=localisation"
            onClick={() => handleTabClick("localisation")}
            className={`${
              tab === "localisation" && "text-orange-500"
            } hover:text-orange-500 cursor-pointer`}
          >
            Localisation
          </Link>
          <Link
            to="/rapport_vehicule?tab=rapport"
            onClick={() => handleTabClick("rapport")}
            className={`${
              tab === "rapport" && "text-orange-500"
            } hover:text-orange-500 cursor-pointer`}
          >
            Rapport
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          <IoSearch
            onClick={() => {
              setSearchVehicule(true);
            }}
            className="text-2xl cursor-pointer text-gray-500 dark:text-gray-200"
          />
          {/* <button className="text-gray-500 dark:text-gray-200" onClick={() => dispatch(toggleTheme())}>
            {theme === "light" ? <FaSun /> : <FaMoon />}
          </button> */}
          <Link
            className="hidden lg:block"
            onClick={() => handleTabClick("profile")}
            to="/User_Profile?tab=profile"
          >
            <FaUserCircle
              className={`${
                tab === "profile" && "text-orange-500"
              } hover:text-orange-500 cursor-pointer text-gray-500 text-2xl dark:text-gray-200`}
            />
          </Link>
          <div onClick={() => setShowSideBar(!showSideBar)}>
            <HiOutlineViewList className="text-2xl cursor-pointer text-gray-500 dark:text-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
