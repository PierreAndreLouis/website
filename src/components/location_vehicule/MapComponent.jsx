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
import iconLowSpeed from "/pin/ping_red.png";
import iconMediumSpeed from "/pin/ping_yellow.png";
import iconHighSpeed from "/pin/ping_green.png";
import { DataContext } from "../../context/DataContext";
// import { DataContext } from "../../context/DataContext";

// Configurer les icônes de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: customMarkerIcon,
  iconUrl: customMarkerIcon,
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
});

function MapComponent() {
  const {
    mergedData,
    currentVehicule,
    selectedVehicle,
    setSelectedVehicle,
    currentdataFusionnee,
    searchdonneeFusionneeForRapport,
    donneeFusionneeForRapport,
  } = useContext(DataContext);

  const [showVehiculeListe, setShowVehiculeListe] = useState(false);

  const [typeDeVue, setTypeDeVue] = useState(false);
  // const dataFusionee = [];
  // const dataFusionee = donneeFusionneeForRapport;
  const dataFusionee = currentdataFusionnee;

  // const dataFusionee =
  //   searchdonneeFusionneeForRapport &&
  //   searchdonneeFusionneeForRapport.length > 0
  //     ? donneeFusionneeForRapport
  //     : searchdonneeFusionneeForRapport;

  // const dataFusionee = searchdonneeFusionneeForRapport;

  // const dataFusionee = donneeFusionneeForRapport;

  // const dataFusionee = currentdataFusionnee
  //   ? Object.values(currentdataFusionnee)
  //   : [];

  // const dataFusionee = currentdataFusionnee
  // ? Object.values(currentdataFusionnee)
  // : [];
  // const dataFusionee = mergedData ? Object.values(mergedData) : [];
  // const vehiculeActive = dataFusionee.filter((vehicule) =>  !vehicule.vehiculeDetails || vehicule.vehiculeDetails.length === 0 )

  const vehiculeActive = dataFusionee?.filter(
    (vehicule) =>
      vehicule.vehiculeDetails && vehicule.vehiculeDetails.length > 0
  );

  const vehicleData = vehiculeActive.map((vehicule) => ({
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
    setShowVehiculeListe(!showVehiculeListe);

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
    setTypeDeVue(false);
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

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // const vehiculeActive = dataFusionee.filter((vehicule) =>  vehicule.vehiculeDetails && vehicule.vehiculeDetails.length > 0 )
  // const vehiculeActive = dataFusionee.filter((vehicule) =>  !vehicule.vehiculeDetails || vehicule.vehiculeDetails.length === 0 )

  const filteredVehicles = vehiculeActive?.filter((vehicule) =>
    vehicule.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      adfasdfasdf
      <MapContainer
        center={[0, 0]}
        zoom={3}
        // maxZoom={3} // Empêche un zoom trop proche
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
                  {vehicle.imeiNumber || "Chargement..."}
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
                <p>
                  <strong>Plaque d'immatriculation :</strong>{" "}
                  {vehicle.licensePlate || "Chargement..."}
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
  );
}

export default MapComponent;
