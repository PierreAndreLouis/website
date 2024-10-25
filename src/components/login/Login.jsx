import React, {useContext, useState } from "react";
import Flag from "react-world-flags";
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataContext.jsx";

function Login({ setShowLogin }) {
  const [selectedLang, setSelectedLang] = useState("en");
  const [isOpen, setIsOpen] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const { handleLogin, userData, error } = useContext(DataContext);


  const languages = [
    { code: "en", name: "English", countryCode: "GB" },
    { code: "fr", name: "Français", countryCode: "FR" },
    { code: "es", name: "Español", countryCode: "ES" },
  ];

  const handleChangeLanguage = (lang) => {
    setSelectedLang(lang.code);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-12 lg:px-8">
        <div className="flex justify-end">
          <div className="relative inline-block text-left mt-4 mb-12 md:mb-0">
            <div>
              <button
                type="button"
                onClick={toggleMenu}
                className="inline-flex justify-between w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <div className="flex items-center space-x-2">
                  <Flag
                    code={languages.find((lang) => lang.code === selectedLang).countryCode}
                    className="w-6 h-4"
                  />
                  <span>{languages.find((lang) => lang.code === selectedLang).name}</span>
                </div>
                <svg className="w-5 h-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  />
                </svg>
              </button>
            </div>

            {isOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-full rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleChangeLanguage(lang)}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Flag code={lang.countryCode} className="w-6 h-4" />
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Your Company" src="/img/cars/logo.png" className="mx-auto h-20 w-auto" />
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Bienvenue à Octagono Plus
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} 
          className="space-y-4">
            <div>
              <label htmlFor="account" className="block text-sm font-medium leading-6 text-gray-900">
                Compte
              </label>
              <div className="mt-2">
                <input
                  id="account"
                  name="account"
                  type="text"
                  placeholder="nom du compte"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                />
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Nom d'utilisateur
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="nom"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Mot de passe
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Se souvenir de moi
              </label>
            </div>
            {/* {error && <p style={{ color: 'red' }}>Informations de connection incorrect</p>} */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Se connecter
              </button>
            </div>
          </form>

          {changePassword && (
            <div className="fixed flex w-full bg-white justify-center left-0 right-0 top-0 h-full">
              <div className="h-full w-full flex justify-center pb-3">
                <div className="bg-white max-w-[30rem] w-full shadow-lg overflow-auto">
                  <div className="flex justify-center items-center w-full py-2 pt-10 mb-10">
                    <RiLockPasswordFill className="text-2xl mr-2 text-blue-500" />
                    <h3 className="text-center font-semibold text-gray-600 text-xl">
                      Changer de mot de passe
                    </h3>
                  </div>
                  <form action="#" method="POST" className="space-y-4 px-4 pb-4">
                    <div>
                      <label
                        htmlFor="new-password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Nouveau mot de passe
                      </label>
                      <div className="mt-2">
                        <input
                          id="new-password"
                          name="new-password"
                          type="password"
                          placeholder="Nouveau mot de passe"
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="confirm-password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Confirmer le mot de passe
                      </label>
                      <div className="mt-2">
                        <input
                          id="confirm-password"
                          name="confirm-password"
                          type="password"
                          placeholder="Confirmer le mot de passe"
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg"
                      >
                        Confirmer
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          <div className="mt-10 text-center text-sm text-gray-500">
            <Link
              to="#"
              onClick={() => setChangePassword(true)}
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Mot de passe oublié ?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
