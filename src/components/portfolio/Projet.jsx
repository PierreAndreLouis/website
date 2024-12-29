import React from "react";

function Projet() {
  return (
    <div className="min-h-screen w-full">
      <div className="bg-orange-50 dark:bg-gray-900 px-4 md:px-8 py-20 pb-52">
        <div id="features" className="mx-auto max-w-6xl ">
          <p className="text-center text-xl font-semibold leading-7 text-primary-500 dark:text-orange-500 ">
            Mes Projets Personnels
          </p>
          <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-orange-400 dark:text-slate-100 md:text-4xl">
            Mes dernières réalisations
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 ">
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
                  src="/assets/photography.png"
                  // src="https://blog.neocamino.com/wp-content/uploads/2013/08/site-internet.jpg"
                  alt="Création de sites web sur mesure"
                />
              </div>
              <div>
                <h3 className="my-3 text-center font-bold text-xl font-display  text-slate-900 dark:text-slate-200">
                  Service de photographie
                </h3>
                {/* <p className="mt-1.5 text-center text-md text-slate-600 leading-6 text-secondary-500  dark:text-gray-300">
                  Je conçois des sites web uniques et adaptés à vos besoins, en
                  tenant compte de votre identité, de vos objectifs et de
                  l'expérience utilisateur pour offrir un site performant et
                  attrayant.
                </p> */}
                <div className="flex justify-center ">
                  <a
                    href="https://pierre-andre-louis-photography.onrender.com/"
                    target="_blank"
                    className="py-1 px-4 mx-auto max-w-[10rem] w-full mt-4-- rounded-lg text-center bg-orange-500 text-white"
                  >
                    Visiter
                  </a>
                </div>
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
                  src="/assets/nettoyage.png"
                  alt="Création de sites web sur mesure"
                />
              </div>
              <div>
                <h3 className="my-3 text-center font-bold text-xl font-display  text-slate-900 dark:text-slate-200">
                  Service de nettoyage
                </h3>
                {/* <p className="mt-1.5 text-center text-md text-slate-600 leading-6 text-secondary-500  dark:text-gray-300">
                  Je conçois des sites web uniques et adaptés à vos besoins, en
                  tenant compte de votre identité, de vos objectifs et de
                  l'expérience utilisateur pour offrir un site performant et
                  attrayant.
                </p> */}
                <div className="flex justify-center ">
                  <a
                    href="https://pierre-andre-louis-nettoyage.onrender.com/"
                    target="_blank"
                    className="py-1 px-4 mx-auto max-w-[10rem] w-full mt-4-- rounded-lg text-center bg-orange-500 text-white"
                  >
                    Visiter
                  </a>
                </div>
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
                  src="/assets/marketing.png"
                  alt="Création de sites web sur mesure"
                />
              </div>
              <div>
                <h3 className="my-3 text-center font-bold text-xl font-display  text-slate-900 dark:text-slate-200">
                  Service de marketing
                </h3>
                {/* <p className="mt-1.5 text-center text-md text-slate-600 leading-6 text-secondary-500  dark:text-gray-300">
                  Je conçois des sites web uniques et adaptés à vos besoins, en
                  tenant compte de votre identité, de vos objectifs et de
                  l'expérience utilisateur pour offrir un site performant et
                  attrayant.
                </p> */}
                <div className="flex justify-center ">
                  <a
                    href="https://pierre-andre-louis-marketing.onrender.com/"
                    target="_blank"
                    className="py-1 px-4 mx-auto max-w-[10rem] w-full mt-4-- rounded-lg text-center bg-orange-500 text-white"
                  >
                    Visiter
                  </a>
                </div>
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
                  src="/assets/coaching.png"
                  alt="Création de sites web sur mesure"
                />
              </div>
              <div>
                <h3 className="my-3 text-center font-bold text-xl font-display  text-slate-900 dark:text-slate-200">
                  Service de coaching
                </h3>
                {/* <p className="mt-1.5 text-center text-md text-slate-600 leading-6 text-secondary-500  dark:text-gray-300">
                  Je conçois des sites web uniques et adaptés à vos besoins, en
                  tenant compte de votre identité, de vos objectifs et de
                  l'expérience utilisateur pour offrir un site performant et
                  attrayant.
                </p> */}
                <div className="flex justify-center ">
                  <a
                    href="https://pierre-andre-louis-coaching.onrender.com/"
                    target="_blank"
                    className="py-1 px-4 mx-auto max-w-[10rem] w-full mt-4-- rounded-lg text-center bg-orange-500 text-white"
                  >
                    Visiter
                  </a>
                </div>
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
            {/* <div className="bg-white/70 shadow-lg dark:bg-slate-800 rounded-xl p-4">
              <div className="w-full md:h-52 lg:h-auto-- md:min-h-52 bg-gray-600 rounded-md overflow-hidden object-cover">
                <img
                  className="object-cover object-top-- w-full h-full border-"
                  src="assets/hotel.png"
                  alt="Création de sites web sur mesure"
                />
              </div>
              <div>
                <h3 className="my-3 text-center font-bold text-xl font-display  text-slate-900 dark:text-slate-200">
                  Service de réservation d'hôtel
                </h3>
               
                <div className="flex justify-center ">
                  <a
                    href="#"
                    target="_blank"
                    className="py-1 px-4 mx-auto max-w-[10rem] w-full mt-4-- rounded-lg text-center bg-orange-500 text-white"
                  >
                    Visiter
                  </a>
                </div>
              </div>
            </div> */}
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
                  src="https://raw.githubusercontent.com/PierreAndreLouis/images/main/image_portfolio_my_website/movieApp.png"
                  alt="Création de sites web sur mesure"
                />
              </div>
              <div>
                <h3 className="my-3 text-center font-bold text-xl font-display  text-slate-900 dark:text-slate-200">
                  Bande annonce film
                </h3>
                {/* <p className="mt-1.5 text-center text-md text-slate-600 leading-6 text-secondary-500  dark:text-gray-300">
                  Je conçois des sites web uniques et adaptés à vos besoins, en
                  tenant compte de votre identité, de vos objectifs et de
                  l'expérience utilisateur pour offrir un site performant et
                  attrayant.
                </p> */}
                <div className="flex justify-center ">
                  <a
                    href="https://louispierre-andre.github.io/movie-trailer/"
                    target="_blank"
                    className="py-1 px-4 mx-auto max-w-[10rem] w-full mt-4-- rounded-lg text-center bg-orange-500 text-white"
                  >
                    Visiter
                  </a>
                </div>
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

            {/* ))} */}
          </div>
          {/* <div className='w-full flex justify-center'>
          <button className='mt-10 mx-auto border bg-orange-100 border-orange-800 font-semibold py-2 px-10 rounded-xl text-slate-700'>Plus der service</button>
        </div> */}
        </div>
      </div>
    </div>
  );
}

export default Projet;
