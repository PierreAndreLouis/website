import React, { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { MdOutlineLightMode } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../theme/themeSlice";
import { IoSunny } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const [showNavBar, setshowNavBar] = useState(false);

  // const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme); // Récupère l'état du thème (clair/sombre) depuis Redux
  const dispatch = useDispatch(); // Permet de déclencher des actions Redux
  const [logOut, setLogOut] = useState(false); // État pour afficher le composant de déconnexion
  const [searchVehicule, setSearchVehicule] = useState(() => {
    const savedValue = localStorage.getItem("searchVehicule");
    return savedValue ? JSON.parse(savedValue) : false; // Charge la valeur de recherche enregistrée
  });

  // Fonction pour défiler vers le haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto", // Défilement fluide
      // behavior: "smooth", // Défilement fluide
    });
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

  return (
    <div className="fixed z-[99999] bg-white dark:bg-gray-900 top-0 left-0 right-0">
      <div className="px-8  shadow-lg shadow-gray-500/20 md:px-14 py-2 md:flex justify-between">
        <div className="flex justify-between items-center">
          <Link
            onClick={() => {
              scrollToTop();
              handleTabClick("home?tab=home");
            }}
            to="/home"
            className="cursor-default flex items-center gap-2 text-xl font-bold dark:text-gray-50"
          >
            <img
              className="w-[2rem] h-[2rem] object-cover rounded-full object-top bg-orange-500 "
              src="/assets/profil2.png"
              alt=""
            />
            <p>
              Pierre-<span className="text-orange-500">Andre</span>{" "}
            </p>
          </Link>
          {/* <div
            onClick={() => {
              setshowNavBar(!showNavBar);
            }}
            className="md:hidden"
          > */}
          <div className="flex items-center gap-4">
            <div
              className=" md:hidden"
              onClick={() => dispatch(toggleTheme())} // Permet de basculer entre les thèmes
            >
              {theme === "light" ? (
                <div className="min-w-[1.92rem] min-h-[1.92rem] border cursor-pointer rounded-full flex justify-center items-center">
                  <IoSunny className="dark:text-gray-50 text-sm" />
                </div>
              ) : (
                <div className="min-w-[1.92rem] min-h-[1.92rem] border cursor-pointer rounded-full flex justify-center items-center">
                  <FaMoon className="dark:text-gray-50 text-sm" />
                </div>
              )}
            </div>

            {showNavBar ? (
              <IoClose
                onClick={() => {
                  setshowNavBar(!showNavBar);
                }}
                className="md:hidden dark:text-gray-50 text-red-500 text-3xl cursor-pointer"
              />
            ) : (
              <IoMenu
                onClick={() => {
                  setshowNavBar(!showNavBar);
                }}
                className="md:hidden dark:text-gray-50 text-3xl cursor-pointer"
              />
            )}
          </div>

          {/* </div> */}
        </div>
        <div
          className={`flex overflow-hidden ${
            showNavBar ? "max-h-96 " : "max-h-0 md:max-h-96"
          } max-h- transition-all md:min-w-[20rem] md:py-0 gap-2 flex-col justify-center items-center `}
        >
          <ul className="flex md:flex-row w-full gap-2 flex-col pt-6 md:pt-0 justify-center items-center">
            <Link
              to="/home?tab=home"
              onClick={() => {
                setshowNavBar(false);
                scrollToTop();
                handleTabClick("home");
              }}
              className={`${
                tab === "home" ? "text-orange-500" : ""
              } hover:bg-orange-500 md:hover:bg-orange-50/0 dark:text-gray-100 font-semibold md:hover:text-orange-500 w-full text-center py-1 rounded-lg cursor-pointer hover:text-white `}
            >
              Home
            </Link>
            <Link
              to="/about?tab=about"
              onClick={() => {
                setshowNavBar(false);
                scrollToTop();
                handleTabClick("about");
              }}
              className={`${
                tab === "about" ? "text-orange-500" : ""
              } hover:bg-orange-500 md:hover:bg-orange-50/0 dark:text-gray-100 font-semibold md:hover:text-orange-500 w-full text-center py-1 rounded-lg cursor-pointer hover:text-white `}
            >
              A Propos
            </Link>
            <Link
              to="/portfolio?tab=projets"
              onClick={() => {
                setshowNavBar(false);
                scrollToTop();
                handleTabClick("projets");
              }}
              className={`${
                tab === "projets" ? "text-orange-500" : ""
              } hover:bg-orange-500 md:hover:bg-orange-50/0 dark:text-gray-100 font-semibold md:hover:text-orange-500 w-full text-center py-1 rounded-lg cursor-pointer hover:text-white `}
            >
              Mes Projets
            </Link>
          </ul>
          <Link
            to="/reservation?tab=contact"
            onClick={() => {
              setshowNavBar(false);
              scrollToTop();
              handleTabClick("contact");
            }}
            className="border font-semibold mb-6 md:hidden px-4 hover:bg-orange-500 hover:text-white cursor-pointer text-orange-500 border-orange-500 w-full text-center py-1 rounded-lg"
          >
            Rendez-vous
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="hidden md:block"
            onClick={() => dispatch(toggleTheme())} // Permet de basculer entre les thèmes
          >
            {theme === "light" ? (
              <div className="min-w-[1.92rem] min-h-[1.92rem] border cursor-pointer rounded-full flex justify-center items-center">
                <IoSunny className="dark:text-gray-50 text-sm" />
              </div>
            ) : (
              <div className="min-w-[1.92rem] min-h-[1.92rem] border cursor-pointer rounded-full flex justify-center items-center">
                <FaMoon className="dark:text-gray-50 text-sm" />
              </div>
            )}
          </div>
          <Link
            onClick={() => {
              scrollToTop();
              handleTabClick("contact");
            }}
            to="/reservation?tab=contact"
            className="border font-semibold hidden md:block px-4 hover:bg-orange-500 hover:text-white cursor-pointer text-white bg-orange-500 border-orange-500  text-center py-1 rounded-lg"
          >
            Rendez-vous
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
