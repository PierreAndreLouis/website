import React from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaCar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navigation_bar from "../home/Navigation_bar";
import PC_header from "../home/PC_header";

function Ajouter_vehicule() {
  return (
    <div>
      <Navigation_bar />
      <PC_header />

      <div id="" className={"flex w-full justify-center h-full md:mt-20"}>
        <div className=" w-full flex justify-center ">
          <div className="bg-white max-w-[30rem] w-full shadow-lg overflow-auto">
            <div className="flex justify-center items-center w-full py-10">
              <FaCar className="text-2xl mr-2 text-orange-500" />
              <h3 className="text-center font-semibold text-gray-600 text-xl">
                Nouvelle Appareil
              </h3>
            </div>
            <form action="#" method="POST" className="space-y-4 px-4 pb-4">
              {/* -------------------------------------------- */}
              <div>
                <label
                  htmlFor="account"
                  className="block text-md font-medium leading-6 text-gray-700"
                >
                  Imei
                </label>
                <div className="mt-2">
                  <input
                    id="account"
                    name="account"
                    type="text"
                    placeholder="Imei"
                    required
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 --------focus:ring-2 --------focus:ring-inset --------focus:ring-orange-600 sm:text-md sm:leading-6"
                  />
                </div>
              </div>

              {/* -------------------------------------- */}

              <div>
                <label
                  htmlFor="username"
                  className="block text-md font-medium leading-6 text-gray-700"
                >
                  Identificateur unique
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="tk + IMEI"
                    required
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 --------focus:ring-2 --------focus:ring-inset --------focus:ring-orange-600 sm:text-md sm:leading-6"
                  />
                </div>
              </div>
              {/* ------------------------------------------- */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-md font-medium leading-6 text-gray-700"
                >
                  Description du vehicule
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="description"
                    required
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 --------focus:ring-2 --------focus:ring-inset --------focus:ring-orange-600 sm:text-md sm:leading-6"
                  />
                </div>
              </div>
              {/* ---------------------------------------------------- */}
              <div>
                <label
                  htmlFor="new-password"
                  className="block text-md font-medium leading-6 text-gray-700"
                >
                  Nom court du vehicule
                </label>
                <div className="mt-2">
                  <input
                    id="new-password"
                    name="new-password"
                    type="password"
                    placeholder="Nom du vehicule"
                    required
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 --------focus:ring-2 --------focus:ring-inset --------focus:ring-orange-600 sm:text-md sm:leading-6"
                  />
                </div>
              </div>
              {/* ------------------------------------------------------ */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-md font-medium leading-6 text-gray-700"
                >
                  Chassis du vehicule
                </label>
                <div className="mt-2">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    placeholder="Chasis"
                    required
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 --------focus:ring-2 --------focus:ring-inset --------focus:ring-orange-600 sm:text-md sm:leading-6"
                  />
                </div>
              </div>

              {/* ------------------------------------------------------ */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-md font-medium leading-6 text-gray-700"
                >
                  Plaque du vehicule
                </label>
                <div className="mt-2">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    placeholder="Plaque"
                    required
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 --------focus:ring-2 --------focus:ring-inset --------focus:ring-orange-600 sm:text-md sm:leading-6"
                  />
                </div>
              </div>

              {/* ------------------------------------------------------ */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-md font-medium leading-6 text-gray-700"
                >
                  Type appareil
                </label>
                <div className="mt-2">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    placeholder="BO? B1? B2?"
                    required
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 --------focus:ring-2 --------focus:ring-inset --------focus:ring-orange-600 sm:text-md sm:leading-6"
                  />
                </div>
              </div>

              {/* ------------------------------------------------------ */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-md font-medium leading-6 text-gray-700"
                >
                  Numero du sim
                </label>
                <div className="mt-2">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    placeholder="Numero du sim"
                    required
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 --------focus:ring-2 --------focus:ring-inset --------focus:ring-orange-600 sm:text-md sm:leading-6"
                  />
                </div>
              </div>
              {/* ------------------------------------------------------------ */}
              <div className="grid  grid-cols-2 gap-2 pt-10 pb-20">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 --------focus-visible:outline --------focus-visible:outline-2 --------focus-visible:outline-offset-2 --------focus-visible:outline-orange-600"
                >
                  Enregistrer
                </button>
                <Link
                  to="/home"
                  className="flex cursor-pointer w-full justify-center rounded-md border text-orange-500 border-orange-600 px-3 py-1.5 text-md font-semibold leading-6 shadow-sm --------focus-visible:outline --------focus-visible:outline-2 --------focus-visible:outline-offset-2 --------focus-visible:outline-orange-600"
                >
                  Annuler
                </Link>
              </div>
              {/* ------------------------------------------------- */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ajouter_vehicule;
