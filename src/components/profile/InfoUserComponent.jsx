import React from "react";
import { FaUserCircle } from "react-icons/fa";

function InfoUserComponent({
  account,
  username,
  userData,
  setShowChangePasswordPupup,
  setLogOut,
}) {
  return (
    <>
      <div>
        <div className="flex mt-24 md:mt-28 justify-center items-center">
          <FaUserCircle className="text-gray-300 w-[25rem] h-24" />
        </div>

        <h1 className="text-center font-bold text-xl mt-4 text-gray-700">
          Mon Profil
        </h1>
        <div className="mt-8 bg-gray-100 max-w-[50rem] mx-auto py-4 rounded-xl px-4 sm:px-[10vw] flex flex-col gap-2">
          <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2">
            <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] ">
              Account
            </h3>
            <p className="pl-3 text-gray-500">{account || "-----"}</p>
          </div>
          <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2">
            <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] ">
              Nom d'utilisateur:
            </h3>
            <p className="pl-3 text-gray-500">{username || "-----"}</p>
          </div>
          <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2">
            <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] ">
              Mot de passe
            </h3>
            <p className="pl-3 text-gray-500">**********</p>
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
              Adresse :
            </h3>
            <p className="pl-3 text-gray-500">
              {userData?.addressCity || "-----"}
            </p>
          </div>
        </div>
        <div className="grid max-w-[30rem] mx-auto grid-cols-1 sm:grid-cols-2 mt-10 gap-2 ">
          {username === "admin" && (
            <div
              onClick={() => {
                setShowChangePasswordPupup(true);
              }}
              className="text-orange-500 cursor-pointer text-center rounded-lg px-3 border border-orange-500 py-2"
            >
              Changer le mot de passe
            </div>
          )}
          <button
            onClick={() => {
              setLogOut(true);
            }}
            className="bg-orange-500 text-center rounded-lg px-3 text-white py-2"
          >
            Se Déconnecter
          </button>
        </div>
      </div>
    </>
  );
}

export default InfoUserComponent;
