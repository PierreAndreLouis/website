export default function Statistic4() {
  const stats = [
    {
      data: "50+",
      title: "Clients",
    },
    {
      data: "80+",
      title: "Projets",
    },
    {
      data: "5 ans+",
      title: "Experience",
    },
    {
      data: "100%",
      title: "Engagement pour chaque projet",
    },
  ];

  return (
    <section className="py-20 dark:bg-gray-900 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 dark:text-gray-300 gap-12 items-start justify-between flex flex-col-reverse lg:flex-row md:px-8">
        <div className="lg:max-w-xl">
          <img
            src="/assets/statistics.jpg"
            className="rounded-lg"
            alt="Pourquoi choisir nos services"
          />
        </div>
        <div className="mt-0 gap-10 sm:mt-0 md:flex  lg:block">
          <div className="max-w-2xl">
            <h3 className="text-gray-800 dark:text-gray-100 text-3xl font-semibold sm:text-4xl">
              Je fais tout pour satisfaire mes clients.
            </h3>
            <p className="mt-3- max-w-xl dark:text-gray-300">
              Je m’engage à fournir des services de qualité et à répondre aux
              besoins de chaque client de manière efficace et professionnelle.
            </p>
          </div>
          <div className="flex-none mt-6 md:mt-0 lg:mt-6">
            <ul className="flex  gap-20  ">
              {/* {stats.map((item, idx) => ( */}
              <div className="grid grid-rows-2  gap-6">
                <li className="dark:text-gray-100 lg:min-w-[10rem]">
                  <h4 className="text-4xl text-orange-600 dark:text-orange-400 font-bold">
                    30+
                  </h4>
                  <p className="mt-3- font-medium">Clients satisfaits</p>
                </li>
                <li className="dark:text-gray-100 lg:min-w-[10rem]">
                  <h4 className="text-4xl text-orange-600 dark:text-orange-400 font-bold">
                    50+
                  </h4>
                  <p className="mt-3- font-medium">Projets réalisés</p>
                </li>
              </div>

              <div className="grid grid-rows-2  gap-6">
                <li className="dark:text-gray-100 lg:min-w-[10rem]">
                  <h4 className="text-4xl text-orange-600 dark:text-orange-400 font-bold">
                    3 ans+
                  </h4>
                  <p className="mt-3- font-medium">Experience</p>
                </li>
                <li className="dark:text-gray-100 lg:min-w-[10rem]">
                  <h4 className="text-4xl text-orange-600 dark:text-orange-400 font-bold">
                    100%
                  </h4>
                  <p className="mt-3- font-medium">
                    Engagement pour chaque projet
                  </p>
                </li>
              </div>
              {/* ))} */}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
