import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

function FormModifierVehicule({
  handleSubmit,
  addvehicleData,
  handleChange,
  error,
  errorID,
  errorImei,
  currentVehicule,
  setError,
  delVehicule,
  username,
}) {
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 px-4 pb-4">
        {[
          {
            id: "imeiNumber",
            label: "imeiNumber",
            placeholder: "imeiNumber",
          },
          {
            id: "uniqueIdentifier",
            label: "Identificateur unique",
            placeholder: "tk + IMEI",
          },
          {
            id: "description",
            label: "Description du véhicule",
            placeholder: "Description",
          },
          {
            id: "displayName",
            label: "Nom court du véhicule",
            placeholder: "Nom du véhicule",
          },
          {
            id: "licensePlate",
            label: "Plaque du véhicule",
            placeholder: "Plaque",
          },
          {
            id: "equipmentType",
            label: "Type d'appareil",
            placeholder: "BO? B1? B2?",
          },
          {
            id: "simPhoneNumber",
            label: "Numéro du SIM",
            placeholder: "Numéro du SIM",
          },
        ].map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="block text-md font-medium leading-6 text-gray-700"
            >
              {field.label}
            </label>
            <input
              id={field.id}
              name={field.id}
              type="text"
              placeholder={field.placeholder}
              value={addvehicleData[field.id]}
              onChange={handleChange}
              required
              className="block px-3 outline-none w-full border-b border-gray-200 pb-3 py-1.5 text-gray-700 shadow-sm"
            />
          </div>
        ))}

        {error && <p className="text-red-500 text-sm mt-1">{error} </p>}
        {errorID && (
          <p className="flex items-start gap-3 bg-red-100 text-red-700 text-md translate-y-4 px-4 py-1 rounded-md text-center ">
            <span>
              <MdErrorOutline className="text-2xl mt-0.5" />
            </span>
            {errorID}
          </p>
        )}
        {errorImei && (
          <p className="flex items-start gap-3 bg-red-100 text-red-700 text-md translate-y-4 px-4 py-1 rounded-md text-center ">
            <span>
              <MdErrorOutline className="text-2xl mt-0.5" />
            </span>
            {errorImei}
          </p>
        )}

        {username === "admin" ? (
          <div className=" pt-10">
            {currentVehicule?.description ? (
              ""
            ) : (
              <p className="flex items-start gap-3 bg-red-100 text-red-700 text-lg px-4 py-1 rounded-md text-center ">
                <span>
                  <MdErrorOutline className="text-2xl mt-0.5" />
                </span>
                Veuillez choisir un vehicule
              </p>
            )}

            <div className="relative grid grid-cols-2 gap-2 pt-5 pb-8">
              {currentVehicule?.description ? (
                <p className="absolute"></p>
              ) : (
                <div className="absolute inset-0"></div>
              )}
              <button
                onClick={() => {
                  setError("");
                }}
                type="submit"
                className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-md font-semibold text-white"
              >
                Enregistrer
              </button>
              <div
                onClick={() => {
                  delVehicule();
                }}
                className="flex cursor-pointer w-full justify-center items-center gap-2 rounded-md border text-orange-500 border-orange-600 px-3 py-1.5 text-md font-semibold"
              >
                <FaTrashAlt />
                <p>Supprimer</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center pt-10 pb-20 px-4 mx-4">
            <p className="flex items-start gap-3 bg-red-100 text-red-700 text-lg px-4 py-1 rounded-md text-center ">
              <span>
                <MdErrorOutline className="text-2xl mt-0.5" />
              </span>
              Tu n'as pas les autorisations necessaires
            </p>
          </div>
        )}
      </form>
    </>
  );
}

export default FormModifierVehicule;
