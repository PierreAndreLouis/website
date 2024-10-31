import React, { useContext, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import Logout from "../login/Logout";
import { IoMdClose } from "react-icons/io";
import { HiOutlineViewList } from "react-icons/hi";


function Header({setShowSideBar}) {
  const { userData, handleLogout, fetchVehicleData, setSearchQuery } = useContext(DataContext);
  const [logOut, setLogOut] = useState(false);
  const [searchVehicule, setSearchVehicule] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchTerm); // Mettre à jour le terme de recherche dans le contexte
  };

  return (
    <div>
      {logOut && <Logout setLogOut={setLogOut} />}
      {searchVehicule && (
        <form className="fixed top-0 left-0 right-0 bg-white" onSubmit={handleSearchSubmit}>
          <div className="mt-4 px-4">
            <div className="border-2 flex gap-3 justify-center items-center rounded-lg overflow-hidden">
              <input
                className="p-2 focus:outline-none w-full"
                type="text"
                placeholder="Recherche"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">
                <IoSearch className="text-2xl text-gray-500 cursor-pointer" />
              </button>
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
      <div className="flex justify-between px-4 mt-5 items-center ">
        <div className="flex items-center gap-4">
          <img src="/img/cars/logo.png" className="w-10" alt="" />
          <div>
            <h3 onClick={fetchVehicleData} className="text-gray-500 text-sm ">
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
          <div
            onClick={() => {
              setShowSideBar(false);
            }}
          >
            <HiOutlineViewList className="text-2xl cursor-pointer text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
