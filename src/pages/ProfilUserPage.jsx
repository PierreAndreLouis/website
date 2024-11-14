import React, { useContext, useState, useEffect } from "react";
// import { DataContext } from "../../context/DataContext";

import { FaUserCircle } from "react-icons/fa";
// import Logout from "../login/Logout";
import { useNavigate } from "react-router-dom";
import Logout from "../components/login/Logout";
import { DataContext } from "../context/DataContext";
import ConfirmPasswordComponent from "../components/profile/ConfirmPasswordComponent";
import InfoUserComponent from "../components/profile/InfoUserComponent";

function ProfilUserPage() {
  const {
    currentVehicule,
    userData,
    account,
    username,
    password,
    setIsPasswordConfirmed,
    showChangePasswordPupup,
    setShowChangePasswordPupup,
  } = useContext(DataContext);
  const [logOut, setLogOut] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Redirection si le mot de passe est "password"
  useEffect(() => {
    if (password === "password") {
      navigate("/Change_Password");
    }
  }, [password, navigate]);

  // Gestion de la vérification du mot de passe
  const handlePasswordCheck = (event) => {
    event.preventDefault(); // Prevents the form from submitting

    if (inputPassword === password) {
      setIsPasswordConfirmed(true);
      navigate("/Change_Password");
      setShowChangePasswordPupup(false);
    } else {
      setErrorMessage("Mot de passe incorrect. Veuillez réessayer.");
    }
  };



  console.log(currentVehicule?.description || "no data");

  return (
    <div className="px-4 pb-20">
      {logOut && <Logout setLogOut={setLogOut} />}

      <ConfirmPasswordComponent
        showChangePasswordPupup={showChangePasswordPupup}
        handlePasswordCheck={handlePasswordCheck}
        inputPassword={inputPassword}
        setInputPassword={setInputPassword}
        errorMessage={errorMessage}
        setShowChangePasswordPupup={setShowChangePasswordPupup}
        setIsPasswordConfirmed={setIsPasswordConfirmed}
        setErrorMessage={setErrorMessage}
      />

      <InfoUserComponent
        account={account}
        username={username}
        userData={userData}
        setShowChangePasswordPupup={setShowChangePasswordPupup}
        setLogOut={setLogOut}
      />

    </div>
  );
}

export default ProfilUserPage;
