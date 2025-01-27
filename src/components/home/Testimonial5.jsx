import React, { useState } from "react";
import { FaLinkedin } from "react-icons/fa";

const testimonialsData = [
  {
    image: "/assets/paolo.jpg",
    name: "Andre Paul Louis",
    position: "GhostWriter Pro",
    text: "“ Travailler avec Pierre-Ander a été une expérience incroyable ! Il a su écouter mes besoins et créer un site web qui reflète parfaitement mon entreprise.  Je recommande vivement ses services à quiconque cherche à créer un site web unique et performant.”",
  },
  // {
  //     image: 'https://img.freepik.com/photos-gratuite/portrait-etudiant-peau-sombre-attrayant-portant-chemise-carreaux-expression-confiante-joyeuse-debout-mur-du-tableau_273609-5907.jpg?t=st=1723570902~exp=1723574502~hmac=620933b68073e7c7dc2b07e9ad85112aba81d945628a7ec52bd175f0d882009f&w=900',
  //     name: 'John Doe',
  //     position: 'Senior Developer at Techie',
  //     text: '“ Their professionalism and expertise are unmatched. The results speak for themselves.”',
  // },
  // {
  //     image: 'https://img.freepik.com/photos-gratuite/plan-horizontal-etudiant-satisfait-utilise-nouvelle-application-cool-son-telephone-portable-porte-bloc-notes-pour-ecrire-notes-porte-lunettes-foulard-soie-pull-tricot-isole-mur-bleu_273609-26316.jpg?t=st=1723570924~exp=1723574524~hmac=4ec6c0f28c5b9b3cad367099b249132e3958864fca359250388e5a521a4e12ea&w=900',
  //     name: 'Ema Watson',
  //     position: 'Marketing Manager at Stech',
  //     text: '“ Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda.”',
  // },
  // {
  //     image: 'https://img.freepik.com/photos-gratuite/portrait-employe-bureau-masculin-confiant-serieux-lunettes-chemise-formelle-peau-foncee-pose-dans-armoire-spacieuse_273609-3441.jpg?t=st=1723570974~exp=1723574574~hmac=26537581f0c0b7f3ce73ad30b34071e3a5a4ce649ef21cb1cb5d59e22a78b4a6&w=900',
  //     name: 'John Doe',
  //     position: 'Senior Developer at Techie',
  //     text: '“ Their professionalism and expertise are unmatched. The results speak for themselves.”',
  // },
];

export default function Testimonial5() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const { image, name, position, text } = testimonialsData[currentIndex];

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-6xl px-6 py-10 mx-auto">
          <p className="text-center text-xl font-medium text-gray-500 dark:text-orange-500">
            Commentaires
          </p>
          <h1 className="mt-2 text-center  text-orange-400 text-2xl font-semibold  capitalize lg:text-3xl dark:text-white">
            Ce que disent mes clients
          </h1>

          <main className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
            <div className="absolute w-full bg-orange-500 -z-10 md:h-96 rounded-2xl"></div>

            <div className="w-full p-6 bg-orange-500 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
              <div
                className="h-24 w-24 border md:mx-6 rounded-full object-cover shadow-md md:h-[27rem] md:min-w-80 md:max-w-80 lg:min-w-[25rem] lg:max-w-[25rem] lg:h-[36rem]-- lg:w-[26rem] md:rounded-2xl"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "opacity 0.5s",
                }}
              />
              <div
                className="mt-2 md:mx-6"
                style={{
                  transition: "opacity 0.5s",
                }}
              >
                <a
                  href="https://www.linkedin.com/in/andrepaullouis/"
                  target="_blank"
                >
                  <p className="text-xl font-medium tracking-tight text-white">
                    {name}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <p className="text-orange-50 font-semibold">{position}</p>
                    <FaLinkedin className="text-2xl cursor-pointer text-blue-600 bg-white rounded-sm" />
                  </div>
                </a>
                <p className="mt-4 text-lg leading-relaxed text-orange-950  font-semibold md:text-xl">
                  {text}
                </p>

                <div className="flex items-center justify-between mt-6 md:justify-start">
                  <button
                    onClick={handlePrevClick}
                    title="left arrow"
                    className="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 hover:bg-orange-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={handleNextClick}
                    title="right arrow"
                    className="p-2 text-white transition-colors duration-300 border rounded-full rtl:-scale-x-100 md:mx-6 hover:bg-orange-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
