import React from "react";
import Hero19 from "../components/home/Hero19";
import Header from "../components/home/Header";
import Service1 from "../components/home/Service1";
import About from "../components/home/About";
import Service4 from "../components/home/Service4";
import CTA12 from "../components/home/CTA12";
import Testimonial5 from "../components/home/Testimonial5";
import Contact1 from "../components/home/Contact1";
import Footer5 from "../components/home/Footer5";
import Portfolio from "../components/home/Portfolio";

function HomePage() {
  return (
    <div>
      {/* <Header /> */}
      <Hero19 />
      <Service1 />
      <About />
      <Service4 />
      <Portfolio />
      <CTA12 />
      <Testimonial5 />
      <Contact1 />
      {/* <Footer5 /> */}
    </div>
  );
}

export default HomePage;
