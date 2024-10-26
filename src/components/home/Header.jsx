import React, { useContext, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import Logout from "../login/Logout";

function Header({ setSearch }) {
  const { userData, handleLogout, fetchVehicleData } = useContext(DataContext);
  const [logOut, setLogOut] = useState(false);
  // console.log("aaaaaaaaaaaaaaaa", userData);
  // console.log("bbbbbbbbbbbbbbbb", userData && userData.contactName);
  return (
    <div>
      {/* ------------------------------------ */}
      {logOut && 
        <Logout setLogOut={setLogOut} />
      }
      {/* start of header */}
      <div className="flex justify-between px-4 mt-5 items-center ">
        <div className="flex items-center gap-4">
          <img src="/img/cars/logo.png" className="w-10" alt="" />
          <div>
            <h3 onClick={fetchVehicleData} className="text-gray-500 text-sm ">Hello</h3>
            <h2 className="font-semibold text-lg text-gray-600 leading-5">
              {userData && userData.contactName || "Nom vide"}
            </h2>
          </div>
        </div>

        <div className="flex gap-3">
          <IoSearch
            onClick={() => {setSearch(true)}}
            className="text-2xl cursor-pointer text-gray-500"
          />
          <div 
          onClick={() => {setLogOut(true)}}
          >
            
            <FaUserCircle className="text-2xl cursor-pointer text-gray-500" />
          </div>
        </div>
      </div>
      {/* end of header */}
    </div>
  );
}

export default Header;
