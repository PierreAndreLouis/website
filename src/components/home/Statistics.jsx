import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";

function Statistics() {
  const { vehicleData, isLoading } = useContext(DataContext);

  const totalVehicleCount = vehicleData ? vehicleData.length : 0;
  const activeVehicleCount = vehicleData ? vehicleData.filter(vehicle => vehicle.isActive).length : 0;
  const inactiveVehicleCount = vehicleData ? vehicleData.filter(vehicle => !vehicle.isActive).length : 0;

  return (
    <div className="mt-2">
      {/* ------------------------------- */}
      {/* start of statistics */}
      <div className=" p-4 grid grid-cols-2 gap-2 mt-4 md:mt-20">
        <div className="border md:p-8 bg-blue-300/50 flex justify-between items-start rounded-lg shadow-md p-3">
          <div>
            <h3 className="text-gray-700 md:font-semibold md:text-xl ">Total</h3>
            <h2 className="text-gray-900 font-bold text-2xl md:text-3xl lg:text-4xl ">{totalVehicleCount}</h2>
          </div>
          <div>
            <img className="w-8 md:w-12 lg:w-14" src="/img/home_icon/total.png" alt="" />
          </div>
        </div>




        <div className="border md:p-8 bg-green-300/50 flex justify-between items-start rounded-lg shadow-md p-3">
          <div>
            <h3 className="text-gray-700 md:font-semibold md:text-xl ">Active</h3>
            <h2 className="text-gray-900 font-bold text-2xl md:text-3xl lg:text-4xl ">{activeVehicleCount}</h2>
          </div>
          <div>
          <img className="w-14 md:w-16 lg:w-20" src="/img/home_icon/active.png" alt="" />

          </div>
        </div>





        <div className="border md:p-8 bg-red-300/50 flex justify-between items-start rounded-lg shadow-md p-3">
          <div>
            <h3 className="text-gray-700 md:font-semibold md:text-xl ">Parking</h3>
            <h2 className="text-gray-900 font-bold text-2xl md:text-3xl lg:text-4xl ">{inactiveVehicleCount}</h2>
          </div>
          <div>
            <img className="w-8 md:w-12 lg:w-14" src="/img/cars/parking.png" alt="" />
          </div>
        </div>

        <div className="border md:p-8 bg-purple-300/50 flex justify-between items-start rounded-lg shadow-md p-3">
          <div>
            <h3 className="text-gray-700 md:font-semibold md:text-xl ">Payer</h3>
            <h2 className="text-gray-900 font-bold text-2xl md:text-3xl lg:text-4xl ">$0.00</h2>
          </div>
          <div>
            <img className="w-8 md:w-12 lg:w-14" src="/img/home_icon/payer.png" alt="" />
          </div>
        </div>








      </div>
      {/* End of statistics */}
      {/* ------------------------------- */}
    </div>
  );
}

export default Statistics;
