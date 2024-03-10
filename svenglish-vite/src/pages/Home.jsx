import sanityClient from "../client.js";
import { useEffect, useState } from "react";

import AboutSection from "../components/About";
import HeroSection from "../components/Hero";
import BrandsSection from "../components/Brands";
import ProductsSection from "../components/Products";
import ReviewsSection from "../components/Reviews";
import RessourcesSection from "../components/Ressources";

import { LangReceiver } from "../components/shared/LangReceiver.jsx";

const Home = () => {
  const [sectionsData, setSectionsData] = useState(null);

  const { lang } = LangReceiver();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=='siteConfig']{
          "titleProducts": titleProducts.${lang},
          'anchorProducts': anchorProducts.${lang},
          iconProducts{
            asset->{
              _id,
              url
            }
          },
          "titleBrands": titleBrands.${lang},
          'anchorBrands': anchorBrands.${lang},
          iconBrands{
            asset->{
              _id,
              url
            }
          },
          "titleRecources": titleRecources.${lang},
          'anchorRecources': anchorRecources.${lang},
          iconRecources{
            asset->{
              _id,
              url
            }
          },
          "titleReviews": titleReviews.${lang},
          iconReviews{
            asset->{
              _id,
              url
            }
          },
          'anchorReviews': anchorReviews.${lang},
           "titleAbout": titleAbout.${lang},
          'anchorAbout': anchorAbout.${lang},
            iconAbout{
              asset->{
                _id,
                url
              }
            }
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
        iconSection={sectionsData && sectionsData[0].iconAbout}
      />
      <RessourcesSection
        titleSection={sectionsData && sectionsData[0].titleRecources}
        anchorSection={sectionsData && sectionsData[0].anchorRecources}
        iconSection={sectionsData && sectionsData[0].iconRecources}
      />
      <BrandsSection
        titleSection={sectionsData && sectionsData[0].titleBrands}
        anchorSection={sectionsData && sectionsData[0].anchorBrands}
        iconSection={sectionsData && sectionsData[0].iconBrands}
      />
      <ReviewsSection
        titleSection={sectionsData && sectionsData[0].titleReviews}
        anchorSection={sectionsData && sectionsData[0].anchorReviews}
        iconSection={sectionsData && sectionsData[0].iconReviews}
      />
      <ProductsSection
        titleSection={sectionsData && sectionsData[0].titleProducts}
        anchorSection={sectionsData && sectionsData[0].anchorProducts}
        iconSection={sectionsData && sectionsData[0].iconProducts}
      />
    </div>
  );
};

export default Home;
