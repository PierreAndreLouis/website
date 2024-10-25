// DataContextProvider
import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState(() => {
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });
  
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Nouvel état pour le chargement
  
  const isAuthenticated = userData !== null; 
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Début du chargement
    setError(null); // Réinitialise les erreurs
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
        navigate("/home");
      } else if (result === "error") {
        const errorMessage = xmlDoc.getElementsByTagName("Message")[0].textContent;
        setError(errorMessage || "Erreur lors de la connexion.");
      }

    } catch (error) {
      setError("Erreur lors de la connexion à l'API.");
      console.error("Erreur lors de la connexion à l'API", error);
    } finally {
      setIsLoading(false); // Fin du chargement
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setUserData(null);
    navigate("/login");
  };

  return (
    <DataContext.Provider value={{ data, handleLogin, handleLogout, userData, error, isAuthenticated, isLoading }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
