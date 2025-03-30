import React from "react";
import { Link } from "react-router-dom";

/**
 * Section Hero de la page d'accueil
 * Affiche une image avec un texte d'accroche et des boutons d'action.
 */
export const Hero19 = () => {
  // Fonction pour défiler vers le haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto", // Défilement fluide
      // behavior: "smooth", // Défilement fluide
    });
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "public/CV Pierre-Andre LOUIS.pdf"; // Assure-toi que le chemin du fichier PDF est correct
    link.download = "CV Pierre-Andre LOUIS.pdf"; // Le nom du fichier lors du téléchargement
    link.click(); // Simule un clic pour télécharger le fichier
  };
  return (
    <div className="relative pt-32 flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0 bg-orange-50 dark:bg-gray-900">
      {/* Image en arrière-plan avec un effet SVG */}
      <div className="inset-y-0 top-0 right-0 z-0 w-full sm:max-w-[90vw] px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
        <svg
          className="absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block dark:text-gray-800"
          viewBox="0 0 100 100"
          fill="currentColor"
          preserveAspectRatio="none slice"
        >
          <path d="M50 0H100L50 100H0L50 0Z" />
        </svg>
        <img
          className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
          src="/assets/hero1.jpeg"
          // src="https://www.tiz.fr/app/uploads/2022/06/role-developpeur-web-promotion-entreprise-1920x1280.jpeg"
          // src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
          alt="Coaching professionnel"
        />
      </div>

      {/* Contenu textuel et boutons */}
      <div className="relative flex flex-col items-start w-full sm:max-w-[90vw] px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
        <div className="mb-16 lg:my-36  lg:max-w-2xl lg:pr-5">
          {/* <div className="mb-16 lg:my-36-- lg:flex lg:flex-col lg:justify-center lg:min-h-screen lg:max-w-2xl lg:pr-5"> */}

          {/* Étiquette de marque */}
          <p className="inline-block px-5 py-2 mb-4 text-sm font-bold tracking-wider text-black uppercase rounded-lg bg-orange-400 dark:bg-orange-700 dark:text-orange-300">
            Developpeur de site web
          </p>
          <p
            onClick={
              () => handleDownload()
              // window.open("public/CV Pierre-Andre LOUIS.pdf", "_blank")
            } // Remplace "/cv.pdf" par le bon chemin
            className="inline-block px-5 py-1.5 mb-4 text-sm font-bold tracking-wider text-black  cursor-pointer rounded-lg ml-3 border-2 border-orange-300
           bg-orange-400/0 dark:bg-orange-700 dark:text-orange-300"
          >
            Mon CV
          </p>

          {/* Titre principal */}
          <h2 className="mb-5 text-3xl xs:text-4xl max-w-[45rem] leading-10 lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-none">
            {/* Je transforme vos idées en sites web */}
            Je crée ton site web sur mesure,
            <span className="text-orange-500">
              {" "}
              optimisé pour tes objectifs.{" "}
            </span>
          </h2>

          {/* Description */}
          <p className="pr-5 max-w-xl mb-5 text-lg text-gray-700 dark:text-gray-300 md:text-xl">
            Un design unique, une performance optimisée, une expérience fluide
            pour tes visiteurs.
            {/* Je t'aide à créer un site web personnalisé, pensé pour répondre à
            tes besoins spécifiques et atteindre tes objectifs. */}
            {/* Vous voulez offrir à vos gestionnaires ou à vos employés les
            meilleures conditions pour se développer, résoudre des défis
            complexes et contribuer au succès de votre organisation ? */}
          </p>

          {/* Boutons d'action */}
          <div className="grid gap-3 xs:flex items-center">
            <Link
              onClick={() => {
                scrollToTop();
              }}
              to="/reservation"
              className="inline-flex text-lg rounded-lg items-center justify-center h-12 px-6 bg-orange-500 font-medium tracking-wide text-white transition duration-200 shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none dark:bg-orange-700 dark:text-gray-100 dark:hover:bg-orange-800"
            >
              Prends rendez-vous{" "}
            </Link>
            <Link
              onClick={() => {
                scrollToTop();
              }}
              to="/portfolio"
              aria-label="En savoir plus"
              className="inline-flex rounded-lg text-lg text-center justify-center items-center border-2 border-orange-400 h-12 px-6 font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700 dark:border-orange-600 dark:text-gray-300 dark:hover:text-deep-purple-accent-400"
            >
              Mes réalisations{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero19;
