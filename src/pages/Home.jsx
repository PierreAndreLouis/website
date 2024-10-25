// src/pages/Home.jsx
import React, { useEffect, useState } from "react";

import Header from "../components/home/Header";
import Statistics from "../components/home/Statistics";
import Liste from "../components/home/Liste";
import PC_header from "../components/home/PC_header";
import Navigation_bar from "../components/home/Navigation_bar";
import Liste_options from "../components/home/Liste_options";
import Ajouter_vehicule from "../components/ajouter_modifier/Ajouter_vehicule";
import Modifier_vehicule from "../components/ajouter_modifier/Modifier_vehicule";
import Search_bar from "../components/home/Search_bar";

const Home = () => {
  const [showListeOption, setShowListOption] = useState(false);
  const [search, setSearch] = useState(false);

  // const [add_vehicule, setAddVehicule] = useState(false);
  // const [modif_vehicule, setModifierVehicule] = useState(false);

  return (
    <div className="sm:px-10 md:px-14 lg:px-20">
      <Navigation_bar />
     
        <PC_header />
      

      <div className="md:hidden">
        <Header setSearch={setSearch} />
        {search && <Search_bar setSearch={setSearch} />}
        {/* <Navigation_bar /> */}
      </div>
      
      <Statistics />
      <Liste setShowListOption={setShowListOption} />
      {showListeOption && (
        <Liste_options setShowListOption={setShowListOption} />
      )}

      {/* {add_vehicule && <Ajouter_vehicule setAddVehicule={setAddVehicule}/>}
      {modif_vehicule && <Modifier_vehicule setModifierVehicule={setModifierVehicule}/>} */}
    </div>
  );
};

export default Home;
