// DataContextProvider
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(() => {
    const storedUserData = localStorage.getItem("userData");
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  const [vehicleData, setVehicleData] = useState(null); // Données du véhicule
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
      const result = xmlDoc
        .getElementsByTagName("GTSResponse")[0]
        .getAttribute("result");

      if (result === "success") {
        const fields = xmlDoc.getElementsByTagName("Field");
        let userData = {};

        for (let i = 0; i < fields.length; i++) {
          const fieldName = fields[i].getAttribute("name");
          const fieldValue = fields[i].textContent;
          userData[fieldName] = fieldValue;
        }

        localStorage.setItem("userData", JSON.stringify(userData));
        setUserData(userData);

        navigate("/home"); // Redirection vers la page d'accueil
      } else if (result === "error") {
        const errorMessage =
          xmlDoc.getElementsByTagName("Message")[0].textContent;
        setError(errorMessage || "Erreur lors de la connexion.");
      }
    } catch (error) {
      setError("Erreur lors de la connexion à l'API.");
      console.error("Erreur lors de la connexion à l'API", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour récupérer les données du véhicule
  const fetchVehicleData = async () => {
    if (!userData) return;

    const { accountID, userID } = userData;
    const xmlData = `
    <GTSRequest command="dbget">
      <Authorization account="${accountID}" user="${userID}" password="${userData.password}" />
      <Record table="Device" partial="true">
        <Field name="accountID">${accountID}</Field>
        
      </Record>
    </GTSRequest>
  `;
  

    // const xmlData = `
    //   <GTSRequest command="dbget">
    //     <Authorization account="${accountID}" user="${userID}" password="${userData.password}" />
    //     <Record table="Device" partial="true">
    //       <Field name="accountID">${accountID}</Field>

    //     </Record>
    //   </GTSRequest>
    // `;

    //   const xmlData = `
    //   <GTSRequest command="dbget">
    //     <Authorization account="${accountID}" user="${userID}" password="${userData.password}" />
    //     <Record table="Device" partial="true">
    //       <Field name="accountID">${accountID}</Field>
    //       <Field name="lastOdometerKM" />
    //       <Field name="description" />
    //     </Record>
    //   </GTSRequest>
    // `;

    try {
      const response = await fetch("/api/track/Service", {
        method: "POST",
        headers: { "Content-Type": "application/xml" },
        body: xmlData,
      });

      const data = await response.text();
      console.log("Réponse XML brute : ", data);
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "application/xml");
      const fields = xmlDoc.getElementsByTagName("Field");

      let vehicleData = {};
      for (let i = 0; i < fields.length; i++) {
        const fieldName = fields[i].getAttribute("name");
        const fieldValue = fields[i].textContent;
        vehicleData[fieldName] = fieldValue;
      }

      // Enregistrer en JSON dans localStorage et mettre à jour l'état
      localStorage.setItem("vehicleData", JSON.stringify(vehicleData));
      setVehicleData(vehicleData);

      // Afficher le résultat en console
      // console.log("Données du véhicule : ", vehicleData);
    } catch (error) {
      setError("Erreur lors de la récupération des données du véhicule.");
      console.error(
        "Erreur lors de la récupération des données du véhicule",
        error
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("vehicleData");
    setUserData(null);
    setVehicleData(null);
    navigate("/login");
  };

  // useEffect pour appeler fetchVehicleData après mise à jour de userData
  useEffect(() => {
    if (userData) {
      fetchVehicleData();
    }
  }, [userData]);

  return (
    <DataContext.Provider
      value={{
        handleLogin,
        handleLogout,
        userData,
        vehicleData,
        error,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
