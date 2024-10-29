import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ScaleControl, AttributionControl } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// import customMarkerIcon from './path/to/your/custom-marker.png'; // Remplace avec ton image personnalisée
import customMarkerIcon from '/img/cars/localisation.png'; // Remp/lace avec ton image personnalisée/


// Configurer les icônes de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: customMarkerIcon,
  iconUrl: customMarkerIcon,
  shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
});

// Composant pour le bouton de localisation
const LocateButton = () => {
  const map = useMap();

  const handleLocate = () => {
    map.locate();
  };

  useEffect(() => {
    map.on('locationfound', (e) => {
      map.setView(e.latlng, 13);
      L.marker(e.latlng).addTo(map).bindPopup('Vous êtes ici !').openPopup();
    });
  }, [map]);

  return <button onClick={handleLocate} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}>Localiser</button>;
};

// Composant de la carte
const MapComponent = ({ vehicles }) => {
  return (
    <MapContainer center={[vehicles[0].lastValidLatitude, vehicles[0].lastValidLongitude]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ScaleControl position="bottomright" />
      <AttributionControl position="bottomleft" />
      <LocateButton />

      {vehicles.map((vehicle, index) => (
        <Marker key={index} position={[vehicle.lastValidLatitude, vehicle.lastValidLongitude]} icon={L.icon({
          iconUrl: customMarkerIcon,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
          shadowSize: [41, 41],
        })}>
          <Popup>{vehicle.description}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

// Exemple de page
const ExamplePage = () => {
  const vehicleData = [
    {
      description: "Véhicule 1",
      lastValidLatitude: "18.510621166666667",
      lastValidLongitude: "-72.28229783333333",
    },
    {
      description: "Véhicule 2",
      lastValidLatitude: "18.511123456789",
      lastValidLongitude: "-72.283456789",
    },
    // Ajoute d'autres véhicules si nécessaire
  ];

  return (
    <div>
      <h1>Carte de Localisation</h1>
      <MapComponent vehicles={vehicleData} />
    </div>
  );
};

export default ExamplePage;





// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';
// import customMarkerIcon from '/img/cars/localisation.png'; // Remplace avec ton image personnalisée

// // Configurer les icônes de Leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIconRetina,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

// // Configurer le marqueur personnalisé
// const customIcon = L.icon({
//   iconUrl: customMarkerIcon,
//   iconSize: [25, 41], // Taille du marqueur
//   iconAnchor: [12, 41], // Point d'ancrage du marqueur
//   popupAnchor: [1, -34], // Position du popup
//   shadowUrl: markerShadow,
//   shadowSize: [41, 41], // Taille de l'ombre
// });

// const MapComponent = ({ lastValidLatitude, lastValidLongitude }) => {
//   const latitude = parseFloat(lastValidLatitude);
//   const longitude = parseFloat(lastValidLongitude);

//   return (
//     <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '100vh', width: '100%' }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Marker position={[latitude, longitude]} icon={customIcon}>
//         <Popup>Localisation du véhicule</Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// const ExamplePage = () => {
//   const vehicleData = {
//     lastValidLatitude: "18.510621166666667",
//     lastValidLongitude: "-72.28229783333333",
//   };

//   return (
//     <div>
//       <h1>Carte de Localisation</h1>
//       <MapComponent 
//         lastValidLatitude={vehicleData.lastValidLatitude} 
//         lastValidLongitude={vehicleData.lastValidLongitude} 
//       />
//     </div>
//   );
// };

// export default ExamplePage;












// // import React from 'react';
// // import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// // import 'leaflet/dist/leaflet.css';
// // import L from 'leaflet';
// // import markerIcon from 'leaflet/dist/images/marker-icon.png';
// // import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
// // import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// // // Configurer les icônes
// // delete L.Icon.Default.prototype._getIconUrl;
// // L.Icon.Default.mergeOptions({
// //   iconRetinaUrl: markerIconRetina,
// //   iconUrl: markerIcon,
// //   shadowUrl: markerShadow,
// // });

// // const MapComponent = ({ lastValidLatitude, lastValidLongitude }) => {
// //   const latitude = parseFloat(lastValidLatitude);
// //   const longitude = parseFloat(lastValidLongitude);

// //   return (
// //     <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '100vh', width: '100%' }}>
// //       <TileLayer
// //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// //       />
// //       <Marker position={[latitude, longitude]}>
// //         <Popup>Localisation du véhicule</Popup>
// //       </Marker>
// //     </MapContainer>
// //   );
// // };

// // const ExamplePage = () => {
// //   const vehicleData = {
// //     lastValidLatitude: "18.510621166666667",
// //     lastValidLongitude: "-72.28229783333333",
// //   };

// //   return (
// //     <div>
// //       <h1>Carte de Localisation</h1>
// //       <MapComponent 
// //         lastValidLatitude={vehicleData.lastValidLatitude} 
// //         lastValidLongitude={vehicleData.lastValidLongitude} 
// //       />
// //     </div>
// //   );
// // };

// // export default ExamplePage;
