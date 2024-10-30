import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const DateTimePicker = ({ setShowDatePeaker }) => {
  return (
    <div className="fixed inset-0 z-10 flex justify-center items-center bg-black/50">
      <form className=" w-full flex justify-center">
        <div className="flex relative w-full  md:max-w-[30rem] md:px-8 flex-col  p-4 py-8 space-y-4 bg-gray-100 rounded-lg shadow-lg--- ">
          <IoClose
            onClick={() => {
              setShowDatePeaker(false);
            }}
            className="absolute top-5 right-5 text-red-500 text-3xl cursor-pointer"
          />
          <h2 className="text-xl text-gray-700">
            Choisissez une date et une heure
          </h2>

          <div className="flex gap-4 flex-wrape justify-center items-center">
            {/* Sélecteur de date Debut*/}
            <div className="w-full">
              <label className="block text-gray-500">Date Debut:</label>
              <input
                type="date"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              />
            </div>

            {/* Sélecteur d'heure Debut */}
            <div className="w-full">
              <label className="block text-gray-500">Heure Debut:</label>
              <input
                type="time"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="flex gap-4 flex-wrape justify-center items-center">
            {/* Sélecteur de date fin*/}
            <div className="w-full">
              <label className="block text-gray-500">Date Fin:</label>
              <input
                type="date"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              />
            </div>

            {/* Sélecteur d'heure fin*/}
            <div className="w-full">
              <label className="block text-gray-500">Heure Fin:</label>
              <input
                type="time"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="w-full flex justify-end">
            <button
              onClick={() => {
                setShowDatePeaker(false);
              }}
              type="submit"
              className=" py-2 px-12 bg-orange-500 rounded-lg mt-3  text-white"
            >
              Appliquer
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DateTimePicker;
