import React from "react";

function ErrorModifiervehiculePupupComponent({
  errorModifiervehiculePupup,
  seterrorModifiervehiculePupup,
  addvehicleData,
}) {
  return (
    <>
      {errorModifiervehiculePupup && (
        <div className="fixed z-10 flex justify-center items-center inset-0 bg-black/50">
          <div className="bg-red-50 max-w-[25rem] p-6 rounded-xl w-[80vw]">
            <div>
              <h3 className="block text-lg  text-center leading-6 text-red-600 mb-3">
                Echec de la modification du vehicule
              </h3>
              <h4 className="text-center text-lg text-gray-600">
                {addvehicleData.description}
              </h4>
            </div>
            <div className="flex justify-center gap-2 mt-5">
              <h3
                onClick={() => {
                  seterrorModifiervehiculePupup(false);
                }}
                className="cursor-pointer py-1 text-center px-10 bg-red-500 rounded-lg text-white"
              >
                OK
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ErrorModifiervehiculePupupComponent;
