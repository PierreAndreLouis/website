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
    searchdonneeFusionneeForRapport,
    searchrapportvehicleDetails,
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

  const filteredVehicles = vehiclueHistoriqueDetails;
  // const filteredVehicles = currentVehicule?.vehiculeDetails;

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

  // Trouver la date du rapport//  exemple  Résultat : Date : 23 novembre 2024
  const timestampInSeconds = currentVehicule?.vehiculeDetails[0]?.timestamp;
  const dateObject = new Date(timestampInSeconds * 1000);

  // Formater la date
  const formattedDate = dateObject.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  // section pour trouver l'heure du debut et l'heure de la fin dur parcoure du vehicule

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

  function calculateActivePeriodsForAllVehicles(vehicleData) {
    // Tableau des résultats
    const results = [];

    vehicleData.forEach((vehicle) => {
      const { description, vehiculeDetails } = vehicle; // Nom et détails du véhicule

      // Filtrer les données pour les moments actifs (vitesse > 0)
      const filteredList = vehiculeDetails?.filter(
        (item) => parseFloat(item.speedKPH) > 0
      );

      if (filteredList && filteredList.length > 0) {
        // Trouver l'élément avec le timestamp minimum
        const startTimestamp = filteredList.reduce((minItem, currentItem) => {
          return parseInt(currentItem.timestamp) < parseInt(minItem.timestamp)
            ? currentItem
            : minItem;
        }, filteredList[0]);

        // Trouver l'élément avec le timestamp maximum
        const endTimestamp = filteredList.reduce((maxItem, currentItem) => {
          return parseInt(currentItem.timestamp) > parseInt(maxItem.timestamp)
            ? currentItem
            : maxItem;
        }, filteredList[0]);

        // Ajouter au tableau des résultats
        results.push({
          description,
          startTime: new Date(parseInt(startTimestamp.timestamp) * 1000), // Convertir en format lisible
          endTime: new Date(parseInt(endTimestamp.timestamp) * 1000), // Convertir en format lisible
        });
      } else {
        // Aucun moment actif pour ce véhicule
        results.push({
          description,
          startTime: null,
          endTime: null,
        });
      }
    });

    return results;
  }

  const activePeriods =
    calculateActivePeriodsForAllVehicles(currentdataFusionnee);
  console.log(activePeriods);

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  // section pour calculer la distance totale parcourrue par le vehicule

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

  // Fonction pour calculer la distance totale pour tous les véhicules
  // Fonction pour calculer la distance totale pour tous les véhicules
  function calculateDistancesForAllVehicles(vehicles) {
    if (vehicles && vehicles.length > 0) {
      let distancesByVehicle = {}; // Stocker la distance totale pour chaque véhicule
      let totalDistanceAllVehicles = 0; // Stocker la distance totale pour tous les véhicules
      let maxDistance = 0; // Distance maximale parcourue
      let maxDistanceVehicle = ""; // Nom du véhicule ayant parcouru la plus grande distance

      vehicles.forEach((vehicle) => {
        const data = filterVehicleData(vehicle?.vehiculeDetails); // Appliquer le filtrage si nécessaire

        const totalDistance = calculateTotalDistance(data); // Calculer la distance pour ce véhicule
        distancesByVehicle[vehicle.description] = totalDistance; // Nom du véhicule + distance

        totalDistanceAllVehicles += totalDistance; // Ajouter la distance au total global

        // Vérifier si ce véhicule a la plus grande distance
        if (totalDistance > maxDistance) {
          maxDistance = totalDistance;
          maxDistanceVehicle = vehicle.description;
        }
      });

      return {
        distancesByVehicle, // Distance par véhicule
        totalDistanceAllVehicles, // Distance totale pour tous les véhicules
        maxDistanceVehicle, // Nom du véhicule ayant parcouru la plus grande distance
        maxDistance, // Distance la plus grande
      };
    }
  }

  // Exemple d'utilisation :
  const result2 = calculateDistancesForAllVehicles(currentdataFusionnee); // Remplacez "allVehicles" par votre liste
  // console.log("Distance totale par véhicule :", result2?.distancesByVehicle);
  // console.log(
  //   "Distance totale pour tous les véhicules :",
  //   result2?.totalDistanceAllVehicles.toFixed(2),
  //   "km"
  // );
  // console.log(
  //   "Véhicule ayant parcouru la plus grande distance :",
  //   result2?.maxDistanceVehicle,
  //   "avec",
  //   result2?.maxDistance.toFixed(2),
  //   "km"
  // );

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  // Fonction pour compter les arrêts totale du vehicule

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

  // Fonction pour calculer le nombre total d'arrêts pour tous les véhicules
  function countStopsForAllVehicles(vehicles) {
    if (vehicles && vehicles.length > 0) {
      let stopsByVehicle = {}; // Stocker le nombre d'arrêts pour chaque véhicule
      let totalStopsAllVehicles = 0; // Stocker le nombre total d'arrêts pour tous les véhicules

      vehicles.forEach((vehicle) => {
        const data = filterVehicleData(vehicle?.vehiculeDetails); // Appliquer le filtrage si nécessaire

        const stopCount = countStops(data); // Nombre d'arrêts pour ce véhicule
        stopsByVehicle[vehicle.description] = stopCount; // Nom du véhicule + nombre d'arrêts

        totalStopsAllVehicles += stopCount; // Ajouter le nombre d'arrêts au total global
      });

      return {
        stopsByVehicle, // Nombre d'arrêts par véhicule
        totalStopsAllVehicles, // Nombre total d'arrêts pour tous les véhicules
      };
    }
  }

  // Exemple d'utilisation :
  const result3 = countStopsForAllVehicles(currentdataFusionnee); // Remplacez "allVehicles" par votre liste
  // console.log("Nombre d'arrêts par véhicule :", result3.stopsByVehicle);
  // console.log(
  //   "Nombre total d'arrêts pour tous les véhicules :",
  //   result3.totalStopsAllVehicles
  // );

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  // calcule de la vitesse ninimal, maximal et moyenne du vehicule

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

  // Fonction pour calculer les statistiques de vitesse (min, max, moyenne) pour tous les véhicules
  // function calculateSpeedStatsForAllVehicles(vehicles) {
  //   if (vehicles && vehicles.length > 0) {
  //     let allSpeeds = []; // Stocker toutes les vitesses de tous les véhicules
  //     let statsByVehicle = {}; // Stocker les statistiques par véhicule

  //     vehicles.forEach((vehicle) => {
  //       const data = filterVehicleData(vehicle?.vehiculeDetails); // Filtrer les données si nécessaire
  //       const stats = calculateSpeedStats(data); // Obtenir les statistiques pour ce véhicule

  //       statsByVehicle[vehicle.description] = stats; // Ajouter les stats de ce véhicule
  //       allSpeeds = [
  //         ...allSpeeds,
  //         ...data
  //           .map((item) => parseFloat(item.speedKPH))
  //           .filter((speed) => speed > 0),
  //       ];
  //     });

  //     // Calcul des statistiques globales pour tous les véhicules
  //     const globalStats = calculateGlobalSpeedStats(allSpeeds);

  //     return {
  //       statsByVehicle, // Statistiques par véhicule
  //       globalStats, // Statistiques globales
  //     };
  //   }
  // }

  function calculateSpeedStatsForAllVehicles(vehicles) {
    if (vehicles && vehicles.length > 0) {
      let allSpeeds = []; // Stocker toutes les vitesses de tous les véhicules
      let statsByVehicle = {}; // Stocker les statistiques par véhicule
      let maxSpeedVehicle = { description: null, maxSpeed: 0 }; // Véhicule avec la vitesse maximale la plus élevée

      vehicles.forEach((vehicle) => {
        const data = vehicle?.vehiculeDetails || []; // Récupérer les détails du véhicule
        const stats = calculateSpeedStats(data); // Calculer les stats pour ce véhicule

        statsByVehicle[vehicle.description] = stats; // Ajouter les stats de ce véhicule

        // Vérifier si ce véhicule a la vitesse maximale la plus élevée
        if (stats.maxSpeed > maxSpeedVehicle.maxSpeed) {
          maxSpeedVehicle = {
            description: vehicle.description,
            maxSpeed: stats.maxSpeed,
          };
        }

        // Ajouter les vitesses du véhicule aux vitesses globales
        allSpeeds = [
          ...allSpeeds,
          ...data
            .map((item) => parseFloat(item.speedKPH))
            .filter((speed) => speed > 0),
        ];
      });

      // Calcul des statistiques globales pour tous les véhicules
      const globalStats = calculateGlobalSpeedStats(allSpeeds);

      return {
        statsByVehicle, // Statistiques par véhicule
        globalStats, // Statistiques globales
        maxSpeedVehicle, // Véhicule avec la vitesse maximale la plus élevée
      };
    }
  }

  // Fonction pour calculer les statistiques globales pour toutes les vitesses
  function calculateGlobalSpeedStats(allSpeeds) {
    if (allSpeeds.length === 0) {
      return {
        minSpeed: 0,
        maxSpeed: 0,
        averageSpeed: 0,
      };
    }

    const minSpeed = Math.min(...allSpeeds);
    const maxSpeed = Math.max(...allSpeeds);
    const averageSpeed =
      allSpeeds.reduce((sum, speed) => sum + speed, 0) / allSpeeds.length;

    return {
      minSpeed,
      maxSpeed,
      averageSpeed,
    };
  }

  // Exemple d'utilisation :
  // const result4 = calculateSpeedStatsForAllVehicles(currentdataFusionnee); // Remplacez "allVehicles" par votre liste
  // console.log("Statistiques par véhicule :", result4?.statsByVehicle);
  // console.log("Statistiques globales :", result4?.globalStats);

  // Exemple d'utilisation :
  const result5 = calculateSpeedStatsForAllVehicles(currentdataFusionnee); // Remplacez "allVehicles" par votre liste
  // console.log("Statistiques par véhicule :", result5?.statsByVehicle);
  // console.log("Statistiques globales :", result5?.globalStats);
  // console.log(
  //   `Véhicule avec la vitesse maximale la plus élevée : ${result5?.maxSpeedVehicle.description}, Vitesse : ${result5?.maxSpeedVehicle.maxSpeed} KPH`
  // );

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  // calcule de la duree total en mouvement, duree total en arret et le plus longue arret

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

  // Appliquer la fonction de filtrage
  const filteredData = filterVehicleData(currentVehicule?.vehiculeDetails);

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
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  function calculateTotalMovingTimePerVehicle(vehicleData) {
    // Initialiser un tableau pour stocker les résultats
    const results = [];

    vehicleData.forEach((vehicle) => {
      const { description, vehiculeDetails } = vehicle; // Nom et détails du véhicule
      let totalMovingDuration = 0; // Durée totale en mouvement pour ce véhicule

      vehiculeDetails.forEach((data, index) => {
        const speedKPH = parseFloat(data.speedKPH);
        if (speedKPH > 0 && index > 0) {
          const currentTimestamp = parseInt(data.timestamp) * 1000; // Convertir en millisecondes
          const prevTimestamp =
            parseInt(vehiculeDetails[index - 1].timestamp) * 1000; // Convertir en millisecondes

          totalMovingDuration += Math.abs(currentTimestamp - prevTimestamp); // Ajouter la durée en mouvement
        }
      });

      // Convertir la durée totale en heures, minutes et secondes
      const movingHours = Math.floor(totalMovingDuration / (1000 * 60 * 60));
      const movingMinutes = Math.floor(
        (totalMovingDuration % (1000 * 60 * 60)) / (1000 * 60)
      );
      const movingSeconds = Math.floor(
        (totalMovingDuration % (1000 * 60)) / 1000
      );

      // Ajouter le résultat pour ce véhicule
      results.push({
        description,
        totalMovingDuration: {
          hours: movingHours,
          minutes: movingMinutes,
          seconds: movingSeconds,
        },
      });
    });

    return results;
  }

  const movingTimes = calculateTotalMovingTimePerVehicle(currentdataFusionnee);
  console.log(movingTimes);

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  // section pour savoir tous les lieux frequentes et stationnes

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
  //  section pour savoir le vehicule en mouvement en premier et en dernier

  const data2 = currentdataFusionnee;

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
  // console.log("Véhicule avec le timestamp le plus tôt:", earliestVehicle);
  // console.log("Véhicule avec le timestamp le plus tard:", latestVehicle);

  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////

  function calculateDurationsForAllVehicles(vehicles) {
    if (vehicles && vehicles.length > 0) {
      let totalMovingDuration = 0;
      let totalStopDuration = 0;
      let longestStopDuration = 0;
      let vehicleWithLongestStop = null;
      let longestMovingDuration = 0;
      let vehicleWithLongestMoving = null;

      vehicles.forEach((vehicle) => {
        const data = filterVehicleData(vehicle?.vehiculeDetails); // Appliquer le filtrage
        let stopSequences = [];
        let vehicleMovingDuration = 0;
        let vehicleStopDuration = 0;
        let vehicleLongestStop = 0;
        let inStopSequence = false;

        for (let i = 0; i < data?.length; i++) {
          const speedKPH = parseFloat(data[i].speedKPH);

          if (speedKPH <= 0) {
            if (!inStopSequence) {
              inStopSequence = true;
              stopSequences.push([data[i]]);
            } else {
              stopSequences[stopSequences.length - 1].push(data[i]);
            }
          } else if (speedKPH >= 1 && inStopSequence) {
            inStopSequence = false;
          }

          if (speedKPH > 0 && i > 0) {
            const currentTimestamp = parseInt(data[i].timestamp) * 1000;
            const prevTimestamp = parseInt(data[i - 1].timestamp) * 1000;
            vehicleMovingDuration += Math.abs(currentTimestamp - prevTimestamp);
          }
        }

        stopSequences.forEach((sequence) => {
          const firstTimestamp = sequence[0].timestamp;
          const lastTimestamp = sequence[sequence.length - 1].timestamp;

          const firstMillis = parseInt(firstTimestamp) * 1000;
          const lastMillis = parseInt(lastTimestamp) * 1000;
          const differenceInMillis = Math.abs(lastMillis - firstMillis);

          vehicleStopDuration += differenceInMillis;

          if (differenceInMillis > vehicleLongestStop) {
            vehicleLongestStop = differenceInMillis;
          }
        });

        // Ajouter les durées de ce véhicule aux totaux
        totalMovingDuration += vehicleMovingDuration;
        totalStopDuration += vehicleStopDuration;

        // Vérifier si ce véhicule a le plus long arrêt
        if (vehicleLongestStop > longestStopDuration) {
          longestStopDuration = vehicleLongestStop;
          vehicleWithLongestStop = vehicle.description; // Supposez que le nom du véhicule est dans `vehicle.description`
        }

        // Vérifier si ce véhicule a été en mouvement le plus longtemps
        if (vehicleMovingDuration > longestMovingDuration) {
          longestMovingDuration = vehicleMovingDuration;
          vehicleWithLongestMoving = vehicle.description;
        }
      });

      // Convertir les résultats finaux en heures, minutes et secondes
      const convertMillisToTime = (millis) => {
        const hours = Math.floor(millis / (1000 * 60 * 60));
        const minutes = Math.floor((millis % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((millis % (1000 * 60)) / 1000);
        return { hours, minutes, seconds };
      };

      const totalMovingTime = convertMillisToTime(totalMovingDuration);
      const totalStopTime = convertMillisToTime(totalStopDuration);
      const longestStopTime = convertMillisToTime(longestStopDuration);
      const longestMovingTime = convertMillisToTime(longestMovingDuration);

      return {
        totalMovingTime,
        totalStopTime,
        longestStopTime,
        longestMovingTime,
        vehicleWithLongestStop, // Nom du véhicule avec le plus long arrêt
        vehicleWithLongestMoving, // Nom du véhicule ayant été en mouvement le plus longtemps
      };
    }
  }
  // Exemple d'utilisation :
  const result = calculateDurationsForAllVehicles(currentdataFusionnee); // Remplacez "allVehicles" par votre liste de véhicules
  // const result = calculateDurationsForAllVehicles(allVehicles); // Remplacez "allVehicles" par votre liste de véhicules
  // console.log("Durée totale en mouvement :", result?.totalMovingTime);
  // console.log("Durée totale en arrêt :", result?.totalStopTime);
  // console.log("Le plus long arrêt :", result?.longestStopTime);
  // console.log("Le plus long déplacement :", result?.longestMovingTime);
  // console.log(
  //   "Véhicule avec le plus long arrêt :",
  //   result?.vehicleWithLongestStop
  // );
  // console.log(
  //   "Véhicule en mouvement le plus longtemps :",
  //   result?.vehicleWithLongestMoving
  // );

  return (
    <div className="flex pt-28 flex-col max-w-screen overflow-hidden justify-center items-center pb-20">
      <div className="fixed  px-4 z-[555555555] top-[3.4rem] left-0 right-0 bg-white py-3 dark:bg-gray-800">
        <h2
          onClick={() => {
            console.log("Current vehicule", currentVehicule);

            console.log(
              "searchdonneeFusionneeForRapport",
              searchdonneeFusionneeForRapport
            );

            console.log("donneeFusionneeForRapport", donneeFusionneeForRapport);
            console.log("currentdataFusionnee", currentdataFusionnee);
            // console.log("searchdonneeFusionneeForRapport", searchdonneeFusionneeForRapport);

            // console.log("Statistiques par véhicule :", result5?.statsByVehicle);
            // console.log("Statistiques globales :", result5?.globalStats);
            // console.log(
            //   `Véhicule avec la vitesse maximale la plus élevée : ${result5?.maxSpeedVehicle.description}, Vitesse : ${result5?.maxSpeedVehicle.maxSpeed} KPH`
            // );
            // console.log("Statistiques par véhicule :", result4?.statsByVehicle);
            // console.log("Statistiques globales :", result4?.globalStats);
            // console.log(

            // console.log(
            //   "Distance totale pour tous les véhicules :",
            //   result2?.totalDistanceAllVehicles.toFixed(2),
            //   "km"
            // );
            // console.log(
            //   "Véhicule ayant parcouru la plus grande distance :",
            //   result2?.maxDistanceVehicle,
            //   "avec",
            //   result2?.maxDistance.toFixed(2),
            //   "km"
            // );

            // console.log(
            //   "Véhicule ayant parcouru la plus grande distance :",
            //   result2?.maxDistanceVehicle
            // );
            // console.log(
            //   "Nombre d'arrêts par véhicule :",
            //   result3.stopsByVehicle
            // );
            // console.log(
            //   "Nombre total d'arrêts pour tous les véhicules :",
            //   result3.totalStopsAllVehicles
            // );
            // console.log(
            //   "Distance totale par véhicule :",
            //   result2?.distancesByVehicle
            // );

            // console.log(
            //   "Distance totale pour tous les véhicules :",
            //   result2?.totalDistanceAllVehicles.toFixed(2),
            //   "km"
            // );

            // setShowVehiculeListe(true);
            // console.log("current Data fusionnee", currentdataFusionnee);
            // console.log(
            //   "Search data fusionnee",
            //   searchdonneeFusionneeForRapport
            // );
            // console.log(
            //   "searchrapportvehicleDetails",
            //   searchrapportvehicleDetails
            // );
            // console.log(
            //   "-------------Durée totale en mouvement :",
            //   result?.totalMovingTime
            // );
            // console.log(
            //   "---------------Durée totale en arrêt :",
            //   result?.totalStopTime
            // );
            // console.log(
            //   "--------------Le plus long arrêt :",
            //   result?.longestStopTime
            // );
            // console.log(
            //   "-----------Véhicule avec le plus long arrêt :",
            //   result.vehicleWithLongestStop
            // );
            // console.log(
            //   "Véhicule en mouvement le plus longtemps :",
            //   result?.vehicleWithLongestMoving
            // );

            // console.log("Full data:", vehiclueHistoriqueRapportDetails);
            // console.log("current vehicule", currentVehicule);
            // console.log("vehicule parking :", vehiculeNotActiveAjourdhui);
            // console.log(
            //   "vehiclueHistoriqueDetails:",
            //   vehiclueHistoriqueDetails
            // );
            // console.log(
            //   "Véhicule avec le timestamp le plus tôt:",
            //   earliestVehicle
            // );
            // console.log(
            //   "Véhicule avec le timestamp le plus tard:",
            //   latestVehicle
            // );
            // console.log(
            //   "currentVehicule?.vehiculeDetails",
            //   currentVehicule?.vehiculeDetails
            // );
            // console.log("vehiclueHistoriqueDetails", vehiclueHistoriqueDetails);
            // console.log(
            //   "vehiclueHistoriqueRapportDetails",
            //   vehiclueHistoriqueRapportDetails
            // );
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
                    {vehiculeNotActiveAjourdhui?.length || "0"}
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
                      "Pas de vehicule"}
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
                  Temps d'activite total :
                  <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                    {result?.totalMovingTime.hours}h{" "}
                    {result?.totalMovingTime.minutes}m{" "}
                    {result?.totalMovingTime.seconds}m{" "}
                  </span>
                </p>
                <p>
                  Temps d'activite total :
                  <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                    {result?.totalStopTime.hours}h{" "}
                    {result?.totalStopTime.minutes}m{" "}
                    {result?.totalStopTime.seconds}m{" "}
                  </span>
                </p>
                <p>
                  L'arret le plus longue :
                  <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                    {result?.longestStopTime.hours}h{" "}
                    {result?.longestStopTime.minutes}m{" "}
                    {result?.longestStopTime.seconds}m{" "}
                  </span>
                </p>

                <p>
                  Vehicule avec le plus grand arret:
                  <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                    {result.vehicleWithLongestStop || "Pas de vehicule"}{" "}
                  </span>
                </p>
                <p>
                  Vehicule en mouvement plus longtemps
                  <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                    {result.vehicleWithLongestMoving || "Pas de vehicule"}{" "}
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
                    {result2?.totalDistanceAllVehicles.toFixed(2) || "0"} km{" "}
                  </span>
                </p>
                <p>
                  Nombre total d’arrêts :
                  <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                    {result3.totalStopsAllVehicles}
                  </span>
                </p>
                <p>
                  Vehicule ayant parcourru la plus grande distance :
                  {result2?.maxDistanceVehicle ? (
                    <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                      {result2?.maxDistanceVehicle}, avec
                      {result2?.maxDistance.toFixed(2)}, "km"
                    </span>
                  ) : (
                    <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                      Pas de vehicule en mouvement
                    </span>
                  )}
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
                    Km/h
                  </span>
                </p> */}
                <p>
                  Vitesse moyenne:
                  <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                    {result5?.globalStats.averageSpeed.toFixed(2) || "---"} Km/h
                  </span>
                </p>
                <p>
                  Vitesse maximale:
                  <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                    {result5?.globalStats.maxSpeed.toFixed(2) || "---"} Km/h
                    Km/h
                  </span>
                </p>
                <p>
                  Vehicule avec la vitesse maximale:
                  <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                    {result5?.maxSpeedVehicle.description}, Vitesse :{" "}
                  </span>
                  avec une vitesse de :
                  <span className="font-bold dark:text-orange-500 text-gray-700 pl-3">
                    {result5?.maxSpeedVehicle.maxSpeed.toFixed(2)} Km/h
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
                textAlign: "left",
              }}
            >
              <thead>
                <tr className="bg-orange-50 text-gray-700 border">
                  <th className="border py-3 px-2 min-w-[20rem]">Véhicule</th>
                  <th className="border py-3 px-2 min-w-[10rem]">
                    Heure de départ
                  </th>
                  <th className="border py-3 px-2 min-w-[10rem]">
                    Heure d'arrivée
                  </th>
                  <th className="border py-3 px-2 min-w-[10rem]">
                    Vitesse moyenne
                  </th>
                  <th className="border py-3 px-2 min-w-[10rem]">
                    Vitesse maximale
                  </th>
                  <th className="border py-3 px-2 min-w-[10rem]">
                    Distance Totale
                  </th>
                  <th className="border py-3 px-2 min-w-[10rem]">
                    Nombre d'arrêts
                  </th>
                  <th className="border py-3 px-2 min-w-[10rem]">
                    Temps actif
                  </th>
                  <th className="border py-3 px-2 min-w-[20rem]">
                    Adresse actuelle
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentdataFusionnee?.map((vehicule, index) => (
                  <tr key={index} className="border">
                    <td className="border py-3 px-2">{vehicule.description}</td>
                    <td className="border py-3 px-2">
                      {activePeriods[index].startTime || "---"}{" "}
                    </td>
                    <td className="border py-3 px-2">
                      {activePeriods[index].endTime || "---"}{" "}
                    </td>

                    <td
                      onClick={() => {
                        console.log(vehicule.vehiculeDetails[0]?.address);
                      }}
                      className="border py-3 px-2"
                    >
                      {
                        // Object.entries(result5.statsByVehicle)[index][1]
                        //   .averageSpeed
                      }{" "}
                      km/h
                    </td>
                    <td className="border py-3 px-2">
                      {
                        // Object.entries(result5.statsByVehicle)[index][1]
                        //   .maxSpeed
                      }{" "}
                      km/h
                    </td>
                    <td className="border py-3 px-2">
                      {/* {Object.entries(result2.distancesByVehicle)[index][1]} Km */}
                    </td>

                    <td className="border py-3 px-2">
                      {/* {Object.entries(result3.stopsByVehicle)[index][1]} arrets */}
                    </td>

                    <td className="border py-3 px-2">
                      {movingTimes[index].totalMovingDuration.hours}h{" "}
                      {movingTimes[index].totalMovingDuration.minutes}m{" "}
                      {movingTimes[index].totalMovingDuration.seconds}s
                    </td>

                    <td className="border py-3 px-2">
                      {vehicule.vehiculeDetails[0]?.address || "---"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default RapportPageDetails;
