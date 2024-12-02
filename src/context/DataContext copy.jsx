// DataContextProvider.js
import React, { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment-timezone";

export const DataContext = createContext();

const DataContextProvider = ({ children, centerOnFirstMarker }) => {
  const navigate = useNavigate();
  const [loadingHistoriqueFilter, setLoadingHistoriqueFilter] = useState(false);
  const [crud_loading, setCrud_loading] = useState(false);

  const [userData, setUserData] = useState(() => {
    const storedUserData = localStorage.getItem("userData");
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  const [vehicleData, setVehicleData] = useState(() => {
    const storedVehicleData = localStorage.getItem("vehicleData");
    return storedVehicleData ? JSON.parse(storedVehicleData) : null;
  });

  const [vehicleDetails, setVehicleDetails] = useState(() => {
    const storedvehicleDetails = localStorage.getItem("vehicleDetails");

    return storedvehicleDetails && storedvehicleDetails !== "undefined"
      ? JSON.parse(storedvehicleDetails)
      : [];
  });

  // const [rapportvehicleDetails, setrapportVehicleDetails] = useState(() => {
  //   const storedrapportvehicleDetails = localStorage.getItem(
  //     "rapportvehicleDetails"
  //   );
  //   return storedrapportvehicleDetails &&
  //     storedrapportvehicleDetails !== "undefined"
  //     ? JSON.parse(storedrapportvehicleDetails)
  //     : [];
  // });

  const [rapportvehicleDetails, setrapportVehicleDetails] = useState([]);

  const [searchrapportvehicleDetails, setSearchrapportVehicleDetails] =
    useState([]);

  const [mergedData, setMergedData] = useState([]);

  // const [mergedData, setMergedData] = useState(() => {
  //   const storedMergedData = localStorage.getItem("mergedData");
  //   return storedMergedData ? JSON.parse(storedMergedData) : null;
  // });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const isAuthenticated = true;
  const isAuthenticated = userData !== null;

  const [currentVehicule, setCurrentVehicule] = useState(null); // 1. Déclaration de currentVehicule

  const [searchQuery, setSearchQuery] = useState(""); // État pour stocker le terme de recherche

  const [search, setSearch] = useState(false);
  const [showSideBar, setShowSideBar] = useState(true);
  const [logOut, setLogOut] = useState(false);
  const [showListeOption, setShowListOption] = useState(false);

  const [account, setAccount] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const [showChangePasswordPupup, setShowChangePasswordPupup] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  //
  const [successAddvehiculePupup, setsuccessAddvehiculePupup] = useState(false);
  const [errorAddvehiculePupup, seterrorAddvehiculePupup] = useState(false);
  //
  const [successModifiervehiculePupup, setsuccessModifiervehiculePupup] =
    useState(false);
  const [errorModifiervehiculePupup, seterrorModifiervehiculePupup] =
    useState(false);
  //
  const [successDeletevehiculePupup, setsuccessDeletevehiculePupup] =
    useState(false);
  const [errorDeletevehiculePupup, seterrorDeletevehiculePupup] =
    useState(false);

  const [rapportDataLoading, setRapportDataLoading] = useState(false);

  const [showHistoriqueInMap, setShowHistoriqueInMap] = useState(false);

  const [showCategorieListe, setshowCategorieListe] = useState(false);
  const [chooseActifs, setchooseActifs] = useState(false);
  const [chooseStationnement, setchooseStationnement] = useState(false);
  const [chooseInactifs, setchooseInactifs] = useState(false);
  const [chooseALl, setchooseALl] = useState(false);

  // const [donneeFusionneeForRapport, setdonneeFusionneeForRapport] = useState(
  //   []
  // );
  // Initialisation des états depuis localStorage
  const [timeZoneData, setTimeZoneData] = useState([]);
  const [timeZonesearchQuery, settimeZoneSearchQuery] = useState(""); // État pour la recherche
  const [selectedTimeZone, setSelectedTimeZone] = useState(() => {
    return localStorage.getItem("selectedTimeZone") || "";
  });
  const [selectUTC, setselectUTC] = useState(() => {
    return localStorage.getItem("selectUTC") || "";
  });
  // const [selectUTC, setselectUTC] = useState("");
  const [selectTime, setselectTime] = useState(() => {
    return localStorage.getItem("selectTime") || "";
  });

  // Charger les fuseaux horaires
  useEffect(() => {
    const zones = moment.tz.names().map((zone) => {
      const currentTime = moment().tz(zone).format("HH:mm");
      const utcOffset = moment().tz(zone).format("Z");
      return { region: zone, currentTime, utcOffset };
    });
    setTimeZoneData(zones);
  }, []);

  const handleSelectTimeZone = (item) => {
    setSelectedTimeZone(item.region);
    setselectUTC(item.utcOffset);
    setselectTime(item.currentTime);
    localStorage.setItem("selectedTimeZone", item.region);
    localStorage.setItem("selectUTC", item.utcOffset);
    localStorage.setItem("selectTime", item.currentTime);
  };

  useEffect(() => {
    if (selectedTimeZone) {
      localStorage.setItem("selectedTimeZone", selectedTimeZone);
    }
    if (selectUTC) {
      localStorage.setItem("selectUTC", selectUTC);
    }
    if (selectTime) {
      localStorage.setItem("selectTime", selectTime);
    }
  }, [selectedTimeZone, selectUTC, selectTime]);

  const [donneeFusionneeForRapport, setdonneeFusionneeForRapport] = useState(
    () => {
      const storeddonneeFusionneeForRapport = localStorage.getItem(
        "donneeFusionneeForRapport"
      );
      return storeddonneeFusionneeForRapport
        ? JSON.parse(storeddonneeFusionneeForRapport)
        : [];
    }
  );

  // const [donneeFusionneeForRapport, setdonneeFusionneeForRapport] = useState(
  //   []
  // );

  // const [vehiculeActiveAjourdhui, setVehiculeActiveAjourdhui] = useState(() => {
  //   const storedVehiculeActiveAjourdhui = localStorage.getItem(
  //     "vehiculeActiveAjourdhui"
  //   );
  //   return storedVehiculeActiveAjourdhui
  //     ? JSON.parse(storedVehiculeActiveAjourdhui)
  //     : [];
  // });

  const [vehiculeActiveAjourdhui, setVehiculeActiveAjourdhui] = useState([]);

  // const [vehiclueHistoriqueDetails, setVehiclueHistoriqueDetails] = useState(
  //   () => {
  //     const storedvehiclueHistoriqueDetails = localStorage.getItem(
  //       "vehiclueHistoriqueDetails"
  //     );
  //     return storedvehiclueHistoriqueDetails
  //       ? JSON.parse(storedvehiclueHistoriqueDetails)
  //       : [];
  //   }
  // );
  const [vehiclueHistoriqueDetails, setVehiclueHistoriqueDetails] = useState(
    []
  );

  // const [vehiclueHistoriqueDetails, setVehiclueHistoriqueDetails] = useState(
  //   () => {
  //     const storedvehiclueHistoriqueDetails = localStorage.getItem(
  //       "vehiclueHistoriqueDetails"
  //     );
  //     try {
  //       return storedvehiclueHistoriqueDetails &&
  //         storedvehiclueHistoriqueDetails !== "undefined"
  //         ? JSON.parse(storedvehiclueHistoriqueDetails)
  //         : [];
  //     } catch (error) {
  //       console.error("Invalid JSON in localStorage:", error);
  //       return []; // Valeur par défaut en cas d'erreur
  //     }
  //   }
  // );

  // const [vehiclueHistoriqueDetails, setVehiclueHistoriqueDetails] = useState(
  //   []
  // );

  // const [vehiclueHistoriqueDetails, setVehiclueHistoriqueDetails] = useState(

  //   () => {
  //     try {
  //       const storedvehiclueHistoriqueDetails = localStorage.getItem(
  //         "vehiclueHistoriqueDetails"
  //       );

  //       // Si la valeur est null ou undefined, retourne un tableau vide
  //       if (!storedvehiclueHistoriqueDetails) {
  //         return [];
  //       }

  //       // Tente de parser la donnée JSON
  //       const parsedData = JSON.parse(storedvehiclueHistoriqueDetails);

  //       // Vérifie que c'est un tableau (ou toute autre structure attendue)
  //       return Array.isArray(parsedData) ? parsedData : [];
  //     } catch (error) {
  //       console.error(
  //         "Erreur lors de l'analyse de vehiclueHistoriqueDetails :",
  //         error
  //       );
  //       // Réinitialise en cas d'erreur
  //       localStorage.removeItem("vehiclueHistoriqueDetails");
  //       return [];
  //     }
  //   }
  // );

  // const [
  //   vehiclueHistoriqueRapportDetails,
  //   setVehiclueHistoriqueRapportDetails,
  // ] = useState(() => {
  //   const storedvehiclueHistoriqueRapportDetails = localStorage.getItem(
  //     "vehiclueHistoriqueRapportDetails"
  //   );
  //   return storedvehiclueHistoriqueRapportDetails &&
  //     storedvehiclueHistoriqueRapportDetails !== "undefined"
  //     ? JSON.parse(storedvehiclueHistoriqueRapportDetails)
  //     : [];
  // });

  const [
    vehiclueHistoriqueRapportDetails,
    setVehiclueHistoriqueRapportDetails,
  ] = useState([]);

  // const [vehiculeNotActiveAjourdhui, setVehiculeNotActiveAjourdhui] = useState(
  //   () => {
  //     const storedVehiculeNotActiveAjourdhui = localStorage.getItem(
  //       "vehiculeNotActiveAjourdhui"
  //     );
  //     return storedVehiculeNotActiveAjourdhui
  //       ? JSON.parse(storedVehiculeNotActiveAjourdhui)
  //       : [];
  //   }
  // );

  const [vehiculeNotActiveAjourdhui, setVehiculeNotActiveAjourdhui] = useState(
    []
  );

  // const [vehiculeNotActif, setVehiculeNotActif] = useState(() => {
  //   const storedVehiculeNotActif = localStorage.getItem("vehiculeNotActif");
  //   return storedVehiculeNotActif ? JSON.parse(storedVehiculeNotActif) : [];
  // });
  const [vehiculeNotActif, setVehiculeNotActif] = useState([]);
  const [vehiculeActiveMaintenant, setVehiculeActiveMaintenant] = useState([]);

  const handleLogin = async (account, user, password) => {
    // e.preventDefault();
    setIsLoading(true);
    setError(null);
    // const account = e.target.account.value;
    // const user = e.target.username.value;
    // const password = e.target.password.value;

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

        setAccount(localStorage.getItem("account") || "");
        setUsername(localStorage.getItem("username") || "");
        setPassword(localStorage.getItem("password") || "");
        // console.log("user data --------", userData);
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

      // localStorage.setItem("vehicleData", JSON.stringify(vehicleData));
      setVehicleData(vehicleData);
      // console.log("******** Données des véhicules ********** ", vehicleData);
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

      const TimeFrom = `${startOfDay.getFullYear()}-${(
        startOfDay.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${startOfDay
        .getDate()
        .toString()
        .padStart(2, "0")} 00:00:00`;

      if (vehicleData && vehicleData.length > 0) {
        vehicleData.forEach((vehicle) => {
          fetchVehicleDetails(vehicle.deviceID, TimeFrom, TimeTo);
          fetRapportchVehicleDetails(vehicle.deviceID, TimeFrom, TimeTo);

          // firstCallRapportData();
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

  useEffect(() => {
    // console.log("start fffffffffffff........");

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
        fetRapportchVehicleDetails(vehicle.deviceID, TimeFrom, TimeTo);
        // console.log(
        //   "lancement des requette de details.....iiiiiiiiiiiiiiiiiiiiiiiiiiiiii"
        // );
        // firstCallRapportData();
      });
    }
  }, [vehicleData]);

  // const fetchVehicleDetails = async (Device, TimeFrom, TimeTo) => {
  //   if (!userData) return;

  //   console.log("start..................");

  //   const { accountID, userID, password } = userData;
  //   const xmlData = `<GTSRequest command="eventdata">
  //     <Authorization account="${accountID}" user="${userID}" password="${password}" />
  //     <EventData>
  //       <Device>${Device}</Device>
  //       <TimeFrom timezone="GMT">${TimeFrom}</TimeFrom>
  //       <TimeTo timezone="GMT">${TimeTo}</TimeTo>
  //       <Limit type="last">4</Limit>
  //       <Field name="latitude" />
  //       <Field name="longitude" />
  //       <Field name="timestamp" />
  //       <Field name="speedKPH" />
  //     </EventData>
  //   </GTSRequest>`;

  //   try {
  //     const response = await fetch("/api/track/Service", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/xml" },
  //       body: xmlData,
  //     });

  //     const data = await response.text();
  //     const parser = new DOMParser();
  //     const xmlDoc = parser.parseFromString(data, "application/xml");
  //     const records = xmlDoc.getElementsByTagName("Record");

  //     console.log("donnee brut", data);

  //     const newVehicleDetails = [];
  //     for (let i = 0; i < records.length; i++) {
  //       const fields = records[i].getElementsByTagName("Field");
  //       const details = { Device };

  //       for (let j = 0; j < fields.length; j++) {
  //         const fieldName = fields[j].getAttribute("name");
  //         const fieldValue = fields[j].textContent;
  //         details[fieldName] = fieldValue;
  //       }

  //       newVehicleDetails.push(details);
  //     }

  //     setVehicleDetails((prevDetails) => {
  //       const updatedDetails = prevDetails.map((detail) => {
  //         if (detail.Device === Device) {
  //           // Fusionne seulement si `newVehicleDetails` contient des données
  //           return newVehicleDetails.length > 0
  //             ? { ...detail, vehiculeDetails: newVehicleDetails }
  //             : detail;
  //         }
  //         return detail;
  //       });

  //       return updatedDetails;
  //     });

  //     console.log("wait... 3");

  //     console.log("vehicleDetails.......>>>", vehicleDetails);
  //     console.log("newVehicleDetails.......>>>", newVehicleDetails);

  //     console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  //     console.log("end fetching...............");
  //   } catch (error) {
  //     setError("Erreur lors de la récupération des détails du véhicule.");
  //     console.error("Erreur lors du fetch :", error);
  //   }
  // };

  const fetchVehicleDetails = async (Device, TimeFrom, TimeTo) => {
    if (!userData) return;
    console.log("Start fetching fetails");

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

    console.log("wait... 1");

    try {
      const response = await fetch("/api/track/Service", {
        method: "POST",
        headers: { "Content-Type": "application/xml" },
        body: xmlData,
      });

      console.log("wait... 2");

      const data = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "application/xml");
      const records = xmlDoc.getElementsByTagName("Record");

      console.log("data brut:---------", data);

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

      // setVehicleDetails((prevDetails) => [
      //   ...prevDetails.filter((detail) => detail.Device !== Device),
      //   ...newVehicleDetails,
      // ]);

      setVehicleDetails((prevDetails) => {
        const updatedDetails = prevDetails?.map((detail) => {
          if (detail.Device === Device) {
            return newVehicleDetails.length > 0
              ? { ...detail, vehiculeDetails: [...newVehicleDetails] }
              : detail;
          }
          return detail;
        });

        // Si le véhicule n'est pas trouvé, ajoute-le
        if (!updatedDetails.some((detail) => detail.Device === Device)) {
          updatedDetails.push({
            Device,
            vehiculeDetails: [...newVehicleDetails],
          });
        }

        // Sauvegarde les données dans localStorage
        // localStorage.setItem("vehicleDetails", JSON.stringify(updatedDetails));

        return [...updatedDetails];
      });
    } catch (error) {
      setError("Erreur lors de la récupération des détails du véhicule.");
      console.error(
        "Erreur lors de la récupération des détails du véhicule",
        error
      );
    }
  };

  const fetRapportchVehicleDetails = async (Device, TimeFrom, TimeTo) => {
    if (!userData) return;
    // setRapportDataLoading(true);
    console.log("Rapport start fetching............");

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

    console.log("wait 1111.......");

    try {
      const response = await fetch("/api/track/Service", {
        method: "POST",
        headers: { "Content-Type": "application/xml" },
        body: xmlData,
      });
      console.log("wait 22222.......");

      const data = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "application/xml");
      const records = xmlDoc.getElementsByTagName("Record");

      console.log("Data brut rapport details.....", data);

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

      // Suppression des doublons dans `newVehicleDetails`
      const uniqueVehicleDetails = newVehicleDetails.filter(
        (detail, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.Device === detail.Device &&
              t.timestamp === detail.timestamp &&
              t.latitude === detail.latitude &&
              t.longitude === detail.longitude
          )
      );

      setrapportVehicleDetails((prevDetails) => [
        ...prevDetails.filter((detail) => detail.Device !== Device),
        ...uniqueVehicleDetails,
      ]);

      // setrapportVehicleDetails((prevDetails) => [
      //   ...prevDetails.filter((detail) => detail.Device !== Device),
      //   ...newVehicleDetails,
      // ]);

      console.log("...............newVehicleDetails", newVehicleDetails);
      console.log("...............newVehicleDetails", newVehicleDetails);
      console.log(
        "...............rapportvehicleDetails",
        rapportvehicleDetails
      );
      console.log("...............xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      console.log("...............End.....");

      setTimeout(() => {
        setRapportDataLoading(false);
      }, 15000); // 10 000 millisecondes = 10 secondes
    } catch (error) {
      setRapportDataLoading(false);
      setError("Erreur lors de la récupération des détails du véhicule.");
      console.error(
        "Erreur lors de la récupération des détails du véhicule",
        error
      );
    }
  };

  useEffect(() => {
    if (rapportvehicleDetails?.length > 0 && vehicleData?.length > 0) {
      rapportfusionnerDonnees();
    }
  }, [rapportvehicleDetails, vehicleData]);

  const fetchHistoriqueVehicleDetails = async (Device, TimeFrom, TimeTo) => {
    console.log("Start fetching.........");
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

      console.log("Data brut:", data);

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

      // Suppression des doublons
      const uniqueVehicleDetails = newVehicleDetails.filter(
        (detail, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.Device === detail.Device &&
              t.timestamp === detail.timestamp &&
              t.latitude === detail.latitude &&
              t.longitude === detail.longitude
          )
      );

      setVehiclueHistoriqueDetails(uniqueVehicleDetails);

      // setVehiclueHistoriqueDetails(newVehicleDetails);
      // setVehiclueHistoriqueRapportDetails(newVehicleDetails);

      console.log("newVehicleDetails.......>>>", newVehicleDetails);
      console.log(
        "newVehicleDetails.lenght.......>>>",
        newVehicleDetails.length
      );
      console.log("End fetching.........");

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

  const firstCallRapportData = () => {
    setShowListOption(false);
    // console.log("Start.........");
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
        fetRapportchVehicleDetails(vehicle.deviceID, TimeFrom, TimeTo);
        console.log("call the fonction.........");
        // fetRapportchVehicleDetails(
        //   vehicle.deviceID,
        //   // "2024-11-30 00:00:00",
        //   // "2024-11-30 23:40:45"
        //   /////////////////////////
        //   "2024-10-01 00:00:00",
        //   "2024-10-01 23:40:45"
        // );
      });
    }
  };

  const handleDateChange = (TimeFrom, TimeTo) => {
    if (vehicleData && vehicleData.length > 0) {
      vehicleData.forEach((vehicle) => {
        fetchVehicleDetails(vehicle.deviceID, TimeFrom, TimeTo);
      });
    }
  };

  const handleLogout = () => {
    setShowSideBar(true);
    setLogOut(false);
    localStorage.removeItem("userData");
    localStorage.removeItem("vehicleData");
    localStorage.removeItem("vehicleDetails");
    setUserData(null);
    setVehicleData(null);
    setVehicleDetails([]);
    setrapportVehicleDetails([]);
    navigate("/login");
  };

  const mergeVehicleDataWithEvents = (eventData = vehicleDetails) => {
    const dataFusionne = {};
    const seenEvents = new Set();

    vehicleData.forEach((vehicle) => {
      const { deviceID } = vehicle;
      dataFusionne[deviceID] = {
        ...vehicle,
        vehiculeDetails:
          vehicleDetails.find((v) => v.Device === deviceID)?.vehiculeDetails ||
          [],
      };
    });

    eventData.forEach((event) => {
      const { deviceID, timestamp, ...eventDetails } = event;
      const eventKey = `${deviceID}-${timestamp}`;

      if (!seenEvents.has(eventKey)) {
        seenEvents.add(eventKey);

        if (dataFusionne[deviceID]) {
          if (Object.keys(eventDetails).length > 0) {
            dataFusionne[deviceID].vehiculeDetails.push({
              timestamp,
              ...eventDetails,
            });
          }
        }
      }
    });

    // localStorage.setItem("mergedData", JSON.stringify(dataFusionne));
    setMergedData(dataFusionne);
    setIsLoading(false);

    return dataFusionne;
  };

  // const mergeVehicleDataWithEvents = (eventData = vehicleDetails) => {
  //   if (!Array.isArray(eventData)) {
  //     eventData = [eventData];
  //   }

  //   const dataFusionne = {};
  //   const seenEvents = new Set();

  //   vehicleData.forEach((vehicle) => {
  //     const { deviceID } = vehicle;
  //     dataFusionne[deviceID] = { ...vehicle, vehiculeDetails: [] };
  //   });

  //   eventData.forEach((event) => {
  //     const { deviceID, timestamp, ...eventDetails } = event;
  //     const eventKey = `${deviceID}-${timestamp}`;
  //     if (!seenEvents.has(eventKey)) {
  //       seenEvents.add(eventKey);
  //       if (dataFusionne[deviceID]) {
  //         dataFusionne[deviceID].vehiculeDetails.push({
  //           timestamp,
  //           ...eventDetails,
  //         });
  //         // setLoadingHistoriqueFilter(false);
  //       } else {
  //         // setLoadingHistoriqueFilter(false);

  //         console.warn(
  //           `Aucun véhicule correspondant pour l'événement: ${deviceID}`
  //         );
  //       }
  //     } else {
  //       // console.log(`Doublon détecté pour l'événement: ${deviceID}, ${timestamp}`);
  //       // setLoadingHistoriqueFilter(false);
  //     }
  //   });

  //   localStorage.setItem("mergedData", JSON.stringify(dataFusionne)); // Enregistrement dans localStorage
  //   setMergedData(dataFusionne);
  //   // console.log("merge data:", dataFusionne);
  //   setIsLoading(false);

  //   return dataFusionne;
  // };

  const createVehicle = async (
    deviceID,
    imeiNumber,
    uniqueIdentifier,
    description,
    displayName,
    licensePlate,
    equipmentType,
    simPhoneNumber,
    vehicleID
  ) => {
    if (!userData) return;

    setError("");
    setCrud_loading(true);

    // <Authorization account="${accountID}" user="${userID}" password="${password}" />
    const xmlData = `<GTSRequest command="dbcreate">
      <Authorization account="${account}" user="${username}" password="${password}" />
      <Record table="Device" partial="true">
        <Field name="accountID">${account}</Field>

        <Field name="deviceID">${deviceID}</Field>
        <Field name="description">${description}</Field>
        <Field name="equipmentType">${equipmentType}</Field>
        <Field name="uniqueID">${uniqueIdentifier}</Field>
        <Field name="imeiNumber">${imeiNumber}</Field>
        <Field name="vehicleID">${vehicleID}</Field>
        <Field name="licensePlate">${licensePlate}</Field>
        <Field name="simPhoneNumber">${"509" + simPhoneNumber}</Field>
        <Field name="displayName">${displayName}</Field>
        <Field name="isActive">1</Field>
      </Record>
    </GTSRequest>`;

    try {
      const response = await fetch("/api/track/Service", {
        method: "POST",
        headers: { "Content-Type": "application/xml" },
        body: xmlData,
      });

      const data = await response.text();
      // console.log("data from add vehicule", data);
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "application/xml");
      const result = xmlDoc
        .getElementsByTagName("GTSResponse")[0]
        .getAttribute("result");
      // console.log("Almost thereeee..............");
      setError("");

      if (result === "success") {
        // console.log("Véhicule créé avec succès :");
        setsuccessAddvehiculePupup(true);
        setError("");
        fetchVehicleData();
        setCrud_loading(false);
      } else {
        const errorMessage =
          xmlDoc.getElementsByTagName("Message")[0].textContent;
        setError(errorMessage || "Erreur lors de la création du véhicule.");
        // console.log("errorrrrrrrrr");
        seterrorAddvehiculePupup(true);
        setCrud_loading(false);
      }

      // console.log("End creating..............");
    } catch (error) {
      setError("Erreur lors de la création du véhicule.");
      console.error("Erreur lors de la création du véhicule", error);
      seterrorAddvehiculePupup(true);
      setCrud_loading(false);
    }
  };

  const deleteVehicle = async (deviceID) => {
    // console.log("Start Deleting.........");
    setCrud_loading(true);

    const requestBody =
      `<GTSRequest command="dbdel">` +
      `<Authorization account="${account}" user="${username}" password="${password}"/>` +
      `<RecordKey table="Device" partial="true">` +
      `<Field name="accountID">${account}</Field>` +
      `<Field name="deviceID">${deviceID}</Field>` +
      `</RecordKey>` +
      `</GTSRequest>`;

    // console.log("almost Delete.........");

    try {
      const response = await fetch("/api/track/Service", {
        method: "POST",
        headers: {
          "Content-Type": "application/xml",
        },
        body: requestBody,
      });

      // console.log("wait a little more.........");

      if (response.ok) {
        setVehicleData((prevVehicles) =>
          prevVehicles.filter((vehicle) => vehicle.deviceID !== deviceID)
        );
        // console.log("Véhicule supprimé avec succès.");
        fetchVehicleData();
        setsuccessDeletevehiculePupup(true);
        setCrud_loading(false);
      } else {
        console.error(
          "Erreur lors de la suppression du véhicule:",
          response.statusText
        );
        seterrorDeletevehiculePupup(true);
        setCrud_loading(false);
      }

      // console.log("finish Deleting.........");
    } catch (error) {
      console.error(
        "Erreur de connexion lors de la suppression du véhicule:",
        error
      );
      seterrorDeletevehiculePupup(true);
      setCrud_loading(false);
    }
  };

  const updateVehicle = async (
    deviceID,
    imeiNumber,
    uniqueID,
    description,
    displayName,
    licensePlate,
    equipmentType,
    simPhoneNumber
  ) => {
    // console.log("Start updating.....");
    setCrud_loading(true);
    const requestBody =
      `<GTSRequest command="dbput">` +
      `<Authorization account="${account}" user="${username}" password="${password}"/>` +
      `<Record table="Device" partial="true">` +
      `<Field name="accountID">${account}</Field>` +
      `<Field name="deviceID">${deviceID}</Field>` +
      `<Field name="description">${description}</Field>` +
      `<Field name="equipmentType">${equipmentType}</Field>` +
      `<Field name="uniqueID">${uniqueID}</Field>` +
      `<Field name="imeiNumber">${imeiNumber}</Field>` +
      `<Field name="licensePlate">${licensePlate}</Field>` +
      `<Field name="simPhoneNumber">${simPhoneNumber}</Field>` +
      `<Field name="displayName">${displayName}</Field>` +
      `<Field name="isActive">1</Field>` +
      `</Record>` +
      `</GTSRequest>`;
    // console.log("almost there.....");

    try {
      const response = await fetch("/api/track/Service", {
        method: "POST",
        headers: {
          "Content-Type": "application/xml",
        },
        body: requestBody,
      });

      // console.log("wait updating.....");

      if (response.ok) {
        setVehicleData((prevVehicles) =>
          prevVehicles.map((vehicle) =>
            vehicle.deviceID === deviceID
              ? {
                  ...vehicle,
                  description,
                  equipmentType,
                  uniqueID,
                  imeiNumber,
                  licensePlate,
                  simPhoneNumber,
                  displayName,
                }
              : vehicle
          )
        );
        // console.log("Véhicule modifié avec succès.");
        setsuccessModifiervehiculePupup(true);
        fetchVehicleData();
        setCrud_loading(false);
      } else {
        console.error(
          "Erreur lors de la modification du véhicule:",
          response.statusText
        );
        seterrorModifiervehiculePupup(true);
        setCrud_loading(false);
      }

      // console.log("finish updating.....");
    } catch (error) {
      seterrorModifiervehiculePupup(true);
      setCrud_loading(false);

      console.error(
        "Erreur de connexion lors de la modification du véhicule:",
        error
      );
    }
  };

  const fetSearchRapportchVehicleDetails = async (Device, TimeFrom, TimeTo) => {
    if (!userData) return;
    // setRapportDataLoading(true);
    console.log("starttttttttttttt..............");

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

      // Suppression des doublons dans `newVehicleDetails`
      const uniqueVehicleDetails = newVehicleDetails.filter(
        (detail, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.Device === detail.Device &&
              t.timestamp === detail.timestamp &&
              t.latitude === detail.latitude &&
              t.longitude === detail.longitude
          )
      );

      // setrapportVehicleDetails((prevDetails) => [
      //   ...prevDetails.filter((detail) => detail.Device !== Device),
      //   ...uniqueVehicleDetails,
      // ]);

      // const filteredVehicleDetails = [];
      // let lastZeroSpeedTimestamp = null;

      // newVehicleDetails
      //   .sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp))
      //   .forEach((details) => {
      //     const timestamp = parseInt(details.timestamp);
      //     const speedKPH = parseFloat(details.speedKPH);

      //     if (speedKPH <= 0) {
      //       if (
      //         lastZeroSpeedTimestamp === null ||
      //         lastZeroSpeedTimestamp - timestamp >= 300
      //       ) {
      //         filteredVehicleDetails.push(details);
      //         lastZeroSpeedTimestamp = timestamp;
      //       }
      //     } else {
      //       filteredVehicleDetails.push(details);
      //     }
      //   });

      setSearchrapportVehicleDetails((prevDetails) => [
        ...prevDetails.filter((detail) => detail.Device !== Device),
        ...uniqueVehicleDetails,
      ]);

      // setSearchrapportVehicleDetails((prevDetails) => [
      //   ...prevDetails.filter((detail) => detail.Device !== Device),
      //   ...newVehicleDetails,
      // ]);

      // console.log("end fetching.................");
      // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.");
      // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.");
      // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.");
      // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.");
      // setRapportDataLoading(false);
      setTimeout(() => {
        setRapportDataLoading(false);
      }, 15000); // 10 000 millisecondes = 10 secondes
    } catch (error) {
      setRapportDataLoading(false);
      setError("Erreur lors de la récupération des détails du véhicule.");
      console.error(
        "Erreur lors de la récupération des détails du véhicule",
        error
      );
    }
  };

  const [searchdonneeFusionneeForRapport, setSearchdonneeFusionneeForRapport] =
    useState([]);

  const rapportSearchfusionnerDonnees = () => {
    if (!vehicleData || !searchrapportvehicleDetails) return [];

    const dataFusionnee = vehicleData.map((vehicle) => {
      const events = searchrapportvehicleDetails?.filter(
        (detail) => detail.Device === vehicle.deviceID
      );

      // Si les nouveaux détails sont vides, ne pas mettre à jour les détails actuels
      // if (!events || events.length === 0) {
      //   return vehicle;
      // }

      // Mettre à jour les informations du véhicule si les nouveaux détails ne sont pas vides
      return {
        ...vehicle,
        vehiculeDetails: events,
      };
    });

    // Vérifiez si chaque véhicule a ses détails ajoutés
    const allVehiclesProcessed = dataFusionnee.every(
      (vehicle) => vehicle.vehiculeDetails && vehicle.vehiculeDetails.length > 0
    );

    // 1. Met à jour l'état avec toutes les données fusionnées
    setSearchdonneeFusionneeForRapport(dataFusionnee);
    setRapportDataLoading(false);

    // 2. Met à jour le chargement uniquement lorsque toutes les données sont traitées
    if (allVehiclesProcessed) {
      console.log("Tous les véhicules ont leurs détails mis à jour !");
      setSearchdonneeFusionneeForRapport(dataFusionnee);
    } else {
      console.log("Certains véhicules n'ont pas encore leurs détails.");
    }

    return dataFusionnee;
  };

  // const rapportSearchfusionnerDonnees = () => {
  //   if (!vehicleData || !searchrapportvehicleDetails) return [];

  //   const dataFusionnee = vehicleData.map((vehicle) => {
  //     const events = searchrapportvehicleDetails?.filter(
  //       (detail) => detail.Device === vehicle.deviceID
  //     );
  //     return {
  //       ...vehicle,
  //       vehiculeDetails: events,
  //     };
  //   });

  //   // Vérifiez si chaque véhicule a ses détails ajoutés
  //   const allVehiclesProcessed = dataFusionnee.every(
  //     (vehicle) => vehicle.vehiculeDetails && vehicle.vehiculeDetails.length > 0
  //   );

  //   // 1. Met à jour l'état avec toutes les données fusionnées
  //   setSearchdonneeFusionneeForRapport(dataFusionnee);
  //   setRapportDataLoading(false);

  //   // 2. Met à jour le chargement uniquement lorsque toutes les données sont traitées
  //   if (allVehiclesProcessed) {
  //     // console.log("Tous les véhicules ont leurs détails!");
  //     setSearchdonneeFusionneeForRapport(dataFusionnee);
  //   } else {
  //     console.log("Certains véhicules n'ont pas encore leurs détails.");
  //   }

  //   return dataFusionnee;
  // };

  useEffect(() => {
    console.log(
      "Mise à jour de searchdonneeFusionneeForRapport:",
      searchdonneeFusionneeForRapport
    );
  }, [searchdonneeFusionneeForRapport]);

  useEffect(() => {
    if (searchrapportvehicleDetails.length > 0 && vehicleData?.length > 0) {
      rapportSearchfusionnerDonnees();
    }
  }, [searchrapportvehicleDetails, vehicleData]);

  // Fonction pour fusionner les données après les requêtes
  // const rapportfusionnerDonnees = (eventData = rapportvehicleDetails) => {
  //   const dataFusionnee = {};
  //   const seenEvents = new Set();

  //   vehicleData.forEach((vehicle) => {
  //     const { deviceID } = vehicle;
  //     dataFusionnee[deviceID] = {
  //       ...vehicle,
  //       vehiculeDetails:
  //         rapportvehicleDetails.find((v) => v.Device === deviceID)
  //           ?.vehiculeDetails || [],
  //     };
  //   });

  //   eventData.forEach((event) => {
  //     const { deviceID, timestamp, ...eventDetails } = event;
  //     const eventKey = `${deviceID}-${timestamp}`;

  //     if (!seenEvents.has(eventKey)) {
  //       seenEvents.add(eventKey);

  //       if (dataFusionnee[deviceID]) {
  //         if (Object.keys(eventDetails).length > 0) {
  //           dataFusionnee[deviceID].vehiculeDetails.push({
  //             timestamp,
  //             ...eventDetails,
  //           });
  //         }
  //       }
  //     }
  //   });

  //   // localStorage.setItem("mergedRapportData", JSON.stringify(dataFusionnee));
  //   setdonneeFusionneeForRapport(dataFusionnee);
  //   setRapportDataLoading(false);

  //   return dataFusionnee;
  // };

  const rapportfusionnerDonnees = () => {
    if (!vehicleData || !rapportvehicleDetails) return [];

    // Récupérer les anciens détails depuis localStorage
    const previousData = (() => {
      try {
        const data = JSON.parse(
          localStorage.getItem("donneeFusionneeForRapport")
        );
        return Array.isArray(data) ? data : [];
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données du localStorage:",
          error
        );
        return [];
      }
    })();

    const dataFusionnee = vehicleData.map((vehicle) => {
      // Trouver les nouveaux détails pour le véhicule
      const newDetails = rapportvehicleDetails?.filter(
        (detail) => detail.Device === vehicle.deviceID
      );

      // Récupérer les anciens détails depuis les données précédentes
      const previousDetails = previousData.find(
        (prev) => prev.deviceID === vehicle.deviceID
      )?.vehiculeDetails;

      // Conserver les anciens détails si aucun nouveau n'est trouvé
      const updatedDetails =
        newDetails && newDetails.length > 0
          ? newDetails
          : previousDetails || [];

      return {
        ...vehicle,
        vehiculeDetails: updatedDetails,
      };
    });

    // Met à jour l'état avec les données fusionnées
    setdonneeFusionneeForRapport(dataFusionnee);

    // Enregistrer les données fusionnées dans localStorage
    localStorage.setItem(
      "donneeFusionneeForRapport",
      JSON.stringify(dataFusionnee)
    );

    setTimeout(() => {
      setRapportDataLoading(false);
    }, 15000); // 10 000 millisecondes = 10 secondes

    setRapportDataLoading(false);

    return dataFusionnee;
  };

  // const rapportfusionnerDonnees = () => {
  //   if (!vehicleData || !rapportvehicleDetails) return [];

  //   // Récupérer les anciens détails depuis localStorage
  //   const previousData =
  //     JSON.parse(localStorage.getItem("donneeFusionneeForRapport")) || [];

  //   const dataFusionnee = vehicleData.map((vehicle) => {
  //     // Trouver les nouveaux détails pour le véhicule
  //     const newDetails = rapportvehicleDetails?.filter(
  //       (detail) => detail.Device === vehicle.deviceID
  //     );

  //     // Récupérer les anciens détails depuis les données précédentes
  //     const previousDetails = previousData.find(
  //       (prev) => prev.deviceID === vehicle.deviceID
  //     )?.vehiculeDetails;

  //     // Conserver les anciens détails si aucun nouveau n'est trouvé
  //     const updatedDetails =
  //       newDetails && newDetails.length > 0
  //         ? newDetails
  //         : previousDetails || [];

  //     return {
  //       ...vehicle,
  //       vehiculeDetails: updatedDetails,
  //     };
  //   });

  //   // Met à jour l'état avec les données fusionnées
  //   setdonneeFusionneeForRapport(dataFusionnee);

  //   // Enregistrer les données fusionnées dans localStorage
  //   localStorage.setItem(
  //     "donneeFusionneeForRapport",
  //     JSON.stringify(dataFusionnee)
  //   );

  //   setRapportDataLoading(false);

  //   return dataFusionnee;
  // };

  // const rapportfusionnerDonnees = () => {
  //   if (!vehicleData || !rapportvehicleDetails) return [];

  //   const previousData = Array.isArray(donneeFusionneeForRapport)
  //     ? donneeFusionneeForRapport
  //     : [];

  //   const dataFusionnee = vehicleData.map((vehicle) => {
  //     // Trouver les nouveaux détails pour le véhicule
  //     const newDetails = rapportvehicleDetails?.filter(
  //       (detail) => detail.Device === vehicle.deviceID
  //     );

  //     const previousDetails = previousData?.find(
  //       (prev) => prev.deviceID === vehicle.deviceID
  //     )?.vehiculeDetails;

  //     // Conserver les anciens détails si aucun nouveau n'est trouvé
  //     const updatedDetails =
  //       newDetails && newDetails.length > 0
  //         ? newDetails
  //         : previousDetails || [];

  //     return {
  //       ...vehicle,
  //       vehiculeDetails: updatedDetails,
  //     };
  //   });

  //   // Met à jour l'état avec les données fusionnées
  //   setdonneeFusionneeForRapport(dataFusionnee);
  //   setRapportDataLoading(false);

  //   return dataFusionnee;
  // };

  // const rapportfusionnerDonnees = () => {
  //   if (!vehicleData || !rapportvehicleDetails) return [];

  //   const dataFusionnee = vehicleData.map((vehicle) => {
  //     const events = rapportvehicleDetails?.filter(
  //       (detail) => detail.Device === vehicle.deviceID
  //     );
  //     return {
  //       ...vehicle,
  //       vehiculeDetails: events,
  //     };
  //   });

  //   // 1. Met à jour l'état avec toutes les données fusionnées
  //   setdonneeFusionneeForRapport(dataFusionnee);
  //   setRapportDataLoading(false);

  //   return dataFusionnee;
  // };

  function envoyerSMS(numero, message) {
    window.location.href = `sms:${numero}?body=${encodeURIComponent(message)}`;
  }

  const [smsError, setSmsError] = useState(""); // Utilisation du useState pour l'erreur

  // const envoyerSMS = (numero, message) => {
  //   const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); // Vérification de la plateforme

  //   if (!isMobile) {
  //     setSmsError(
  //       "L'envoi de SMS n'est pas pris en charge sur cette plateforme."
  //     );
  //     return;
  //   }

  //   try {
  //     const smsLink = `sms:${numero}?body=${encodeURIComponent(message)}`;

  //     // Essayer de rediriger vers le lien sms:
  //     window.location.href = smsLink;

  //     // Vérifier après un délai si l'action a échoué
  //     setTimeout(() => {
  //       if (window.location.href === smsLink) {
  //         // Si l'URL n'a pas changé, il y a probablement un problème
  //         setSmsError(
  //           "Impossible d'ouvrir l'application de messagerie. Veuillez vérifier que votre appareil supporte les SMS."
  //         );
  //       }
  //     }, 1000); // Délai d'attente de 1 seconde (ajuster si nécessaire)
  //   } catch (error) {
  //     setSmsError("Une erreur est survenue lors de l'envoi du SMS.");
  //   }
  // };

  // update rapport page tous les 5 minutes.

  useEffect(() => {
    const intervalId = setInterval(() => {
      firstCallRapportData();
      console.log("okkkkkkkkkk");
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const liste1 = [];

  // let currentdataFusionnee = donneeFusionneeForRapport;

  let currentdataFusionnee =
    searchdonneeFusionneeForRapport.length > 0
      ? searchdonneeFusionneeForRapport
      : donneeFusionneeForRapport;

  useEffect(() => {
    if (currentdataFusionnee && currentdataFusionnee?.length > 0) {
      // 2. Met à jour l'état avec tous les véhicules ayant au moins un événement avec `speedKPH >= 1`
      const vehiculeActiveAjourdhui = currentdataFusionnee?.filter((vehicle) =>
        vehicle.vehiculeDetails?.some((detail) => detail.speedKPH >= 1)
      );
      setVehiculeActiveAjourdhui(vehiculeActiveAjourdhui);

      // 3. Met à jour l'état avec tous les véhicules n'ayant aucun événement avec `speedKPH >= 1`
      const vehiculeNotActiveAjourdhui = currentdataFusionnee?.filter(
        (vehicle) =>
          vehicle.vehiculeDetails?.length > 0 && // Exclure les véhicules sans détails
          vehicle.vehiculeDetails?.every((detail) => detail.speedKPH < 1)
      );

      setVehiculeNotActiveAjourdhui(vehiculeNotActiveAjourdhui);

      // 4. Met à jour l'état avec tous les véhicules dont `vehiculeDetails[0].speedKPH >= 1`
      const vehiculeActiveMaintenant = currentdataFusionnee?.filter(
        (vehicle) =>
          vehicle?.vehiculeDetails &&
          vehicle?.vehiculeDetails?.length &&
          vehicle?.vehiculeDetails[0]?.speedKPH >= 1
      );
      setVehiculeActiveMaintenant(vehiculeActiveMaintenant);

      // 5. Met à jour l'état avec tous les véhicules dont `lastUpdateTime` est supérieur à 24h par rapport à l'heure actuelle
      const vehiculeNotActif = currentdataFusionnee?.filter((vehicle) => {
        const lastUpdate = new Date(vehicle.lastUpdateTime);
        const now = new Date();
        const diffHeures = (now - lastUpdate) / (1000 * 60 * 60);
        return vehicle.vehiculeDetails?.length <= 0 || diffHeures > 24;
      });

      setVehiculeNotActif(vehiculeNotActif);
    }
  }, [
    currentdataFusionnee,
    searchdonneeFusionneeForRapport,
    donneeFusionneeForRapport,
  ]);
  // function afficherErreur(message) {
  //   // Afficher un message d'erreur à l'utilisateur
  //   alert(message);
  //   // Tu peux aussi afficher l'erreur dans l'interface utilisateur si tu préfères
  //   const erreurElement = document.getElementById('messageErreur');
  //   if (erreurElement) {
  //     erreurElement.textContent = message;
  //   }
  // }

  useEffect(() => {
    if (userData) {
      fetchVehicleData();
    }
  }, [userData]);

  useEffect(() => {
    // Récupérer les informations de localStorage
    setAccount(localStorage.getItem("account") || "");
    setUsername(localStorage.getItem("username") || "");
    setPassword(localStorage.getItem("password") || "");
  }, []);

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

  useEffect(() => {
    if (
      rapportvehicleDetails &&
      rapportvehicleDetails.length > 0 &&
      vehicleData &&
      vehicleData.length > 0
    ) {
      rapportfusionnerDonnees();
    }
  }, [vehicleData, rapportvehicleDetails]);

  // Sauvegarde des données dans localStorage à chaque mise à jour des états
  useEffect(() => {
    localStorage.setItem("vehicleDetails", JSON.stringify(vehicleDetails));
    localStorage.setItem(
      "rapportvehicleDetails",
      JSON.stringify(rapportvehicleDetails)
    );

    localStorage.setItem(
      "donneeFusionneeForRapport",
      JSON.stringify(donneeFusionneeForRapport)
    );
    // localStorage.setItem(
    //   "vehiculeActiveAjourdhui",
    //   JSON.stringify(vehiculeActiveAjourdhui)
    // );
    // localStorage.setItem(
    //   "vehiclueHistoriqueDetails",
    //   JSON.stringify(vehiclueHistoriqueDetails)
    // );

    // localStorage.setItem(
    //   "vehiclueHistoriqueRapportDetails",
    //   JSON.stringify(vehiclueHistoriqueRapportDetails)
    // );

    localStorage.setItem(
      "vehiculeNotActiveAjourdhui",
      JSON.stringify(vehiculeNotActiveAjourdhui)
    );

    localStorage.setItem("vehiculeNotActif", JSON.stringify(vehiculeNotActif));
  }, [
    vehiculeActiveAjourdhui,
    vehiculeNotActiveAjourdhui,
    vehiculeNotActif,
    // vehiclueHistoriqueRapportDetails,
    donneeFusionneeForRapport,
    vehiclueHistoriqueDetails,
    vehicleDetails,
    rapportvehicleDetails,
  ]);

  const updateCurrentVehicule = (vehicle) => {
    setCurrentVehicule(vehicle);
    firstCallHistoriqueData();
  };

  const location = useLocation();
  const [tab, setTab] = useState("");

  // Synchronisation de l'état `tab` avec l'URL lors du montage du composant ou des changements d'URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabFromUrl = params.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location]); // Réagit aux changements d'URL

  const handleTabClick = (tabName) => {
    setTab(tabName);
    navigate(`/home?tab=${tabName}`);
  };

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  const fonctionTest = () => {
    console.log("Start test11111111.....................");

    if (vehicleData && vehicleData.length > 0) {
      vehicleData.forEach((vehicle) => {
        fetRapportchVehicleDetails(
          vehicle.deviceID,
          "2024-11-30 00:00:00",
          "2024-11-30 23:40:45"
          /////////////////////////
          // "2024-10-01 00:00:00",
          // "2024-10-01 23:40:45"
        );
      });
    }
  };
  const fonctionTest2 = () => {
    console.log("Start test222222222222.....................");

    //     timeFrom: 2024-11-30 00:00:00
    // DataContext.jsx:1526 timeTo: 2024-11-30 14:40:45

    if (vehicleData && vehicleData.length > 0) {
      vehicleData.forEach((vehicle) => {
        console.log("...............................");

        // fetchVehicleDetails(
        fetRapportchVehicleDetails(
          vehicle.deviceID,
          // "2024-11-30 00:00:00",
          // "2024-11-30 23:40:45"
          /////////////////////////
          "2024-10-01 00:00:00",
          "2024-10-01 23:40:45"
        );
      });
    }
  };

  return (
    <DataContext.Provider
      value={{
        fonctionTest,
        fonctionTest2,
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
        setSelectedVehicle,
        createVehicle,
        deleteVehicle,
        updateVehicle,
        setError,
        crud_loading,
        setCrud_loading,

        successAddvehiculePupup,
        setsuccessAddvehiculePupup,
        errorAddvehiculePupup,
        seterrorAddvehiculePupup,

        successModifiervehiculePupup,
        setsuccessModifiervehiculePupup,
        errorModifiervehiculePupup,
        seterrorModifiervehiculePupup,

        successDeletevehiculePupup,
        setsuccessDeletevehiculePupup,
        errorDeletevehiculePupup,
        seterrorDeletevehiculePupup,
        //
        rapportvehicleDetails,
        fetRapportchVehicleDetails,
        firstCallRapportData,
        setRapportDataLoading,
        rapportDataLoading,
        donneeFusionneeForRapport,
        setdonneeFusionneeForRapport,
        vehiculeActiveAjourdhui,
        setVehiculeActiveAjourdhui,
        vehiculeNotActiveAjourdhui,
        setVehiculeNotActiveAjourdhui,
        vehiculeActiveMaintenant,
        setVehiculeActiveMaintenant,
        vehiculeNotActif,
        setVehiculeNotActif,
        handleTabClick,
        tab,
        envoyerSMS,
        smsError,
        setSmsError,
        showHistoriqueInMap,
        setShowHistoriqueInMap,
        setVehiclueHistoriqueDetails,
        fetSearchRapportchVehicleDetails,
        searchdonneeFusionneeForRapport,
        setSearchdonneeFusionneeForRapport,

        timeZoneData,
        setTimeZoneData,
        timeZonesearchQuery,
        settimeZoneSearchQuery,
        selectedTimeZone,
        setSelectedTimeZone,
        selectUTC,
        setselectUTC,
        selectTime,
        setselectTime,
        handleSelectTimeZone,

        //
        showCategorieListe,
        setshowCategorieListe,
        chooseActifs,
        setchooseActifs,
        chooseStationnement,
        setchooseStationnement,
        chooseInactifs,
        setchooseInactifs,
        chooseALl,
        setchooseALl,
        // vehiclueHistoriqueRapportDetails,
        setVehiclueHistoriqueRapportDetails,
        currentdataFusionnee,
        // searchrapportvehicleDetails,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
