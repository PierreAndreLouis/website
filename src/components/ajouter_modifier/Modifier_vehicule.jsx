import React, { useContext, useEffect, useState } from "react";
import { FaCar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Navigation_bar from "../home/Navigation_bar";
import PC_header from "../home/PC_header";
import Header from "../home/Header";
import SideBar from "../home/SideBar";
import { DataContext } from "../../context/DataContext";
import { CiEdit } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa6";
// import { FaCar } from "react-icons/fa";


function Modifier_vehicule() {
  const {
    createVehicle,
    updateVehicle,
    currentVehicule,
    error,
    setError,
    vehicleData,
    deleteVehicle,
    password,
    mergedData,
    setCurrentVehicule,
    firstCallHistoriqueData,
    setSelectedVehicle,
    crud_loading,


    successDeletevehiculePupup,
    setsuccessDeletevehiculePupup,
    errorDeletevehiculePupup,
    seterrorDeletevehiculePupup,

    successModifiervehiculePupup,
    setsuccessModifiervehiculePupup,
    errorModifiervehiculePupup,
    seterrorModifiervehiculePupup,
  } = useContext(DataContext);
  const [showConfirmAddVehiculePupup, setshowConfirmAddVehiculePupup] =
    useState(false);
  const [showConfirmDeletePupup, setshowConfirmDeletePupup] = useState(false);

  const [inputPassword, setInputPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showVehiculeListe, setShowVehiculeListe] = useState(false);
  const [showFilter, setshowFilter] = useState(false);



  const dataFusionee = mergedData ? Object.values(mergedData) : [];

  // error
  // État pour chaque champ du formulaire
  const [addvehicleData, setAddVehicleData] = useState({
    deviceID: currentVehicule?.deviceID || "",
    description: currentVehicule?.description || "",
    equipmentType: currentVehicule?.equipmentType || "",
    uniqueIdentifier: currentVehicule?.uniqueID || "---",
    imeiNumber: currentVehicule?.imeiNumber || "",
    licensePlate: currentVehicule?.licensePlate || "",
    simPhoneNumber: currentVehicule?.simPhoneNumber || "",
    displayName: currentVehicule?.displayName || "",
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
    // const deviceID = addvehicleData.deviceID;

    // Vérification si deviceID existe déjà
    // const deviceExists = vehicleData.some(
    //   (vehicle) => vehicle.deviceID === deviceID
    // );

    // if (deviceExists) {
    //   setErrorID(
    //     "Cet identifiant (ID) est déjà utilisé, veuillez en choisir un autre."
    //   );
    //   return;
    // }

    setshowConfirmAddVehiculePupup(true);
  };

  const handleDeletePasswordCheck = (event) => {
    event.preventDefault(); // Prevents the form from submitting

    if (inputPassword === password) {
      deleteVehicle(currentVehicule?.deviceID || "");

      setshowConfirmDeletePupup(false);
      setErrorMessage("");
      setInputPassword("");
    } else {
      setErrorMessage("Mot de passe incorrect. Veuillez réessayer.");
    }
  };

  const handlePasswordCheck = (event) => {
    event.preventDefault(); // Prevents the form from submitting

    if (inputPassword === password) {
      // const deviceID = "undefined";
      const deviceID = addvehicleData.deviceID;

      const imeiNumber = addvehicleData.imeiNumber;
      const uniqueIdentifier = addvehicleData.uniqueIdentifier;
      const description = addvehicleData.description;
      const displayName = addvehicleData.displayName;
      const licensePlate = addvehicleData.licensePlate;
      const equipmentType = addvehicleData.equipmentType;
      const simPhoneNumber = addvehicleData.simPhoneNumber;

      updateVehicle(
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

  const delVehicule = () => {
    setshowConfirmDeletePupup(true);
  };

  const handleVehicleClick = (vehicule) => {
    setCurrentVehicule(vehicule);

    console.log("Véhicule en variable", currentVehicule);
    console.log("Véhicule cliqué", vehicule);
    // firstCallHistoriqueData();
  };



  useEffect(() => {
    if (currentVehicule) {
      setAddVehicleData({
        deviceID: currentVehicule.deviceID || "",
        description: currentVehicule.description || "",
        equipmentType: currentVehicule.equipmentType || "",
        uniqueIdentifier: currentVehicule.uniqueID || "---",
        imeiNumber: currentVehicule.imeiNumber || "",
        licensePlate: currentVehicule.licensePlate || "",
        simPhoneNumber: currentVehicule.simPhoneNumber || "",
        displayName: currentVehicule.displayName || "",
      });
    }
  }, [currentVehicule]);

  return (
    <div>
      <Navigation_bar />
      <PC_header />
      <Header />
      <SideBar />


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

      {showConfirmDeletePupup && (
        <div className="fixed z-10 flex justify-center items-center inset-0 bg-black/50">
          <form
            onSubmit={handleDeletePasswordCheck}
            className="bg-white max-w-[25rem] p-6 rounded-xl w-[80vw]"
          >
            <div>
              <h2 className="text-center text-xl mb-3 text-red-500 font-semibold">
                Supprimer ?
              </h2>
              {/* <h2 className="text-center text-gray-700 font-semibold">
                {currentVehicule.description} ?
              </h2> */}
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
                  setshowConfirmDeletePupup(false);
                }}
                className="py-1 px-5 cursor-pointer text-center text-orange-500 rounded-lg font-semibold border border-orange-500"
              >
                Annuler
              </h3>
            </div>
          </form>
        </div>
      )}

      {successModifiervehiculePupup && (
        <div className="fixed z-10 flex justify-center items-center inset-0 bg-black/50">
          <div
            onSubmit={handlePasswordCheck}
            className="bg-green-50 max-w-[25rem] p-6 rounded-xl w-[80vw]"
          >
            <div>
              <h3 className="block text-lg  text-center leading-6 text-green-600 mb-3">
                Vous avez modifié le vehicule avec success.
              </h3>
              <h4 className="text-center text-lg text-gray-600">
                {addvehicleData.description}
              </h4>
            </div>
       
            <div className="flex justify-center gap-2 mt-5">
              <Link
                onClick={() => {
                  setsuccessModifiervehiculePupup(false);
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

      {successDeletevehiculePupup && (
        <div className="fixed z-10 flex justify-center items-center inset-0 bg-black/50">
          <div
            onSubmit={handlePasswordCheck}
            className="bg-green-50 max-w-[25rem] p-6 rounded-xl w-[80vw]"
          >
            <div>
              <h3 className="block text-lg  text-center leading-6 text-green-600 mb-3">
                Vous avez supprimer le vehicule avec success.
              </h3>
              <h4 className="text-center text-lg text-gray-600">
                {addvehicleData.description}
              </h4>
            </div>
            <div className="flex justify-center gap-2 mt-5">
              <Link
                onClick={() => {
                  {setsuccessDeletevehiculePupup(false);
                    setCurrentVehicule(null);
                    
                  }
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

      {errorModifiervehiculePupup && (
        <div className="fixed z-10 flex justify-center items-center inset-0 bg-black/50">
          <div
            onSubmit={handlePasswordCheck}
            className="bg-red-50 max-w-[25rem] p-6 rounded-xl w-[80vw]"
          >
            <div>
              <h3 className="block text-lg  text-center leading-6 text-red-600 mb-3">
                Echec de la modification du vehicule
              </h3>
              <h4 className="text-center text-lg text-gray-600">
                {addvehicleData.description}
              </h4>
            </div>
            <div className="flex justify-center gap-2 mt-5">
              <h3
                onClick={() => {
                  seterrorModifiervehiculePupup(false);
                }}
                className="cursor-pointer py-1 text-center px-10 bg-red-500 rounded-lg text-white"
              >
                OK
              </h3>
            </div>
          </div>
        </div>
      )}

      {errorDeletevehiculePupup && (
        <div className="fixed z-10 flex justify-center items-center inset-0 bg-black/50">
          <div
            onSubmit={handlePasswordCheck}
            className="bg-red-50 max-w-[25rem] p-6 rounded-xl w-[80vw]"
          >
            <div>
              <h3 className="block text-lg  text-center leading-6 text-red-600 mb-3">
                Echec de la suppression du vehicule
              </h3>
              <h4 className="text-center text-lg text-gray-600">
                {addvehicleData.description}
              </h4>
            </div>
            <div className="flex justify-center gap-2 mt-5">
              <h3
                onClick={() => {
                  seterrorDeletevehiculePupup(false);
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
          <div className="bg-white max-w-[30rem] w-full shadow-lg overflow-auto">
            <div className="flex justify-center items-center w-full py-10 pb-8">
              <CiEdit className="text-2xl mr-2 text-orange-500" />
              <h3 className="text-center font-semibold text-gray-600 text-xl">
                Modifier Appareil
              </h3>
            </div>

            {/* <h2 className="text-orange-600 ml-4 mb-2">Chosis un appareil</h2> */}
            <div
              onClick={() => {
                setShowVehiculeListe(!showVehiculeListe);
              }}
              className="relative  mx-4 mb-6"
            >
              <div
                className="flex justify-between  cursor-pointer border rounded-md
                 px-3 py-2 bg-orange-50 text-center"
              >
                <p className="text-start">
                  {currentVehicule?.description || "Choisir un vehicule"}
                </p>
                <FaChevronDown className="mt-1" />
              </div>

              {showVehiculeListe && (
                <div className="  fixed flex justify-center items-center inset-0  bg-black/50 z-20 shadow-xl border border-gray-100 rounded-md p-3">
                  <div className="pt-16 relative w-full max-w-[30rem] rounded-xl p-4 max-h-[70vh] overflow-y-auto---- overflow----- hidden--- bg-white">
                    <IoMdClose
                      onClick={() => {
                        setshowFilter(false);
                      }}
                      className="absolute top-3 cursor-pointer right-1  min-w-14 py-2 text-[2.3rem] text-red-600"
                    />

                    <h2 className="absolute left-0 top-4 right-0 font-semibold text-gray-700 mb-2 text-lg pl-7 border-b-2 pb-2 border-gray-600/20">
                      Choisir un vehicule
                    </h2>

                    <div className="overflow-y-auto overflow-x-hidden h-[80vh] max-h-[58vh] pb-20">
                      {dataFusionee?.map((vehicule) => (
                        <div
                          key={vehicule.deviseID}
                          onClick={() => handleVehicleClick(vehicule)}
                          className="cursor-pointer flex gap-4 py-4 items-center border-b border-gray-300 px-3 hover:bg-orange-50"
                        >
                          <FaCar className="text-orange-600/80 min-w-8 text-lg" />
                          <p className=" ">{vehicule.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-4 pb-4">
              {/* Champs du formulaire */}
              {[
                // { id: "deviceID", label: "ID", placeholder: "ID" },
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
                    className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-700 shadow-sm"
                  />
                </div>
              ))}

              {errorID && (
                <p className="text-red-500 text-sm mt-1">{errorID} </p>
              )}
              {error && <p className="text-red-500 text-sm mt-1">{error} </p>}

              {/* Boutons Enregistrer et Annuler */}
              <div className="grid grid-cols-2 gap-2 pt-10 pb-20">
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modifier_vehicule;
