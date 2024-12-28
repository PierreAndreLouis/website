import React from "react";
import { Link } from "react-router-dom";

const CTA1 = () => {
  // Fonction pour défiler vers le haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto", // Défilement fluide
      // behavior: "smooth", // Défilement fluide
    });
  };
  return (
    <div className="bg-white dark:bg-gray-900 relative py-20 pb-40">
      <div
        aria-hidden="true"
        className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-orange-500 to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        <div className="relative">
          <div className="flex items-center justify-center -space-x-2">
            <img
              loading="lazy"
              width="400"
              height="400"
              src="/assets/img1.jpg"
              alt="Photo de membre"
              className="h-8 w-8 rounded-full object-cover"
            />
            <img
              loading="lazy"
              width="200"
              height="200"
              src="/assets/img2.jpg"
              alt="Photo de membre"
              className="h-12 w-12 rounded-full object-cover"
            />
            <img
              loading="lazy"
              width="200"
              height="200"
              src="/assets/paolo.jpg"
              alt="Photo de membre"
              className="z-10 h-16 w-16 rounded-full object-cover"
            />
            <img
              loading="lazy"
              width="200"
              height="200"
              src="/assets/img4.jpg"
              alt="Photo de membre"
              className="relative h-12 w-12 rounded-full object-cover"
            />
            <img
              loading="lazy"
              width="200"
              height="200"
              src="/assets/img5.jpg"
              alt="Photo de membre"
              className="h-8 w-8 rounded-full object-cover"
            />
          </div>

          <div className="mt-6 m-auto space-y-6 md:w-8/12 lg:w-7/12">
            <h1 className="text-center text-4xl font-bold text-gray-800 dark:text-white md:text-5xl">
              Commence dès maintenant
            </h1>
            <p className="text-center text-xl text-gray-600 dark:text-gray-300">
              Contacte-moi dès maintenant pour discuter de tes idées et créer
              ensemble un site web à la hauteur de tes attentes.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                onClick={() => {
                  scrollToTop();
                }}
                to="/reservation"
                className="relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:bg-orange-500 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
              >
                <span className="relative text-base font-semibold text-white dark:text-dark">
                  Commence maintenant
                </span>
              </Link>
              {/* <a
                href="#"
                className="relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-orange-500/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
              >
                <span className="relative text-base font-semibold text-orange-500 dark:text-white">
                  En savoir plus
                </span>
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA1;
