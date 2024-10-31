import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LuMapPin } from "react-icons/lu";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdLogout } from "react-icons/md";



function SideBar({setShowSideBar, showSideBar}) {
  return (
    <div className="fixed inset-0 z-40">
      <div>
        <div className={`${showSideBar && " -translate-x-[100%]"} relative px-8 pt-10 max-w-[25rem] h-screen  z-20 bg-white`}>
        <div className={`${showSideBar && "hidden"} fixed z-10 inset-0 bg-black/50`}></div>
          <IoCloseSharp onClick={() => (setShowSideBar(false))} className="absolute top-5 right-5 text-2xl text-red-500 cursor-pointer"/>
          <div className="flex text-gray-600 border-b border-gray-300 py-4 gap-4 text-lg hover:text-orange-500 cursor-pointer items-center">
            <FaRegUser />
            <h3>Profile</h3>
          </div>
          {/* ---------- */}
          <div className="flex text-gray-600 border-b border-gray-300 py-4 gap-4 text-lg hover:text-orange-500 cursor-pointer items-center">
            <IoMdAddCircleOutline />
            <h3>Ajouter</h3>
          </div>
          {/* ---------- */}
          <div className="flex text-gray-600 border-b border-gray-300 py-4 gap-4 text-lg hover:text-orange-500 cursor-pointer items-center">
            <FaRegEdit />
            <h3>Modifier/Supprimer</h3>
          </div>
          {/* ---------- */}
          <div className="flex text-gray-600 border-b border-gray-300 py-4 gap-4 text-lg hover:text-orange-500 cursor-pointer items-center">
            <LuMapPin />
            <h3>Tout les vehicules</h3>
          </div>
          {/* ---------- */}
          <div className="flex text-gray-600 border-b border-gray-300 py-4 gap-4 text-lg hover:text-orange-500 cursor-pointer items-center">
            <FaRegMoneyBillAlt />
            <h3>Paiement</h3>
          </div>
          {/* ---------- */}
     
          
          {/* ---------- */}
          <div className="flex text-red-600 font-semibold border-b border-gray-300 py-4 gap-4 text-lg hover:text-orange-500 cursor-pointer items-center">
            <MdLogout />
            <h3>Se Deconnecter</h3>
          </div>
          {/* ---------- */}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
