// import TrajetVehicule from "../components/historique_vehicule/TrajetVehicule";

import React, { useContext, useEffect, useRef, useState } from "react";
import { MdCenterFocusStrong } from "react-icons/md";
import { Bar } from "react-chartjs-2";
import { TfiMapAlt } from "react-icons/tfi";
import { FaCar } from "react-icons/fa";
// import { Chart } from 'chart.js';
import { Chart, registerables } from "chart.js";
import { IoTimeOutline } from "react-icons/io5";
import { GiPathDistance } from "react-icons/gi";
import { FaChevronDown } from "react-icons/fa6";

// Enregistrement des composants nécessaires
Chart.register(...registerables);

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import customMarkerIcon from "/img/cars/localisation.png";
import { DataContext } from "../context/DataContext";
import { RiPinDistanceLine } from "react-icons/ri";
import { SlSpeedometer } from "react-icons/sl";

import TrajetVehicule from "../components/historique_vehicule/TrajetVehicule";
import MapComponent from "../components/location_vehicule/MapComponent";

// Configurer les icônes de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: customMarkerIcon,
  iconUrl: customMarkerIcon,
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
});

function RapportPageDetails() {
  const [typeDeVue, setTypeDeVue] = useState(false);

  const {
    currentVehicule,

    vehiclueHistoriqueDetails,
    vehiclueHistoriqueRapportDetails,
    showHistoriqueInMap,
    selectUTC,
  } = useContext(DataContext);

  const mapRef = useRef(); // Référence de la carte

  const filteredVehicles = vehiclueHistoriqueDetails;

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

  const handleMapTypeChange = (type) => {
    setMapType(type);
    setTypeDeVue(false);
  };

  // Récupérer les positions successives pour les lignes rouges
  const positions = vehicles.map((vehicle) => [
    vehicle.lastValidLatitude,
    vehicle.lastValidLongitude,
  ]);

  // Fonction pour centrer la carte sur le premier marqueur
  const centerOnFirstMarker = () => {
    if (mapRef.current && vehicles.length > 0) {
      const { lastValidLatitude, lastValidLongitude } = vehicles[0];
      mapRef.current.setView([lastValidLatitude, lastValidLongitude], 15);
    }
  };

  ///////////////////////////////////////////////////

  useEffect(() => {
    const canvas = document.getElementById("myChart");
    if (!canvas) {
      console.error("L'élément canvas avec l'ID 'myChart' n'existe pas.");
      return;
    }

    // Vérifiez si un graphique existe déjà, et détruisez-le
    const existingChart = Chart.getChart("myChart"); // Récupérer le graphique existant par ID
    if (existingChart) {
      existingChart.destroy(); // Détruire le graphique existant
    }

    const ctx = canvas.getContext("2d");

    // Exemple de données
    const data = vehiclueHistoriqueDetails;

    ///////////////////////////////////////////////////////////

    const timestamps = data.map((item) =>
      new Date(item.timestamp * 1000).toLocaleTimeString()
    );
    const speeds = data?.map((item) => parseFloat(item.speedKPH));

    // Créer un nouveau graphique
    new Chart(ctx, {
      type: "line", // Type de graphique
      data: {
        labels: timestamps, // Échelle X
        datasets: [
          {
            label: "Vitesse (km/h)",
            data: speeds,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        },
        scales: {
          x: {
            type: "category", // Type de l'échelle X
            title: {
              display: true,
              text: "Heures",
            },
          },
          y: {
            title: {
              display: true,
              text: "Vitesse (km/h)",
            },
          },
        },
      },
    });
  }, []); // Exécuter une seule fois au montage du composant

  const data = vehiclueHistoriqueDetails;

  // Convertir un timestamp en heure formatée
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "--:--";
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Trouver l'événement de vitesse maximale
  const maxSpeedEvent = data.reduce(
    (max, d) => (parseFloat(d.speedKPH) > parseFloat(max.speedKPH) ? d : max),
    { speedKPH: "0.0" }
  );

  // Trouver l'arrêt le plus long
  const stops = data.filter((d) => parseFloat(d.speedKPH) === 0);

  // Si plusieurs arrêts, on calcule la durée entre eux et on trouve le plus long
  let longestStop = null;
  let longestDuration = 0;

  if (stops.length > 1) {
    for (let i = 0; i < stops.length - 1; i++) {
      const currentStop = stops[i];
      const nextStop = stops[i + 1];
      const duration =
        parseInt(nextStop.timestamp) - parseInt(currentStop.timestamp);

      if (duration > longestDuration) {
        longestDuration = duration;
        longestStop = currentStop;
      }
    }
  }

  // Préparer les lignes du tableau
  const rows = [
    {
      time: formatTimestamp(data[0]?.timestamp),
      event: "Démarrage",
      location: `${data[0]?.streetAddress}, ${data[0]?.stateProvince}`,
      speed: parseFloat(data[0]?.speedKPH).toFixed(1),
      comment: "Début de la journée",
    },
    {
      time: formatTimestamp(maxSpeedEvent?.timestamp),
      event: "Vitesse maximale enregistrée",
      location: `${maxSpeedEvent?.streetAddress}, ${maxSpeedEvent?.stateProvince}`,
      speed: parseFloat(maxSpeedEvent?.speedKPH).toFixed(1),
      comment: `Vitesse maximale:  ${parseFloat(
        maxSpeedEvent?.speedKPH
      ).toFixed(1)} km/h`,
    },
    {
      time: formatTimestamp(longestStop?.timestamp || 0),
      event: "L'arrêt le plus long",
      location: `${longestStop?.streetAddress || "Adresse inconnue"}, ${
        longestStop?.stateProvince || "Province inconnue"
      }`,
      speed: "0.0",
      comment: `Durée de l'arrêt  : ${longestDuration || 0} minutes`,
    },
    {
      time: formatTimestamp(data[data.length - 1]?.timestamp),
      event: "Fin de trajet",
      location: `${data[data.length - 1]?.streetAddress}, ${
        data[data.length - 1]?.stateProvince
      }`,
      speed: parseFloat(data[data.length - 1]?.speedKPH).toFixed(1),
      comment: "Fin de la journée",
    },
  ].filter(Boolean); // Supprime les lignes nulles si aucun arrêt long n'est trouvé

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  // Convertir le timestamp en millisecondes
  const timestampInSeconds = currentVehicule?.vehiculeDetails[0]?.timestamp;
  const dateObject = new Date(timestampInSeconds * 1000);

  // Formater la date
  const formattedDate = dateObject.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  console.log("Date :", vehiclueHistoriqueDetails); // Résultat : Date : 23 novembre 2024

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  // Fonctions pour formater le temps et la date
  function formatTimestampToTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  function formatTimestampToTimeWithTimezone(timestamp, offset) {
    const date = convertToTimezone(timestamp, offset);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  const filteredList = currentVehicule?.vehiculeDetails?.filter(
    (item) => parseFloat(item.speedKPH) > 0
  );

  // Trouve l'élément avec le timestamp minimum
  const heureActiveDebut = filteredList?.reduce((minItem, currentItem) => {
    return parseInt(currentItem.timestamp) < parseInt(minItem.timestamp)
      ? currentItem
      : minItem;
  }, filteredList[0]);

  const heureActiveFin = filteredList?.reduce((maxItem, currentItem) => {
    return parseInt(currentItem.timestamp) > parseInt(maxItem.timestamp)
      ? currentItem
      : maxItem;
  }, filteredList[0]);

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  const vehiculedetails = currentVehicule?.vehiculeDetails;

  // Filtrer les détails où le véhicule est en mouvement
  const movingDetails = vehiculedetails?.filter(
    (detail) => parseFloat(detail.speedKPH) >= 1
  );

  // Calculer la différence entre le premier et le dernier timestamp
  let timeInMotion = 0;
  if (movingDetails?.length > 0) {
    const firstTimestamp = parseInt(movingDetails[0].timestamp, 10);
    const lastTimestamp = parseInt(
      movingDetails[movingDetails.length - 1].timestamp,
      10
    );
    timeInMotion = lastTimestamp - firstTimestamp; // Temps en secondes
  }

  // Convertir le temps en mouvement en heures, minutes, secondes
  const formatTime = (seconds) => {
    const absSeconds = Math.abs(seconds); // Éviter les valeurs négatives
    const hrs = Math.floor(absSeconds / 3600);
    const mins = Math.floor((absSeconds % 3600) / 60);
    const secs = absSeconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Rayon de la Terre en kilomètres
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance en kilomètres
  }

  function calculateTotalDistance(dataList) {
    let totalDistance = 0;

    for (let i = 1; i < dataList?.length; i++) {
      const prevPoint = dataList[i - 1];
      const currPoint = dataList[i];

      const distance = calculateDistance(
        parseFloat(prevPoint?.latitude),
        parseFloat(prevPoint?.longitude),
        parseFloat(currPoint?.latitude),
        parseFloat(currPoint?.longitude)
      );

      totalDistance += distance;
    }

    return totalDistance; // Distance totale en kilomètres
  }

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  // Fonction pour compter les arrêts
  const countStops = (vehiculedetails) => {
    let stopCount = 0;
    for (let i = 1; i < vehiculedetails?.length; i++) {
      const prevSpeed = parseFloat(vehiculedetails[i - 1].speedKPH);
      const currSpeed = parseFloat(vehiculedetails[i].speedKPH);
      // Compte comme arrêt si le véhicule passe de >= 1 à 0
      if (prevSpeed >= 1 && currSpeed === 0) {
        stopCount++;
      }
    }
    return stopCount;
  };

  // Calculer le nombre d'arrêts
  const nombreArret = countStops(currentVehicule?.vehiculeDetails);

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  function calculateSpeedStats(dataList) {
    // Filtre pour ne garder que les vitesses supérieures à 0
    const speeds = dataList
      ?.map((item) => parseFloat(item.speedKPH))
      .filter((speed) => speed > 0);

    if (speeds?.length === 0) {
      return {
        minSpeed: 0,
        maxSpeed: 0,
        averageSpeed: 0,
      };
    }

    let minSpeed;
    let maxSpeed;

    if (speeds) {
      // Calcul de la vitesse minimale, maximale et moyenne
      minSpeed = Math.min(...speeds);
      maxSpeed = Math.max(...speeds);
    }
    const averageSpeed =
      speeds?.reduce((sum, speed) => sum + speed, 0) / speeds?.length;

    return {
      minSpeed,
      maxSpeed,
      averageSpeed,
    };
  }

  const { minSpeed, maxSpeed, averageSpeed } = calculateSpeedStats(
    currentVehicule?.vehiculeDetails
  );

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  const longestStopDuration = (vehiculedetails) => {
    let longestStop = 0;
    let stopStart = null;

    vehiculedetails?.length &&
      vehiculedetails?.forEach((detail, index) => {
        const speed = parseFloat(detail.speedKPH);
        const timestamp = parseInt(detail.timestamp, 10);

        if (speed === 0) {
          if (stopStart === null) {
            stopStart = timestamp;
          }
        } else {
          if (stopStart !== null) {
            const stopDuration = timestamp - stopStart;
            longestStop = Math.max(longestStop, stopDuration);
            stopStart = null;
          }
        }
      });

    if (stopStart !== null) {
      const lastTimestamp = parseInt(
        vehiculedetails[vehiculedetails.length - 1].timestamp,
        10
      );
      const stopDuration = lastTimestamp - stopStart;
      longestStop = Math.max(longestStop, stopDuration);
    }

    return longestStop;
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const longestStopduree = longestStopDuration(
    currentVehicule?.vehiculeDetails[0]
  );

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="flex pt-28 flex-col max-w-screen overflow-hidden justify-center items-center pb-20">
      {/* <div className="fixed z-[555555555] top-[4.5rem] left-0 right-0">
        <h2
          // onClick={() => {
          //   setShowVehiculeListe(true);
          // }}
          id="vehicule_actuel"
          className="flex justify-between items-center border py-2 px-5 rounded-md w-full max-w-[40rem] mx-auto cursor-pointer bg-orange-50 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-300/40 md:bg-white md:border md:border-gray-300  md:shadow-xl"
        >
          <p className="w-[90%] overflow-hidden whitespace-nowrap text-ellipsis">
          
            Choisir un vehicule 
          </p>
          <span>
            <FaChevronDown />
          </span>
        </h2>
      </div> */}

      <div className=" px-4 md:max-w-[80vw] w-full">
        <h1 className="text-center mb-10 font-semibold text-xl my-10 dark:text-gray-300">
          Rapport detaillee du vehicule
        </h1>

        <div className="shadow-md dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 py-4  bg-orange-50 p-2 rounded-md flex items-start gap-4">
          <IoTimeOutline className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
          <div>
            <h2 className="font-semibold dark:text-orange-50 text-orange-900">
              Info sur le vehicule
            </h2>
            <div className="text-gray-700 font-bold flex flex-col gap-2 dark:text-gray-300">
              <p>
                Véhicule :{" "}
                <span className=" dark:text-orange-500 font-normal text-gray-700 pl-3">
                  {currentVehicule?.description || "---"}
                </span>
              </p>
              <p>
                Plaque :{" "}
                <span className="font-normal dark:text-orange-500 text-gray-700 pl-3">
                  {currentVehicule?.licensePlate || "---"}
                </span>
              </p>
              <p>
                Date :{" "}
                <span className="font-normal dark:text-orange-500 text-gray-700 pl-3">
                  {formattedDate}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="shadow-md mt-4 dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 py-4  bg-orange-50 p-2 rounded-md flex items-start gap-4">
          <IoTimeOutline className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
          <div>
            <h2 className="font-semibold dark:text-orange-50 text-orange-900">
              Temps
            </h2>
            <div className="text-gray-700 flex flex-col gap-2 dark:text-gray-300">
              <p>
                Heure de départ:{" "}
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {heureActiveDebut
                    ? selectUTC
                      ? formatTimestampToTimeWithTimezone(
                          heureActiveDebut.timestamp,
                          selectUTC
                        )
                      : formatTimestampToTime(heureActiveDebut.timestamp)
                    : "---"}{" "}
                </span>
              </p>
              <p>
                Dernière heure en mouvement:{" "}
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {heureActiveFin
                    ? selectUTC
                      ? formatTimestampToTimeWithTimezone(
                          heureActiveFin.timestamp,
                          selectUTC
                        )
                      : formatTimestampToTime(heureActiveFin.timestamp)
                    : "---"}{" "}
                </span>
              </p>
              <p>
                Temps en mouvement :{" "}
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {formatTime(timeInMotion)}{" "}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="shadow-md mt-4  dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 py-4  bg-orange-50 p-2 rounded-md flex items-start gap-4">
          <RiPinDistanceLine className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
          <div>
            <h2 className="font-semibold dark:text-orange-50 text-orange-900">
              Distance
            </h2>
            <div className="text-gray-600 flex flex-col gap-2 dark:text-gray-300">
              <p>
                Distance totale parcourue:
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {calculateTotalDistance(
                    currentVehicule?.vehiculeDetails
                  ).toFixed(2)}
                  Km{" "}
                </span>
              </p>
              <p>
                Nombre total d’arrêts :
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {nombreArret || ""} {longestStopduree || "---"}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="shadow-md mt-4  dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 py-4  bg-orange-50 p-2 rounded-md flex items-start gap-4">
          <SlSpeedometer className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
          <div>
            <h2 className="font-semibold dark:text-orange-50 text-orange-900">
              Vitesse
            </h2>
            <div className="text-gray-600 flex flex-col gap-2 dark:text-gray-300">
              {/* <p>
                Vitesse minimale:
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {minSpeed.toFixed(2) || "0"} Km/h
                </span>
              </p> */}
              <p>
                Vitesse moyenne:
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {averageSpeed.toFixed(2) || "0"} Km/h/
                </span>
              </p>
              <p>
                Vitesse maximale:
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  {maxSpeed.toFixed(2) || "0"} Km/h
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="shadow-md mt-20  py-3 dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900  bg-orange-50 p-2 rounded-md flex items-center gap-4">
          <GiPathDistance className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
          <h2 className="font-semibold dark:text-orange-50 text-orange-900">
            Trajet du véhicule{" "}
          </h2>
        </div>

        <div className="relative mt-3 h-[60vh] overflow-hidden w-full">
          <button
            className="absolute z-[999] top-[1rem] right-[1rem]"
            onClick={centerOnFirstMarker}
          >
            <div className="flex justify-center items-center min-w-10 min-h-10 rounded-full bg-white shadow-xl">
              <MdCenterFocusStrong className="text-orange-500 text-[1.52rem]" />
            </div>
          </button>
          <div className="absolute -top-[50%] w-full ">
            <div>
              <TrajetVehicule
                typeDeVue={typeDeVue}
                setTypeDeVue={setTypeDeVue}
                mapType={mapType}
                handleMapTypeChange={handleMapTypeChange}
                vehicles={vehicles}
                mapRef={mapRef}
                tileLayers={tileLayers}
                getMarkerIcon={getMarkerIcon}
                currentLocation={currentLocation}
                customMarkerIcon={customMarkerIcon}
                positions={positions}
                centerOnFirstMarker={centerOnFirstMarker}
                showHistoriqueInMap={showHistoriqueInMap}
                openGoogleMaps={openGoogleMaps}
              />
            </div>
          </div>
        </div>

        <div className="shadow-md mt-20  py-3 dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900  bg-orange-50 p-2 rounded-md flex items-center gap-4">
          <SlSpeedometer className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
          <h2 className="font-semibold dark:text-orange-50 text-orange-900">
            Diagramme du vitesse{" "}
          </h2>
        </div>

        <div className=" transition-all w-full ">
          <div>
            <canvas className="w-full transition-all " id="myChart"></canvas>
          </div>
        </div>

        <div className=" w-full- mt-20 overflow-auto ">
          <table
            className="overflow-auto w-full"
            style={{
              // width: "100%",
              // borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr className="bg-orange-50 text-gray-700 border">
                <th className="border py-3 px-2 min-w-[7rem]">Heure</th>
                <th className="border py-3 px-2 min-w-[10rem]">Événement</th>
                <th className="border py-3 px-2 min-w-[15rem]">Localisation</th>
                <th className="border py-3 px-2 min-w-[7rem]">
                  Vitesse (km/h)
                </th>
                <th className="border py-3 px-2 min-w-[11rem]">Commentaire</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={index}
                  className="border"
                  //  style={{ borderBottom: "1px solid #ddd" }}
                >
                  <td className="border py-3 px-2">{row.time}</td>
                  <td className="border py-3 px-2">{row.event}</td>
                  <td className="border py-3 px-2">{row.location}</td>
                  <td className="border py-3 px-2">{row.speed} km/h</td>
                  <td className="border py-3 px-2">{row.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="shadow-md mt-20 cursor-pointer dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 py-4 hover:bg-orange-100/70 bg-orange-50 p-2 rounded-md flex items-start gap-4">
          <TfiMapAlt className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
          <div>
            <h2 className="font-semibold dark:text-orange-500 text-orange-900">
              Tous les lieux fréquentés
            </h2>
            <div className="text-gray-600 flex flex-col gap-3">
              <p className="dark:text-gray-300">
                <span className="font-bold dark:text-orange-500 text-black mr-3">
                  *{" "}
                </span>
                Delmas 33, rue de la Zaracoule, Port-au-prince, Haiti
              </p>
            </div>
          </div>
        </div>

        <div className="shadow-md mt-4 cursor-pointer dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 py-4 hover:bg-orange-100/70 bg-orange-50 p-2 rounded-md flex items-start gap-4">
          <FaCar className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
          <div>
            <h2 className="font-semibold dark:text-orange-500 text-orange-900">
              Tous les lieux Stationnés
            </h2>
            <div className="text-gray-600 flex flex-col gap-3">
              <p className="dark:text-gray-300">
                <span className="font-bold dark:text-orange-500 text-black mr-3">
                  *{" "}
                </span>
                Delmas 33, rue de la Zaracoule, Port-au-prince, Haiti
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ////////////////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////////////////////////////////////////// */}
      <div className=" px-4 md:max-w-[80vw] w-full">
        <h1 className="text-center mb-10 font-semibold text-xl my-10 dark:text-gray-300">
          Rapport detaillee en groupe
        </h1>
        <div className="shadow-md dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 py-4  bg-orange-50 p-2 rounded-md flex items-start gap-4">
          <IoTimeOutline className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
          <div>
            <h2 className="font-semibold dark:text-orange-50 text-orange-900">
              Info sur le vehicule
            </h2>
            <div className="text-gray-700 flex flex-col gap-2 dark:text-gray-300">
              <p>
                Date :{" "}
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  23 novembre 2024{" "}
                </span>
              </p>
              <p>
                Nombre de Véhicule total :{" "}
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  34
                </span>
              </p>
              <p>
                Nombre de Véhicule actif aujourd'hui :{" "}
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  34
                </span>
              </p>
              <p>
                Nombre de Véhicule en stationnement :{" "}
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  34
                </span>
              </p>
              <p>
                Nombre de Véhicule hors service :{" "}
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  34
                </span>
              </p>

              <p>
                1er vehicule en mouvement :{" "}
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  Nissan xterra{" "}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="shadow-md mt-4 dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 py-4  bg-orange-50 p-2 rounded-md flex items-start gap-4">
          <IoTimeOutline className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
          <div>
            <h2 className="font-semibold dark:text-orange-50 text-orange-900">
              Temps
            </h2>
            <div className="text-gray-700 flex flex-col gap-2 dark:text-gray-300">
              <p>
                Heure du 1er mouvement:{" "}
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  08:34:55
                </span>
              </p>
              <p>
                Dernière heure de mouvement:{" "}
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  12:34:32
                </span>
              </p>
              <p>
                Temps d'activite total : 8h 20m
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  2h 45mn
                </span>
              </p>
              <p>
                Vehicule en mouvement plus longtemps
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  Nissan xterra{" "}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="shadow-md mt-4  dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 py-4  bg-orange-50 p-2 rounded-md flex items-start gap-4">
          <RiPinDistanceLine className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
          <div>
            <h2 className="font-semibold dark:text-orange-50 text-orange-900">
              Distance
            </h2>
            <div className="text-gray-600 flex flex-col gap-2 dark:text-gray-300">
              <p>
                Distance totale parcourue:
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  230 Km
                </span>
              </p>
              <p>
                Nombre total d’arrêts :
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  5
                </span>
              </p>
              <p>
                Vehicule ayant parcourru la plus grande distance :
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  Nissan xterra
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="shadow-md mt-4  dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 py-4  bg-orange-50 p-2 rounded-md flex items-start gap-4">
          <SlSpeedometer className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
          <div>
            <h2 className="font-semibold dark:text-orange-50 text-orange-900">
              Vitesse
            </h2>
            <div className="text-gray-600 flex flex-col gap-2 dark:text-gray-300">
              <p>
                Vitesse minimale:
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  Km/h
                </span>
              </p>
              <p>
                Vitesse moyenne:
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  Km/h
                </span>
              </p>
              <p>
                Vitesse maximale:
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  Km/h
                </span>
              </p>
              <p>
                Vehicule avec la vitesse maximale:
                <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                  Nissan xterra
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="shadow-md mt-20  py-3 dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900  bg-orange-50 p-2 rounded-md flex items-center gap-4">
          <GiPathDistance className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
          <h2 className="font-semibold dark:text-orange-50 text-orange-900">
            Position des véhicules{" "}
          </h2>
        </div>

        <div className="max-h-[60vh] mt-3 overflow-hidden">
          <MapComponent />
        </div>

        <div className=" w-full- mt-20 overflow-auto ">
          <table
            className="overflow-auto w-full"
            style={{
              // width: "100%",
              // borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr className="bg-orange-50 text-gray-700 border">
                <th className="border py-3 px-2 min-w-[7rem]">Véhicule</th>
                <th className="border py-3 px-2 min-w-[10rem]">
                  Distance parcourue
                </th>
                <th className="border py-3 px-2 min-w-[15rem]">Temps actif</th>
                <th className="border py-3 px-2 min-w-[7rem]">
                  Vitesse moyenne
                </th>
                <th className="border py-3 px-2 min-w-[7rem]">
                  Vitesse maximale
                </th>
                <th className="border py-3 px-2 min-w-[7rem]">Adresse</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={index}
                  className="border"
                  //  style={{ borderBottom: "1px solid #ddd" }}
                >
                  <td className="border py-3 px-2">{row.time}</td>
                  <td className="border py-3 px-2">{row.event}</td>
                  <td className="border py-3 px-2">{row.location}</td>
                  <td className="border py-3 px-2">{row.speed} km/h</td>
                  <td className="border py-3 px-2">{row.speed} km/h</td>
                  <td className="border py-3 px-2">{row.speed} km/h</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="shadow-md mt-20 cursor-pointer dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 py-4 hover:bg-orange-100/70 bg-orange-50 p-2 rounded-md flex items-start gap-4">
          <TfiMapAlt className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
          <div>
            <h2 className="font-semibold dark:text-orange-500 text-orange-900">
              Tous les lieux fréquentés
            </h2>
            <div className="text-gray-600 flex flex-col gap-3">
              {/* {uniqueAddresses?.map((add, index) => {
                      return (
                        <p className="dark:text-gray-300">
                          <span className="font-bold dark:text-orange-500 text-black mr-3">
                            *{" "}
                          </span>
                          {add}
                        </p>
                      );
                    })} */}
              <p className="dark:text-gray-300">
                <span className="font-bold dark:text-orange-500 text-black mr-3">
                  *{" "}
                </span>
                Delmas 33, rue de la Zaracoule, Port-au-prince, Haiti
              </p>
            </div>
          </div>
        </div>

        <div className="shadow-md mt-4 cursor-pointer dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 py-4 hover:bg-orange-100/70 bg-orange-50 p-2 rounded-md flex items-start gap-4">
          <FaCar className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
          <div>
            <h2 className="font-semibold dark:text-orange-500 text-orange-900">
              Tous les lieux Stationnés
            </h2>
            <div className="text-gray-600 flex flex-col gap-3">
              {/* {uniqueAddressesZerroSpeed?.map((add, index) => {
                      return (
                        <p className="dark:text-gray-300" key={index}>
                          <span className="font-bold dark:text-orange-500 text-black mr-3">
                            *{" "}
                          </span>
                          {add}
                        </p>
                      );
                    })} */}
              <p className="dark:text-gray-300">
                <span className="font-bold dark:text-orange-500 text-black mr-3">
                  *{" "}
                </span>
                Delmas 33, rue de la Zaracoule, Port-au-prince, Haiti
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RapportPageDetails;
