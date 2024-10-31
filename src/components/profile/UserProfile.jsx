import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import Navigation_bar from "../home/Navigation_bar";
import PC_header from "../home/PC_header";
import { FaUserCircle } from "react-icons/fa";
import Logout from "../login/Logout";
import { Link } from "react-router-dom";

function UserProfile() {
  const { currentVehicule, userData } = useContext(DataContext); // fetchVehicleDetails importée du contexte
  const [logOut, setLogOut] = useState(false);

  console.log(currentVehicule?.description || "no data");

  return (
    <div className="px-4 pb-20">
      <Navigation_bar />
      <PC_header />
      {logOut && <Logout setLogOut={setLogOut} />}

      <div>
        <div className="flex mt-12 md:mt-28 justify-center items-center">
          <FaUserCircle className="text-gray-300 w-[25rem]  h-24" />
        </div>

        <h1 className="text-center font-bold text-xl mt-4 text-gray-700">
          Votre Profile
        </h1>
        <div className="mt-8 bg-gray-100 max-w-[50rem] mx-auto py-4 rounded-xl px-4 sm:px-[10vw] flex flex-col gap-2">
        <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2">
            <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] ">
              AccountID
            </h3>
            <p className="pl-3 text-gray-500">
              {userData?.accountID || "-----"}
            </p>
          </div>
          <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2">
            <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] ">
              Nom :
            </h3>
            <p className="pl-3 text-gray-500">
              {userData?.description || "-----"}
            </p>
          </div>
          <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2">
            <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] ">
              Password
            </h3>
            <p className="pl-3 text-gray-500">
              {userData?.password || "-----"}
              {/* FCPlelevier@2024 */}
            </p>
          </div>
          <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2">
            <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] ">
              timeZone :
            </h3>
            <p className="pl-3 text-gray-500">
              {userData?.timeZone || "-----"}
            </p>
          </div>
          <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2">
            <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] ">
              Address :
            </h3>
            <p className="pl-3 text-gray-500">
              {userData?.addressCity || "-----"}
            </p>
          </div>
     
        </div>
        <div className="grid max-w-[30rem] mx-auto grid-cols-2 mt-4 gap-2 ">
          <Link
            to="/Change_Password"
            className="text-orange-500 text-center rounded-lg px-3 border border-orange-500 py-2"
          >
            Changer mot de passe
          </Link>
          <button
            onClick={() => {
              setLogOut(true);
            }}
            className="bg-orange-500 text-center rounded-lg px-3 text-white py-2"
          >
            Se Deconnecter
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
