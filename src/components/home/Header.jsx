import React, { useContext, useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import Logout from "../login/Logout";
import { IoMdClose } from "react-icons/io";
import { HiOutlineViewList } from "react-icons/hi";
import Search_bar from "./Search_bar";
import Navigation_bar from "./Navigation_bar";

function Header({}) {
  const {
    userData,
    search,
    handleLogout,
    setShowSideBar,
    fetchVehicleData,
    setSearchQuery,
  } = useContext(DataContext);
  const navigate = useNavigate();

  const [logOut, setLogOut] = useState(false);
  // Initialise la valeur à partir du localStorage
  const [searchVehicule, setSearchVehicule] = useState(() => {
    const savedValue = localStorage.getItem('searchVehicule');
    return savedValue ? JSON.parse(savedValue) : false;
  });

  // Met à jour le localStorage quand searchVehicule change
  useEffect(() => {
    localStorage.setItem('searchVehicule', JSON.stringify(searchVehicule));
  }, [searchVehicule]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = () => {
    setSearchQuery(searchTerm); // Mettre à jour le terme de recherche dans le contexte
    // navigate("/home");
  };

  // Utilise useEffect pour déclencher handleSearchSubmit automatiquement lorsque searchTerm change
  useEffect(() => {
    if (searchTerm) {
      handleSearchSubmit();
    }
  }, [searchTerm]);

  return (
    <div className="fixed md:hidden z-50 bg-white top-0 left-0 right-0 pb-2">
      {logOut && <Logout setLogOut={setLogOut} />}
      {searchVehicule && (
        <form className="fixed top-0 left-0 right-0 bg-white">
          <div className="mt-4 px-4">
            <div className="border-2 flex gap-3 justify-center items-center rounded-lg overflow-hidden">
              <input
                className="p-2 focus:outline-none w-full"
                type="text"
                placeholder="Recherche"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IoSearch onClick={() => {navigate("/home");}} className="text-2xl text-gray-500 cursor-pointer" />
              <IoMdClose
                onClick={() => {
                  setSearchVehicule(false);
                  setSearchTerm("");
                  setSearchQuery("");
                }}
                className="text-3xl text-red-500 cursor-pointer mr-4"
              />
            </div>
          </div>
        </form>
      )}
      <div className="flex justify-between px-4 mt-3 items-center">
        <div className="flex items-center gap-4">
          <img src="/img/cars/logo.png" className="w-10" alt="" />
          <div>
            <h3 onClick={fetchVehicleData} className="text-gray-500 text-sm">
              Hello
            </h3>
            <h2 className="font-semibold text-lg text-gray-600 leading-5">
              {(userData && userData.contactName) || "Nom vide"}
            </h2>
          </div>
        </div>
        <div className="flex gap-3">
          <IoSearch
            onClick={() => {
              setSearchVehicule(true);
              
            }}
            className="text-2xl cursor-pointer text-gray-500"
          />
          <div onClick={() => setShowSideBar(false)}>
            <HiOutlineViewList className="text-2xl cursor-pointer text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
