import React from "react";
import { Link } from "react-router-dom";

export default function CTA12() {
  // Fonction pour défiler vers le haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto", // Défilement fluide
      // behavior: "smooth", // Défilement fluide
    });
  };
  return (
    <div
      style={{
        backgroundImage: "url(/assets/partenaire.png)",
        backgroundPosition: "center",
      }}
      className="object-center   relative py-[15rem] bg-fixed bg-cover bg-center"
    >
      <div
        className="absolute inset-0 z-[2]"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.80)" }}
      ></div>

      <div
        className="flex flex-col px-2 md:px-10 
           justify-center items-center absolute inset-0 z-[3]"
      >
        <h1 className="text-white text-3xl  sm:text-3xl text-center font-bold lg:text-4xl max-w-4xl leading-10">
          Tu as un projet en tête ?{" "}
          <span className="text-orange-500">
            {" "}
            Je suis là pour le réaliser avec toi !{" "}
          </span>
        </h1>
        <p className="text-center text-gray-100 mt-10 text-lg leading-6 lg:text-md max-w-3xl">
          Contacte-moi dès maintenant pour discuter de tes idées et créer
          ensemble un site web à la hauteur de tes attentes.
        </p>
        <Link
          onClick={() => {
            scrollToTop();
          }}
          to="/reservation"
          className="border border-orange-500 text-orange-500 rounded-md mt-12 p-3 px-8 font-bold text-md"
        >
          Contactez-moi{" "}
        </Link>
      </div>
    </div>
  );
}
