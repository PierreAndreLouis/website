import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import emailjs from "emailjs-com";
// import ReservationSeo from '../../seo/ReservationSeo';

export default function FormulaireReservation() {
  const [startDate, setStartDate] = useState(null);
  const [loading, setLoading] = useState(false);

  // Refs pour les champs du formulaire
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const timeRef = useRef();
  const durationRef = useRef();
  const paysRef = useRef();

  // const timezoneRef = useRef();
  // const serviceRef = useRef();
  const messageRef = useRef();

  function sendMail(e) {
    e.preventDefault(); // Empêche le rechargement de la page

    // Vérification des champs requis
    if (!startDate) {
      alert(
        "Veuillez choisir une date et une heure avant d'envoyer votre message."
      );
      return;
    }

    const params = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      pays: paysRef.current.value,
      phone: phoneRef.current.value || "Non fourni",
      date: startDate.toLocaleDateString("fr-FR"),
      time: timeRef.current.value,
      duration: durationRef.current.value,
      // timezone: timezoneRef.current.value,
      // service: serviceRef.current.value,
      message: messageRef.current.value,
    };

    // Vérifie si tous les champs sont remplis
    if (Object.values(params).some((value) => !value)) {
      alert("Veuillez remplir tous les champs avant d'envoyer votre message.");
      return;
    }

    setLoading(true); // Active le mode chargement

    const serviceID = "service_29vmgsk";
    const templateID = "template_jt4bvjk";
    const publicKey = "Y4DfcLA5moa5C1k6K"; // Clé publique

    emailjs.init(publicKey);

    emailjs
      .send(serviceID, templateID, params)
      .then((res) => {
        // Réinitialise les champs du formulaire
        nameRef.current.value = "";
        emailRef.current.value = "";
        paysRef.current.value = "";
        phoneRef.current.value = "";
        setStartDate(null);
        timeRef.current.value = "08:30";
        durationRef.current.value = "30";
        // timezoneRef.current.value = "UTC+00:00";
        // serviceRef.current.value = "";
        messageRef.current.value = "";

        alert("Votre message a été envoyé avec succès !");
      })
      .catch((err) => {
        console.error(err);
        alert("Erreur lors de l'envoi du message. Veuillez réessayer.");
      })
      .finally(() => {
        setLoading(false); // Désactive le mode chargement après l'envoi
      });
  }

  // Fonction pour désactiver les samedis et dimanches
  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // 0 pour dimanche et 6 pour samedi
  };

  return (
    <div className="mx-2 pt-20 bg-gray-100 dark:bg-gray-700 pb-40">
      {/* <ReservationSeo /> */}
      <div className="border-- border-gray-500--  bg-white dark:bg-gray-800 max-w-2xl mx-auto mt-10 shadow-lg rounded-lg overflow-hidden">
        <div className="text-2xl py-4 px-6 bg-orange-100 border  dark:bg-gray-900 dark:text-gray-50 text-gray-700 text-center font-bold uppercase--">
          Prends rendez-vous maintenant
        </div>
        <form className="py-4 px-6" onSubmit={sendMail}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
              htmlFor="name"
            >
              Nom
            </label>
            <input
              className="bg-gray-100 appearance-none border rounded w-full py-3 px-3 dark:bg-gray-700 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Entrez votre nom"
              ref={nameRef}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="bg-gray-100 appearance-none border rounded w-full py-3 dark:bg-gray-700 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Entrez votre email"
              ref={emailRef}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
              htmlFor="phone"
            >
              Numéro de téléphone (optionnel)
            </label>
            <input
              className="bg-gray-100 appearance-none border rounded w-full py-3 px-3 text-gray-700 dark:bg-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              placeholder="Entrez votre numéro de téléphone"
              ref={phoneRef}
            />
          </div>

          <div className="md:grid md:grid-cols-2 gap-4 items-center">
            <div className="grid ">
              <label
                className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
                htmlFor="date"
              >
                Date :
              </label>
              <DatePicker
                id="date"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                filterDate={isWeekday}
                dateFormat="dd/MM/yyyy"
                className="w-full p-2 mb-4 border  bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300"
                placeholderText="Choisissez une date"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
                htmlFor="time"
              >
                Heure
              </label>
              <select
                name="time"
                required
                className="w-full   bg-gray-100    p-2 border rounded dark:bg-gray-700 dark:text-gray-300"
                id="time"
                ref={timeRef}
              >
                {/* Options des heures */}
                <option value="08:30">08:30</option>
                <option value="09:00">09:00</option>
                <option value="09:30">09:30</option>
                <option value="10:00">10:00</option>
                <option value="10:30">10:30</option>
                <option value="11:00">11:00</option>
                <option value="11:30">11:30</option>
                <option value="12:00">12:00</option>
                <option value="12:30">12:30</option>
                <option value="13:00">13:00</option>
                <option value="13:30">13:30</option>
                <option value="14:00">14:00</option>
                <option value="14:30">14:30</option>
                <option value="15:00">15:00</option>
                <option value="15:30">15:30</option>
                <option value="16:00">16:00</option>
                <option value="16:30">16:30</option>
                <option value="17:00">17:00</option>
                <option value="17:30">17:30</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
              htmlFor="pays"
            >
              Votre Pays
            </label>
            <input
              className="bg-gray-100 appearance-none border rounded w-full py-3 px-3 text-gray-700 dark:bg-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              id="pays"
              type="tel"
              placeholder="Votre pays"
              required
              ref={paysRef}
            />
          </div>

          {/* <div>
            <label
              htmlFor="timezone"
              className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
            >
              Fuseau horaire :
            </label>
            <select
              id="timezone"
              name="timezone"
              required
              className="w-full   bg-gray-100 p-2 mb-4 border rounded dark:bg-gray-700 dark:text-gray-300"
              ref={timezoneRef}
            >
              <option value="UTC-12:00">UTC-12:00</option>
              <option value="UTC-11:00">UTC-11:00</option>
              <option value="UTC-10:00">UTC-10:00</option>
              <option value="UTC-09:00">UTC-09:00</option>
              <option value="UTC-08:00">UTC-08:00</option>
              <option value="UTC-07:00">UTC-07:00</option>
              <option value="UTC-06:00">UTC-06:00</option>
              <option value="UTC-05:00">UTC-05:00</option>
              <option value="UTC-04:00">UTC-04:00</option>
              <option value="UTC-03:00">UTC-03:00</option>
              <option value="UTC-02:00">UTC-02:00</option>
              <option value="UTC-01:00">UTC-01:00</option>
              <option value="UTC+00:00">UTC+00:00</option>
              <option value="UTC+01:00">UTC+01:00</option>
              <option value="UTC+02:00">UTC+02:00</option>
              <option value="UTC+03:00">UTC+03:00</option>
              <option value="UTC+04:00">UTC+04:00</option>
              <option value="UTC+05:00">UTC+05:00</option>
              <option value="UTC+06:00">UTC+06:00</option>
              <option value="UTC+07:00">UTC+07:00</option>
              <option value="UTC+08:00">UTC+08:00</option>
              <option value="UTC+09:00">UTC+09:00</option>
              <option value="UTC+10:00">UTC+10:00</option>
              <option value="UTC+11:00">UTC+11:00</option>
              <option value="UTC+12:00">UTC+12:00</option>
            </select>
          </div> */}

          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
              htmlFor="duration"
            >
              Durée
            </label>
            <select
              name="duration"
              required
              className="w-full   bg-gray-100 p-2 border rounded dark:bg-gray-700 dark:text-gray-300"
              id="duration"
              ref={durationRef}
            >
              {/* Options des durées */}
              <option value="30">30 minutes</option>
              <option value="60">60 minutes</option>
              <option value="90">90 minutes</option>
              <option value="120">120 minutes</option>
            </select>
          </div>

          {/* <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
              htmlFor="service"
            >
              Service
            </label>
            <select
              name="service"
              required
              className="w-full   bg-gray-100 p-2 border rounded dark:bg-gray-700 dark:text-gray-300"
              id="service"
              ref={serviceRef}
            >
              <option value="Service1">service 1</option>
              <option value="Service2">service2</option>
              <option value="Service3">service 3</option>
              <option value="Service4">service 4</option>
            </select>
          </div> */}

          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              className=" bg-gray-100 appearance-none border rounded w-full py-3 px-3 text-gray-700 dark:bg-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Entrez votre message"
              rows="4"
              ref={messageRef}
            />
          </div>

          <div className="text-center w-full">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 w-[100%] sm:w-[15rem] rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? "Envoi en cours..." : "Envoyer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
