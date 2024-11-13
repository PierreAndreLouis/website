import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import Navigation_bar from "../home/Navigation_bar";
import PC_header from "../home/PC_header";
import { FaUserCircle } from "react-icons/fa";
import Logout from "../login/Logout";
import { useNavigate } from "react-router-dom";
import Header from "../home/Header";
import SideBar from "../home/SideBar";

function UserProfile() {
  const { currentVehicule, userData, account, username, password, setIsPasswordConfirmed, showChangePasswordPupup, setShowChangePasswordPupup } = useContext(DataContext);
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


  // const handleConfirmPassword = () => {
  //   if (inputPassword === password) {
  //     setIsPasswordConfirmed(true);
  //     navigate("/Change_Password");
  //   } else {
  //     alert("Mot de passe incorrect");
  //   }
  // };

  console.log(currentVehicule?.description || "no data");

  return (
    <div className="px-4 pb-20">
      {/* <Navigation_bar />
      <PC_header />
      <Header />
      <SideBar /> */}
      {logOut && <Logout setLogOut={setLogOut} />}
      {showChangePasswordPupup && (
        <div className="fixed z-10 flex justify-center items-center inset-0 bg-black/50">
          <form
          onSubmit={handlePasswordCheck}
          className="bg-white max-w-[25rem] p-6 rounded-xl w-[80vw]">
            <div>
              <label
                htmlFor="password"
                className="block text-lg text-center leading-6 text-gray-500 mb-3"
              >
                Veuillez entrer votre mot de passe
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Mot de passe"
                  required
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  className=" px-3 w-full rounded-md  py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 border border-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 justify-start mt-5">


              <button
                // onClick={handlePasswordCheck}
                className="py-1 px-5 bg-orange-500 rounded-lg text-white"
              >
                Confirmer
              </button>


              <div
                onClick={() => {
                  setShowChangePasswordPupup(false);
                  setIsPasswordConfirmed(false);
                  setErrorMessage("");
                  setInputPassword("");
                }}
                className="py-1 px-5 cursor-pointer text-center text-orange-500 rounded-lg font-semibold border border-orange-500"
              >
                Annuler
              </div>
            </div>
          </form>
        </div>
      )}

      <div>
        <div className="flex mt-24 md:mt-28 justify-center items-center">
          <FaUserCircle className="text-gray-300 w-[25rem] h-24" />
        </div>

        <h1 className="text-center font-bold text-xl mt-4 text-gray-700">
          Mon Profil
        </h1>
        <div className="mt-8 bg-gray-100 max-w-[50rem] mx-auto py-4 rounded-xl px-4 sm:px-[10vw] flex flex-col gap-2">
          <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2">
            <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] ">
              Account
            </h3>
            <p className="pl-3 text-gray-500">{account || "-----"}</p>
          </div>
          <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2">
            <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] ">
              Nom d'utilisateur:
            </h3>
            <p className="pl-3 text-gray-500">{username || "-----"}</p>
          </div>
          <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2">
            <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] ">
              Mot de passe
            </h3>
            <p className="pl-3 text-gray-500">**********</p>
          </div>
          <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2">
            <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] ">
              timeZone :
            </h3>
            <p className="pl-3 text-gray-500">{userData?.timeZone || "-----"}</p>
          </div>
          <div className="flex justify-start flex-col sm:flex-row mt-2 border-b border-gray-300 pb-2">
            <h3 className="font-bold text-gray-600 min-w-[11.8rem] lg:min-w-[16rem] ">
              Adresse :
            </h3>
            <p className="pl-3 text-gray-500">{userData?.addressCity || "-----"}</p>
          </div>
        </div>
        <div className="grid max-w-[30rem] mx-auto grid-cols-1 sm:grid-cols-2 mt-10 gap-2 ">
         {username === "admin" && <div
            onClick={() => {
              setShowChangePasswordPupup(true);
            }}
            className="text-orange-500 cursor-pointer text-center rounded-lg px-3 border border-orange-500 py-2"
          >
            Changer le mot de passe
          </div>}
          <button
            onClick={() => {
              setLogOut(true);
            }}
            className="bg-orange-500 text-center rounded-lg px-3 text-white py-2"
          >
            Se Déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
