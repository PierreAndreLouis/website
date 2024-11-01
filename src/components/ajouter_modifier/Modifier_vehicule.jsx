import React, { useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaCar } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Navigation_bar from "../home/Navigation_bar";
import PC_header from "../home/PC_header";
import Header from "../home/Header";
import SideBar from "../home/SideBar";



function Modifier_vehicule({ setModifierVehicule }) {
  const [selectedCar, setSelectedCar] = useState("");

  const cars = [
    { id: 1, name: "Toyota" },
    { id: 2, name: "Honda" },
    { id: 3, name: "Ford" },
    { id: 4, name: "Chevrolet" },
    { id: 5, name: "Nissan" },
    { id: 6, name: "BMW" },
    { id: 7, name: "Mercedes-Benz" },
    { id: 8, name: "Volkswagen" },
    { id: 9, name: "Hyundai" },
    { id: 10, name: "Kia" },
  ];

  const handleChange = (event) => {
    setSelectedCar(event.target.value);
  };
  return (
    <div>
      <Navigation_bar />
      <PC_header />
      <Header  />
      <SideBar />



      <div
        id=""
        className={
          " flex w-full justify-center mt-16 md:mt-20 h-full"
        }
      >
        <div className="h-fulle w-full flex justify-center pt-0 pb-0">
          <div className="bg-white max-w-[30rem] w-full  shadow-lg overflow-auto">
            <div className="flex justify-center items-center w-full py-10">
              <CiEdit  className="text-2xl mr-2 text-orange-500" />
              <h3 className="text-center font-semibold text-gray-600 text-xl">
                Modifier Appareil
              </h3>
            </div>



{/* --------------------------------- */}
            <div className="flex flex-col px-4 mb-4">
              <label className="block text-md font-medium leading-6 text-gray-700 mb-2">
                Sélectionnez une voiture
              </label>
              <select
                value={selectedCar}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm -------focus:outline-none"
              >
                <option value="" disabled>
                  Choisissez une voiture
                </option>
                {cars.map((car) => (
                  <option key={car.id} value={car.name}>
                    {car.name}
                  </option>
                ))}
              </select>

              {/* {selectedCar && (
                <div className="mt-4 text-gray-800">
                  Vous avez sélectionné : {selectedCar}
                </div>
              )} */}
            </div>
{/* -------------------------------------------- */}



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
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 -------focus:ring-2 -------focus:ring-inset -------focus:ring-orange-600 sm:text-md sm:leading-6"
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
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 -------focus:ring-2 -------focus:ring-inset -------focus:ring-orange-600 sm:text-md sm:leading-6"
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
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 -------focus:ring-2 -------focus:ring-inset -------focus:ring-orange-600 sm:text-md sm:leading-6"
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
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 -------focus:ring-2 -------focus:ring-inset -------focus:ring-orange-600 sm:text-md sm:leading-6"
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
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 -------focus:ring-2 -------focus:ring-inset -------focus:ring-orange-600 sm:text-md sm:leading-6"
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
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 -------focus:ring-2 -------focus:ring-inset -------focus:ring-orange-600 sm:text-md sm:leading-6"
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
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 -------focus:ring-2 -------focus:ring-inset -------focus:ring-orange-600 sm:text-md sm:leading-6"
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
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 -------focus:ring-2 -------focus:ring-inset -------focus:ring-orange-600 sm:text-md sm:leading-6"
                  />
                </div>
              </div>
              {/* ------------------------------------------------------------ */}
              <div className="flex pt-10 pb-20 gap-2 w-full">

              
              <div className="grid w-full grid-cols-2 gap-2 ">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 -------focus-visible:outline -------focus-visible:outline-2 -------focus-visible:outline-offset-2 -------focus-visible:outline-orange-600"
                >
                  Enregistrer
                </button>
                <Link
                  to="/home"
                  className="flex cursor-pointer w-full justify-center rounded-md border text-orange-500 border-orange-600 px-3 py-1.5 text-md font-semibold leading-6 shadow-sm -------focus-visible:outline -------focus-visible:outline-2 -------focus-visible:outline-offset-2 -------focus-visible:outline-orange-600"
                >
                  Annuler
                </Link>

                
                

              
              </div> 
              <div className="flex justify-center bg-red-100 cursor-pointer items-center rounded-md border">
               <MdDelete className="w-10 text-2xl text-red-500" />

              </div>
              </div>
              {/* ------------------------------------------------- */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modifier_vehicule;
