import AboutSection from "../components/About";
import HeroSection from "../components/Hero";
import BrandsSection from "../components/Brands";
import Products from "../components/Products";

import sanityClient from "../client.js";
import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import { getSecondPartUrl } from "../utils/getSecondPartURI.js";

const Home = () => {
  const [sectionsData, setSectionsData] = useState(null);

  const location = useLocation();
  const { pathname } = location;
  let lang = getSecondPartUrl(pathname) === "en" ? "en" : "fr";

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=='siteConfig']{
          "titleProducts": titleProducts.${lang}
        }`
      )
      .then((data) => setSectionsData(data))
      .catch(console.error);
  }, [lang]);

  return (
    <div className="main flex-auto">
      <HeroSection />
      <AboutSection />
      <BrandsSection />
      <Products titleSection={sectionsData && sectionsData[0].titleProducts} />
    </div>
  );
};

export default Home;
