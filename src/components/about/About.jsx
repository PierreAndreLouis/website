import React from "react";

export default function About() {
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-7xl px-5 py-12 md:px-10 md:py-16 lg:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
            <div className="flex flex-col gap-6 lg:w-3/5">
              <div className="flex ">
                <div className=" bg-orange-500 mr-6 overflow-hidden hidden md:block lg:hidden rounded-lg min-w-[15rem]">
                  <img
                    src="/assets/profil2.png"
                    className="w-full h-full max-h-[16rem] object-cover object-top"
                    alt=""
                  />
                </div>
                <div className="flex  flex-col gap-6 lg:w-3/5--">
                  <h2 className="mb-0 text-3xl font-bold md:text-5xl dark:text-white">
                    À propos de moi
                  </h2>
                  <p className="text-sm sm:text-base dark:text-gray-300">
                    Travailler avec moi, c’est avancer ensemble vers ton succès
                    en ligne. Je suis un développeur web passionné qui aime
                    créer des sites modernes et uniques. Mon objectif est de
                    t’aider à donner vie à tes idées avec des solutions simples,
                    efficaces et sur mesure.
                  </p>
                  <div className="flex   gap-4 items-center ">
                    {" "}
                    <a
                      href="#"
                      className="max-w-52 rounded-md bg-orange-500 px-3 py-2 text-center font-semibold text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      Contactez-moi
                    </a>
                    <p
                      onClick={() => {
                        // handleDownload();
                        const link = document.createElement("a");
                        link.href = "public/cv_pierre_andre_louis.pdf"; // Assure-toi que le chemin du fichier PDF est correct
                        link.download = "CV Pierre-Andre LOUIS.pdf"; // Le nom du fichier lors du téléchargement
                        link.click(); // Simule un clic pour télécharger le fichier
                        window.open(
                          "public/cv_pierre_andre_louis.pdf",
                          "_blank"
                        );
                      }} // Remplace "/cv.pdf" par le bon chemin
                      className=" px-5 py-2  text-sm font-bold  text-black  cursor-pointer rounded-lg border-2 border-orange-300
           bg-orange-400/0 dark:bg-orange-700 dark:text-orange-300"
                    >
                      Mon CV
                    </p>
                  </div>
                </div>
              </div>
              <div className="my-8 h-px w-full bg-black dark:bg-gray-600"></div>
              <div className="grid gap-8 md:grid-cols-2 md:gap-4">
                <div className="flex flex-col gap-4 rounded-md border border-solid bg-gray-100 dark:bg-gray-800 dark:border-gray-700 p-6 md:p-4">
                  <p className="text-sm dark:text-gray-300">
                    Travailler avec Pierre-Ander a été une expérience incroyable
                    ! Il a su écouter mes besoins et créer un site web qui
                    reflète parfaitement mon entreprise. Je recommande vivement
                    ses services à quiconque cherche à créer un site web unique
                    et performant.
                  </p>
                  <div className="flex items-center gap-2 sm:gap-x-4">
                    <div className="flex items-center gap-x-2">
                      <img
                        src="/assets/paolo.jpg"
                        alt="Témoignage"
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <p className="text-sm font-semibold sm:text-base dark:text-gray-100">
                        Andre Paul LOUIS
                      </p>
                    </div>
                    <div className="h-5 w-px bg-gray-300 dark:bg-gray-600"></div>
                    <div className="flex items-center gap-x-2">
                      <p className="text-sm font-semibold sm:text-base dark:text-gray-100">
                        5.0
                      </p>
                      <div className="flex text-orange-500 dark:text-orange-400">
                        <svg
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="100%"
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"
                          ></path>
                        </svg>
                        {/* Répéter pour les autres étoiles */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 rounded-md border border-solid bg-gray-100 dark:bg-gray-800 dark:border-gray-700 p-6 md:p-4">
                  <p className="text-sm dark:text-gray-300">
                    Pierre-André a transformé mon idée en un site web incroyable
                    et fonctionnel. Il a été très attentif à mes demandes et a
                    su apporter des solutions adaptées à chaque étape. Je suis
                    ravi du résultat et n’hésiterai pas à refaire appel à ses
                    services à l’avenir.
                  </p>
                  <div className="flex items-center gap-2 sm:gap-x-4">
                    <div className="flex items-center gap-x-2">
                      <img
                        src="/assets/img4.jpg"
                        alt="Témoignage"
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <p className="text-sm font-semibold sm:text-base dark:text-gray-100">
                        Alex
                      </p>
                    </div>
                    <div className="h-5 w-px bg-gray-300 dark:bg-gray-600"></div>
                    <div className="flex items-center gap-x-2">
                      <p className="text-sm font-semibold sm:text-base dark:text-gray-100">
                        5.0
                      </p>
                      <div className="flex text-orange-500 dark:text-orange-400">
                        <svg
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="100%"
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"
                          ></path>
                        </svg>
                        {/* Répéter pour les autres étoiles */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:hidden lg:flex  rounded-xl overflow-hidden bg-gray-100-- max-h-[34rem] bg-orange-500 max-[991px]:h-[475px] lg:w-2/5">
              <img
                src="/assets/profil2.png"
                alt="Image à propos"
                className="w-full h-full object-top object-cover object-center-top"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
