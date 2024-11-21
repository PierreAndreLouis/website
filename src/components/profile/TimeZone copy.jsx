import React, { useState, useEffect } from "react";

function TimeZone() {
  const timeZoneData = [
    { region: "Amérique/New_York", currentTime: "14:30", utcOffset: "-4" },
    { region: "Europe/Londres", currentTime: "19:30", utcOffset: "0" },
    { region: "Asie/Tokyo", currentTime: "03:30", utcOffset: "+9" },
    { region: "Afrique/Abidjan", currentTime: "18:30", utcOffset: "0" },
    { region: "Amérique/Sao_Paulo", currentTime: "16:30", utcOffset: "-3" },
    { region: "Australie/Sydney", currentTime: "05:30", utcOffset: "+11" },
  ];

  const [selectedTimeZone, setSelectedTimeZone] = useState(() => {
    // Récupérer le fuseau horaire sauvegardé
    return localStorage.getItem("selectedTimeZone") || "";
  });

  const handleSelectTimeZone = (region) => {
    setSelectedTimeZone(region);
    localStorage.setItem("selectedTimeZone", region);
  };

  useEffect(() => {
    // Sauvegarder automatiquement la sélection à chaque changement
    if (selectedTimeZone) {
      localStorage.setItem("selectedTimeZone", selectedTimeZone);
    }
  }, [selectedTimeZone]);

  return (
    <div className="fixed inset-0 z-40 flex justify-center items-center bg-black/50">
      <div className="w-[90vw] relative rounded-lg p-4 max-w-[40rem] max-h-[79vh] bg-white min-h-[60vh]">
        <div className="p-4 absolute top-0 left-0 right-0">
          <h2 className="font-semibold text-gray-500">TimeZone</h2>
          <div className="bg-orange-50 text-gray-800 px-2 py-2 rounded-lg mt-2">
            <h3 className="font-semibold">Current timezone</h3>
            <p className="text-gray-500">{selectedTimeZone || "No timezone selected"}</p>
          </div>
        </div>
        <div className=" shadow-lg overflow-y-auto max-h-[55vh] mt-[7rem] rounded-lg min-h-[100%] px-2">
          {timeZoneData.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelectTimeZone(item.region)}
              className={`flex justify-between border-b py-2 my-2 cursor-pointer rounded-lg px-2 ${
                selectedTimeZone === item.region
                  ? "bg-orange-50"
                  : "hover:bg-orange-50"
              }`}
            >
              <div>
                <h3 className="font-semibold text-gray-600">{item.region}</h3>
                <h4 className="text-gray-500">UTC {item.utcOffset}</h4>
              </div>
              <div>
                <h3>{item.currentTime}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TimeZone;
