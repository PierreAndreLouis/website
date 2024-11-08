import React, { useState, useEffect, useContext, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ScaleControl,
  AttributionControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import customMarkerIcon from "/img/cars/localisation.png";
import iconLowSpeed from "/img/cars/red_location.png";
import iconMediumSpeed from "/img/cars/yellow_location.png";
import iconHighSpeed from "/img/cars/green_location.png";
import { DataContext } from "../../context/DataContext";
import Navigation_bar from "../home/Navigation_bar";
import PC_header from "../home/PC_header";
import Header from "../home/Header";
import SideBar from "../home/SideBar";
import { IoClose } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa6";

// Configurer les icônes de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: customMarkerIcon,
  iconUrl: customMarkerIcon,
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
});

const Groupe_vehicule_location = () => {
  const { mergedData, currentVehicule, selectedVehicle, setSelectedVehicle } =
    useContext(DataContext);

  const [showVehiculeListe, setShowVehiculeListe] = useState(false);

  const[typeDeVue, setTypeDeVue] = useState(false)

  const dataFusionee = mergedData ? Object.values(mergedData) : [];
  const vehicleData = dataFusionee.map((vehicule) => ({
    deviceID: vehicule.deviceID || "",
    description: vehicule.description || "Véhicule",
    lastValidLatitude: vehicule.vehiculeDetails?.[0]?.latitude || "",
    lastValidLongitude: vehicule.vehiculeDetails?.[0]?.longitude || "",
    address: vehicule.vehiculeDetails?.[0]?.address || "",
    imeiNumber: vehicule?.imeiNumber || "",
    isActive: vehicule?.isActive || "",
    licensePlate: vehicule?.licensePlate || "",
    simPhoneNumber: vehicule?.simPhoneNumber || "",
    speedKPH: vehicule.vehiculeDetails?.[0]?.speedKPH || 0,
  }));

  const handleVehicleClick = (vehicle) => {
    setSelectedVehicle(vehicle.deviceID);
    console.log("Vehicule dans map", vehicle);
  };

  const showAllVehicles = () => {
    setSelectedVehicle(null);
  };

  // const { mergedData, currentVehicule, selectedVehicle, setSelectedVehicle } =
  // useContext(DataContext);

  const [mapType, setMapType] = useState("streets");
  const mapRef = useRef(null);
  const vehicles = selectedVehicle
    ? vehicleData.filter((v) => v.deviceID === selectedVehicle)
    : vehicleData;
  const tileLayers = {
    streets: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    dark: {
      url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.carto.com/attributions">CARTO</a>',
    },
    humanitarian: {
      url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://hot.openstreetmap.org">Humanitarian OpenStreetMap Team</a>',
    },
    positron: {
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.carto.com/attributions">CARTO</a>',
    },
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (mapRef.current && vehicles.length) {
        if (selectedVehicle) {
          console.log("------------------", selectedVehicle);
          // Si un véhicule est sélectionné, centrer sur lui
          const selectedVehicleData = vehicles.find(
            (vehicle) => vehicle.deviceID === selectedVehicle
          );
          if (selectedVehicleData) {
            const { lastValidLatitude, lastValidLongitude } =
              selectedVehicleData;
            mapRef.current.setView([lastValidLatitude, lastValidLongitude], 20);
          }
        } else {
          // Sinon, ajuster pour inclure tous les véhicules
          const bounds = L.latLngBounds(
            vehicles.map((vehicle) => [
              vehicle.lastValidLatitude,
              vehicle.lastValidLongitude,
            ])
          );
          mapRef.current.fitBounds(bounds);
        }
      }
    }, 500);

    return () => clearTimeout(timeoutId); // Nettoyer le timeout au démontage du composant
  }, [selectedVehicle, vehicles]);



  const handleMapTypeChange = (type) => {
    setMapType(type);
    setTypeDeVue(false)
  };

  const getMarkerIcon = (speedKPH) => {
    if (speedKPH < 1) return iconLowSpeed;
    if (speedKPH >= 1 && speedKPH <= 20) return iconMediumSpeed;
    return iconHighSpeed;
  };

  const openGoogleMaps = (latitude, longitude) => {
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div className="relative">
      <div className="absolute z-[10000]">
        <Navigation_bar />
        <PC_header />
        <Header />
        <SideBar />
      </div>
      <div className="fixed bg-white top-12  left-0 right-0 z-[1200] flex flex-col gap-2 p-4">
        <h2
          onClick={() => {
            setShowVehiculeListe(true);
          }}
          id="vehicule_actuel"
          className="flex justify-between items-center border py-2 px-5 rounded-md w-full max-w-[40rem] mx-auto cursor-pointer bg-orange-50"
        >
          {selectedVehicle
            ? vehicleData?.find(
                (vehicle) => vehicle.deviceID === selectedVehicle
              )?.description || "Véhicule non disponible"
            : "Tous les vehicules"}
          <span>
            <FaChevronDown />
          </span>
        </h2>

        <div className="grid  gap-3 w-full max-w-[40rem] mx-auto grid-cols-2 items-center justify-between">
          <div
          onClick={() => {setTypeDeVue(true)}}
          className="flex items-center justify-between gap-1 border px-2 py-1 cursor-pointer bg-orange-50 rounded-md">
            <label htmlFor="mapType">Type de vue </label>
            <FaChevronDown />
          </div>

          <h3
            onClick={() => {
              showAllVehicles();
              setShowVehiculeListe(false);
            }}
            className="text-end text-orange-600 font-semibold cursor-pointer underline"
          >
            Tous les vehicules
          </h3>
        </div>

        {showVehiculeListe && (
          <div className="px-4 fixed z-[118199000111] bg-black/50 -inset-0  flex justify-center items-centerr flex-col">
            <div className="relative  bg-white max-w-[40rem] mx-auto max-h-[70vh] overflow-y-auto overflow-x-hidden p-5 flex flex-col gap-1 rounded-md">
              <IoClose
                onClick={() => {
                  setShowVehiculeListe(false);
                }}
                className="absolute right-6 top-5 text-2xl text-red-500 cursor-pointer"
              />

              <h2 className="font-semibold border-b-2 pb-2 mb-4 text-gray-600 text-lg">
                Choisissez un vehicule
              </h2>
              <div
                onClick={() => {
                  showAllVehicles();
                  setShowVehiculeListe(false);
                }}
                className=" cursor-pointer text-orange-600 hover:bg-orange-50 font-semibold py-2 rounded-md"
              >
                Tous les véhicules
              </div>
              {vehicleData.map((vehicle, index) => (
                <div
                  key={index}
                  onClick={() => {
                    handleVehicleClick(vehicle);
                    setShowVehiculeListe(false);
                  }}
                  className=" cursor-pointer text-gray-700 hover:bg-orange-50  py-2 rounded-md"
                >
                  {vehicle.description}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative">
   {typeDeVue &&     <div className="fixed z-[9999999999999999] inset-0 bg-black/50 flex justify-center items-center">
          <div
            className="bg-white relative flex flex-col gap-2 w-[80vw] p-6 border border-gray-600 mt-2 rounded-md"
            id="mapType"
          >
            <IoClose onClick={() => {setTypeDeVue(false)}} className="absolute right-4 cursor-pointer top-6 text-2xl text-red-600"/>

            <h2 className="border-b border-orange-400 text-orange-800 text-lg pb-2 mb-3 font-semibold">Choisir un type de vue:</h2>

            <p
              className={`cursor-pointer py-1 px-3 rounded-md ${
                mapType === "streets" ? "bg-gray-200" : ""
              }`}
              onClick={() => handleMapTypeChange("streets")}
            >
              Vue Normale
            </p>
            <p
              className={`cursor-pointer py-1 px-3 rounded-md ${
                mapType === "humanitarian" ? "bg-gray-200" : ""
              }`}
              onClick={() => handleMapTypeChange("humanitarian")}
            >
              Vue Humanitaire
            </p>
            <p
              className={`cursor-pointer py-1 px-3 rounded-md ${
                mapType === "positron" ? "bg-gray-200" : ""
              }`}
              onClick={() => handleMapTypeChange("positron")}
            >
              Vue Claire
            </p>
            <p
              className={`cursor-pointer py-1 px-3 rounded-md ${
                mapType === "dark" ? "bg-gray-200" : ""
              }`}
              onClick={() => handleMapTypeChange("dark")}
            >
              Vue Sombre
            </p>
          </div>
        </div>}

 

        <MapContainer
          center={[0, 0]}
          zoom={15}
          style={{ height: "100vh", width: "100%" }}
          ref={mapRef}
        >
          <TileLayer
            url={tileLayers[mapType].url}
            attribution={tileLayers[mapType].attribution}
          />
          <ScaleControl position="bottomright" />
          <AttributionControl position="bottomleft" />

          {vehicles.map((vehicle, index) => (
            <Marker
              key={index}
              position={[
                vehicle.lastValidLatitude || 0,
                vehicle.lastValidLongitude || 0,
              ]}
              icon={L.icon({
                iconUrl: getMarkerIcon(vehicle.speedKPH),
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowUrl:
                  "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
                shadowSize: [41, 41],
              })}
            >
              <Popup>
                <div className="w-[70vw] max-w-[20rem]">
                  <p>
                    <strong>Description :</strong>{" "}
                    {vehicle.description || "Non disponible"}
                  </p>
                  <p>
                    <strong>Adresse :</strong>{" "}
                    {vehicle.address || "Non disponible"}
                  </p>
                  <p>
                    <strong>IMEI Number :</strong>{" "}
                    {vehicle.imeiNumber || "loading..."}
                  </p>
                  <p>
                    <strong>Vitesse :</strong>{" "}
                    {vehicle.speedKPH || "Non disponible"} Km/h
                  </p>
                  <p>
                    <strong>Statut :</strong>
                    {vehicle.speedKPH < 1 && "en arret"}
                    {vehicle.speedKPH > 20 && "en deplacement"}
                    {vehicle.speedKPH >= 1 &&
                      vehicle.speedKPH <= 20 &&
                      "en ralenti"}
                  </p>
                  {/* {vehicle.speedKPH < 1 ? "En arrêt" : vehicle.speedKPH > 20 ? "En déplacement" : "En ralenti"} */}
                  <p>
                    <strong>License Plate :</strong>{" "}
                    {vehicle.licensePlate || "loading..."}
                  </p>
                  <button
                    onClick={() =>
                      openGoogleMaps(
                        vehicle.lastValidLatitude,
                        vehicle.lastValidLongitude
                      )
                    }
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md"
                  >
                    Voir sur Google Maps
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Groupe_vehicule_location;
