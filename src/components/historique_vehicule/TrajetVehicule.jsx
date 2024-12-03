import React from "react";
import TypeDeVue from "./TypeDeVue";
import { MdCenterFocusStrong } from "react-icons/md";
import { Polyline } from "react-leaflet"; // 1. Import Polyline

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ScaleControl,
  AttributionControl,
} from "react-leaflet";

function TrajetVehicule({
  typeDeVue,
  setTypeDeVue,
  mapType,
  handleMapTypeChange,
  vehicles,
  mapRef,
  tileLayers,
  getMarkerIcon,
  currentLocation,
  customMarkerIcon,
  positions,
  centerOnFirstMarker,
  showHistoriqueInMap,
  openGoogleMaps,
}) {
  return (
    <div className="relative ">
      <button
        className="absolute z-[999] top-[5rem] right-[1rem]"
        onClick={centerOnFirstMarker}
      >
        <div className="flex justify-center items-center min-w-10 min-h-10 rounded-full bg-white shadow-xl">
          <MdCenterFocusStrong className="text-orange-500 text-[1.52rem]" />
        </div>
      </button>

      <div className="border-2 relative border-red-600--- w-[50rem]--- h-[30rem]--- mt-[2.3rem]-- md:mt-0-- overflow-hidden---">
        {/* centrer la carte */}

        <div className="relative">
          <TypeDeVue
            typeDeVue={typeDeVue}
            setTypeDeVue={setTypeDeVue}
            mapType={mapType}
            handleMapTypeChange={handleMapTypeChange}
          />

          <MapContainer
            center={[
              vehicles[0]?.lastValidLatitude || "",
              vehicles[0]?.lastValidLongitude || "",
            ]}
            zoom={15}
            style={{ height: "110vh", width: "100%" }}
            ref={mapRef} // Utiliser la référence ici
          >
            <TileLayer
              url={tileLayers[mapType].url}
              attribution={tileLayers[mapType].attribution}
            />
            <ScaleControl position="bottomright" />
            <AttributionControl position="bottomleft" />

            {vehicles?.map((vehicule, index) => {
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
                heading,
              } = vehicule;

              const markerIcon = getMarkerIcon(vehicule); // Récupérer l'icône en fonction de la vitesse

              return (
                <Marker
                  key={index}
                  position={[lastValidLatitude || 0, lastValidLongitude || 0]}
                  icon={L.icon({
                    iconUrl: markerIcon, // Utiliser l'icône basée sur la vitesse
                    iconSize: [22, 35],
                    // iconSize: [25, 41],
                    iconAnchor: [12, 35],
                    popupAnchor: [-1, -30],
                    shadowUrl:
                      "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
                    shadowSize: [5, 5],
                  })}
                >
                  <Popup className="">
                    <div className="--w-[70vw] ---max-w-[20rem]">
                      <p>
                        <strong>Description :</strong>{" "}
                        {description || "Non disponible"}
                      </p>
                      <p>
                        <strong>Adresse :</strong> {address || "Non disponible"}
                      </p>
                      <p>
                        <strong>IMEI Number :</strong>{" "}
                        {imeiNumber || "loading..."}
                      </p>
                      <p>
                        <strong>Vitesse :</strong>{" "}
                        {speedKPH && !isNaN(Number(speedKPH))
                          ? Number(speedKPH).toFixed(2)
                          : "Non disponible"}
                        Km/h
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
                        <strong>Numéro SIM :</strong>{" "}
                        {simPhoneNumber || "loading..."}
                      </p>
                      <button
                        onClick={() =>
                          openGoogleMaps(lastValidLatitude, lastValidLongitude)
                        }
                        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md"
                      >
                        Voir sur Google Maps
                      </button>
                    </div>
                  </Popup>
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

            {/* 2. Ajoute la ligne rouge entre les positions consécutives */}
            <Polyline positions={positions} color="red" weight={2} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default TrajetVehicule;
