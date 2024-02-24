import AboutSection from "../components/About";
import HeroSection from "../components/Hero";
import BrandsSection from "../components/Brands";
import ProductsSection from "../components/Products";
import ReviewsSection from "../components/Reviews";

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
          "titleProducts": titleProducts.${lang},
          'anchorProducts': anchorProducts.${lang},
          "titleBrands": titleBrands.${lang},
          'anchorBrands': anchorBrands.${lang},
          "titleRecources": titleRecources.${lang},
          'anchorRecources': anchorRecources.${lang},
          "titleReviews": titleReviews.${lang},
          'anchorReviews': anchorReviews.${lang},
           "titleAbout": titleAbout.${lang},
          'anchorAbout': anchorAbout.${lang},
        }`
      )
      .then((data) => setSectionsData(data))
      .catch(console.error);
  }, [lang]);

  return (
    <div className="main flex-auto">
      <HeroSection />
      <AboutSection
        titleSection={sectionsData && sectionsData[0].titleAbout}
        anchorSection={sectionsData && sectionsData[0].anchorAbout}
      />
      <BrandsSection
        titleSection={sectionsData && sectionsData[0].titleBrands}
        anchorSection={sectionsData && sectionsData[0].anchorBrands}
      />
      <ReviewsSection
        titleSection={sectionsData && sectionsData[0].titleReviews}
        anchorSection={sectionsData && sectionsData[0].anchorReviews}
      />
      <ProductsSection
        titleSection={sectionsData && sectionsData[0].titleProducts}
        anchorSection={sectionsData && sectionsData[0].anchorProducts}
      />
    </div>
  );
};

export default Home;
