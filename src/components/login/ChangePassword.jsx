import React, { useContext } from "react";
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";
import { DataContext } from "../../context/DataContext";
import Navigation_bar from "../home/Navigation_bar";
import PC_header from "../home/PC_header";
import { Link } from "react-router-dom";

function ChangePassword() {
  const { currentVehicule, setIsPasswordConfirmed, account, username, password, userData } =
    useContext(DataContext); // fetchVehicleDetails importée du contexte

  return (
    <div className="pb-20">
      {/* {changePassword && ( */}

      <Navigation_bar />
      <PC_header />
      <div id="" className={" flex w-full  bg-white justify-center"}>
        <div className=" w-full flex justify-center  pb-3">
          <div className="bg-white max-w-[30remx] md:px-[20vw] lg:px-[28vw] w-full  --shadow-lg overflow-auto">
            <div className="flex justify-center items-center w-full py-2 pt-10 mb-10">
              <RiLockPasswordFill className="text-2xl mr-2 text-orange-500" />
              <h3
                onClick={() => {
                  console.log(userData);
                }}
                className="text-center  font-semibold text-gray-600 text-xl"
              >
                Changer de mot de passe
              </h3>
            </div>
            <form action="#" method="POST" className="space-y-4 px-4 pb-4">
              <div>
                <label
                  htmlFor="account"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Compte
                </label>
                <div className="mt-2">
                  <input
                    id="account"
                    name="account"
                    type="text"
                    value={account || "-----"}
                    placeholder="nom du compte"
                    required
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 -----focus:ring-2 -----focus:ring-inset -----focus:ring-orange-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nom d'utilisateur
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={username || "---"}
                    placeholder="nom"
                    required
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 -----focus:ring-2 -----focus:ring-inset -----focus:ring-orange-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Mot de passe
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    value={password || "-----"}
                    type="text"
                    placeholder="password"
                    required
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 -----focus:ring-2 -----focus:ring-inset -----focus:ring-orange-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nouveau mot de passe
                </label>
                <div className="mt-2">
                  <input
                    id="new-password"
                    name="new-password"
                    type="password"
                    placeholder="password"
                    required
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 -----focus:ring-2 -----focus:ring-inset -----focus:ring-orange-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirmer mot de passe
                </label>
                <div className="mt-2">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    placeholder="password"
                    required
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 -----focus:ring-2 -----focus:ring-inset -----focus:ring-orange-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="grid mb-20 grid-cols-2 gap-2 pt-10">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 -----focus-visible:outline -----focus-visible:outline-2 -----focus-visible:outline-offset-2 -----focus-visible:outline-orange-600"
                >
                  Modifier
                </button>
                <Link
                  to="/User_Profile"
                  onClick={() => {
                    setIsPasswordConfirmed(false);
                  }}
                  className="flex cursor-pointer w-full justify-center rounded-md border text-orange-500 border-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm -----focus-visible:outline -----focus-visible:outline-2 -----focus-visible:outline-offset-2 -----focus-visible:outline-orange-600"
                >
                  Annuler
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}

export default ChangePassword;
