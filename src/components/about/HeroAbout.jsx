import React from "react";
import { MdOutlineDoubleArrow } from "react-icons/md";

export default function HeroAbout() {
  return (
    <div className="dark:bg-gray-900">
      <div className="relative h-72 lg:h-[25rem] flex justify-center items-center text-white text-[4rem]">
        <div className="absolute inset-0 bg-gray-900/80 w-full h-full z-10"></div>
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/hero2.jpg"
          alt="hero bg"
        />
        <h2 className="relative z-20">A Propos de moi</h2>
      </div>

      <div className="flex dark:text-gray-50 gap-4 p-6 py-4 text-lg font-semibold bg-gray-200 dark:bg-gray-800 items-center">
        <p>Home</p>
        <MdOutlineDoubleArrow />
        <p>A Propos de moi</p>
      </div>
    </div>
  );
}
