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
    <div>
      {/* Section de l'icône utilisateur */}
      <div className="flex mt-24 md:mt-28 justify-center items-center">
        <FaUserCircle className="text-gray-300 dark:text-gray-300 w-[25rem] h-24" />
      </div>

      {/* Titre principal */}
      <h1 className="text-center font-bold text-xl mt-4 text-gray-700 dark:text-gray-100">
        Mon Profil
      </h1>

      {/* Section des informations utilisateur */}
      <div className="mt-8 bg-gray-100 dark:bg-gray-800 max-w-[50rem] mx-auto py-4 rounded-xl px-4 sm:px-[10vw] flex flex-col gap-2">
        {/* Compte */}
        <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 dark:border-gray-600 pb-2">
          <h3 className="font-bold text-gray-600 dark:text-gray-100 min-w-[11.8rem] lg:min-w-[16rem]">
            Compte :
          </h3>
          <p className="pl-3 text-gray-500 dark:text-gray-300">{account || "-----"}</p>
        </div>

        {/* Nom d'utilisateur */}
        <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 dark:border-gray-600 pb-2">
          <h3 className="font-bold text-gray-600 dark:text-gray-100 min-w-[11.8rem] lg:min-w-[16rem]">
            Nom d'utilisateur :
          </h3>
          <p className="pl-3 text-gray-500 dark:text-gray-300">{username || "-----"}</p>
        </div>

        {/* Mot de passe */}
        <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 dark:border-gray-600 pb-2">
          <h3 className="font-bold text-gray-600 dark:text-gray-100 min-w-[11.8rem] lg:min-w-[16rem]">
            Mot de passe :
          </h3>
          <p className="pl-3 text-gray-500 dark:text-gray-300">**********</p>
        </div>

        {/* Fuseau horaire */}
        <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 dark:border-gray-600 pb-2">
          <h3 className="font-bold text-gray-600 dark:text-gray-100 min-w-[11.8rem] lg:min-w-[16rem]">
            Fuseau horaire :
          </h3>
          <p className="pl-3 text-gray-500 dark:text-gray-300">
            {userData?.timeZone || "-----"}
          </p>
        </div>

        {/* Adresse */}
        <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 dark:border-gray-600 pb-2">
          <h3 className="font-bold text-gray-600 dark:text-gray-100 min-w-[11.8rem] lg:min-w-[16rem]">
            Adresse :
          </h3>
          <p className="pl-3 text-gray-500 dark:text-gray-300">
            {userData?.addressCity || "-----"}
          </p>
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="grid max-w-[30rem] mx-auto grid-cols-1 xs:grid-cols-2 mt-10 gap-2">
        {username === "admin" && (
          <div
            onClick={() => {
              setShowChangePasswordPupup(true);
            }}
            className="text-orange-500 dark:text-orange-400 cursor-pointer text-center rounded-lg px-3 border border-orange-500 dark:border-orange-400 py-2 hover:bg-orange-100 dark:hover:bg-orange-900"
          >
            Changer le mot de passe
          </div>
        )}
        <button
          onClick={() => {
            setLogOut(true);
          }}
          className="bg-orange-500 dark:bg-orange-400 text-center rounded-lg px-3 text-white py-2 hover:bg-orange-600 dark:hover:bg-orange-500"
        >
          Se Déconnecter
        </button>
      </div>
    </div>
  );
}

export default InfoUserComponent;
