import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const navigate = useNavigate();
  
  // Initialiser `userData` avec les données de `localStorage` si elles existent
  const [userData, setUserData] = useState(() => {
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });
  
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  // Détermine si l'utilisateur est connecté
  const isAuthenticated = userData !== null; 
  
  // Fonction pour gérer la connexion de l'utilisateur
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
        method: "POST",
        headers: {
          "Content-Type": "application/xml",
        },
        body: xmlData,
      });

      const data = await response.text();

      // Parser le XML pour extraire les données utilisateur
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

        // Stocke les données utilisateur dans `localStorage` et met à jour le state
        localStorage.setItem('userData', JSON.stringify(userData));
        setUserData(userData);
        setError(null);

        // Redirige vers la page d'accueil
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

  // Fonction pour gérer la déconnexion de l'utilisateur
  const handleLogout = () => {
    localStorage.removeItem('userData'); // Supprime les données de `localStorage`
    setUserData(null); // Réinitialise `userData`
    navigate("/login"); // Redirige vers la page de connexion
  };

  return (
    <DataContext.Provider value={{ data, handleLogin, handleLogout, userData, error, isAuthenticated }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
