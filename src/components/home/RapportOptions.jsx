import React from "react";
import { MdLocationPin } from "react-icons/md";
import { IoStatsChartSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";


function RapportOptions({setshowRapportPupup}) {
  return (
    <div>
      {/* <div className="fixed flex justify-center items-center z-[1] inset-0 bg-black/50">
        <div className="w-[80vw] max-w-[40rem] bg-white overflow-hidden rounded-lg">
          <div className="h-16 bg-red-600 text-white text-xl font-semibold text-center flex justify-center items-center p-2">
            <h1>Toyota Land Cruser Prada</h1>
          </div>
          <div className="p-4  flex flex-col gap-4 py-6">
            <div className="shadow-md cursor-pointer hover:bg-red-100 bg-red-50 p-2 rounded-md flex items-center gap-4">
              <IoStatsChartSharp className="text-[1.92rem] text-red-600 " />
              <h2 className="font-semibold text-red-700">
                Historique du vehicule
              </h2>
            </div>
            <div className="shadow-md cursor-pointer hover:bg-red-100 bg-red-50 p-2 rounded-md flex items-center gap-4">
              <img
                className="w-[1.92rem]"
                src="/img/cars/orange_parcoure.png"
                alt=""
              />{" "}
              <h2 className="font-semibold text-red-700">
                Trajet du vehicule
              </h2>
            </div>
            <div className="shadow-md cursor-pointer hover:bg-red-100 bg-red-50 p-2 rounded-md flex items-center gap-4">
              <MdLocationPin className="text-[2rem] text-red-600 " />
              <h2 className="font-semibold text-red-700">
                Position actuel du vehicule
              </h2>
            </div>
            <div className="shadow-md cursor-pointer hover:bg-red-100 bg-red-50 p-2 rounded-md flex items-center gap-4">
              <img
                className="w-[1.92rem]"
                src="/img/cars/group_position.png"
                alt=""
              />{" "}
              <h2 className="font-semibold text-red-700">
                Tous les vehicule en deplacement
              </h2>
            </div>
          </div>
        </div>
      </div> */}


      <div className="fixed flex justify-center items-center z-[1] inset-0 bg-black/50">
        <div className="relative w-[80vw] max-w-[40rem] bg-white overflow-hidden rounded-lg">
        <IoMdClose
            onClick={() => {
              setshowRapportPupup(false);
            }}
            className="absolute cursor-pointer top-3 right-3 text-2xl text-red-500"
          />
          <div className="h-16 bg-orange-100 shadow-md text-gray-800 text-xl font-semibold text-center flex justify-center items-center p-2">
            <h1>Toyota Land Cruser Prada</h1>
          </div>
          <div 
        //   onClick={() => {setshowRapportPupup(false)}}
          className="p-4  flex flex-col gap-4 py-6 pb-10">
            <div className="shadow-md cursor-pointer hover:bg-orange-100 bg-orange-50 p-2 rounded-md flex items-center gap-4">
              <IoStatsChartSharp className="text-[1.92rem] text-orange-400 " />
              <h2 className="font-semibold text-orange-900">
                Historique du vehicule
              </h2>
            </div>
            <div className="shadow-md cursor-pointer hover:bg-orange-100 bg-orange-50 p-2 rounded-md flex items-center gap-4">
              <img
                className="w-[1.92rem]"
                src="/img/cars/parcoure.png"
                alt=""
              />{" "}
              <h2 className="font-semibold text-orange-900">
                Trajet du vehicule
              </h2>
            </div>
            <div className="shadow-md cursor-pointer hover:bg-orange-100 bg-orange-50 p-2 rounded-md flex items-center gap-4">
              <MdLocationPin className="text-[2rem] min-w-8 text-orange-400 " />
              <h2 className="font-semibold text-orange-900">
                Position actuel du vehicule
              </h2>
            </div>
            <div className="shadow-md cursor-pointer hover:bg-orange-100 bg-orange-50 p-2 rounded-md flex items-center gap-4">
              <img
                className="w-[1.92rem]"
                src="/img/cars/orange_group_position.png"
                alt=""
              />{" "}
              <h2 className="font-semibold text-orange-900">
                Tous les vehicules en deplacement
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="fixed flex justify-center items-center z-[1] inset-0 bg-black/50">
        <div className="w-[80vw] max-w-[40rem] bg-white overflow-hidden rounded-lg">
          <div className="h-16 bg-green-500 text-white text-xl font-semibold text-center flex justify-center items-center p-2">
            <h1>Toyota Land Cruser Prada</h1>
          </div>
          <div className="p-4  flex flex-col gap-4 py-6">
            <div className="shadow-md cursor-pointer hover:bg-green-100 bg-green-50 p-2 rounded-md flex items-center gap-4">
              <IoStatsChartSharp className="text-[1.92rem] text-green-600 " />
              <h2 className="font-semibold text-green-700">
                Historique du vehicule
              </h2>
            </div>
            <div className="shadow-md cursor-pointer hover:bg-green-100 bg-green-50 p-2 rounded-md flex items-center gap-4">
              <img
                className="w-[1.92rem]"
                src="/img/cars/green_parcoure.png"
                alt=""
              />{" "}
              <h2 className="font-semibold text-green-700">
                Trajet du vehicule
              </h2>
            </div>
            <div className="shadow-md cursor-pointer hover:bg-green-100 bg-green-50 p-2 rounded-md flex items-center gap-4">
              <MdLocationPin className="text-[2rem] text-green-600 " />
              <h2 className="font-semibold text-green-700">
                Position actuel du vehicule
              </h2>
            </div>
            <div className="shadow-md cursor-pointer hover:bg-green-100 bg-green-50 p-2 rounded-md flex items-center gap-4">
              <img
                className="w-[1.92rem]"
                src="/img/cars/group_position.png"
                alt=""
              />{" "}
              <h2 className="font-semibold text-green-700">
                Tous les vehicule en deplacement
              </h2>
            </div>
          </div>
        </div>
      </div> */}



{/* <div className="fixed flex justify-center items-center z-[1] inset-0 bg-black/50">
        <div className="w-[80vw] max-w-[40rem] bg-white overflow-hidden rounded-lg">
          <div className="h-16 bg-purple-800 text-white text-xl font-semibold text-center flex justify-center items-center p-2">
            <h1>Toyota Land Cruser Prada</h1>
          </div>
          <div className="p-4  flex flex-col gap-4 py-6">
            <div className="shadow-md cursor-pointer hover:bg-purple-100 bg-purple-50 p-2 rounded-md flex items-center gap-4">
              <IoStatsChartSharp className="text-[1.92rem] text-purple-600 " />
              <h2 className="font-semibold text-purple-900">
                Historique du vehicule
              </h2>
            </div>
            <div className="shadow-md cursor-pointer hover:bg-purple-100 bg-purple-50 p-2 rounded-md flex items-center gap-4">
              <img
                className="w-[1.92rem]"
                src="/img/cars/green_parcoure.png"
                alt=""
              />{" "}
              <h2 className="font-semibold text-purple-900">
                Trajet du vehicule
              </h2>
            </div>
            <div className="shadow-md cursor-pointer hover:bg-purple-100 bg-purple-50 p-2 rounded-md flex items-center gap-4">
              <MdLocationPin className="text-[2rem] text-purple-600 " />
              <h2 className="font-semibold text-purple-900">
                Position actuel du vehicule
              </h2>
            </div>
            <div className="shadow-md cursor-pointer hover:bg-purple-100 bg-purple-50 p-2 rounded-md flex items-center gap-4">
              <img
                className="w-[1.92rem]"
                src="/img/cars/group_position.png"
                alt=""
              />{" "}
              <h2 className="font-semibold text-purple-900">
                Tous les vehicule en deplacement
              </h2>
            </div>
          </div>
        </div>
      </div> */}


    </div>
  );
}

export default RapportOptions;
