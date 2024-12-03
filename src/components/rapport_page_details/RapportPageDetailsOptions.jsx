import React from "react";

function RapportPageDetailsOptions({
  setPersonnelDetails,
  personnelDetails,
  setShowListOption,
  setVehiclueHistoriqueDetails,
  currentVehicule,
}) {
  return (
    <>
      <div className="flex px-4 mb-10 w-full gap-3 justify-between max-w-[40rem] mx-auto mt-4">
        <button
          onClick={() => {
            setPersonnelDetails(true);
          }}
          className={`${
            personnelDetails
              ? "dark:bg-orange-700 bg-orange-100"
              : "dark:bg-gray-900/70 bg-gray-100"
          } border border-gray-100 dark:text-gray-50 dark:border-gray-50/0 dark:shadow-gray-700 dark:shadow-lg rounded-lg shadow-lg-- shadow-gray-200 w-full py-1`}
        >
          Personnel
        </button>
        <button
          onClick={() => {
            setPersonnelDetails(false);
          }}
          className={`${
            !personnelDetails
              ? "dark:bg-orange-700 bg-orange-100"
              : "dark:bg-gray-900/70 bg-gray-100"
          } border border-gray-100 dark:text-gray-50 dark:border-gray-50/0 dark:shadow-gray-700 dark:shadow-lg rounded-lg shadow-lg-- shadow-gray-200 w-full py-1`}
        >
          En groupe
        </button>
        <button
          onClick={() => {
            setShowListOption(true);
            // setVehiclueHistoriqueDetails(currentVehicule?.vehiculeDetails);
          }}
          className="border border-gray-100 dark:bg-gray-900/70 dark:text-gray-50 dark:border-gray-50/0 dark:shadow-gray-700 dark:shadow-lg rounded-lg bg-gray-100 shadow-lg-- shadow-gray-200 w-full py-1"
        >
          Options
        </button>
      </div>
    </>
  );
}

export default RapportPageDetailsOptions;
