import React, { useContext, useEffect, useState } from "react";


// Configurer les icônes de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: customMarkerIcon,
  iconUrl: customMarkerIcon,
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
});

function Historique() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showFilter, setshowFilter] = useState(false);
  const [typeDeVue, setTypeDeVue] = useState(false);

  const {
    
  } = useContext(DataContext);

  const [checkboxes, setCheckboxes] = useState({
    en_marche: true,
    en_ralenti: true,
    en_arret: true,
  });

  const [appliedCheckboxes, setAppliedCheckboxes] = useState(checkboxes);

  const filteredVehicles = vehiclueHistoriqueDetails?.filter(
    (vehicle) =>
      (appliedCheckboxes.en_marche && vehicle.speedKPH > 20) ||
      (appliedCheckboxes.en_ralenti &&
        vehicle.speedKPH >= 1 &&
        vehicle.speedKPH <= 20) ||
      (appliedCheckboxes.en_arret && vehicle.speedKPH < 1)
  );

  const historiqueInMap = filteredVehicles
    ? Object.values(filteredVehicles)
    : [];
  const vehicleData = historiqueInMap?.map((vehicule) => ({
    description: currentVehicule?.description || "Véhicule",
    lastValidLatitude: vehicule?.latitude || "",
    lastValidLongitude: vehicule?.longitude || "",
    address: vehicule?.address || "",
    imeiNumber: currentVehicule?.imeiNumber || "",
    isActive: currentVehicule?.isActive || "",
    licensePlate: currentVehicule?.licensePlate || "",
    simPhoneNumber: currentVehicule?.simPhoneNumber || "",
    speedKPH: vehicule?.speedKPH || 0, // Ajout de la vitesse
    heading: vehicule?.heading || "",
  }));

  const vehicles = vehicleData;

  const [mapType, setMapType] = useState("streets");
  const [currentLocation, setCurrentLocation] = useState(null);



  const getMarkerIcon = (vehicule) => {
    // const speedKPH = vehicule.speedKPH;

    const speed = parseFloat(vehicule.speedKPH);
    const direction = Math.round(vehicule.heading / 45.0) % 8;

    if (speed <= 0) return "/pin/ping_red.png";
    else if (speed > 0 && speed <= 20)
      return `/pin/ping_yellow_h${direction}.png`;
    else return `/pin/ping_green_h${direction}.png`;
  };

  const openGoogleMaps = (latitude, longitude) => {
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(googleMapsUrl, "_blank"); // Ouvrir dans un nouvel onglet
  };

  const dataFusionee = mergedData ? Object.values(mergedData) : [];
  const [showVehiculeListe, setShowVehiculeListe] = useState(false);



  // Fonction pour gérer la sélection de véhicule
  const handleVehicleClick = (vehicule) => {
    setCurrentVehicule(vehicule);
    firstCallHistoriqueData();
    setShowVehiculeListe(!showVehiculeListe);
  };

  const handleCheckboxChange = (name) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: !prevCheckboxes[name],
    }));
  };

  // Fonction pour appliquer les filtres
  const applyFilter = () => {
    setAppliedCheckboxes(checkboxes);
  };

  const handleMapTypeChange = (type) => {
    setMapType(type);
    setTypeDeVue(false);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredVehiclesPupup = dataFusionee?.filter((vehicule) =>
    vehicule.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Récupérer les positions successives pour les lignes rouges
  const positions = vehicles.map((vehicle) => [
    vehicle.lastValidLatitude,
    vehicle.lastValidLongitude,
  ]);


  return (
    <div className="p-4 flex flex-col gap-4 mt-16 mb-32 px-4 sm:px-12 md:px-20 lg:px-40">
      <div className="z-50"></div>





      {!showHistoriqueInMap ? (
        // histiorique section
        <div>
          <div className="pb-7 md:pb-0 md:pt-7 md:w-full text-center">
            <h2 className="text-xl md:text-4xl md:mb-4 text-orange-600">
              Historique
            </h2>
            <h2 className="text-gray-800 font-semibold text-lg md:text-xl mb-2">
              {currentVehicule?.description || "Pas de vehiucle"}
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {loadingHistoriqueFilter ? (
              <p className="text-center">Chargement des données...</p>
            ) : vehiclueHistoriqueDetails.length > 0 ? (
              (() => {
                const filteredVehicles = vehiclueHistoriqueDetails.filter(
                  (vehicle) =>
                    (appliedCheckboxes.en_marche && vehicle.speedKPH > 20) ||
                    (appliedCheckboxes.en_ralenti &&
                      vehicle.speedKPH >= 1 &&
                      vehicle.speedKPH <= 20) ||
                    (appliedCheckboxes.en_arret && vehicle.speedKPH < 1)
                );

                return filteredVehicles.length > 0 ? (
                  filteredVehicles.map((vehicle, index) => {
                    const speed = vehicle.speedKPH || 0;

              
           

                    return (
                      <div
                        onClick={() => {
                          setShowListOption(true);
                        }}
                        key={index}
                        className={`${lite_bg_color} shadow-md rounded-lg p-3`}
                      >
                    
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center">
                    Pas de donnée disponible{" "}
                    <span className=" text-orange-600">pour le filtre</span>
                  </p>
                );
              })()
            ) : (
              <p className="text-center">Aucune donnée disponible</p>
            )}
          </div>
        </div>
      ) : (
        // carte section
        <div className="  fixed right-0 top-[5rem] md:top-[3.8rem] bottom-0 overflow-hidden left-0">
          <div>
            <div className="relative">
              {typeDeVue && (
                <div className="fixed z-[99999999999999999999] inset-0 bg-black/50 flex justify-center items-center">
                  <div
                    className="bg-white  max-w-[30rem] relative flex flex-col gap-2 w-[80vw] p-6 border border-gray-600 mt-2 rounded-md"
                    id="mapType"
                  >
                    <IoClose
                      onClick={() => {
                        setTypeDeVue(false);
                      }}
                      className="absolute right-4 cursor-pointer top-6 text-2xl text-red-600"
                    />

                    <h2 className="border-b border-orange-400 text-orange-600 text-lg pb-2 mb-3 font-semibold">
                      Choisir un type de vue:
                    </h2>

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
                </div>
              )}

              <MapContainer
                center={[
                  vehicles[0]?.lastValidLatitude || "",
                  vehicles[0]?.lastValidLongitude || "",
                ]}
                zoom={15}
                style={{ height: "110vh", width: "100%" }}
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
                      position={[
                        lastValidLatitude || 0,
                        lastValidLongitude || 0,
                      ]}
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
                            <strong>Adresse :</strong>{" "}
                            {address || "Non disponible"}
                          </p>
                          <p>
                            <strong>IMEI Number :</strong>{" "}
                            {imeiNumber || "loading..."}
                          </p>
                          <p>
                            <strong>Vitesse :</strong>{" "}
                            {speedKPH || "Non disponible"} Km/h
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
                              openGoogleMaps(
                                lastValidLatitude,
                                lastValidLongitude
                              )
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
                <Polyline positions={positions} color="red" weight={1} />
              </MapContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Historique;
