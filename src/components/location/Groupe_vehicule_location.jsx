import React, { useState, useEffect, useContext } from "react";
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
import { DataContext } from "../../context/DataContext";
import Navigation_bar from "../home/Navigation_bar";
import PC_header from "../home/PC_header";

// Configurer les icônes de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: customMarkerIcon,
  iconUrl: customMarkerIcon,
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
});

const MapComponent = ({ vehicles }) => {
  const [mapType, setMapType] = useState("streets");
  const [currentLocation, setCurrentLocation] = useState(null);

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

  const handleMapTypeChange = (event) => {
    setMapType(event.target.value);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Erreur de localisation : ", error.message);
          alert("Impossible de récupérer la position actuelle.");
        }
      );
    } else {
      alert("La géolocalisation n'est pas supportée par ce navigateur.");
    }
  };

  if (!vehicles || vehicles.length === 0) {
    console.log("Aucun véhicule à afficher.");
    return <p>Chargement des données des véhicules...</p>;
  }

  console.log("Données des véhicules :", vehicles);

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

      <div className="flex flex-col bg-white/80 p-3 absolute right-4 top-4 md:top-12 rounded-md z-[1000]">
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
      </div>

      <MapContainer
        center={[vehicles[0].lastValidLatitude, vehicles[0].lastValidLongitude]}
        zoom={13}
        style={{ height: "110vh", width: "100%" }}
      >
        <TileLayer
          url={tileLayers[mapType].url}
          attribution={tileLayers[mapType].attribution}
        />
        <ScaleControl position="bottomright" />
        <AttributionControl position="bottomleft" />

        {vehicles.map((vehicle, index) => {
          const { lastValidLatitude, lastValidLongitude, description, imeiNumber,
            isActive,
            licensePlate,
            simPhoneNumber,
            address
           } =
            vehicle;
          console.log(
            `Véhicule ${index}: latitude ${lastValidLatitude}, longitude ${lastValidLongitude}`
          );

          return (
            <Marker
              key={index}
              position={[lastValidLatitude || 0, lastValidLongitude || 0]}
              icon={L.icon({
                iconUrl: customMarkerIcon,
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
                  <strong>Address :</strong>{" "}
                  {address || "Non disponible"}
                </p>
                {/* <p>
                  <strong>Longitude :</strong>{" "}
                  {lastValidLongitude || "Non disponible"}
                </p> */}

                <p>
                  <strong>IMEI Number :</strong> {imeiNumber || "loading..."}
                </p>
                <p>
                  <strong>Statut :</strong> {isActive ? "Actif" : "Inactif"}
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
                </button>              </Popup>
            </Marker>
          );
        })}

        {currentLocation && (
          <Marker
            position={currentLocation}
            icon={L.icon({
              iconUrl: customMarkerIcon,
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

// Page principale
const Groupe_vehicule_location = () => {
  const { mergedData } = useContext(DataContext);

  const dataFusionee = mergedData ? Object.values(mergedData) : [];
  console.log("Fusion de données :", dataFusionee);

  const vehicleData = dataFusionee.map((vehicule) => ({
    description: vehicule.description || "Véhicule",
    lastValidLatitude: vehicule.vehiculeDetails?.[0]?.latitude || "",
    lastValidLongitude: vehicule.vehiculeDetails?.[0]?.longitude || "",
    address: vehicule.vehiculeDetails?.[0]?.address || "",
    imeiNumber: vehicule?.imeiNumber  || "",
    isActive: vehicule?.isActive  || "",
    licensePlate: vehicule?.licensePlate || "",
    simPhoneNumber: vehicule?.simPhoneNumber || "",
  }));

  return (
    <div className="relative">
      <div className="bg-gray-200 text-gray-200">.</div>
      <div>
        <MapComponent vehicles={vehicleData} />
      </div>
    </div>
  );
};

export default Groupe_vehicule_location;
