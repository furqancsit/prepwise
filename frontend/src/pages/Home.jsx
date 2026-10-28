import React from "react";
import Hero from "./Hero";
import Features from "./Features";
import HowItWorks from "../../components/HowitWorks";
import Pricing from "./Pricing";

const Home = () => {
  return (
    <div>
      <Hero />
      <Features/>
      <HowItWorks/>
      <Pricing/>
    </div>
  );
};

export default Home;
