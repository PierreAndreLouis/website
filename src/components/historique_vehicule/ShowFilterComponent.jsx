import React from "react";
import { MdDateRange } from "react-icons/md";
import { FaCarRear } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa6";

function ShowFilterComponent({
  showFilter,
  setshowFilter,
  showHistoriqueInMap,
  setShowDatePicker,
  checkboxes,
  handleCheckboxChange,
  applyFilter,
  setTypeDeVue
}) {
  return (
    <>
      {showFilter && (
        <div className="fixed inset-0 z-20 w-full flex justify-center items-center p-2 bg-black/50">
          <div className="relative max-w-[30rem] bg-white w-[90vw] rounded-md p-4 dark:bg-gray-800">
            <IoMdClose
              onClick={() => {
                setshowFilter(false);
              }}
              className="absolute top-0 cursor-pointer -right-0 min-w-14 py-2 text-[2.53rem] text-red-600 dark:text-red-400"
            />

            {showHistoriqueInMap && (
              <div
                onClick={() => {
                  setTypeDeVue(true);
                  setshowFilter(!showFilter);
                }}
                className="flex mt-6 items-center justify-between gap-1 border px-2 py-1 cursor-pointer bg-orange-50 rounded-md dark:bg-gray-700 dark:text-white"
              >
                <label htmlFor="mapType">Type de vue</label>
                <FaChevronDown />
              </div>
            )}

            <div
              onClick={() => {
                setShowDatePicker(true);
                setshowFilter(false);
              }}
              className="flex my-3 p-2 rounded-md hover:bg-orange-100/50 cursor-pointer items-center gap-3 dark:hover:bg-gray-700"
            >
              <MdDateRange className="text-xl text-orange-600 dark:text-orange-400" />
              <h3 className="text-gray-800 dark:text-gray-200">Filtrer par Date</h3>
            </div>
            <hr className="dark:border-gray-600" />
            <form action="" className="p-2">
              <div className="flex mb-4 items-center gap-3">
                <FaCarRear className="text-xl text-orange-600/90 dark:text-orange-400" />
                <h3 className="text-gray-800 dark:text-gray-200">Filtrer par statut</h3>
              </div>
              <div>
                <div className="flex flex-row mb-1.5 gap-4 ml-0.5">
                  <input
                    id="en_marche"
                    type="checkbox"
                    checked={checkboxes.en_marche}
                    onChange={() => handleCheckboxChange("en_marche")}
                    className="dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="en_marche" className="text-gray-800 dark:text-gray-200">En marche</label>
                </div>
                <div className="flex flex-row mb-1.5 gap-4 ml-0.5">
                  <input
                    id="en_ralenti"
                    type="checkbox"
                    checked={checkboxes.en_ralenti}
                    onChange={() => handleCheckboxChange("en_ralenti")}
                    className="dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="en_ralenti" className="text-gray-800 dark:text-gray-200">En ralenti</label>
                </div>
                <div className="flex flex-row mb-1.5 gap-4 ml-0.5">
                  <input
                    id="en_arret"
                    type="checkbox"
                    checked={checkboxes.en_arret}
                    onChange={() => handleCheckboxChange("en_arret")}
                    className="dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="en_arret" className="text-gray-800 dark:text-gray-200">En arrêt</label>
                </div>

                <p
                  onClick={() => {
                    applyFilter();
                    setshowFilter(false);
                  }}
                  className="border cursor-pointer border-orange-500 text-center text-orange-600 font-semibold rounded-md pt-1 pb-1.5 px-6 mt-5 dark:text-orange-400 dark:border-orange-400"
                >
                  Appliquer
                </p>
              </div>
            </form>
          </div>
          <hr className="dark:border-gray-600" />
        </div>
      )}
    </>
  );
}

export default ShowFilterComponent;
