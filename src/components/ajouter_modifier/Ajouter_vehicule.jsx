import React, { useContext, useState } from "react";
import { FaCar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navigation_bar from "../home/Navigation_bar";
import PC_header from "../home/PC_header";
import Header from "../home/Header";
import SideBar from "../home/SideBar";
import { MdErrorOutline } from "react-icons/md";

import { DataContext } from "../../context/DataContext";

function Ajouter_vehicule() {
  const {
    createVehicle,
    error,
    setError,
    vehicleData,
    password,
    successAddvehiculePupup,
    errorAddvehiculePupup,
    seterrorAddvehiculePupup,
    setsuccessAddvehiculePupup,
    crud_loading,
    username,
  } = useContext(DataContext);
  const [showConfirmAddVehiculePupup, setshowConfirmAddVehiculePupup] =
    useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // error
  // État pour chaque champ du formulaire
  const [addvehicleData, setAddVehicleData] = useState({
    deviceID: "",
    description: "",
    equipmentType: "",
    uniqueIdentifier: "",
    imeiNumber: "",
    licensePlate: "",
    simPhoneNumber: "",
    displayName: "",
  });

  const [errorID, setErrorID] = useState(""); // État pour le message d'erreur

  // Gestion de la modification des champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddVehicleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrorID(""); // Réinitialise l'erreur lorsque l'utilisateur modifie l'entrée
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Si deviceID est unique, créer le véhicule
    const deviceID = addvehicleData.deviceID;

    // Vérification si deviceID existe déjà
    const deviceExists = vehicleData.some(
      (vehicle) => vehicle.deviceID === deviceID
    );

    if (deviceExists) {
      setErrorID(
        "Cet identifiant (ID) est déjà utilisé, veuillez en choisir un autre."
      );
      return;
    }

    // Validation du numéro SIM
    if (isNaN(addvehicleData.simPhoneNumber)) {
      setErrorID("Le numéro SIM doit être un nombre.");
      return; // Empêche la soumission si le numéro SIM n'est pas valide
    }

    setshowConfirmAddVehiculePupup(true);
  };

  const handlePasswordCheck = (event) => {
    event.preventDefault(); // Prevents the form from submitting

    if (inputPassword === password) {
      const deviceID = addvehicleData.deviceID;
      const imeiNumber = addvehicleData.imeiNumber;
      const uniqueIdentifier = addvehicleData.uniqueIdentifier;
      const description = addvehicleData.description;
      const displayName = addvehicleData.displayName;
      const licensePlate = addvehicleData.licensePlate;
      const equipmentType = addvehicleData.equipmentType;
      const simPhoneNumber = addvehicleData.simPhoneNumber;

      createVehicle(
        deviceID,
        imeiNumber,
        uniqueIdentifier,
        description,
        displayName,
        licensePlate,
        equipmentType,
        simPhoneNumber
      );
      console.log(addvehicleData);

      setshowConfirmAddVehiculePupup(false);
      setErrorMessage("");
      setInputPassword("");
    } else {
      setErrorMessage("Mot de passe incorrect. Veuillez réessayer.");
    }
  };

  return (
    <div>
      {/* <Navigation_bar />
      <PC_header />
      <Header />
      <SideBar /> */}

      {crud_loading && (
        <div className="fixed z-30 inset-0 bg-gray-200/50">
          <div className="w-full h-full flex justify-center items-center">
            <div className="border-blue-500 h-20 w-20 animate-spin rounded-full border-8 border-t-gray-100/0" />
          </div>
        </div>
      )}

      {showConfirmAddVehiculePupup && (
        <div className="fixed z-10 flex justify-center items-center inset-0 bg-black/50">
          <form
            onSubmit={handlePasswordCheck}
            className="bg-white max-w-[25rem] p-6 rounded-xl w-[80vw]"
          >
            <div>
              <label
                htmlFor="password"
                className="block text-lg text-center leading-6 text-gray-500 mb-3"
              >
                Veuillez entrer votre mot de passe
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Mot de passe"
                  required
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  className=" px-3 w-full rounded-md  py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 border border-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 justify-start mt-5">
              <button
                // onClick={handlePasswordCheck}
                className="py-1 px-5 bg-orange-500 rounded-lg text-white"
              >
                Confirmer
              </button>

              <h3
                onClick={() => {
                  setErrorMessage("");
                  setInputPassword("");
                  setshowConfirmAddVehiculePupup(false);
                }}
                className="py-1 px-5 cursor-pointer text-center text-orange-500 rounded-lg font-semibold border border-orange-500"
              >
                Annuler
              </h3>
            </div>
          </form>
        </div>
      )}

      {successAddvehiculePupup && (
        <div className="fixed z-10 flex justify-center items-center inset-0 bg-black/50">
          <div
            onSubmit={handlePasswordCheck}
            className="bg-green-50 max-w-[25rem] p-6 rounded-xl w-[80vw]"
          >
            <div>
              <h3 className="block text-lg  text-center leading-6 text-green-600 mb-3">
                Vous avez ajouté le véhicule avec success.
              </h3>
              <h4 className="text-center text-lg text-gray-600">
                {addvehicleData.description}
              </h4>
            </div>
            <div className="flex justify-center gap-2 mt-5">
              <Link
                onClick={() => {
                  setsuccessAddvehiculePupup(false);
                }}
                to="/home"
                className="cursor-pointer py-1 text-center px-10 bg-green-500 rounded-lg text-white"
              >
                OK
              </Link>
            </div>
          </div>
        </div>
      )}

      {errorAddvehiculePupup && (
        <div className="fixed z-10 flex justify-center items-center inset-0 bg-black/50">
          <div
            onSubmit={handlePasswordCheck}
            className="bg-red-50 max-w-[25rem] p-6 rounded-xl w-[80vw]"
          >
            <div>
              <h3 className="block text-lg  text-center leading-6 text-red-600 mb-3">
                Echec de l'ajout du vehicule
              </h3>
              <h4 className="text-center text-lg text-gray-600">
                {addvehicleData.description}
              </h4>
            </div>
            <div className="flex justify-center gap-2 mt-5">
              <h3
                onClick={() => {
                  seterrorAddvehiculePupup(false);
                }}
                className="cursor-pointer py-1 text-center px-10 bg-red-500 rounded-lg text-white"
              >
                OK
              </h3>
            </div>
          </div>
        </div>
      )}

      <div className="flex w-full justify-center h-full mt-16 md:mt-20">
        <div className="w-full flex justify-center">
          <div className="bg-white max-w-[40rem] rounded-xl w-full md:px-6 mt-6 mb-20 border-- shadow-lg overflow-auto">
            <div className="flex justify-center items-center w-full mb-10 pt-10 ">
              <FaCar className="text-2xl mr-2 text-orange-500" />
              <h3 className="text-center font-semibold text-gray-600 text-xl">
                Nouveau Appareil
              </h3>
            </div>

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

              {errorID && (
                <p className="text-red-500 text-sm mt-1">{errorID} </p>
              )}
              {error && <p className="text-red-500 text-sm mt-1">{error} </p>}

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
                    to="/home"
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ajouter_vehicule;
