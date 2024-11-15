import React, { useContext, useState } from "react";
import { FaCar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";
import { DataContext } from "../context/DataContext";
// import SuccessAddvehiculePupupComponent from "../components/ajouter_vehicule/successAddvehiculePupupComponent";
import ShowConfirmAddVehiculePupupComponent from "../components/ajouter_vehicule/ShowConfirmAddVehiculePupupComponent";
import ErrorAddvehiculePupupComponent from "../components/ajouter_vehicule/ErrorAddvehiculePupupComponent";
import FormAjouterVehicule from "../components/ajouter_vehicule/FormAjouterVehicule";
import SuccessAjoutervehiculePupupComponent from "../components/ajouter_vehicule/SuccessAjoutervehiculePupupComponent";
// import SuccessAddvehiculePupupComponent from "../components/ajouter_vehicule/SuccessAddvehiculePupupComponent";

function AjouterPage() {
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
  const [errorImei, setErrorImei] = useState(""); // État pour le message d'erreur

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

    // Validation du numéro SIM
    if (isNaN(addvehicleData.imeiNumber)) {
      setErrorID("Imei doit être un nombre.");
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
      {crud_loading && (
        <div className="fixed z-30 inset-0 bg-gray-200/50">
          <div className="w-full h-full flex justify-center items-center">
            <div className="border-blue-500 h-20 w-20 animate-spin rounded-full border-8 border-t-gray-100/0" />
          </div>
        </div>
      )}

      <ShowConfirmAddVehiculePupupComponent
        showConfirmAddVehiculePupup={showConfirmAddVehiculePupup}
        handlePasswordCheck={handlePasswordCheck}
        setInputPassword={setInputPassword}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        setshowConfirmAddVehiculePupup={setshowConfirmAddVehiculePupup}
        inputPassword={inputPassword}
      />
      <SuccessAjoutervehiculePupupComponent
        successAddvehiculePupup={successAddvehiculePupup}
        addvehicleData={addvehicleData}
        setsuccessAddvehiculePupup={setsuccessAddvehiculePupup}
      />

      <ErrorAddvehiculePupupComponent
        errorAddvehiculePupup={errorAddvehiculePupup}
        addvehicleData={addvehicleData}
        seterrorAddvehiculePupup={seterrorAddvehiculePupup}
      />

      <div className="flex w-full justify-center h-full mt-10 md:mt-20">
        <div className="w-full flex justify-center">
          <div className="bg-white max-w-[40rem] rounded-xl w-full md:px-6 mt-6 mb-20 border-- shadow-lg overflow-auto">
            <div className="flex justify-center items-center w-full mb-10 pt-10 ">
              <FaCar className="text-2xl mr-2 text-orange-500" />
              <h3 className="text-center font-semibold text-gray-600 text-xl">
                Nouveau Appareil
              </h3>
            </div>

            <FormAjouterVehicule
              handleSubmit={handleSubmit}
              addvehicleData={addvehicleData}
              handleChange={handleChange}
              errorID={errorID}
              errorImei={errorImei}
              error={error}
              username={username}
              setError={setError}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AjouterPage;
