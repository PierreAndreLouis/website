import React from "react";

const features = [
  {
    id: 4,
    imgSrc: "/assets/webdev.jpg",
    title: "je Cré ton sites web sur mesure",
    description:
      "Je conçois des sites web uniques et adaptés à vos besoins, en tenant compte de votre identité, de vos objectifs et de l'expérience utilisateur pour offrir un site performant et attrayant.",
    link: "/pricing",
  },
  {
    id: 5,
    imgSrc: "/assets/developpement app.jpeg",
    title: "je  Développe ton applications web personnalisées",
    description:
      "Je développe des applications web sur mesure, conçues pour répondre aux besoins spécifiques de votre entreprise, avec une interface intuitive et des fonctionnalités adaptées à vos processus et objectifs.",
    link: "/templates",
  },
  {
    id: 6,
    imgSrc: "/assets/creation d'identite visuel.webp",
    title: "je Cré ton identité visuelle",
    description:
      "Je crée des designs originaux qui reflètent votre image de marque, en développant des logos, des palettes de couleurs et des éléments graphiques qui distinguent votre entreprise et captivent votre public.",
    link: "/download",
  },
];

const Service1 = () => {
  return (
    <div className="bg-orange-50 dark:bg-gray-900 px-4 md:px-8 py-20">
      <div id="features" className="mx-auto max-w-6xl ">
        <p className="text-center text-xl font-semibold leading-7 text-primary-500 dark:text-orange-500 ">
          Mes services
        </p>
        <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-orange-400 dark:text-slate-100 md:text-4xl">
          Ce que je t'offre pour réussir en ligne.
        </h2>
        <div className="grid md:grid-cols-2- lg:grid-cols-3-- gap-4 mt-10 ------------ md:grid-cols-2 md:grid-rows-1 ------- lg:grid-cols-3 lg:grid-rows-5--">
          {/* {features.map((feature) => ( */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          <div className="bg-white/70 shadow-lg dark:bg-slate-800 rounded-xl p-4">
            <div className="w-full md:h-52 lg:h-auto-- md:min-h-52 bg-gray-600 rounded-md overflow-hidden object-cover">
              <img
                className="object-cover object-top-- w-full h-full border-"
                src="/assets/webdev.jpg"
                alt="Création de sites web sur mesure"
              />
            </div>
            <div>
              <h3 className="my-3 text-center font-bold text-xl font-display  text-slate-900 dark:text-slate-200">
                Je crée ton site web sur mesure.
              </h3>
              <p className="mt-1.5 text-center text-md text-slate-600 leading-6 text-secondary-500  dark:text-gray-300">
                Je conçois des sites web uniques et adaptés à tes besoins, en
                tenant compte de ton identité, de tes objectifs et de
                l'expérience utilisateur, pour offrir un site performant et
                attrayant.
              </p>
            </div>
          </div>
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          <div className="bg-white/70 shadow-lg dark:bg-slate-800 rounded-xl p-4">
            <div className="w-full md:h-52 lg:h-auto-- md:min-h-52 bg-gray-600 rounded-md overflow-hidden object-cover">
              <img
                className="object-cover object-top-- w-full h-full border-"
                src="/assets/developpement app.jpeg"
                alt="Développement des applications web personnalisées"
              />
            </div>
            <div>
              <h3 className="my-3 text-center font-bold text-xl font-display  text-slate-900 dark:text-slate-200">
                Je développe tes applications web personnalisées.
              </h3>
              <p className="mt-1.5 text-center text-md text-slate-600 leading-6 text-secondary-500  dark:text-gray-300">
                Je développe des applications web sur mesure, conçues pour
                répondre aux besoins spécifiques de ton entreprise, avec une
                interface intuitive et des fonctionnalités adaptées à tes
                processus et objectifs.
              </p>
            </div>
          </div>
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          <div className="bg-white/70 shadow-lg dark:bg-slate-800 rounded-xl p-4 --------- md:items-center lg:gap-0 md:grid-- md:gap-6 lg:flex lg:flex-col md:grid md:grid-cols-2 md:col-span-2 md:row-start-2 lg:col-span-1 lg:row-start-1 lg:col-start-3">
            <div className="w-full md:h-52 lg:h-auto-- md:min-h-52 bg-gray-600 rounded-md overflow-hidden object-cover">
              <img
                className="object-cover md:object-cover lg:object-cover object-top-- w-full h-full border-"
                src="/assets/creation d'identite visuel.webp"
                alt="Création d'identité visuelle"
              />
            </div>
            <div>
              <h3 className="my-3 text-center font-bold text-xl font-display  text-slate-900 dark:text-slate-200">
                Je crée ton identité visuelle.
              </h3>
              <p className="mt-1.5 text-center text-md text-slate-600 leading-6 text-secondary-500  dark:text-gray-300">
                Je crée des designs originaux qui reflètent ton image de marque,
                en développant des logos, des palettes de couleurs et des
                éléments graphiques qui distinguent ton entreprise et captivent
                ton public.
              </p>
            </div>
          </div>
          {/* ))} */}
        </div>
        {/* <div className='w-full flex justify-center'>
          <button className='mt-10 mx-auto border bg-orange-100 border-orange-800 font-semibold py-2 px-10 rounded-xl text-slate-700'>Plus der service</button>
        </div> */}
      </div>
    </div>
  );
};

export default Service1;
