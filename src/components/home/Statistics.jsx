import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";

function Statistics() {
  const { vehicleData, mergedData, isLoading } = useContext(DataContext);

  const vehicleArray = mergedData ? Object.values(mergedData) : [];
  const totalVehicleCount = vehicleArray.length;
  // const activeVehicleCount =
  //   vehicleArray.filter((vehicle) => vehicle.vehiculeDetails[0].speedKPH > 0)
  //     .length || "";
  // const inactiveVehicleCount =
  //   vehicleArray.filter((vehicle) => vehicle.vehiculeDetails[0].speedKPH <= 1)
  //     .length || "";

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

  // const activeVehicleCount = 0;
  // const inactiveVehicleCount = 0;

  return (
    <div className="mt-2">
      {/* ------------------------------- */}
      {/* start of statistics */}
      <div className=" p-4 grid grid-cols-2 gap-2 mt-4 md:mt-20">
        <div className="border md:p-8 bg-blue-300/50 flex justify-between items-start rounded-lg shadow-md p-3">
          <div>
            <h3 className="text-gray-700 md:font-semibold md:text-xl ">
              Total
            </h3>
            <h2 className="text-gray-900 font-bold text-2xl md:text-3xl lg:text-4xl ">
              {totalVehicleCount}
            </h2>
          </div>
          <div>
            <img
              className="w-8 md:w-12 lg:w-14"
              src="/img/home_icon/total.png"
              alt=""
            />
          </div>
        </div>

        <div className="border md:p-8 bg-green-300/50 flex justify-between items-start rounded-lg shadow-md p-3">
          <div>
            <h3 className="text-gray-700 md:font-semibold md:text-xl ">
              Active
            </h3>
            <h2 className="text-gray-900 font-bold text-2xl md:text-3xl lg:text-4xl ">
              {activeVehicleCount}
            </h2>
          </div>
          <div>
            <img
              className="w-14 md:w-16 lg:w-20"
              src="/img/home_icon/active.png"
              alt=""
            />
          </div>
        </div>

        <div className="border md:p-8 bg-red-300/50 flex justify-between items-start rounded-lg shadow-md p-3">
          <div>
            <h3 className="text-gray-700 md:font-semibold md:text-xl ">
              Parking
            </h3>
            <h2 className="text-gray-900 font-bold text-2xl md:text-3xl lg:text-4xl ">
              {inactiveVehicleCount}
            </h2>
          </div>
          <div>
            <img
              className="w-8 md:w-12 lg:w-14"
              src="/img/cars/parking.png"
              alt=""
            />
          </div>
        </div>

        <div className="border md:p-8 bg-purple-300/50 flex justify-between items-start rounded-lg shadow-md p-3">
          <div>
            <h3 className="text-gray-700 md:font-semibold md:text-xl ">
              Not active 
            </h3>
            <h2 className="text-gray-900 text-2xl md:text-3xl lg:text-4xl ">
              -.--
            </h2>
          </div>
          <div>
            <img
              className="w-8 md:w-12 lg:w-14"
              src="/img/home_icon/payer.png"
              alt=""
            />
          </div>
        </div>
      </div>
      {/* End of statistics */}
      {/* ------------------------------- */}
    </div>
  );
}

export default Statistics;
