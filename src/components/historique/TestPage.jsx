import React from "react";

function TestPage() {
  const myFonction = () => {
    console.log("This is a test");
  };
  return (
    <div>
      <button
        onClick={() => {
          myFonction();
        }}
      ></button>
    </div>
  );
}

export default TestPage;
