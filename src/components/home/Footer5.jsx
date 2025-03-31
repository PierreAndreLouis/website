import React from "react";
// import footerLogo from "/assets/logo.png";
import Banner from "/assets/footer-pattern2.jpg";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const FooterLinks = [
  {
    title: "Home",
    link: "/#",
  },
  {
    title: "About",
    link: "/#about",
  },
  {
    title: "Contact",
    link: "/#contact",
  },
  {
    title: "Blog",
    link: "/#blog",
  },
];

// Fonction pour défiler vers le haut
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "auto", // Défilement fluide
    // behavior: "smooth", // Défilement fluide
  });
};

const Footer5 = () => {
  return (
    <div
      // style={BannerImg}
      className="text-gray-400 w-full relative  flex justify-center overflow-hidden"
    >
      <div className="absolute  inset-0 bg-gray-900">
        <div className="w-full relative h-full">
          <img
            className="w-full-- h-[20%] sm:h-[47%] md:h-full absolute bottom-0 left-0 right-0  object-cover object-bottom"
            src="/assets/footer-pattern2.jpg"
            alt=""
          />
        </div>
      </div>
      {/* <div className="container border w-full border-red-500"> */}
      <div
        data-aos="zoom-in"
        className="grid relative grid-cols-1 lg:grid-cols-3 pb-[12rem] md:pb-[7rem] pt-5 px-4 md:px-10 w-full"
      >
        {/* company details */}
        <div className="py-8  w-full px-4">
          <div className="sm:text-3xl  text-white text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
            <img
              src="/assets/profil2.png"
              alt=""
              className=" bg-orange-500 w-[4rem] object-cover max-h-[4rem] rounded-full object-top"
            />
            <p>
              Pierre-<span className="text-orange-500">Andre</span>
            </p>
          </div>
          <p>
            Je suis un développeur web passionné qui aime créer des sites
            modernes et uniques. Mon objectif est de vous aider à donner vie à
            vos idées avec des solutions simples, efficaces et sur mesure.
          </p>
          <div className="px-4--  w-full min-w-64-- md:min-w-0--">
            <div className="flex text-white items-center gap-3 mt-6">
              {/* <a href="#">
                <FaInstagram className="text-3xl" />
              </a>
              <a href="#">
                <FaFacebook className="text-3xl" />
              </a> */}
              <a
                href="www.linkedin.com/in/pierre-andré-louis-3a64a6279"
                target="_blank"
              >
                <FaLinkedin className="text-3xl" />
              </a>
              <p
                onClick={() => {
                  // handleDownload();
                  const link = document.createElement("a");
                  link.href = "public/cv_pierre_andre_louis.pdf"; // Assure-toi que le chemin du fichier PDF est correct
                  link.download = "CV Pierre-Andre LOUIS.pdf"; // Le nom du fichier lors du téléchargement
                  link.click(); // Simule un clic pour télécharger le fichier
                  window.open("public/cv_pierre_andre_louis.pdf", "_blank");
                }} // Remplace "/cv.pdf" par le bon chemin
                className=" px-5 py-1 ml-2  text-sm font-bold  text-orange-400  cursor-pointer rounded-lg border-2 border-orange-300
           bg-orange-400/0 dark:bg-orange-700 dark:text-orange-300"
              >
                Mon CV
              </p>
            </div>
            <div className="mt-6 ">
              <div className="flex items-center gap-3">
                <FaLocationArrow className="text-2xl" />
                <p>La vallee de Jacmel, Haiti</p>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <FaMobileAlt className="text-2xl" />
                <p>(+509) 4673-1710</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="sm:grid flex flex-wrap items-start  grid-cols-2 md:grid-cols-3  sm:flex-- col-span-2 md:pl-10--">
          <div className="sm:w-full">
            <div className="py-8 px-4">
              <h1 className="sm:text-xl text-orange-500 text-xl font-bold sm:text-left text-justify mb-3">
                Liens de navigation
              </h1>
              <ul className="flex flex-col gap-3">
                {/* {FooterLinks.map((link) => ( */}
                <Link
                  onClick={() => {
                    scrollToTop();
                  }}
                  to="/home"
                  className="hover:text-orange-500 cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                  // key={link.title}
                >
                  <span>Acceuil</span>
                </Link>
                <Link
                  onClick={() => {
                    scrollToTop();
                  }}
                  to="/about"
                  className="hover:text-orange-500 cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                  // key={link.title}
                >
                  <span>A Propos de moi</span>
                </Link>
                <Link
                  onClick={() => {
                    scrollToTop();
                  }}
                  to="/portfolio"
                  className="hover:text-orange-500 cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                  // key={link.title}
                >
                  <span>Mes Projets</span>
                </Link>
                <Link
                  onClick={() => {
                    scrollToTop();
                  }}
                  to="/reservation"
                  className="hover:text-orange-500 cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                  // key={link.title}
                >
                  <span>Rendez-vous</span>
                </Link>
                {/* ))} */}
              </ul>
            </div>
          </div>
          <div className="sm:w-full">
            <div className="py-8 px-4">
              <h1 className="sm:text-xl text-orange-500 text-xl font-bold sm:text-left text-justify mb-3">
                Mes services
              </h1>
              <ul className="flex flex-col gap-3">
                {/* {FooterLinks.map((link) => ( */}
                <li
                  className="hover:text-orange-500 cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                  // key={link.title}
                >
                  <span>Developpement Site Web</span>
                </li>
                <li
                  className="hover:text-orange-500 cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                  // key={link.title}
                >
                  <span>Developpement web App</span>
                </li>
                <li
                  className="hover:text-orange-500 cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                  // key={link.title}
                >
                  <span>Creation d'identite visuelle</span>
                </li>
                {/* ))} */}
              </ul>
            </div>
          </div>

          {/* social links */}

          <div className=" grid gap-2 grid-cols-2 w-full  lg:min-w-[18rem]-- pt-10">
            <a
              href="https://pierre-andre-louis-photography.onrender.com/"
              target="_blank"
              className="border rounded-lg min-h-[6rem] overflow-hidden cursor-pointer"
            >
              <img
                className="w-full-- h-full object-ltaint cursor-pointern rounded-lg hover:scale-105 transition-all"
                src="/assets/photography.png"
                alt=""
              />
            </a>
            <a
              href="https://pierre-andre-louis-nettoyage.onrender.com/"
              target="_blank"
              className="border rounded-lg min-h-[6rem] overflow-hidden cursor-pointer"
            >
              <img
                className="w-full-- h-full object-containt cursor-pointern rounded-lg hover:scale-105 transition-all"
                src="/assets/nettoyage.png"
                // src="https://raw.githubusercontent.com/PierreAndreLouis/images/main/image_portfolio_my_website/photography_portfolio.jpg"
                alt=""
              />
            </a>
            <a
              href="https://pierre-andre-louis-marketing.onrender.com/"
              target="_blank"
              className="border rounded-lg min-h-[6rem] overflow-hidden cursor-pointer"
            >
              <img
                className="w-full-- h-full object-containt cursor-pointern rounded-lg hover:scale-105 transition-all"
                src="/assets/marketing.png"
                // src="https://raw.githubusercontent.com/PierreAndreLouis/images/main/image_portfolio_my_website/photography_portfolio.jpg"
                alt=""
              />
            </a>
            <a
              href="https://pierre-andre-louis-coaching.onrender.com/"
              target="_blank"
              className="border rounded-lg min-h-[6rem] overflow-hidden cursor-pointer"
            >
              <img
                className="w-full-- h-full object-containt cursor-pointern rounded-lg hover:scale-105 transition-all"
                src="/assets/coaching.png"
                // src="https://raw.githubusercontent.com/PierreAndreLouis/images/main/image_portfolio_my_website/photography_portfolio.jpg"
                alt=""
              />
            </a>
            <a
              href="https://pierre-andre-louis-photography.onrender.com/"
              target="_blank"
              className="border rounded-lg min-h-[6rem] overflow-hidden cursor-pointer"
            >
              <img
                className="w-full-- h-full object-containt cursor-pointern rounded-lg hover:scale-105 transition-all"
                src="/assets/photography.png"
                alt=""
              />
            </a>
            <a
              href="https://louispierre-andre.github.io/movie-trailer/"
              target="_blank"
              className="border rounded-lg min-h-[6rem] overflow-hidden cursor-pointer"
            >
              <img
                className="w-full-- h-full object-containt cursor-pointern rounded-lg hover:scale-105 transition-all"
                src="https://raw.githubusercontent.com/PierreAndreLouis/images/main/image_portfolio_my_website/movieApp.png"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Footer5;
