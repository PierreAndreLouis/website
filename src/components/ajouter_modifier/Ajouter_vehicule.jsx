import React, { useContext, useState } from "react";
import { FaCar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navigation_bar from "../home/Navigation_bar";
import PC_header from "../home/PC_header";
import Header from "../home/Header";
import SideBar from "../home/SideBar";
import { DataContext } from "../../context/DataContext";

function Ajouter_vehicule() {
  const { createVehicle, vehicleData } = useContext(DataContext);

  // État pour chaque champ du formulaire
  const [addvehicleData, setAddVehicleData] = useState({
    deviceID: "",
    imeiNumber: "",
    uniqueIdentifier: "",
    description: "",
    displayName: "",
    licensePlate: "",
    equipmentType: "",
    simPhoneNumber: "",
    chassis: "",
    vehicleID: ""
  });

  const [error, setError] = useState(""); // État pour le message d'erreur

  // Gestion de la modification des champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddVehicleData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setError(""); // Réinitialise l'erreur lorsque l'utilisateur modifie l'entrée
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérification si deviceID existe déjà
    const deviceExists = vehicleData.some(
      (vehicle) => vehicle.deviceID === addvehicleData.deviceID
    );

    if (deviceExists) {
      setError("Cet identifiant (deviceID) est déjà utilisé, veuillez en choisir un autre.");
      return;
    }

    // Si deviceID est unique, créer le véhicule
    createVehicle(addvehicleData);
    console.log(addvehicleData)
  };

  return (
    <div>
      <Navigation_bar />
      <PC_header />
      <Header />
      <SideBar />

      <div className="flex w-full justify-center h-full mt-16 md:mt-20">
        <div className="w-full flex justify-center">
          <div className="bg-white max-w-[30rem] w-full shadow-lg overflow-auto">
            <div className="flex justify-center items-center w-full py-10">
              <FaCar className="text-2xl mr-2 text-orange-500" />
              <h3 className="text-center font-semibold text-gray-600 text-xl">
                Nouvelle Appareil
              </h3>
            </div>
            <button onClick={() => createVehicle(addvehicleData)}>test add vehicle</button>
            <button onClick={() => console.log("vehicleData", vehicleData)}>see vehicleData</button>

            <form onSubmit={handleSubmit} className="space-y-4 px-4 pb-4">
              {/* Champs du formulaire */}
              {[
                { id: "deviceID", label: "ID", placeholder: "ID" },
                { id: "imeiNumber", label: "imeiNumber", placeholder: "imeiNumber" },
                { id: "uniqueIdentifier", label: "Identificateur unique", placeholder: "tk + IMEI" },
                { id: "vehicleID", label: "vehicleID", placeholder: "vehicleID" },
                { id: "description", label: "Description du véhicule", placeholder: "Description" },
                { id: "displayName", label: "Nom court du véhicule", placeholder: "Nom du véhicule" },
                { id: "chassis", label: "Châssis du véhicule", placeholder: "Châssis" },
                { id: "licensePlate", label: "Plaque du véhicule", placeholder: "Plaque" },
                { id: "equipmentType", label: "Type d'appareil", placeholder: "BO? B1? B2?" },
                { id: "simPhoneNumber", label: "Numéro du SIM", placeholder: "Numéro du SIM" }
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block text-md font-medium leading-6 text-gray-700">
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
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm"
                  />
                </div>
              ))}

              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

              {/* Boutons Enregistrer et Annuler */}
              <div className="grid grid-cols-2 gap-2 pt-10 pb-20">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-md font-semibold text-white"
                >
                  Enregistrer
                </button>
                <Link
                  to="/home"
                  className="flex w-full justify-center rounded-md border text-orange-500 border-orange-600 px-3 py-1.5 text-md font-semibold"
                >
                  Annuler
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ajouter_vehicule;
