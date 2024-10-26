// src/pages/Home.jsx
import React, { useContext, useEffect, useState } from "react";

import Header from "../components/home/Header";
import Statistics from "../components/home/Statistics";
import Liste from "../components/home/Liste";
import PC_header from "../components/home/PC_header";
import Navigation_bar from "../components/home/Navigation_bar";
import Liste_options from "../components/home/Liste_options";
import Ajouter_vehicule from "../components/ajouter_modifier/Ajouter_vehicule";
import Modifier_vehicule from "../components/ajouter_modifier/Modifier_vehicule";
import Search_bar from "../components/home/Search_bar";
import { DataContext } from "../context/DataContext";

const Home = () => {
  const [showListeOption, setShowListOption] = useState(false);
  const [search, setSearch] = useState(false);

  const { vehicleData, isLoading } = useContext(DataContext);

 
  return (
    <div className="sm:px-10 md:px-14 lg:px-20">
      <Navigation_bar />

      <PC_header />

      <div className="md:hidden">
        <Header setSearch={setSearch} />
        {search && <Search_bar setSearch={setSearch} />}
        <Navigation_bar />
      </div>

      <Statistics />
      {isLoading || !vehicleData && 
      <div className="fixed inset-0 bg-gray-200/50">
        <div className="w-full h-full flex justify-center items-center">
          <div className="border-blue-500 h-20 w-20 animate-spin rounded-full border-8 border-t-gray-100/0" />
        </div>
      </div>
      }
      
      <Liste setShowListOption={setShowListOption} />
      {showListeOption && (
        <Liste_options setShowListOption={setShowListOption} />
      )}

    </div>
  );
};

export default Home;
