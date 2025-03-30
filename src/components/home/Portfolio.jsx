import React from "react";

function Portfolio() {
  return (
    <div className=" bg-orange-500">
      <div className="py-20 md:max-w-[90vw] px-4 mx-auto">
        <p className="text-center text-lg font-semibold">Mes Projets</p>
        <h1 className="text-center text-3xl font-bold text-gray-50">
          Mes Dernière Réalisation de Projet
        </h1>
        <div className="grid items-center-- gap-4 justify-center grid-cols-1 md:grid-cols-2  mt-10">
          <a
            href="https://pierre-andre-louis-photography.onrender.com/"
            target="_blank"
            className="border-[.4rem] min-h-[14rem]-- shadow-lg overflow-hidden cursor-pointer shadow-black/70 flex flex-col --md:grid md:grid-rows-2 border-white rounded-2xl"
          >
            <div>
              <img
                className="object-cover w-full h-full hover:scale-105 transition-all"
                src="/assets/photography.png"
                alt="portfolio"
              />
            </div>
            <p className="bg-sky-700 flex justify-center py-5 h-full px-3 text-center items-center text-white font-bold border-t-[.4rem]--- border-white md:text-[1.7rem]">
              Service de photographie
            </p>
          </a>
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          {/*  */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/*  */}
            <a
              href="https://octagono-plus-gps.onrender.com/"
              target="_blank"
              // href="https://louispierre-andre.github.io/movie-trailer/"

              // target="_blank"
              className="border-[.4rem] min-h-[14rem]-- shadow-lg overflow-hidden cursor-pointer shadow-black/70 flex flex-col --md:grid md:grid-rows-2  border-white rounded-2xl"
            >
              <div>
                <img
                  className="object-cover w-full h-full hover:scale-105 transition-all"
                  src="public/assets/octagonoplusHome.png"
                  // src="https://raw.githubusercontent.com/PierreAndreLouis/images/main/image_portfolio_my_website/movieApp.png"
                  // src="https://raw.githubusercontent.com/PierreAndreLouis/images/main/image_portfolio_my_website/photography_portfolio.jpg"
                  alt="portfolio"
                />
              </div>
              <p className="bg-orange-700 flex justify-center py-5 h-full px-3 text-center items-center text-white font-bold border-t-[.4rem]--- border-white">
                Service de suivi de véhicule
              </p>
            </a>
            {/*  */}
            {/*  */}
            {/*  */}

            <a
              href="https://pierre-andre-louis-nettoyage.onrender.com/"
              target="_blank"
              className="border-[.4rem] min-h-[14rem]-- shadow-lg overflow-hidden cursor-pointer shadow-black/70 flex flex-col --md:grid md:grid-rows-2  border-white rounded-2xl"
            >
              <div>
                <img
                  className="object-cover w-full h-full hover:scale-105 transition-all"
                  src="/assets/nettoyage.png"
                  alt="portfolio"
                />
              </div>
              <p className="bg-yellow-600 flex justify-center py-5 h-full px-3 text-center items-center text-white font-bold border-t-[.4rem]--- border-white">
                Service de nettoyage
              </p>
            </a>
            {/*  */}
            {/*  */}
            {/*  */}
            {/*  */}
            <a
              href="https://pierre-andre-louis-marketing.onrender.com/"
              target="_blank"
              className="border-[.4rem] min-h-[14rem]-- shadow-lg overflow-hidden cursor-pointer shadow-black/70 flex flex-col --md:grid md:grid-rows-2  border-white rounded-2xl"
            >
              <div>
                <img
                  className="object-cover w-full h-full hover:scale-105 transition-all"
                  src="/assets/marketing.png"
                  // src="https://raw.githubusercontent.com/PierreAndreLouis/images/main/image_portfolio_my_website/photography_portfolio.jpg"
                  alt="portfolio"
                />
              </div>
              <p className="bg-purple-900 flex justify-center py-5 h-full px-3 text-center items-center text-white font-bold border-t-[.4rem]--- border-white">
                Service de marketing
              </p>
            </a>
            {/*  */}
            {/*  */}
            {/*  */}
            {/*  */}
            <a
              href="https://pierre-andre-louis-coaching.onrender.com/"
              target="_blank"
              className="border-[.4rem] min-h-[14rem]-- shadow-lg overflow-hidden cursor-pointer shadow-black/70 flex flex-col --md:grid md:grid-rows-2  border-white rounded-2xl"
            >
              <div>
                <img
                  className="object-cover w-full h-full hover:scale-105 transition-all"
                  src="/assets/coaching.png"
                  // src="https://raw.githubusercontent.com/PierreAndreLouis/images/main/image_portfolio_my_website/photography_portfolio.jpg"
                  alt="portfolio"
                />
              </div>
              <p className="bg-sky-800 flex justify-center py-5 h-full px-3 text-center items-center text-white font-bold border-t-[.4rem]--- border-white">
                Service de coaching
              </p>
            </a>
            {/*  */}
            {/*  */}
            {/*  */}
            {/*  */}
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
