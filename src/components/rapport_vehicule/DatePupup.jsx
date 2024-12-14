import React from "react";
import { IoClose } from "react-icons/io5";

function DatePupup({
  showChooseDate,
  handleApply,
  setShowChooseDate,
  setShowDatePicker2,
  selectedDate,
  setSelectedDate,
}) {
  return (
    <>
      {showChooseDate && (
        <form
          onSubmit={handleApply}
          className="fixed z-[9999999999999999999] inset-0 flex justify-center items-center bg-black/50"
        >
          <div className="border relative flex-col bg-gray-50 dark:bg-gray-800 w-full max-w-[25rem] mx-4 rounded-lg px-4 pl-2 py-1 flex gap-4-- shadow-lg">
            <IoClose
              onClick={() => {
                setShowChooseDate(false);
              }}
              className="absolute top-4 right-4 text-xl text-red-500 dark:text-red-400 cursor-pointer"
            />

            <h2 className="font-semibold dark:text-gray-200 text-lg p-3 pb-0 text-gray-700">
              Recherche Detaillee
            </h2>
            <p
              onClick={() => {
                setShowDatePicker2(true);
                setShowChooseDate(false);
              }}
              className="mx-3 shadow-lg-- shadow-gray-300/40 cursor-pointer bg-orange-100 p-2  mb-3 mt-2 rounded-lg"
            >
              Choisis une date plus precise
            </p>
            {/*  */}
            {/*  */}
            <div className="border-b my-4 border-orange-400/50 dark:border-gray-700" />
            {/*  */}
            {/*  */}
            <h2 className="font-semibold dark:text-gray-200 text-lg px-3 text-gray-700">
              Recherche pour une journee
            </h2>

            {/* <h2 className="pt-4 pl-4 text-gray-900 dark:text-gray-100">
                      Choisissez une date :
                    </h2> */}
            {/* <p> {formatDate(selectedDate)}</p> */}
            <label className="px-3 mt-3 mb-6 ">
              <input
                className="focus:outline-none  shadow-lg-- shadow-gray-300/40 bg-black/0 border p-2 rounded-lg w-full bg-orange-100 dark:bg-gray-400--  dark:border-gray-600 dark:text-gray-200--"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </label>
            <div className="flex mx-4 mb-4">
              {selectedDate ? (
                <button
                  className="cursor-pointer font-semibold text-gray-100 px-8 py-2 rounded-md bg-orange-500 dark:bg-orange-600"
                  type="submit"
                >
                  Rechercher
                </button>
              ) : (
                <div className="cursor-default font-semibold text-gray-100 px-8 py-2 rounded-md bg-gray-400 dark:bg-gray-600">
                  Rechercher
                </div>
              )}
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default DatePupup;
