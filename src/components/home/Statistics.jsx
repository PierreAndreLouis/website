import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";


// okk
// okk
// okk
// okk
// okk
// dark
// dark
// dark
// dark
// dark
// dark
// dark




function Statistics() {
  const { mergedData } = useContext(DataContext);

  const vehicleArray = mergedData ? Object.values(mergedData) : [];
  const totalVehicleCount = vehicleArray.length;

  const activeVehicleCount =
    vehicleArray.filter(
      (vehicle) =>
        vehicle.vehiculeDetails &&
        vehicle.vehiculeDetails[0] &&
        vehicle.vehiculeDetails[0].speedKPH > 0
    ).length || "0";

  const inactiveVehicleCount =
    vehicleArray.filter(
      (vehicle) =>
        vehicle.vehiculeDetails &&
        vehicle.vehiculeDetails[0] &&
        vehicle.vehiculeDetails[0].speedKPH <= 1
    ).length || "0";

  // Calculer les véhicules dont le dernier temps de mise à jour est supérieur ou égal à 20 heures
  const twentyHoursInMs = 20 * 60 * 60 * 1000; // 20 heures en millisecondes
  const currentTime = Date.now(); // Heure actuelle en millisecondes

  const notActiveVehicleCount =
    vehicleArray.filter((vehicle) => {
      const lastUpdateTime = vehicle?.lastUpdateTime;
      if (!lastUpdateTime) return false;

      const lastUpdateTimeMs = lastUpdateTime * 1000; // Conversion en millisecondes
      return currentTime - lastUpdateTimeMs >= twentyHoursInMs;
    }).length || "0";

  return (
    <div className="mt-2 ">
      {/* ------------------------------- */}
      {/* Début des statistiques */}
      <div className="p-4 grid grid-cols-2 gap-2 mt-4 md:mt-20">
        <div className="bg-white dark:bg-gray-800">
          <div className="border dark:border-gray-500 md:p-8 bg-blue-300/50 dark:bg-blue-700/50 flex justify-between items-start rounded-lg shadow-md p-3">
            <div>
              <h3 className="text-gray-700 dark:text-gray-300 md:font-semibold md:text-xl ">
                Total
              </h3>
              <h2 className="text-gray-900 dark:text-gray-100 font-bold text-2xl md:text-3xl lg:text-4xl ">
                {totalVehicleCount}
              </h2>
            </div>
            <div>
              <img
                className="w-8 md:w-12 lg:w-14"
                src="/img/home_icon/total.png"
                alt="Total"
              />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800">
          <div className="border dark:border-gray-500 md:p-8 bg-green-300/50 dark:bg-green-700/50 flex justify-between items-start rounded-lg shadow-md p-3">
            <div>
              <h3 className="text-gray-700 dark:text-gray-300 md:font-semibold md:text-xl ">
                Actifs
              </h3>
              <h2 className="text-gray-900 dark:text-gray-100 font-bold text-2xl md:text-3xl lg:text-4xl ">
                {activeVehicleCount}
              </h2>
            </div>
            <div>
              <img
                className="w-14 md:w-16 lg:w-20"
                src="/img/home_icon/active.png"
                alt="Véhicules actifs"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800">
          <div className="border dark:border-gray-500 md:p-8 bg-red-300/50 dark:bg-red-700/50 flex justify-between items-start rounded-lg shadow-md p-3">
            <div>
              <h3 className="text-gray-700 dark:text-gray-300 md:font-semibold md:text-xl ">
                Parking
              </h3>
              <h2 className="text-gray-900 dark:text-gray-100 font-bold text-2xl md:text-3xl lg:text-4xl ">
                {inactiveVehicleCount}
              </h2>
            </div>
            <div>
              <img
                className="w-8 md:w-12 lg:w-14"
                src="/img/cars/parking.png"
                alt="Véhicules en stationnement"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800">
          <div className="border dark:border-gray-500 md:p-8 bg-purple-300/50 dark:bg-purple-700/50 flex justify-between items-start rounded-lg shadow-md p-3">
            <div>
              <h3 className="text-gray-700 dark:text-gray-300 md:font-semibold md:text-xl ">
                Inactifs
              </h3>
              <h2 className="text-gray-900 dark:text-gray-100 font-bold text-2xl md:text-3xl lg:text-4xl ">
                {notActiveVehicleCount}
              </h2>
            </div>
            <div>
              <img
                className="w-8 md:w-12 lg:w-14"
                src="/img/home_icon/payer.png"
                alt="Véhicules inactifs"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Fin des statistiques */}
      {/* ------------------------------- */}
    </div>
  );
}

export default Statistics;
