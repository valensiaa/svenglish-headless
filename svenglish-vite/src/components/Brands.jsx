import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import sanityClient from "../client.js";

import { arrayIntoChunks } from "../utils/arrayIntoChunks.js";
import { LangReceiver } from "../components/shared/LangReceiver.jsx";

import imageUrlBuilder from "@sanity/image-url";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { Autoplay } from "swiper/modules";

// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

const builder = imageUrlBuilder(sanityClient);

const BrandsSection = ({ titleSection, anchorSection, iconSection }) => {
  const [brands, setBrands] = useState(null);

  const { lang } = LangReceiver();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == 'brandsSection']{
        _id,
        'anchor': anchor.${lang},
        arrayOfImages
        }`
      )
      .then((data) => setBrands(data))
      .catch(console.error);
  }, [lang]);

  const setUrl = (source) => {
    return builder.image(source);
  };

  const imagesChunks = brands
    ? arrayIntoChunks(brands[0].arrayOfImages, 5)
    : "";

  return (
    <section id={anchorSection} className="c-brands bg-ivory">
      <div className="container mx-auto">
        {titleSection && (
          <div className="c-title-section__wrapper">
            <h2 className="c-brands__title text-4xl text-navy_blue lowercase border border-x-0 border-t-0 border-solid border-b-navy_blue pb-[theme(spacing.16)] flex-auto">
              {titleSection}
            </h2>
            <img
              className="c-title-section__icon"
              src={iconSection ? setUrl(iconSection).url() : ""}
              alt={titleSection}
            />
          </div>
        )}
      </div>
      {imagesChunks &&
        imagesChunks.map((chunk, index) => (
          <Swiper
            className={`swiper-${index} pt-[theme(spacing.56)] c-brands__slider`}
            key={index}
            slidesPerView={2}
            loop={true}
            autoplay={{
              delay: 0,
              reverseDirection: (index + 1) % 2 === 0 ? true : false,
            }}
            speed={3000}
            modules={[Autoplay]}
            breakpoints={{
              640: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          >
            {chunk &&
              chunk.map((item) => (
                <SwiperSlide key={item._key}>
                  <img
                    src={chunk ? setUrl(item).url() : ""}
                    alt="brand"
                    className="c-brands__slide"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        ))}
    </section>
  );
};

export default BrandsSection;

BrandsSection.propTypes = {
  titleSection: PropTypes.string,
  anchorSection: PropTypes.string,
  iconSection: PropTypes.object,
};
