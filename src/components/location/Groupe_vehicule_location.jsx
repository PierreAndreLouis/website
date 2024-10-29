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

  return (
    <div className="relative">
      {/* Ajouter les composants avec z-index élevé et position absolue */}
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
        style={{ height: "110vh", width: "100%" }}
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
            position={[vehicle.lastValidLatitude, vehicle.lastValidLongitude]}
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
            <Popup>{vehicle.description}</Popup>
          </Marker>
        ))}

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

// Exemple de page
const Groupe_vehicule_location = () => {
  const { currentVehicule, mergedData, isLoading, fetchVehicleDetails } =
    useContext(DataContext);

  const dataFusionee = mergedData ? Object.values(mergedData) : [];
  console.log("dataaaaaaaa", dataFusionee);

  // Formatage des données de chaque véhicule pour la carte
  const vehicleData = dataFusionee.map((vehicle) => ({
    description: vehicle.description || "Véhicule",
    lastValidLatitude: vehicle.vehiculeDetails?.[0]?.latitude || "",
    lastValidLongitude: vehicle.vehiculeDetails?.[0]?.longitude || "",
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
