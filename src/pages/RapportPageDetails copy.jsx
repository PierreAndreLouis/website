import React, { useContext, useEffect, useRef, useState } from "react";
import { MdCenterFocusStrong } from "react-icons/md";
import { TfiMapAlt } from "react-icons/tfi";
import { FaCar } from "react-icons/fa";
import { Chart, registerables } from "chart.js";
import { IoTimeOutline } from "react-icons/io5";
import { GiPathDistance } from "react-icons/gi";
import { FaChevronDown } from "react-icons/fa6";
import { IoMdInformationCircleOutline } from "react-icons/io";

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
    donneeFusionneeForRapport,
    vehiculeActiveAjourdhui,
    vehiculeNotActiveAjourdhui,
    vehiculeNotActif,
    currentdataFusionnee,
  } = useContext(DataContext);

  const mapRef = useRef(); // Référence de la carte

  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  // Section carte, pour afficher le trajet du vehicule

  const [mapType, setMapType] = useState("streets");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [personnelDetails, setPersonnelDetails] = useState(true);

  const filteredVehicles = currentVehicule?.vehiculeDetails;
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
  const positions = vehicles?.map((vehicle) => [
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

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // section du diagrame de vitesse
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
    const data = currentVehicule?.vehiculeDetails;

    const timestamps = data?.map((item) =>
      new Date(item.timestamp * 1000).toLocaleTimeString()
    );
    const speeds = data?.map((item) => parseFloat(item.speedKPH));

    // Créer un nouveau graphique
    new Chart(ctx, {
      // type: "line", // Type de graphique
      // type: "polarArea", // Type de graphique
      // type: "radar", // Type de graphique
      type: "bar", // Type de graphique
      fill: true, // Ajoutez cette propriété pour un graphique en aires

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

  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////

  const data = vehiclueHistoriqueDetails;

  // Trouver l'événement de vitesse maximale
  const maxSpeedEvent = data?.reduce(
    (max, d) => (parseFloat(d.speedKPH) > parseFloat(max.speedKPH) ? d : max),
    { speedKPH: "0.0" }
  );

  // Trouver l'arrêt le plus long
  const stops = data?.filter((d) => parseFloat(d.speedKPH) === 0);

  // Si plusieurs arrêts, on calcule la durée entre eux et on trouve le plus long
  let longestStop = null;
  let longestDuration = 0;

  if (stops?.length > 1) {
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
  // const rows = [
  //   {
  //     time: formatTimestamp(data[0]?.timestamp),
  //     event: "Démarrage",
  //     location: `${data[0]?.streetAddress}, ${data[0]?.stateProvince}`,
  //     speed: parseFloat(data[0]?.speedKPH).toFixed(1),
  //     comment: "Début de la journée",
  //   },
  //   {
  //     time: formatTimestamp(maxSpeedEvent?.timestamp),
  //     event: "Vitesse maximale enregistrée",
  //     location: `${maxSpeedEvent?.streetAddress}, ${maxSpeedEvent?.stateProvince}`,
  //     speed: parseFloat(maxSpeedEvent?.speedKPH).toFixed(1),
  //     comment: `Vitesse maximale:  ${parseFloat(
  //       maxSpeedEvent?.speedKPH
  //     ).toFixed(1)} km/h`,
  //   },
  //   {
  //     time: formatTimestamp(longestStop?.timestamp || 0),
  //     event: "L'arrêt le plus long",
  //     location: `${longestStop?.streetAddress || "Adresse inconnue"}, ${
  //       longestStop?.stateProvince || "Province inconnue"
  //     }`,
  //     speed: "0.0",
  //     comment: `Durée de l'arrêt  : ${longestDuration || 0} minutes`,
  //   },
  //   {
  //     time: formatTimestamp(data[data.length - 1]?.timestamp),
  //     event: "Fin de trajet",
  //     location: `${data[data.length - 1]?.streetAddress}, ${
  //       data[data.length - 1]?.stateProvince
  //     }`,
  //     speed: parseFloat(data[data.length - 1]?.speedKPH).toFixed(1),
  //     comment: "Fin de la journée",
  //   },
  // ].filter(Boolean); // Supprime les lignes nulles si aucun arrêt long n'est trouvé

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

  // const vehiculedetails = currentVehicule?.vehiculeDetails;

  // // Filtrer les détails où le véhicule est en mouvement
  // const movingDetails = vehiculedetails?.filter(
  //   (detail) => parseFloat(detail.speedKPH) >= 1
  // );

  // // Calculer la différence entre le premier et le dernier timestamp
  // let timeInMotion = 0;
  // if (movingDetails?.length > 0) {
  //   const firstTimestamp = parseInt(movingDetails[0].timestamp, 10);
  //   const lastTimestamp = parseInt(
  //     movingDetails[movingDetails.length - 1].timestamp,
  //     10
  //   );
  //   timeInMotion = lastTimestamp - firstTimestamp; // Temps en secondes
  // }

  // // Convertir le temps en mouvement en heures, minutes, secondes
  // const formatTime = (seconds) => {
  //   const absSeconds = Math.abs(seconds); // Éviter les valeurs négatives
  //   const hrs = Math.floor(absSeconds / 3600);
  //   const mins = Math.floor((absSeconds % 3600) / 60);
  //   const secs = absSeconds % 60;
  //   return `${hrs}h ${mins}m ${secs}s`;
  // };

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

  //   const processVehicleDataWithDurations = (vehiculedetails) => {
  //     const firstIndex = vehiculedetails?.findIndex(item => parseFloat(item.speedKPH) >= 1);
  //     const lastIndex = vehiculedetails?.length - 1 - vehiculedetails?.slice().reverse().findIndex(item => parseFloat(item.speedKPH) >= 1);

  //     if (firstIndex === -1 || lastIndex === -1) {
  //       return { filteredDetails: [], stopDurations: [], totalStopTime: "0h 0m 0s", stopCount: 0 };
  //     }

  //     const filteredDetails = vehiculedetails?.slice(firstIndex, lastIndex + 1);

  //     let stopCount = 0;
  //     let totalStopTime = 0;
  //     const stopDurations = [];
  //     let currentStopStart = null;

  //     for (let i = 0; i < filteredDetails?.length; i++) {
  //       const currSpeed = parseFloat(filteredDetails[i].speedKPH);
  //       const currTimestamp = parseInt(filteredDetails[i].timestamp, 10);

  //       if (currSpeed === 0) {
  //         if (currentStopStart === null) {
  //           currentStopStart = currTimestamp;
  //         }
  //       } else {
  //         if (currentStopStart !== null) {
  //           const stopDuration = currTimestamp - currentStopStart;
  //           stopDurations.push(stopDuration);
  //           totalStopTime += stopDuration;
  //           stopCount++;
  //           currentStopStart = null;
  //         }
  //       }
  //     }

  //     if (currentStopStart !== null) {
  //       const lastTimestamp = parseInt(filteredDetails[filteredDetails.length - 1].timestamp, 10);
  //       const stopDuration = lastTimestamp - currentStopStart;
  //       stopDurations.push(stopDuration);
  //       totalStopTime += stopDuration;
  //       stopCount++;
  //     }

  //     const formatDuration = (duration) => {
  //       const h = Math.max(0, Math.floor(duration / 3600));
  //       const m = Math.max(0, Math.floor((duration % 3600) / 60));
  //       const s = Math.max(0, duration % 60);
  //       return `${h}h ${m}m ${s}s`;
  //     };

  //     const totalStopTimeFormatted = formatDuration(totalStopTime);

  //     const formattedStopDurations = stopDurations.map(duration => formatDuration(duration));

  //     return {
  //       filteredDetails,
  //       stopDurations: formattedStopDurations,
  //       totalStopTime: totalStopTimeFormatted,
  //       stopCount,
  //     };
  //   };

  //   // Exemple d'utilisation
  //   // const result = processVehicleDataWithDurations(vehiculedetails2);
  //   // console.log(result);

  // // Exemple d'utilisation
  // const vehiculedetails2 = [
  //   {
  //     Device: "863844053509383",
  //     speedKPH: "1.0",
  //     timestamp: "1732468800", // 08:00:00
  //   },
  //   {
  //     Device: "863844053509383",
  //     speedKPH: "1.0",
  //     timestamp: "1732472400", // 08:10:00
  //   },
  //   {
  //     Device: "863844053509383",
  //     speedKPH: "0.0",
  //     timestamp: "1732474200", // 08:30:00
  //   },
  //   {
  //     Device: "863844053509383",
  //     speedKPH: "0.0",
  //     timestamp: "1732477800", // 09:30:00
  //   },
  //   {
  //     Device: "863844053509383",
  //     speedKPH: "1.0",
  //     timestamp: "1732478700", // 09:45:00
  //   },
  //   {
  //     Device: "863844053509383",
  //     speedKPH: "0.0",
  //     timestamp: "1732482600", // 10:00:00
  //   },
  //   {
  //     Device: "863844053509383",
  //     speedKPH: "0.0",
  //     timestamp: "1732483200", // 10:10:00
  //   },
  //   {
  //     Device: "863844053509383",
  //     speedKPH: "5.0",
  //     timestamp: "1732483800", // 10:20:00
  //   },
  //   {
  //     Device: "863844053509383",
  //     speedKPH: "0.0",
  //     timestamp: "1732484400", // 10:30:00
  //   },
  //   {
  //     Device: "863844053509383",
  //     speedKPH: "1.0",
  //     timestamp: "1732486200", // 10:50:00
  //   },
  // ];

  // const result = processVehicleDataWithDurations(vehiculedetails2);
  // const result2 = processVehicleDataWithDurations(vehiclueHistoriqueDetails);

  // console.log("Détails filtrés :", result.filteredDetails);
  // console.log("Durées des arrêts :", result.stopDurations);
  // console.log("Temps total d'arrêt :", result.totalStopTime);
  // console.log("Nombre d'arrêts :", result.stopCount);

  // console.log("Détails filtrés :", result2.filteredDetails);
  // console.log("Durées des arrêts :", result2.stopDurations);
  // console.log("Temps total d'arrêt :", result2.totalStopTime);
  // console.log("Nombre d'arrêts :", result2.stopCount);

  function filterVehicleData(data) {
    // Trouver l'indice du premier objet avec speedKPH >= 1
    const firstValidIndex = data?.findIndex(
      (obj) => parseFloat(obj.speedKPH) >= 1
    );

    // Trouver l'indice du dernier objet avec speedKPH >= 1
    const lastValidIndex = data?.findLastIndex(
      (obj) => parseFloat(obj.speedKPH) >= 1
    );

    // Filtrer les données en excluant les objets avec speedKPH <= 0 avant le premier objet validé
    // et après le dernier objet validé
    return data?.filter((obj, index) => {
      const speedKPH = parseFloat(obj.speedKPH);
      if (index < firstValidIndex) {
        return speedKPH > 0; // Exclure les objets avant le premier valide avec speedKPH <= 0
      } else if (index > lastValidIndex) {
        return speedKPH > 0; // Exclure les objets après le dernier valide avec speedKPH <= 0
      }
      return true; // Inclure les objets dans la plage valide
    });
  }

  // Exemple de données à filtre

  // Appliquer la fonction de filtrage
  const filteredData = filterVehicleData(currentVehicule?.vehiculeDetails);

  ///////////////////////////////////

  const [longestHours, setLongestHours] = useState(0);
  const [longestMinutes, setLongestMinutes] = useState(0);
  const [longestSeconds, setLongestSeconds] = useState(0);
  const [totalStopHours, setTotalStopHours] = useState(0);
  const [totalStopMinutes, setTotalStopMinutes] = useState(0);
  const [totalStopSeconds, setTotalStopSeconds] = useState(0);
  const [totalMovingHours, setTotalMovingHours] = useState(0);
  const [totalMovingMinutes, setTotalMovingMinutes] = useState(0);
  const [totalMovingSeconds, setTotalMovingSeconds] = useState(0);

  let stopSequences = [];

  useEffect(() => {
    // Fonction pour calculer la durée des arrêts et des déplacements
    function countStopsAndShowData(data) {
      let longestDuration = 0; // Variable pour suivre la durée la plus longue
      let totalStopDuration = 0; // Variable pour suivre la durée totale de tous les arrêts
      let totalMovingDuration = 0; // Variable pour suivre la durée totale en mouvement

      let inStopSequence = false;

      // Parcours des données
      for (let i = 0; i < data?.length; i++) {
        const speedKPH = parseFloat(data[i].speedKPH);

        if (speedKPH <= 0) {
          if (!inStopSequence) {
            // Si on entre dans une séquence d'arrêt (speedKPH <= 0)
            inStopSequence = true;
            stopSequences.push([data[i]]); // Démarrer une nouvelle séquence d'arrêt
          } else {
            // Si on est déjà dans une séquence d'arrêt, ajouter l'objet à la séquence en cours
            stopSequences[stopSequences.length - 1].push(data[i]);
          }
        } else if (speedKPH >= 1 && inStopSequence) {
          // Quand on trouve un objet avec speedKPH >= 1 après une séquence d'arrêt
          inStopSequence = false; // Terminer la séquence d'arrêt
        }

        // Calculer la durée des déplacements
        if (speedKPH > 0) {
          const currentTimestamp = parseInt(data[i].timestamp) * 1000; // Convertir en millisecondes
          if (i > 0) {
            const prevTimestamp = parseInt(data[i - 1].timestamp) * 1000; // Convertir en millisecondes
            totalMovingDuration += Math.abs(currentTimestamp - prevTimestamp); // Ajouter à la durée totale en mouvement
          }
        }
      }

      // Calculer la durée entre le premier et le dernier objet de chaque séquence d'arrêt
      stopSequences.forEach((sequence) => {
        const firstTimestamp = sequence[0].timestamp;
        const lastTimestamp = sequence[sequence.length - 1].timestamp;

        const firstMillis = parseInt(firstTimestamp) * 1000; // Convertir en millisecondes
        const lastMillis = parseInt(lastTimestamp) * 1000; // Convertir en millisecondes

        const differenceInMillis = Math.abs(lastMillis - firstMillis);
        totalStopDuration += differenceInMillis; // Ajouter la durée à la durée totale

        // Mettre à jour la durée la plus longue
        if (differenceInMillis > longestDuration) {
          longestDuration = differenceInMillis;
        }
      });

      // Convertir la durée la plus longue en heures, minutes et secondes
      const longestStopHours = Math.floor(longestDuration / (1000 * 60 * 60));
      const longestStopMinutes = Math.floor(
        (longestDuration % (1000 * 60 * 60)) / (1000 * 60)
      );
      const longestStopSeconds = Math.floor(
        (longestDuration % (1000 * 60)) / 1000
      );

      // Convertir la durée totale d'arrêt en heures, minutes et secondes
      const stopHours = Math.floor(totalStopDuration / (1000 * 60 * 60));
      const stopMinutes = Math.floor(
        (totalStopDuration % (1000 * 60 * 60)) / (1000 * 60)
      );
      const stopSeconds = Math.floor((totalStopDuration % (1000 * 60)) / 1000);

      // Convertir la durée totale en mouvement en heures, minutes et secondes
      const movingHours = Math.floor(totalMovingDuration / (1000 * 60 * 60));
      const movingMinutes = Math.floor(
        (totalMovingDuration % (1000 * 60 * 60)) / (1000 * 60)
      );
      const movingSeconds = Math.floor(
        (totalMovingDuration % (1000 * 60)) / 1000
      );

      // Mettre à jour l'état avec la durée la plus longue d'arrêt
      setLongestHours(longestStopHours);
      setLongestMinutes(longestStopMinutes);
      setLongestSeconds(longestStopSeconds);

      // Mettre à jour l'état avec la durée totale d'arrêt
      setTotalStopHours(stopHours);
      setTotalStopMinutes(stopMinutes);
      setTotalStopSeconds(stopSeconds);

      // Mettre à jour l'état avec la durée totale en mouvement
      setTotalMovingHours(movingHours);
      setTotalMovingMinutes(movingMinutes);
      setTotalMovingSeconds(movingSeconds);
    }

    // Appeler la fonction avec les données du véhicule
    countStopsAndShowData(filteredData);
  }, [filteredData]);

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  function getUniqueAddresses(dataList) {
    // Extraire toutes les adresses de la liste
    const addresses = dataList?.map((item) => item.address);

    // Utiliser un Set pour éliminer les doublons
    const uniqueAddresses = [...new Set(addresses)];

    return uniqueAddresses;
  }

  const uniqueAddresses = getUniqueAddresses(currentVehicule?.vehiculeDetails);

  function getUniqueAddressesWhenSpeedZeroOrLess(dataList) {
    // Filtrer les éléments où la vitesse est <= 0
    const filteredData = dataList?.filter(
      (item) => parseFloat(item.speedKPH) <= 0
    );

    // Extraire les adresses de ces éléments filtrés
    const addresses = filteredData?.map((item) => item.address);

    // Utiliser un Set pour éliminer les doublons
    const uniqueAddresses = [...new Set(addresses)];

    return uniqueAddresses;
  }
  const uniqueAddressesZerroSpeed = getUniqueAddressesWhenSpeedZeroOrLess(
    currentVehicule?.vehiculeDetails
  );

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //

  const data2 = currentdataFusionnee;

  const data22 = [
    {
      description: "toyota land cruser",
      plaque: "",
      type: "B1",
      vehiculedetails: [
        {
          Device: "863844053509383",
          accountID: "lelevier",
          address:
            "Delmas 61, Commune de Delmas, Département de l'Ouest 6120, Ayiti",
          city: "Commune de Delmas",
          creationMillis: "1732468878595",
          creationTime: "1732468878",
          deviceID: "863844053509383",
          heading: "0.0",
          latitude: "18.541458833333333",
          longitude: "-72.297372",
          odometerKM: "1273.1891098784806",
          speedKPH: "0.0",
          stateProvince: "Département de l'Ouest",
          statusCode: "0xF952",
          streetAddress: "Delmas 61",
          timestamp: "1732468863",
        },
        {
          Device: "863844053509383",
          accountID: "lelevier",
          address:
            "Delmas 61, Commune de Delmas, Département de l'Ouest 6120, Ayiti",
          city: "Commune de Delmas",
          creationMillis: "1732468878595",
          creationTime: "1732468878",
          deviceID: "863844053509383",
          heading: "0.0",
          latitude: "18.541458833333333",
          longitude: "-72.297372",
          odometerKM: "1273.1891098784806",
          speedKPH: "12.0",
          stateProvince: "Département de l'Ouest",
          statusCode: "0xF952",
          streetAddress: "Delmas 61",
          timestamp: "1732468864",
        },
      ],
    },
    {
      description: "Nissan xterra",
      plaque: "",
      type: "B2",
      vehiculedetails: [
        {
          Device: "863844053509383",
          accountID: "lelevier",
          address:
            "Delmas 61, Commune de Delmas, Département de l'Ouest 6120, Ayiti",
          city: "Commune de Delmas",
          creationMillis: "1732468878595",
          creationTime: "1732468878",
          deviceID: "863844053509383",
          heading: "0.0",
          latitude: "18.541458833333333",
          longitude: "-72.297372",
          odometerKM: "1273.1891098784806",
          speedKPH: "10.0",
          stateProvince: "Département de l'Ouest",
          statusCode: "0xF952",
          streetAddress: "Delmas 61",
          timestamp: "1732468865",
        },
        {
          Device: "863844053509383",
          accountID: "lelevier",
          address:
            "Delmas 61, Commune de Delmas, Département de l'Ouest 6120, Ayiti",
          city: "Commune de Delmas",
          creationMillis: "1732468878595",
          creationTime: "1732468878",
          deviceID: "863844053509383",
          heading: "0.0",
          latitude: "18.541458833333333",
          longitude: "-72.297372",
          odometerKM: "1273.1891098784806",
          speedKPH: "0.0",
          stateProvince: "Département de l'Ouest",
          statusCode: "0xF952",
          streetAddress: "Delmas 61",
          timestamp: "1732468866",
        },
      ],
    },
  ];

  // Filtrer les vehiculeDetails avec speedKPH >= 1
  data2 &&
    data2.length > 0 &&
    data2?.forEach((vehicle) => {
      vehicle.vehiculeDetails = vehicle.vehiculeDetails?.filter(
        (detail) => parseFloat(detail.speedKPH) >= 1
      );
    });

  // Trouver le véhicule avec le timestamp le plus tôt et le plus tard
  let earliestVehicle = null;
  let latestVehicle = null;
  let earliestTimestamp = Infinity;
  let latestTimestamp = -Infinity;

  data2 &&
    data2.length > 0 &&
    data2?.forEach((vehicle) => {
      // const lastDetail = vehicle.vehiculeDetails[0];
      const lastDetail =
        vehicle.vehiculeDetails[vehicle.vehiculeDetails?.length - 1];
      if (lastDetail) {
        const timestamp = parseInt(lastDetail.timestamp, 10);
        if (timestamp < earliestTimestamp) {
          earliestTimestamp = timestamp;
          earliestVehicle = vehicle;
        }
        if (timestamp > latestTimestamp) {
          latestTimestamp = timestamp;
          latestVehicle = vehicle;
        }
      }
    });

  // Affichage des résultats
  console.log("Véhicule avec le timestamp le plus tôt:", earliestVehicle);
  console.log("Véhicule avec le timestamp le plus tard:", latestVehicle);

  return (
    <div className="flex pt-28 flex-col max-w-screen overflow-hidden justify-center items-center pb-20">
      <div className="fixed  px-4 z-[555555555] top-[3.4rem] left-0 right-0 bg-white py-3 dark:bg-gray-800">
        <h2
          onClick={() => {
            // setShowVehiculeListe(true);
            // console.log("Data fusionnee", currentdataFusionnee);
            // console.log("Full data:", vehiclueHistoriqueRapportDetails);
            // console.log("current vehicule", currentVehicule);
            // console.log("vehicule parking :", vehiculeNotActiveAjourdhui);
            // console.log(
            //   "vehiclueHistoriqueDetails:",
            //   vehiclueHistoriqueDetails
            // );
            console.log(
              "Véhicule avec le timestamp le plus tôt:",
              earliestVehicle
            );
            console.log(
              "Véhicule avec le timestamp le plus tard:",
              latestVehicle
            );
          }}
          id="vehicule_actuel"
          className="flex justify-between items-center border py-2 px-5 rounded-md w-full max-w-[40rem] mx-auto cursor-pointer bg-orange-50 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-300/40 "
        >
          <p className="w-full overflow-hidden whitespace-nowrap text-ellipsis">
            Choisir un vehicule
          </p>
          <span>
            <FaChevronDown />
          </span>
        </h2>
      </div>

      <div className="flex px-4 mb-10 w-full gap-3 justify-between max-w-[40rem] mx-auto mt-4 ">
        <button
          onClick={() => {
            setPersonnelDetails(true);
          }}
          className={`${
            personnelDetails
              ? "dark:bg-orange-700 bg-orange-100"
              : "dark:bg-gray-900/70 bg-gray-100"
          } border border-gray-100   dark:text-gray-50 dark:border-gray-50/0 dark:shadow-gray-700 dark:shadow-lg rounded-lg   shadow-lg-- shadow-gray-200 w-full py-1 `}
        >
          Personnel
        </button>
        <button
          onClick={() => {
            setPersonnelDetails(false);
          }}
          className={`${
            !personnelDetails
              ? "dark:bg-orange-700 bg-orange-100"
              : "dark:bg-gray-900/70 bg-gray-100"
          } border border-gray-100   dark:text-gray-50 dark:border-gray-50/0 dark:shadow-gray-700 dark:shadow-lg rounded-lg   shadow-lg-- shadow-gray-200 w-full py-1 `}
        >
          En Groupe
        </button>
        <button className="border border-gray-100 dark:bg-gray-900/70 dark:text-gray-50 dark:border-gray-50/0 dark:shadow-gray-700 dark:shadow-lg rounded-lg bg-gray-100 shadow-lg-- shadow-gray-200 w-full py-1">
          Options
        </button>
      </div>

      {personnelDetails && (
        <div className=" px-4 md:max-w-[80vw] w-full">
          <h1 className="text-center mb-10 font-semibold text-xl my-10 dark:text-gray-300">
            Rapport detaillee du vehicule
          </h1>

          <div className="shadow-md dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 py-4  bg-orange-50 p-2 rounded-md flex items-start gap-4">
            <IoMdInformationCircleOutline className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
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
                    {formattedDate || "---"}
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
                  <span className="font-bold whitespace-nowrap dark:text-orange-500 text-gray-700 pl-3">
                    {heureActiveDebut
                      ? selectUTC
                        ? formatTimestampToTimeWithTimezone(
                            heureActiveDebut.timestamp,
                            selectUTC
                          )
                        : formatTimestampToTime(heureActiveDebut.timestamp)
                      : "0h 0m 0s"}{" "}
                  </span>
                </p>
                <p>
                  Heure d'arriver:{" "}
                  <span className="font-bold whitespace-nowrap dark:text-orange-500 text-gray-700 pl-3">
                    {heureActiveFin
                      ? selectUTC
                        ? formatTimestampToTimeWithTimezone(
                            heureActiveFin.timestamp,
                            selectUTC
                          )
                        : formatTimestampToTime(heureActiveFin.timestamp)
                      : "0h 0m 0s"}{" "}
                  </span>
                </p>
                <p>
                  Duree total en mouvement :{" "}
                  <span className="font-bold whitespace-nowrap dark:text-orange-500 text-gray-700 pl-3">
                    {/* {formatTime(timeInMotion)}{" "} */}
                    {totalMovingHours || "0"}h {totalMovingMinutes || "0"}m{" "}
                    {totalMovingSeconds || "0"}s
                  </span>
                </p>
                <p>
                  Durée totale de tous les arrêts :
                  <span className="font-bold whitespace-nowrap dark:text-orange-500 text-gray-700 pl-3">
                    {totalStopHours}h {totalStopMinutes}m {totalStopSeconds}s{" "}
                  </span>
                </p>
                <p>
                  Duree de l’arrêts le plus long :
                  <span className="font-bold whitespace-nowrap dark:text-orange-500 text-gray-700 pl-3">
                    {`${longestHours || "0"}h ${longestMinutes || "0"}mn ${
                      longestSeconds || "0"
                    }s`}{" "}
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
                    {nombreArret || "0"}
                    {/* {stopSequences?.length || "---"} */}
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
                    {(averageSpeed && averageSpeed.toFixed(2)) || "0"} Km/h/
                  </span>
                </p>
                <p>
                  Vitesse maximale:
                  <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                    {(maxSpeed && maxSpeed.toFixed(2)) || "0"} Km/h
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

          <div className="relative mt-3 h-[40vh] md:h-[60vh] overflow-hidden w-full">
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

          <div className="shadow-md mt-20 mb-8  py-3 dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900  bg-orange-50 p-2 rounded-md flex items-center gap-4">
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
          {/* 
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
                  <th className="border py-3 px-2 min-w-[15rem]">
                    Localisation
                  </th>
                  <th className="border py-3 px-2 min-w-[7rem]">
                    Vitesse (km/h)
                  </th>
                  <th className="border py-3 px-2 min-w-[11rem]">
                    Commentaire
                  </th>
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
          </div> */}

          <div className="shadow-md mt-20 cursor-pointer dark:bg-gray-800 dark:shadow-lg dark:shadow-gray-900 py-4 hover:bg-orange-100/70 bg-orange-50 p-2 rounded-md flex items-start gap-4">
            <TfiMapAlt className="min-w-[2rem] text-[1.82rem] text-orange-400 " />
            <div>
              <h2 className="font-semibold dark:text-orange-500 text-orange-900">
                Tous les lieux fréquentés
              </h2>
              <div className="text-gray-600 flex flex-col gap-3">
                {uniqueAddresses?.map((add, index) => {
                  return (
                    <p className="dark:text-gray-300">
                      <span className="font-bold dark:text-orange-500 text-black mr-3">
                        *{" "}
                      </span>
                      {add}
                    </p>
                  );
                })}{" "}
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
                {uniqueAddressesZerroSpeed?.map((add, index) => {
                  return (
                    <p className="dark:text-gray-300" key={index}>
                      <span className="font-bold dark:text-orange-500 text-black mr-3">
                        *{" "}
                      </span>
                      {add}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

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
      {!personnelDetails && (
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
                    {formattedDate || "---"}
                  </span>
                </p>
                <p>
                  Nombre de Véhicule total :{" "}
                  <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                    {currentdataFusionnee?.length || "---"}
                  </span>
                </p>
                <p>
                  Nombre de Véhicule actif aujourd'hui :{" "}
                  <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                    {vehiculeActiveAjourdhui?.length || "0"}
                  </span>
                </p>
                <p>
                  Nombre de Véhicule en stationnement :{" "}
                  <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                    {vehiculeNotActiveAjourdhui?.length || "---"}
                  </span>
                </p>
                <p>
                  Nombre de Véhicule hors service :{" "}
                  <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                    {vehiculeNotActif?.length || "0"}
                  </span>
                </p>

                <p>
                  1er vehicule en mouvement :{" "}
                  <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                    {earliestVehicle?.displayName ||
                      earliestVehicle?.description ||
                      "---"}
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
                    {earliestVehicle?.vehiculeDetails[
                      earliestVehicle?.vehiculeDetails.length - 1
                    ].timestamp
                      ? selectUTC
                        ? formatTimestampToTimeWithTimezone(
                            earliestVehicle?.vehiculeDetails[
                              earliestVehicle?.vehiculeDetails.length - 1
                            ].timestamp,
                            selectUTC
                          )
                        : formatTimestampToTime(
                            earliestVehicle?.vehiculeDetails[
                              earliestVehicle?.vehiculeDetails.length - 1
                            ].timestamp
                          )
                      : "0h 0m 0s"}{" "}
                  </span>
                </p>
                <p>
                  Dernière heure de mouvement:{" "}
                  <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                    {latestVehicle?.vehiculeDetails[0].timestamp
                      ? selectUTC
                        ? formatTimestampToTimeWithTimezone(
                            latestVehicle?.vehiculeDetails[0].timestamp,
                            selectUTC
                          )
                        : formatTimestampToTime(
                            latestVehicle?.vehiculeDetails[0].timestamp
                          )
                      : "0h 0m 0s"}{" "}
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

          {/* <div className=" w-full- mt-20 overflow-auto ">
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
                  <th className="border py-3 px-2 min-w-[15rem]">
                    Temps actif
                  </th>
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
          </div> */}

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
      )}
    </div>
  );
}

export default RapportPageDetails;
