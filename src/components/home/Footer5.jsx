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
      style={BannerImg}
      className="text-gray-400 w-full  flex justify-center overflow-hidden"
    >
      {/* <div className="container border w-full border-red-500"> */}
      <div
        data-aos="zoom-in"
        className="grid  grid-cols-1 lg:grid-cols-3 pb-[12rem] md:pb-[7rem] pt-5 px-4 md:px-10 w-full"
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
              <a href="#">
                <FaInstagram className="text-3xl" />
              </a>
              <a href="#">
                <FaFacebook className="text-3xl" />
              </a>
              <a href="#">
                <FaLinkedin className="text-3xl" />
              </a>
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
            <div className="border rounded-lg min-h-[6rem] overflow-hidden cursor-pointer">
              <img
                className="w-full-- h-full object-containt cursor-pointern rounded-lg hover:scale-105 transition-all"
                src="/assets/photography.png"
                alt=""
              />
            </div>
            <div className="border rounded-lg min-h-[6rem] overflow-hidden cursor-pointer">
              <img
                className="w-full-- h-full object-containt cursor-pointern rounded-lg hover:scale-105 transition-all"
                src="/assets/nettoyage.png"
                // src="https://raw.githubusercontent.com/PierreAndreLouis/images/main/image_portfolio_my_website/photography_portfolio.jpg"
                alt=""
              />
            </div>
            <div className="border rounded-lg min-h-[6rem] overflow-hidden cursor-pointer">
              <img
                className="w-full-- h-full object-containt cursor-pointern rounded-lg hover:scale-105 transition-all"
                src="/assets/marketing.png"
                // src="https://raw.githubusercontent.com/PierreAndreLouis/images/main/image_portfolio_my_website/photography_portfolio.jpg"
                alt=""
              />
            </div>
            <div className="border rounded-lg min-h-[6rem] overflow-hidden cursor-pointer">
              <img
                className="w-full-- h-full object-containt cursor-pointern rounded-lg hover:scale-105 transition-all"
                src="/assets/coaching.png"
                // src="https://raw.githubusercontent.com/PierreAndreLouis/images/main/image_portfolio_my_website/photography_portfolio.jpg"
                alt=""
              />
            </div>
            <div className="border rounded-lg min-h-[6rem] overflow-hidden cursor-pointer">
              <img
                className="w-full-- h-full object-containt cursor-pointern rounded-lg hover:scale-105 transition-all"
                src="assets/hotel.png"
                // src="https://raw.githubusercontent.com/PierreAndreLouis/images/main/image_portfolio_my_website/photography_portfolio.jpg"
                alt=""
              />
            </div>
            <div className="border rounded-lg min-h-[6rem] overflow-hidden cursor-pointer">
              <img
                className="w-full-- h-full object-containt cursor-pointern rounded-lg hover:scale-105 transition-all"
                src="assets/hotel.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Footer5;
