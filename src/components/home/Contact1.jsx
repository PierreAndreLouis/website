import React, { useState } from "react";
import emailjs from "emailjs-com";
import { MdMailOutline } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaHeadphonesSimple } from "react-icons/fa6";

export default function Contact1() {
  const [loading, setLoading] = useState(false);

  function sendMail(e) {
    e.preventDefault(); // Empêche le rechargement de la page

    const params = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,

      message: document.getElementById("message").value,
    };

    if (Object.values(params).some((value) => !value)) {
      alert("Veuillez remplir tous les champs avant d'envoyer votre message.");
      return;
    }

    setLoading(true); // Active le mode chargement

    const serviceID = "service_vsuzpsx";
    const templateID = "template_e11xt3v";

    const publicKey = "Y4DfcLA5moa5C1k6K"; // Clé publique

    emailjs.init(publicKey);
    // emailjs.init("Y4DfcLA5moa5C1k6K"); // Clé publique

    emailjs
      .send(serviceID, templateID, params)
      .then((res) => {
        // Réinitialise les champs du formulaire
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";

        console.log(res);
        alert("Votre message a été envoyé avec succès !");
      })
      .catch((err) => {
        console.log(err);
        alert("Erreur lors de l'envoi du message. Veuillez réessayer.");
      })
      .finally(() => {
        setLoading(false); // Désactive le mode chargement après l'envoi
      });
  }

  return (
    <div className="dark:bg-gray-800 px-2 pt-20 dark:text-white bg-gray-100">
      <div className="container max-w-6xl py-12 mx-auto px-2 md:px-4">
        <section className="mb-52">
          <div className="flex justify-center">
            <div className="text-center md:max-w-xl lg:max-w-3xl">
              <h2 className="mb-12 px-6 text-3xl font-bold dark:text-white">
                Contactez-moi
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap">
            <form className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
              <div className="mb-5 w-full">
                <label
                  className="block font-medium mb-[.51rem] text-orange-600 dark:text-orange-300"
                  htmlFor="exampleInput90"
                >
                  Nom
                </label>
                <input
                  type="text"
                  className="px-4 py-3 border w-full outline-none rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  id="name"
                  placeholder="Nom"
                />
              </div>

              <div className="mb-5 w-full">
                <label
                  className="block font-medium mb-[.51rem] text-orange-600 dark:text-orange-300"
                  htmlFor="exampleInput90"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="px-4 py-3 border w-full outline-none rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  id="email"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="mb-5 w-full">
                <label
                  className="block font-medium mb-[.51rem] text-orange-600 dark:text-orange-300"
                  htmlFor="exampleInput90"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  className="px-4 py-3 border rounded-[5px] w-full outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>

              <button
                disabled={loading}
                onClick={(e) => {
                  sendMail(e);
                }}
                type="submit"
                className="mb-6 inline-block w-full rounded bg-orange-400 px-6 py-2.5 font-medium uppercase leading-normal text-white hover:shadow-md hover:bg-orange-500 dark:bg-orange-600 dark:hover:bg-orange-400"
              >
                {loading ? "Envoi en cours..." : "Envoyer"}
              </button>
            </form>

            <div className="w-full lg:mt-6 shrink-0 grow-0 basis-auto lg:w-7/12">
              <div className="flex flex-wrap">
                <div className="mb-8 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                  <div className="flex items-start">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md bg-orange-400-100 p-4 text-orange-5 bg-orange-400 dark:text-orange-50">
                        <MdMailOutline className="text-4xl " />
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <p className="mb-2 font-bold dark:text-white">Email</p>
                      <p className="text-neutral-500 dark:text-neutral-400">
                        webdeveloper3030@gmail.com
                      </p>
                      {/* <p className="text-neutral-500 dark:text-neutral-400">
                        +1 234-567-89
                      </p> */}
                    </div>
                  </div>
                </div>
                <div className="mb-8 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                  <div className="flex items-start">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md bg-orange-400-100 p-4 text-orange-5 bg-orange-400 dark:text-orange-50">
                        <FaPhone className="text-3xl" />
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <p className="mb-2 font-bold dark:text-white">
                        Telephone
                      </p>
                      <p className="text-neutral-500 dark:text-neutral-400">
                        (+509) 4673-1710
                      </p>
                      {/* <p className="text-neutral-500 dark:text-neutral-400">
                        +1 234-567-89
                      </p> */}
                    </div>
                  </div>
                </div>
                <div className="mb-8 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                  <div className="align-start flex">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md bg-orange-400-100 p-4 text-orange-5 bg-orange-400 dark:text-orange-50">
                        <FaMapMarkerAlt className="text-3xl " />
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <p className="mb-2 font-bold dark:text-white">Adresse</p>
                      {/* <p className="text-neutral-500 dark:text-neutral-400">
                        Adresse
                      </p> */}
                      <p className="text-neutral-500 dark:text-neutral-400">
                        La vallee de Jacmel, Haiti
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-8 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:px-6">
                  <div className="align-start flex">
                    <div className="shrink-0">
                      <div className="inline-block rounded-md bg-orange-400-100 p-4 text-orange-5 bg-orange-400 dark:text-orange-50">
                        <FaHeadphonesSimple className="text-3xl " />
                      </div>
                    </div>
                    <div className="ml-6 grow">
                      <p className="mb-2 font-bold dark:text-white">
                        Disponibilite
                      </p>
                      <p className="text-neutral-500 dark:text-neutral-400">
                        24/24 heures
                      </p>
                      {/* <p className="text-neutral-500 dark:text-neutral-400">
                        +1 234-567-89
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
