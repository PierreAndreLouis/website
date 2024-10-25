import React from "react";
import { IoSearch } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header({setSearch}) {

  return (
    <div>
      {/* ------------------------------------ */}
      {/* start of header */}
      <div className="flex justify-between px-4 mt-5 items-center ">
        <div className="flex items-center gap-4">
          <img src="/img/cars/logo.png" className="w-10" alt="" />
          <div>
            <h3 className="text-gray-500 text-sm ">Hello</h3>
            <h2 className="font-semibold text-lg text-gray-600 leading-5">
              Lelevier
            </h2>
          </div>
        </div>

        <div className="flex gap-5">
          <IoSearch onClick={() => {setSearch(true)}} className="text-2xl cursor-pointer text-gray-500" />
          <Link to="/login">
            <FaUserCircle className="text-2xl cursor-pointer text-gray-500" />
          </Link>
        </div>
      </div>
      {/* end of header */}
    </div>
  );
}

export default Header;
