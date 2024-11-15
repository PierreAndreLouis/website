import React from "react";
import { Link } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";

function FormAjouterVehicule({
  handleSubmit,
  addvehicleData,
  handleChange,
  errorID,
  errorImei,
  error,
  username,
  setError,
}) {
  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 px-4 pb-4">
        {/* Champs du formulaire */}
        {[
          { id: "deviceID", label: "ID", placeholder: "ID" },
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
              className="block px-3 w-full border-b pb-4 py-1.5 outline-none text-gray-700 shadow-sm"
            />
          </div>
        ))}

        {error && <p className="text-red-500 text-sm mt-1">{error} </p>}
        {errorImei && (
          <p className="flex items-start gap-3 bg-red-100 text-red-700 text-md translate-y-4 px-4 py-1 rounded-md text-center ">
            <span>
              <MdErrorOutline className="text-2xl mt-0.5" />
            </span>
            {errorImei}
          </p>
        )}
        {errorID && (
          <p className="flex items-start gap-3 bg-red-100 text-red-700 text-md translate-y-4 px-4 py-1 rounded-md text-center ">
            <span>
              <MdErrorOutline className="text-2xl mt-0.5" />
            </span>
            {errorID}
          </p>
        )}

        {/* Boutons Enregistrer et Annuler */}

        {username === "admin" ? (
          <div className="grid grid-cols-2 gap-2 pt-10 pb-6">
            <button
              onClick={() => {
                setError("");
              }}
              type="submit"
              className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-md font-semibold text-white"
            >
              Enregistrer
            </button>
            <Link
              to="/home?tab=acceuil"
              className="flex w-full justify-center rounded-md border text-orange-500 border-orange-600 px-3 py-1.5 text-md font-semibold"
            >
              Annuler
            </Link>
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

export default FormAjouterVehicule;
