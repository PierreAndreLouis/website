import React from "react";
import { IoClose } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaCar } from "react-icons/fa";

function TypeDeVue({
  typeDeVue,
  setTypeDeVue,
  mapType,
  handleMapTypeChange,
}) {
  return (
    <>
      {typeDeVue && (
        <div className="fixed z-[9999999999999999] inset-0 bg-black/50 flex justify-center items-center dark:bg-black/80">
          <div
            className="bg-white max-w-[30rem] relative flex flex-col gap-2 w-[80vw] p-6 border border-gray-600 mt-2 rounded-md dark:bg-gray-700 dark:border-gray-600"
            id="mapType"
          >
            <IoClose
              onClick={() => {
                setTypeDeVue(false);
              }}
              className="absolute right-4 cursor-pointer top-6 text-2xl text-red-600 dark:text-red-400"
            />

            <h2 className="border-b border-orange-400 text-orange-800 text-lg pb-2 mb-3 font-semibold dark:text-white dark:border-orange-500">
              Choisis un type de vue :
            </h2>

            <p
              className={`cursor-pointer dark:text-gray-50 dark:hover:bg-gray-800/40 py-1 px-3 rounded-md ${
                mapType === "streets" ? "bg-gray-200 dark:bg-gray-800/50" : ""
              }`}
              onClick={() => handleMapTypeChange("streets")}
            >
              Vue normale
            </p>
            <p
              className={`cursor-pointer dark:text-gray-50 dark:hover:bg-gray-800/40 py-1 px-3 rounded-md ${
                mapType === "humanitarian" ? "bg-gray-200 dark:bg-gray-800/50" : ""
              }`}
              onClick={() => handleMapTypeChange("humanitarian")}
            >
              Vue humanitaire
            </p>
            <p
              className={`cursor-pointer dark:text-gray-50 dark:hover:bg-gray-800/40 py-1 px-3 rounded-md ${
                mapType === "positron" ? "bg-gray-200 dark:bg-gray-800/50" : ""
              }`}
              onClick={() => handleMapTypeChange("positron")}
            >
              Vue claire
            </p>
            <p
              className={`cursor-pointer dark:text-gray-50 dark:hover:bg-gray-800/40 py-1 px-3 rounded-md ${
                mapType === "dark" ? "bg-gray-200 dark:bg-gray-800/50" : ""
              }`}
              onClick={() => handleMapTypeChange("dark")}
            >
              Vue sombre
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default TypeDeVue;
