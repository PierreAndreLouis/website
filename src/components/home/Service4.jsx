import React from "react";
import { IoTimeOutline } from "react-icons/io5";
import { FaThumbsUp } from "react-icons/fa";
import { IoInfiniteSharp } from "react-icons/io5";
import { FaRegThumbsUp } from "react-icons/fa";

const features = [
  {
    title: "Respect des délais ",
    description:
      " Je m'engage à respecter les délais convenus, pour te garantir un projet livré à temps, sans compromis sur la qualité.",
    img_icon:
      "https://github.com/LouisPierre-Andre/images/blob/main/Strategie%20Markeging/Strategie%20efficace-01.png?raw=true",
    icon: <IoTimeOutline />,
  },
  {
    title: "Accompagnement continu",
    description:
      "Je suis là pour te soutenir à chaque étape, te fournir des conseils et répondre à tes questions, même après la livraison du projet.",
    img_icon:
      "https://github.com/LouisPierre-Andre/images/blob/main/Strategie%20Markeging/support%20constant-01.png?raw=true",
    icon: <FaRegThumbsUp />,
  },
  {
    title: "Révisions illimitées",
    description:
      "Tu as la possibilité de demander autant de révisions que nécessaire pour que le résultat final soit exactement ce que tu attends.",
    img_icon:
      "https://github.com/LouisPierre-Andre/images/blob/main/Strategie%20Markeging/result%20mesurable-01.png?raw=true",
    icon: <IoInfiniteSharp />,
  },
  // {
  //   title: 'Advanced Quiz Generation',
  //   description: 'Take your knowledge testing to the next level with advanced quiz generation, providing more customization options for your quizzes.',
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       width="24"
  //       height="24"
  //       viewBox="0 0 24 24"
  //       fill="none"
  //       stroke="currentColor"
  //       strokeWidth="2"
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //       className="lucide lucide-file-question"
  //     >
  //       <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
  //       <path d="M10 10.3c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2"></path>
  //       <path d="M12 17h.01"></path>
  //     </svg>
  //   ),
  // },
];

const Service4 = () => {
  return (
    <section className="bg-orange-50 dark:bg-gray-900 text-slate-900 dark:text-slate-200 py-20  md:px-12">
      <div className="container max-w-xl-- p-6 mx-auto  space-y-12 lg:px-8 lg:max-w-7xl--">
        <div>
          <h2 className="text-3xl text-orange-500  dark:text-gray-300-- font-semibold text-center sm:text-3xl">
            Pourquoi me choisir ?
          </h2>
          <p className="max-w-3xl text-gray-600 dark:text-gray-400 mx-auto mt-4 text-md text-center">
            Travailler avec moi, c’est avoir un service rapide, personnalisé et
            toujours à l’écoute.
          </p>
        </div>
        <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="mt-4 space-y-12">
              {features.map((feature, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex text-3xl items-center justify-center w-12 h-12 rounded-md bg-orange-500 ">
                      {/* {feature.icon} */}
                      {/* <img className="w-[70%] " src={feature.img_icon} alt="" /> */}
                      {feature.icon}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-slate-700 dark:text-white">
                      {feature.title}
                    </h4>
                    <p className="mt-2 text-slate-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div aria-hidden="true" className="mt-10 lg:mt-0 bo">
            <img
              // width="600"
              // height="600"

              // src="https://www.dynamique-mag.com/wp-content/uploads/436926f74b76d7c3e5cb958227b46407.jpg"
              src="/assets/partenaire.png"
              className="lg:h-96 object-cover mx-auto rounded-lg shadow-lg dark:bg-gray-500"
              alt="Learning features"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service4;
