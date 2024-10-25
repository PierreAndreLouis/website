import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(() => {
    // Récupérer les données de userData depuis localStorage s'il y en a
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();



  const handleLogin = async (e) => {
    e.preventDefault();
  
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
        // const response = await fetch("http://31.207.37.89:8080/track/Service", {
          // const response = await fetch("https://us-central1-pwa-project-a5e0a.cloudfunctions.net/proxyAPI", {

        method: "POST",
        headers: {
          "Content-Type": "application/xml",
        },
        body: xmlData,
      });
  
      const data = await response.text();
  
      // Parser le XML
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "application/xml");
  
      const result = xmlDoc.getElementsByTagName("GTSResponse")[0].getAttribute("result");
  
      if (result === "success") {
        // Extraire toutes les données des balises <Field>
        const fields = xmlDoc.getElementsByTagName("Field");
        let userData = {};
  
        // Parcourir toutes les balises Field et les ajouter à l'objet userData
        for (let i = 0; i < fields.length; i++) {
          const fieldName = fields[i].getAttribute("name");
          const fieldValue = fields[i].textContent;
          userData[fieldName] = fieldValue;
        }
  
        // Stocker les données utilisateur dans localStorage et dans le state
        localStorage.setItem('userData', JSON.stringify(userData));
        setUserData(userData);
        setError(null);
  
        // Rediriger vers une autre page
        navigate("/home");
      } else if (result === "error") {
        const errorMessage = xmlDoc.getElementsByTagName("Message")[0].textContent;
        setError(errorMessage || "Erreur lors de la connexion.");
      }
  
    } catch (error) {
      setError("Erreur lors de la connexion à l'API.");
      console.error("Erreur lors de la connexion à l'API", error);
    }
  };

  return (
    <DataContext.Provider value={{ data, handleLogin, userData, error }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
