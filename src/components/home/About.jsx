import React from "react";
import { TiInputChecked } from "react-icons/ti";
import { MdCall } from "react-icons/md";
import { RiEmotionHappyLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function About() {
  // Fonction pour défiler vers le haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "auto", // Défilement fluide
      // behavior: "smooth", // Défilement fluide
    });
  };
  return (
    <div className=" px-4 md:px-12 py-20  bg-white dark:bg-gray-800">
      <div className="md:w-[50rem]-- lg:w-full flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto ">
        <div className="sm:hidden lg:block roudelm   bg-orange-500 max-w-[25rem] max-h-[25rem]  overflow-hidden mx-auto borer ">
          <div className="bg-gray-950 rounded-tl-[10rem] rounded-br-[10rem]  max-h-[25rem] overflow-hidden border-2 border-red-500">
            <img
              className=" translate-x-4--- rounded-tl-[10rem] rounded-br-[10rem] h-full-- object-cover"
              src="/assets/profil2.png"
              alt=""
            />
          </div>
        </div>
        <div className=" lg:pt-0 pt-4 ">
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          <div className=" flex items-center-- justify-center gap-4 h-full--">
            <div className="">
              <div className="min-w-[15rem]  hidden sm:block lg:hidden bg-orange-500 h-full--">
                <div className="bg-gray-950 relative rounded-tl-[5rem] rounded-br-[5rem] overflow-hidden h-full-- border border-orange-500">
                  <img
                    className="w-[14rem]  w-[100%]-- md:h-[15rem] object-top  translate-x-4--  object-cover"
                    // className="absolute top-0 left-0"
                    src="/assets/profil2.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="">
              <h3 className="font-semibold text-orange-400 text-lg mt-0 pt-0">
                À propos de moi
              </h3>
              <h1 className="text-slate-700 text-3xl sm:text-lg lg:text-3xl font-bold dark:text-gray-300">
                Travailler avec moi, c’est avancer ensemble vers ton succès en
                ligne.
              </h1>
              <p className="text-gray-600 mt-3 dark:text-gray-400">
                Je suis un développeur web passionné qui aime créer des sites
                modernes et uniques. Mon objectif est de t’aider à donner vie à
                tes idées avec des solutions simples, efficaces et sur mesure.
              </p>
              <div className="mt-6 flex flex-wrap md:flex-nowrap gap-4 lg:gap-5   md:grid-cols-2 md:gap-2">
                <div className="flex gap-2 ">
                  <div className="min-w-10 flex justify-center items-center h-10 bg-orange-400 rounded-full">
                    <MdCall className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-bold dark:text-gray-200 text-slate-700">
                      Prêt à être appelé 24h /24
                    </h4>
                    <p className="dark:text-gray-400"> Toujours joignable.</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="min-w-10 flex justify-center items-center h-10 bg-orange-400 rounded-full">
                    <RiEmotionHappyLine className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="font-bold dark:text-gray-200 text-slate-700">
                      Garantie de satisfaction
                    </h4>
                    <p className="dark:text-gray-400"> Toujours content.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          <div className="mt-6 grid  items-center md:grid-cols-2 gap-5">
            <div className="bg-orange-500 text-black font-semibold-- p-4 text-xl font-bold rounded-xl">
              <h3 className="mb-4">On démarre ensemble dès aujourd’hui ? </h3>
              <Link
                onClick={() => {
                  scrollToTop();
                }}
                to="/reservation"
                className="py-2 px-4 text-lg bg-gray-800 text-white rounded-lg"
              >
                Prendre rendez-vous
              </Link>
            </div>
            <div className="mt-6--  text-gray-600 dark:text-gray-300 ">
              <p className="mb-3 font-bold">Pourquoi me choisir ?</p>
              <ul>
                <li className="flex gap-2 items-center">
                  <TiInputChecked className="text-xl text-slate-800 dark:text-slate-500" />
                  Respect des délais
                </li>
                <li className="flex gap-2 items-center">
                  <TiInputChecked className="text-xl text-slate-800 dark:text-slate-500" />
                  Accompagnement continu
                </li>
                <li className="flex gap-2 items-center">
                  <TiInputChecked className="text-xl text-slate-800 dark:text-slate-500" />
                  Révisions illimitées
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
