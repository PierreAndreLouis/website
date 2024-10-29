// DataContextProvider.js
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(() => {
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  const [vehicleData, setVehicleData] = useState(() => {
    const storedVehicleData = localStorage.getItem('vehicleData');
    return storedVehicleData ? JSON.parse(storedVehicleData) : null;
  });

  const [vehicleDetails, setVehicleDetails] = useState(null); // Détails spécifiques d'un véhicule
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = userData !== null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const account = e.target.account.value;
    const user = e.target.username.value;
    const password = e.target.password.value;

    const xmlData = `
      <GTSRequest command="dbget">
        <Authorization account="${account}" user="${user}" password="${password}" />
        <Record table="User" partial="true">
          <Field name="accountID">${account}</Field>
          <Field name="userID">${account}</Field>
        </Record>
      </GTSRequest>
    `;

    try {
      const response = await fetch("/api/track/Service", {
        method: "POST",
        headers: { "Content-Type": "application/xml" },
        body: xmlData,
      });

      const data = await response.text();
    
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "application/xml");
      const result = xmlDoc.getElementsByTagName("GTSResponse")[0].getAttribute("result");

      if (result === "success") {
        const fields = xmlDoc.getElementsByTagName("Field");
        let userData = {};

        for (let i = 0; i < fields.length; i++) {
          const fieldName = fields[i].getAttribute("name");
          const fieldValue = fields[i].textContent;
          userData[fieldName] = fieldValue;
        }

        localStorage.setItem('userData', JSON.stringify(userData));
        setUserData(userData);

        navigate("/home");  // Redirection vers la page d'accueil
      } else if (result === "error") {
        const errorMessage = xmlDoc.getElementsByTagName("Message")[0].textContent;
        setError(errorMessage || "Erreur lors de la connexion.");
      }

    } catch (error) {
      setError("Erreur lors de la connexion à l'API.");
      console.error("Erreur lors de la connexion à l'API", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour récupérer les données de véhicules
  const fetchVehicleData = async () => {
    if (!userData) return;

    const { accountID, userID, password } = userData;
    const xmlData = `
      <GTSRequest command="dbget">
        <Authorization account="${accountID}" user="${userID}" password="${password}" />
        <Record table="Device" partial="true">
          <Field name="accountID">${accountID}</Field>
       
        </Record>
      </GTSRequest>
    `;

    // <Field name="lastOdometerKM" />
    // <Field name="description" />

    try {
      const response = await fetch("/api/track/Service", {
        method: "POST",
        headers: { "Content-Type": "application/xml" },
        body: xmlData,
      });

      const data = await response.text();
   
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "application/xml");

      const records = xmlDoc.getElementsByTagName("Record");
      let vehicleData = [];

      // Parcours des records pour stocker les informations de chaque véhicule
      for (let i = 0; i < records.length; i++) {
        const fields = records[i].getElementsByTagName("Field");
        let vehicleRecord = {};

        for (let j = 0; j < fields.length; j++) {
          const fieldName = fields[j].getAttribute("name");
          const fieldValue = fields[j].textContent;
          vehicleRecord[fieldName] = fieldValue;
        }
        
        vehicleData.push(vehicleRecord);
      }

      // Stockage des données dans localStorage et mise à jour de l'état
      localStorage.setItem('vehicleData', JSON.stringify(vehicleData));
      setVehicleData(vehicleData);

      // Affichage du résultat en console
      console.log("------- Liste des véhicules ---------", data);
      console.log("******** Données des véhicules ********** ", vehicleData);

    } catch (error) {
      setError("Erreur lors de la récupération des données des véhicules.");
      console.error("Erreur lors de la récupération des données des véhicules", error);
    }
  };

  // Fonction pour récupérer les détails spécifiques d'un véhicule
  const fetchVehicleDetails = async (Device, TimeFrom, TimeTo) => {
    if (!userData) return;

    const { accountID, userID, password } = userData;
    const xmlData = `
      <GTSRequest command="eventdata">
        <Authorization account="${accountID}" user="${userID}" password="${password}" />
        <EventData>
          <Device>${Device}</Device>
          <TimeFrom timezone="GMT">${TimeFrom}</TimeFrom>
          <TimeTo timezone="GMT">${TimeTo}</TimeTo>
          <GPSRequired>false</GPSRequired>
          <StatusCode>false</StatusCode>
          <Limit type="last">1</Limit>
          <Ascending>false</Ascending>
          <Field name="latitude" />
          <Field name="longitude" />
          <Field name="address" />
          <Field name="speedKPH" />
          <Field name="timestamp" />
          <Field name="heading" />
        </EventData>
      </GTSRequest>
    `;

    try {
      const response = await fetch("/api/track/Service", {
        method: "POST",
        headers: { "Content-Type": "application/xml" },
        body: xmlData,
      });

      const data = await response.text();

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "application/xml");
      const fields = xmlDoc.getElementsByTagName("Field");

      let details = {};
      for (let i = 0; i < fields.length; i++) {
        const fieldName = fields[i].getAttribute("name");
        const fieldValue = fields[i].textContent;
        details[fieldName] = fieldValue;
      }

      // Enregistrer en JSON dans localStorage et mettre à jour l'état
      localStorage.setItem('vehicleDetails', JSON.stringify(details));
      setVehicleDetails(details);

      console.log("------- Détails du véhicule ---------", data);
      console.log("******** Détails spécifiques ********** ", details);

    } catch (error) {
      setError("Erreur lors de la récupération des détails du véhicule.");
      console.error("Erreur lors de la récupération des détails du véhicule", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('vehicleData');
    localStorage.removeItem('vehicleDetails');
    setUserData(null);
    setVehicleData(null);
    setVehicleDetails(null);
    navigate("/login");
  };

  // useEffect pour appeler fetchVehicleData après la mise à jour de userData
  useEffect(() => {
    if (userData) {
      fetchVehicleData();
      // fetchVehicleDetails('863844052656169','2024-10-28 0:00:00', '2024-10-28 8:00:59');
      // fetchVehicleDetails('863844052656169','2011-01-07 10:29:34', '2024-10-28 8:00:59');
    }
  }, [userData]);

  return (
    <DataContext.Provider value={{ handleLogin, handleLogout, userData, vehicleData, vehicleDetails, fetchVehicleDetails, error, isAuthenticated, isLoading }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;


