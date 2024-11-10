import React from "react";
import Navigation_bar from "./Navigation_bar";
import PC_header from "./PC_header";
import Header from "./Header";
import SideBar from "./SideBar";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { DataContext } from "../../context/DataContext";
import { MdLocationPin } from "react-icons/md";
import { FaCar } from "react-icons/fa";

function RapportVehicule() {
  return (
    <div>
      <Navigation_bar />
      <PC_header />
      <Header />
      <SideBar />

      <div className="mt-20 px-4">
        <h1 className="font-semibold text-center mx-4 mb-6 text-xl">
          Rapport sur les vehicule Aujourd'hui
        </h1>
        <div>
          <h2 className="bg-gray-100 p-2 mb-3 font-semibold rounded-md">
            Vehicules en mouvement :
          </h2>
          <div>
            {/* --------------------- */}
            <div className="bg-white">
              <div className={` bg-green-100/50 shadow-md rounded-lg p-3`}>
                <div className="flex items-stretch relative gap-3 md:py-6--">
                  {/*  */}
                  <div className="flex border-2 md:pt-6 md:pb-8 h-full  border-green-500 rounded-md p-2 flex-col items-center md:min-w-32">
                    <div>
                      <img
                        className="min-w-[5rem] max-w-[5rem] my-[1.2rem]"
                        src="/img/home_icon/active.png"
                        alt=""
                      />
                    </div>
                  </div>

                  {/*  */}
                  <div>
                    <h2
                      className={`text-green-800 text-gray-800-- font-semibold text-md md:text-xl mb-2 `}
                    >
                      Toyota Land Cruser Prada
                    </h2>
                    <div className="flex mb-2 gap-4 text-gray-600 text-md">
                      <div className="flex gap-3 items-center">
                        <FaRegCalendarAlt className="text-gray-500/80" />
                        <h3 className="text-sm sm:text-sm md:text-md">
                          28:03:2000
                        </h3>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div>
                        <FaCar className="text-gray-500/80" />
                      </div>
                      <span
                        className={` bg-green-300/50 ml-1  text-green-800 pb-[.2rem] px-2 py-0 text-sm rounded-md `}
                      >
                        En deplacement
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-1">
                  <p className="text-md felx sm:flex text-gray-600 mt-2 md:text-lg">
                    <span className="font-bold text-gray-700">Adresse : </span>
                    Delmas 33 en face de l'institution de saint louis de
                    gonzague, rue Lamar, Port-au-prince Haiti
                  </p>
                </div>
              </div>
            </div>
            {/* --------------------- */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RapportVehicule;
