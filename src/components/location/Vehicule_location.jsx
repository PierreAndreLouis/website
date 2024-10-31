import React, { useState, useEffect, useContext } from "react";
import { MdLocationPin, MdDateRange } from "react-icons/md";
import { FaCar } from "react-icons/fa";
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
import iconLowSpeed from "/img/cars/red_location.png"; // Remplacez par le chemin de votre icône basse vitesse
import iconMediumSpeed from "/img/cars/yellow_location.png"; // Remplacez par le chemin de votre icône vitesse moyenne
import iconHighSpeed from "/img/cars/green_location.png"; //
import { DataContext } from "../../context/DataContext";
import PC_header from "../home/PC_header";
import Navigation_bar from "../home/Navigation_bar";
import { Link } from "react-router-dom";

// Configurer les icônes de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: customMarkerIcon,
  iconUrl: customMarkerIcon,
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
});

// Composant de la carte
const MapComponent = ({ vehicles }) => {
  const [mapType, setMapType] = useState("streets");
  const [currentLocation, setCurrentLocation] = useState(null); // État pour la position actuelle

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
    satellite: {
      url: "https://{s}.maplibre.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="https://maplibre.org/">MapLibre</a>',
    },
  };

  const handleMapTypeChange = (event) => {
    setMapType(event.target.value);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapPosition([latitude, longitude]); // Mettre à jour la position de la carte
          setMapZoom(13); // Optionnel : zoom sur la position actuelle
        },
        (error) => {
          console.error(
            "Erreur lors de la récupération de la position : ",
            error.message
          );
          alert(
            "Impossible de récupérer la position actuelle. Veuillez vérifier les permissions."
          );
        }
      );
    } else {
      alert("La géolocalisation n'est pas supportée par ce navigateur.");
    }
  };

  const getMarkerIcon = (speedKPH) => {
    if (speedKPH < 1) {
      return iconLowSpeed; // Icône pour basse vitesse
    } else if (speedKPH >= 1 && speedKPH <= 20) {
      return iconMediumSpeed; // Icône pour vitesse moyenne
    } else if (speedKPH > 20) {
      return iconHighSpeed; // Icône pour haute vitesse
    }
  };

  const openGoogleMaps = (latitude, longitude) => {
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(googleMapsUrl, "_blank"); // Ouvrir dans un nouvel onglet
  };

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 right-0 z-[1000]">
        <Navigation_bar />
        <PC_header />
      </div>
      <div className="flex flex-col bg-white/80 p-3 absolute right-4 top-4 rounded-md z-[1000]">
        <label htmlFor="mapType">Choisir le type de vue : </label>
        <select
          className="border p-1 border-gray-600 mt-2 rounded-md"
          id="mapType"
          value={mapType}
          onChange={handleMapTypeChange}
        >
          <option value="streets">Vue Normale</option>
          <option value="humanitarian">Vue Humanitaire</option>
          <option value="positron">Vue Claire</option>
          <option value="dark">Vue Sombre</option>
        </select>
        {/* <button className='mt-2 p-2 bg-blue-500 text-white rounded-md' onClick={getCurrentLocation}>
          Voir ma position actuelle
        </button> */}
      </div>
      <MapContainer
        center={[vehicles[0].lastValidLatitude, vehicles[0].lastValidLongitude]}
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url={tileLayers[mapType].url}
          attribution={tileLayers[mapType].attribution}
        />
        <ScaleControl position="bottomright" />
        <AttributionControl position="bottomleft" />

        {vehicles.map((vehicle, index) => {
          const {
            lastValidLatitude,
            lastValidLongitude,
            description,
            imeiNumber,
            isActive,
            licensePlate,
            simPhoneNumber,
            address,
            speedKPH,
          } = vehicle;
          console.log(
            `Véhicule ${index}: latitude ${lastValidLatitude}, longitude ${lastValidLongitude}`
          );

          const markerIcon = getMarkerIcon(speedKPH); // Récupérer l'icône en fonction de la vitesse

          return (
            <Marker
              key={index}
              position={[lastValidLatitude || 0, lastValidLongitude || 0]}
              icon={L.icon({
                iconUrl: markerIcon,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowUrl:
                  "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
                shadowSize: [41, 41],
              })}
            >
              <Popup>
                <p>
                  <strong>Description :</strong>{" "}
                  {description || "Non disponible"}
                </p>
                <p>
                  <strong>Address :</strong> {address || "Non disponible"}
                </p>
                {/* <p>
                  <strong>Longitude :</strong>{" "}
                  {lastValidLongitude || "Non disponible"}
                </p> */}

                <p>
                  <strong>IMEI Number :</strong> {imeiNumber || "loading..."}
                </p>
                <p>
                  <strong>Statut : </strong>
                  {speedKPH < 1 && "en arret"}
                  {speedKPH > 20 && "en deplacement"}
                  {speedKPH >= 1 && speedKPH <= 20 && "en ralenti"}
                </p>
                <p>
                  <strong>License Plate :</strong>{" "}
                  {licensePlate || "loading..."}
                </p>
                <p>
                  <strong>Numéro SIM :</strong> {simPhoneNumber || "loading..."}
                </p>
                <button
                  onClick={() =>
                    openGoogleMaps(lastValidLatitude, lastValidLongitude)
                  }
                  className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md"
                >
                  Voir sur Google Maps
                </button>
              </Popup>
            </Marker>
          );
        })}

        {/* Marqueur pour la position actuelle */}
        {currentLocation && (
          <Marker
            position={currentLocation}
            icon={L.icon({
              iconUrl: customMarkerIcon, // Utiliser une autre icône si nécessaire
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowUrl:
                "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
              shadowSize: [41, 41],
            })}
          >
            <Popup>Vous êtes ici</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

// Exemple de page
const Vehicule_location = () => {
  // const { currentVehicule, isLoading, fetchVehicleDetails } =
  //   useContext(DataContext);

  const {
    mergedData,
    isLoading,
    currentVehicule,
    updateCurrentVehicule,
    loadingHistoriqueFilter,
  } = useContext(DataContext);

  const dataFusionee = mergedData ? Object.values(mergedData) : [];

  const description = currentVehicule?.description;
  const lastValidLatitude =
    currentVehicule?.vehiculeDetails?.[0]?.latitude || "";
  const lastValidLongitude =
    currentVehicule?.vehiculeDetails?.[0]?.longitude || "";

  const address = currentVehicule?.vehiculeDetails?.[0]?.address || "";
  const imeiNumber = currentVehicule?.imeiNumber || "";
  const isActive = currentVehicule?.isActive || "";
  const licensePlate = currentVehicule?.licensePlate || "";
  const simPhoneNumber = currentVehicule?.simPhoneNumber || "";
  const speedKPH = currentVehicule?.vehiculeDetails?.[0]?.speedKPH || 0; // Ajout de la vitesse

  const vehicleData = [
    {
      description: description || "loading...",
      lastValidLatitude,
      lastValidLongitude,
      address,
      imeiNumber,
      isActive,
      licensePlate,
      simPhoneNumber,
      speedKPH,
    },
  ];

  // Fonction pour gérer la sélection de véhicule
  const handleVehicleChange = (e) => {
    const selectedVehicleDescription = e.target.value;
    const selectedVehicle = dataFusionee.find(
      (vehicule) => vehicule.description === selectedVehicleDescription
    );
    updateCurrentVehicule(selectedVehicle);
  };

  useEffect(() => {
    // Désactiver le défilement
    document.body.style.overflow = "hidden";

    // Rétablir le défilement lors du démontage du composant
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="relative bg-gray-100 overflow-hidden">
      <div className="m-4 overflow-hidden md:mt-16 md:flex justify-between gap-4 items-center w-full">
        <div className="flex justify-between items-center">
          <h2 className="mb-2 text-orange-500 font-semibold">
            Choisis un vehicule
          </h2>
          <Link
            to="/Groupe_vehicule_location"
            className="mr-10 md:hidden   text-blue-600 "
          >
            Tous les vehicles
          </Link>
        </div>
        <select
          className=" px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
          onChange={handleVehicleChange}
        >
          {dataFusionee.map((vehicule, index) => (
            <option key={index} value={vehicule.description}>
              {vehicule.description}
            </option>
          ))}
        </select>
        <Link
          to="/Groupe_vehicule_location"
          className="mr-10 hidden md:block text-blue-600"
        >
          Tous les vehicles
        </Link>
      </div>
      <div className="bg-gray-100">
        <MapComponent vehicles={vehicleData} />
      </div>
    </div>
  );
};

export default Vehicule_location;
