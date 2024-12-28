import React from "react";

import HeroAbout from "../components/about/HeroAbout";
import About from "../components/about/About";
import Statistic4 from "../components/about/Statistic4";
import CTA1 from "../components/about/CTA1";
import Service1 from "../components/home/Service1";

function AboutPage() {
  return (
    <div>
      <HeroAbout />
      <About />
      <Statistic4 />
      <Service1 />
      <CTA1 />
      {/* <About1 />
      <About2 />
      <About3 />
      <About4 />
      <About5 />
      <About6 /> */}
    </div>
  );
}

export default AboutPage;
