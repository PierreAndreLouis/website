import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { Link } from "react-router-dom";

function Statistics() {
  const {
    mergedData,
    showCategorieListe,
    setshowCategorieListe,
    chooseActifs,
    setchooseActifs,
    chooseStationnement,
    setchooseStationnement,
    chooseInactifs,
    setchooseInactifs,
    chooseALl,
    setchooseALl,
  } = useContext(DataContext);

  const vehicleArray = mergedData ? Object.values(mergedData) : [];

  const totalVehicleCount = vehicleArray.length;

  const activeVehicleCount =
    vehicleArray.filter(
      (vehicle) =>
        vehicle.vehiculeDetails &&
        vehicle.vehiculeDetails[0] &&
        vehicle.vehiculeDetails[0].speedKPH > 0
    ).length || "0";
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  // Calculer les 20 heures en millisecondes
  const twentyHoursInMs = 24 * 60 * 60 * 1000; // 20 heures en millisecondes
  const currentTime = Date.now(); // Heure actuelle en millisecondes

  // Filtrer les véhicules correspondant aux nouvelles conditions
  const filteredVehicles = vehicleArray.filter((vehicle) => {
    // Vérifie si le véhicule a des détails
    const hasDetails =
      vehicle.vehiculeDetails && vehicle.vehiculeDetails.length > 0;

    // Vérifie la vitesse (noSpeed)
    const noSpeed = vehicle.vehiculeDetails?.[0]?.speedKPH <= 1;

    // Vérifie si le véhicule est actif (mise à jour dans les 20 dernières heures)
    const lastUpdateTimeMs = vehicle.lastUpdateTime
      ? vehicle.lastUpdateTime * 1000
      : 0;
    const isActive = currentTime - lastUpdateTimeMs < twentyHoursInMs;

    // Inclure seulement les véhicules qui ont des détails, qui sont actifs, et qui ont noSpeed
    return hasDetails && noSpeed && isActive;
    // return hasDetails && isActive && noSpeed;
  });

  // Nombre de véhicules inactifs
  // const inactiveVehicleCount = "0";
  const inactiveVehicleCount = filteredVehicles.length || "0";
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  // Calculer les 20 heures en millisecondes
  // const twentyHoursInMs = 24 * 60 * 60 * 1000; // 20 heures en millisecondes
  // const currentTime = Date.now(); // Heure actuelle en millisecondes

  // Filtrer les véhicules sans détails ou inactifs
  const filteredVehiclesInactifs = vehicleArray.filter((vehicle) => {
    // Vérifier si le véhicule n'a pas de détails
    const noDetails =
      !vehicle.vehiculeDetails || vehicle.vehiculeDetails.length === 0;

    // Vérifier si le véhicule est inactif
    const lastUpdateTime = vehicle?.lastUpdateTime;
    const lastUpdateTimeMs = lastUpdateTime ? lastUpdateTime * 1000 : 0; // Conversion en millisecondes
    const isInactive =
      lastUpdateTimeMs > 0 && currentTime - lastUpdateTimeMs >= twentyHoursInMs;

    // Retourne true si l'une des conditions est satisfaite
    // return isInactive;
    // return noDetails || isInactive;
    return noDetails || isInactive;
  });

  // Nombre de véhicules filtrés
  // const notActiveVehicleCount = "0";
  const notActiveVehicleCount = filteredVehiclesInactifs.length || "0";
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  return (
    <div className="mt-2 ">
      {/* ------------------------------- */}
      {/* Début des statistiques */}
      <div className="p-2 grid grid-cols-2 gap-2 mt-4 md:mt-10">
        <Link
          onClick={() => {
            setchooseALl(true);
            setchooseActifs(false);
            setchooseStationnement(false);
            setchooseInactifs(false);
          }}
          to="/Statistics_Page"
          className="bg-white dark:bg-gray-800 rounded-lg"
        >
          <div className="border overflow-hidden dark:border-gray-800 dark:shadow-gray-900 md:p-8 bg-blue-300/50 dark:bg-blue-700/40 flex justify-between items-start rounded-lg shadow-md p-3">
            {/* <div className="border overflow-hidden dark:border-gray-800 dark:shadow-gray-900 md:p-8 bg-blue-300/50 dark:bg-blue-700/30 flex justify-between items-start rounded-lg shadow-md p-3"> */}
            <div>
              <h3 className="text-gray-700 dark:text-gray-300 md:font-semibold md:text-xl ">
                Total
              </h3>
              <h2 className="text-gray-900 dark:text-gray-200 font-bold text-2xl md:text-3xl lg:text-4xl ">
                {totalVehicleCount}
              </h2>
            </div>
            <div>
              <img
                className="dark:hidden w-8 md:w-12 lg:w-14"
                src="/img/home_icon/total.png"
                alt="Total"
              />
              <img
                className="hidden dark:block w-8 md:w-12 lg:w-14"
                src="/img/home_icon/white_total.png"
                alt="Total"
              />
            </div>
          </div>
        </Link>

        {/*  */}
        <Link
          onClick={() => {
            setchooseALl(false);
            setchooseActifs(true);
            setchooseStationnement(false);
            setchooseInactifs(false);
          }}
          to="/Statistics_Page"
          className="bg-white dark:bg-gray-800 rounded-lg"
        >
          <div className="border dark:border-gray-800 dark:shadow-gray-900 md:p-8 bg-green-300/50 dark:bg-green-600/40 flex justify-between items-start rounded-lg shadow-md p-3">
            {/* <div className="border dark:border-gray-800 dark:shadow-gray-900 md:p-8 bg-green-300/50 dark:bg-green-700/30 flex justify-between items-start rounded-lg shadow-md p-3"> */}
            <div>
              <h3 className="text-gray-700 dark:text-gray-300 md:font-semibold md:text-xl ">
                Actifs
              </h3>
              <h2 className="text-gray-900 dark:text-gray-200 font-bold text-2xl md:text-3xl lg:text-4xl ">
                {activeVehicleCount}
              </h2>
            </div>
            <div>
              <img
                className="dark:hidden w-14 md:w-16 lg:w-20"
                src="/img/home_icon/active.png"
                alt="Véhicules actifs"
              />
              <img
                className="hidden dark:block w-14 md:w-16 lg:w-20"
                src="/img/home_icon/rapport_active.png"
                alt="Véhicules actifs"
              />
            </div>
          </div>
        </Link>
        {/*  */}
        <Link
          onClick={() => {
            setchooseALl(false);
            setchooseActifs(false);
            setchooseStationnement(true);
            setchooseInactifs(false);
          }}
          to="/Statistics_Page"
          className="bg-white dark:bg-gray-800 rounded-lg"
        >
          <div className="border dark:border-gray-800 dark:shadow-gray-900 md:p-8 bg-red-300/50 dark:bg-red-800/50 flex justify-between items-start rounded-lg shadow-md p-3">
            {/* <div className="border dark:border-gray-800 dark:shadow-gray-900 md:p-8 bg-red-300/50 dark:bg-red-900/40 flex justify-between items-start rounded-lg shadow-md p-3"> */}
            <div>
              <h3 className="text-gray-700 dark:text-gray-300 md:font-semibold md:text-xl ">
                Parking
              </h3>
              <h2 className="text-gray-900 dark:text-gray-200 font-bold text-2xl md:text-3xl lg:text-4xl ">
                {inactiveVehicleCount}
              </h2>
            </div>
            <div>
              <img
                className="dark:hidden w-8 md:w-12 lg:w-14"
                src="/img/cars/parking.png"
                alt="Véhicules en stationnement"
              />
              <img
                className="hidden dark:block w-8 md:w-12 lg:w-14"
                src="/img/home_icon/rapport_parking.png"
                alt="Véhicules en stationnement"
              />
            </div>
          </div>
        </Link>
        {/*  */}
        <Link
          onClick={() => {
            setchooseALl(false);
            setchooseActifs(false);
            setchooseStationnement(false);
            setchooseInactifs(true);
          }}
          to="/Statistics_Page"
          className="bg-white dark:bg-gray-400/10 rounded-lg"
        >
          <div className="border dark:border-gray-800 dark:shadow-gray-900 md:p-8 bg-purple-300/50 dark:bg-purple-700/30 flex justify-between items-start rounded-lg shadow-md p-3">
            {/* <div className="border dark:border-gray-800 dark:shadow-gray-900 md:p-8 bg-purple-300/50 dark:bg-purple-950/50 flex justify-between items-start rounded-lg shadow-md p-3"> */}
            <div>
              <h3 className="text-gray-900 dark:text-gray-300 md:font-semibold md:text-xl ">
                Inactifs
              </h3>
              <h2 className="text-gray-900 dark:text-gray-200 font-bold text-2xl md:text-3xl lg:text-4xl ">
                {notActiveVehicleCount}
              </h2>
            </div>
            <div>
              <img
                className="dark:hidden w-8 md:w-12 lg:w-14"
                src="/img/home_icon/payer.png"
                alt="Véhicules inactifs"
              />
              <img
                className="hidden dark:block w-8 md:w-12 lg:w-14"
                src="/img/home_icon/rapport_not_active.png"
                alt="Véhicules inactifs"
              />
            </div>
          </div>
        </Link>
        {/* <button
          onClick={() => {
            console.log(vehicleArray);
          }}
        >
          test
        </button> */}
        {/*  */}
      </div>
      {/* Fin des statistiques */}
      {/* ------------------------------- */}
    </div>
  );
}

export default Statistics;
