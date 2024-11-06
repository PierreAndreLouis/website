// DataContextProvider.js
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loadingHistoriqueFilter, setLoadingHistoriqueFilter] = useState(false);

  const [userData, setUserData] = useState(() => {
    const storedUserData = localStorage.getItem("userData");
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  const [vehicleData, setVehicleData] = useState(() => {
    const storedVehicleData = localStorage.getItem("vehicleData");
    return storedVehicleData ? JSON.parse(storedVehicleData) : null;
  });

  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [vehiclueHistoriqueDetails, setVehiclueHistoriqueDetails] = useState([]);
  const [mergedData, setMergedData] = useState(() => {
    const storedMergedData = localStorage.getItem("mergedData");
    return storedMergedData ? JSON.parse(storedMergedData) : null;
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = userData !== null;

  const [currentVehicule, setCurrentVehicule] = useState(null); // 1. Déclaration de currentVehicule

  const [searchQuery, setSearchQuery] = useState(""); // État pour stocker le terme de recherche

  const [search, setSearch] = useState(false);
  const [showSideBar, setShowSideBar] = useState(true);
  const [logOut, setLogOut] = useState(false);
  const [showListeOption, setShowListOption] = useState(false);

  const [account, setAccount] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const [showChangePasswordPupup, setShowChangePasswordPupup] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);





  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const account = e.target.account.value;
    const user = e.target.username.value;
    const password = e.target.password.value;

    const xmlData = `<GTSRequest command="dbget">
        <Authorization account="${account}" user="${user}" password="${password}" />
        <Record table="User" partial="true">
          <Field name="accountID">${account}</Field>
          <Field name="userID">${account}</Field>
        </Record>
      </GTSRequest>`;

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
        navigate("/home");


      // Stocker les informations de connexion en local
      localStorage.setItem("account", account);
      localStorage.setItem("username", user);
      localStorage.setItem("password", password);


        setAccount(localStorage.getItem("account") || '');
        setUsername(localStorage.getItem("username") || '');
        setPassword(localStorage.getItem("password") || '');
        console.log("user data --------", userData);
      } else if (result === "error") {
        const errorMessage =
          xmlDoc.getElementsByTagName("Message")[0].textContent;
        setError(errorMessage || "Erreur lors de la connexion.");
        setIsLoading(false);
      }
    } catch (error) {
      setError("Erreur lors de la connexion à l'API.");
      console.error("Erreur lors de la connexion à l'API", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVehicleData = async () => {
    if (!userData) return;

    const { accountID, userID, password } = userData;

    const xmlData = `<GTSRequest command="dbget">
        <Authorization account="${accountID}" user="${userID}" password="${password}" />
        <Record table="Device" partial="true">
          <Field name="accountID">${accountID}</Field>
          <Field name="creationTime" />
          <Field name="description" />
          <Field name="deviceCode" />
          <Field name="displayName" />
          <Field name="equipmentType" />
          <Field name="imeiNumber" />
          <Field name="ipAddressCurrent" />
          <Field name="isActive" />
          <Field name="lastEventTimestamp" />
          <Field name="lastGPSTimestamp" />
          <Field name="lastOdometerKM" />
          <Field name="lastStartTime" />
          <Field name="lastStopTime" />
          <Field name="lastTotalConnectTime" />
          <Field name="lastUpdateTime" />
          <Field name="lastValidLatitude" />
          <Field name="lastValidLongitude" />
          <Field name="licensePlate" />
          <Field name="simPhoneNumber" />
          <Field name="speedLimitKPH" />
          <Field name="uniqueID" />
        </Record>
      </GTSRequest>`;

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

      localStorage.setItem("vehicleData", JSON.stringify(vehicleData));
      setVehicleData(vehicleData);
      console.log("******** Données des véhicules ********** ", vehicleData);
      // ---------------------------------------------------------------------



      
    const now = new Date();
    const TimeTo = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} ${now
      .getHours()
      .toString()
      .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const TimeFrom = `${startOfDay.getFullYear()}-${(startOfDay.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${startOfDay
      .getDate()
      .toString()
      .padStart(2, "0")} 00:00:00`;

    if (vehicleData && vehicleData.length > 0) {
      vehicleData.forEach((vehicle) => {
        fetchVehicleDetails(vehicle.deviceID, TimeFrom, TimeTo);
      });
    }
    } catch (error) {
      setError("Erreur lors de la récupération des données des véhicules.");
      console.error(
        "Erreur lors de la récupération des données des véhicules",
        error
      );
    }
  };

  const fetchVehicleDetails = async (Device, TimeFrom, TimeTo) => {
    // setLoadingHistoriqueFilter(true);

    if (!userData) return;

    const { accountID, userID, password } = userData;
    const xmlData = `<GTSRequest command="eventdata">
      <Authorization account="${accountID}" user="${userID}" password="${password}" />
      <EventData>
        <Device>${Device}</Device>
        <TimeFrom timezone="GMT">${TimeFrom}</TimeFrom>
        <TimeTo timezone="GMT">${TimeTo}</TimeTo>
        <GPSRequired>false</GPSRequired>
        <StatusCode>false</StatusCode>
        <Limit type="last">4</Limit>
        <Ascending>false</Ascending>
        <Field name="latitude" />
        <Field name="longitude" />
        <Field name="address" />
        <Field name="speedKPH" />
        <Field name="timestamp" />
        <Field name="heading" />
        <Field name="city" />
        <Field name="creationMillis" />
        <Field name="creationTime" />
        <Field name="odometerKM" />
        <Field name="stateProvince" />
        <Field name="statusCode" />
        <Field name="streetAddress" />
      </EventData>
    </GTSRequest>`;

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

      const newVehicleDetails = [];
      for (let i = 0; i < records.length; i++) {
        const fields = records[i].getElementsByTagName("Field");
        const details = { Device }; // Ajoute l'identifiant du véhicule pour regrouper les événements

        for (let j = 0; j < fields.length; j++) {
          const fieldName = fields[j].getAttribute("name");
          const fieldValue = fields[j].textContent;
          details[fieldName] = fieldValue;
        }

        newVehicleDetails.push(details);
      }

      setVehicleDetails((prevDetails) => [
        ...prevDetails.filter((detail) => detail.Device !== Device),
        ...newVehicleDetails,
      ]);

      localStorage.setItem("vehicleDetails", JSON.stringify(vehicleDetails));
      console.log("vehicleDetails.......>>>", vehicleDetails)
      console.log("newVehicleDetails.......>>>", newVehicleDetails)
    } catch (error) {
      setError("Erreur lors de la récupération des détails du véhicule.");
      console.error(
        "Erreur lors de la récupération des détails du véhicule",
        error
      );
    }
  };


  const fetchHistoriqueVehicleDetails = async (Device, TimeFrom, TimeTo) => {
    console.log("Start fetching.........")
    setLoadingHistoriqueFilter(true);

    if (!userData) return;

    const { accountID, userID, password } = userData;
    const xmlData = `<GTSRequest command="eventdata">
      <Authorization account="${accountID}" user="${userID}" password="${password}" />
      <EventData>
        <Device>${Device}</Device>
        <TimeFrom timezone="GMT">${TimeFrom}</TimeFrom>
        <TimeTo timezone="GMT">${TimeTo}</TimeTo>
        <GPSRequired>false</GPSRequired>
        <StatusCode>false</StatusCode>
        <Limit type="last">20000</Limit>
        <Ascending>false</Ascending>
        <Field name="latitude" />
        <Field name="longitude" />
        <Field name="address" />
        <Field name="speedKPH" />
        <Field name="timestamp" />
        <Field name="heading" />
        <Field name="city" />
        <Field name="creationMillis" />
        <Field name="creationTime" />
        <Field name="odometerKM" />
        <Field name="stateProvince" />
        <Field name="statusCode" />
        <Field name="streetAddress" />
      </EventData>
    </GTSRequest>`;

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

      const newVehicleDetails = [];
      for (let i = 0; i < records.length; i++) {
        const fields = records[i].getElementsByTagName("Field");
        const details = { Device }; // Ajoute l'identifiant du véhicule pour regrouper les événements

        for (let j = 0; j < fields.length; j++) {
          const fieldName = fields[j].getAttribute("name");
          const fieldValue = fields[j].textContent;
          details[fieldName] = fieldValue;
        }

        newVehicleDetails.push(details);
      }

      setVehiclueHistoriqueDetails(newVehicleDetails);


      localStorage.setItem("vehiclueHistoriqueDetails", JSON.stringify(vehiclueHistoriqueDetails));

      console.log("newVehicleDetails.......>>>", newVehicleDetails);
      console.log("newVehicleDetails.lenght.......>>>", newVehicleDetails.length);
    console.log("End fetching.........")
    setLoadingHistoriqueFilter(false);


    } catch (error) {
      setError("Erreur lors de la récupération des détails du véhicule.");
      console.error(
        "Erreur lors de la récupération des détails du véhicule",
        error
      );
    }
  };



  const firstCallHistoriqueData = () => {
    setShowListOption(false);

    const now = new Date();
    const TimeTo = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} ${now
      .getHours()
      .toString()
      .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const TimeFrom = `${startOfDay.getFullYear()}-${(startOfDay.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${startOfDay
      .getDate()
      .toString()
      .padStart(2, "0")} 00:00:00`;


      
      fetchHistoriqueVehicleDetails(currentVehicule.deviceID, TimeFrom, TimeTo);
 
  };




  const handleDateChange = (TimeFrom, TimeTo) => {
    if (vehicleData && vehicleData.length > 0) {
      vehicleData.forEach((vehicle) => {
        fetchVehicleDetails(vehicle.deviceID, TimeFrom, TimeTo);
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("vehicleData");
    localStorage.removeItem("vehicleDetails");
    setUserData(null);
    setVehicleData(null);
    setVehicleDetails([]);
    navigate("/login");
  };

  const mergeVehicleDataWithEvents = (eventData = vehicleDetails) => {
    if (!Array.isArray(eventData)) {
      eventData = [eventData];
    }

    const dataFusionne = {};
    const seenEvents = new Set();

    vehicleData.forEach((vehicle) => {
      const { deviceID } = vehicle;
      dataFusionne[deviceID] = { ...vehicle, vehiculeDetails: [] };
    });

    eventData.forEach((event) => {
      const { deviceID, timestamp, ...eventDetails } = event;
      const eventKey = `${deviceID}-${timestamp}`;
      if (!seenEvents.has(eventKey)) {
        seenEvents.add(eventKey);
        if (dataFusionne[deviceID]) {
          dataFusionne[deviceID].vehiculeDetails.push({
            timestamp,
            ...eventDetails,
          });
          // setLoadingHistoriqueFilter(false);
        } else {
          // setLoadingHistoriqueFilter(false);

          console.warn(
            `Aucun véhicule correspondant pour l'événement: ${deviceID}`
          );
        }
      } else {
        // console.log(`Doublon détecté pour l'événement: ${deviceID}, ${timestamp}`);
        // setLoadingHistoriqueFilter(false);
      }
    });

    localStorage.setItem("mergedData", JSON.stringify(dataFusionne)); // Enregistrement dans localStorage
    setMergedData(dataFusionne);
    console.log("merge data:", dataFusionne);
    setIsLoading(false);

    return dataFusionne;
  };

  useEffect(() => {
    if (userData) {
      fetchVehicleData();
    }
  }, [userData]);

  useEffect(() => {
    // Récupérer les informations de localStorage
    setAccount(localStorage.getItem("account") || '');
    setUsername(localStorage.getItem("username") || '');
    setPassword(localStorage.getItem("password") || '');
  }, []);

  // useEffect(() => {
  //   // exemple de donneer dans la base de donnee
  //   // const TimeFrom = "2011-01-07 10:29:34";
  //   // const TimeTo = "2024-01-07 10:29:34";
  //   // Définir TimeTo et TimeFrom en fonction de la date actuelle

  //   // const now = new Date();
  //   // const TimeTo = `${now.getFullYear()}-${(now.getMonth() + 1)
  //   //   .toString()
  //   //   .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")} ${now
  //   //   .getHours()
  //   //   .toString()
  //   //   .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now
  //   //   .getSeconds()
  //   //   .toString()
  //   //   .padStart(2, "0")}`;

  //   // const startOfDay = new Date();
  //   // startOfDay.setHours(0, 0, 0, 0);

  //   // const TimeFrom = `${startOfDay.getFullYear()}-${(startOfDay.getMonth() + 1)
  //   //   .toString()
  //   //   .padStart(2, "0")}-${startOfDay
  //   //   .getDate()
  //   //   .toString()
  //   //   .padStart(2, "0")} 00:00:00`;

  //   // if (vehicleData && vehicleData.length > 0) {
  //   //   vehicleData.forEach((vehicle) => {
  //   //     fetchVehicleDetails(vehicle.deviceID, TimeFrom, TimeTo);
  //   //   });
  //   // }
  // }, [vehicleData]);

  useEffect(() => {
    if (
      vehicleDetails &&
      vehicleDetails.length > 0 &&
      vehicleData &&
      vehicleData.length > 0
    ) {
      mergeVehicleDataWithEvents();
    }
  }, [vehicleData, vehicleDetails]);

  // useEffect(() => {
  //   if (mergedData && Object.keys(mergedData).length > 0) {
  //     // 2. Initialiser currentVehicule avec le premier véhicule
  //     const firstVehicle = Object.values(mergedData)[0];
  //     setCurrentVehicule(firstVehicle);
  //   }
  // }, [mergedData]);

  const updateCurrentVehicule = (vehicle) => {
    setCurrentVehicule(vehicle); // 3. Fonction pour mettre à jour currentVehicule
    firstCallHistoriqueData();

  };

  return (
    <DataContext.Provider
      value={{
        userData,
        vehicleData,
        vehicleDetails,
        mergedData,
        isAuthenticated,
        error,
        isLoading,
        handleLogin,
        handleLogout,
        currentVehicule,
        updateCurrentVehicule,
        handleDateChange,
        loadingHistoriqueFilter,
        setLoadingHistoriqueFilter,
        searchQuery,
        setSearchQuery,
        search, 
        setSearch,
        showSideBar, 
        setShowSideBar,
        logOut, 
        setLogOut,
        showListeOption, 
        setShowListOption,
        fetchVehicleDetails,
        vehicleDetails,
        fetchHistoriqueVehicleDetails,
        vehiclueHistoriqueDetails,
        firstCallHistoriqueData,
        setCurrentVehicule,
        account,
        username,
        password,
        isPasswordConfirmed, 
        setIsPasswordConfirmed,
        showChangePasswordPupup, 
        setShowChangePasswordPupup,
        selectedVehicle, 
        setSelectedVehicle
        
      }}
    >

      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
