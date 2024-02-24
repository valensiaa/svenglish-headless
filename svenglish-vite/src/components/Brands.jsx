import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import { useLocation } from "react-router-dom";

import { getSecondPartUrl } from "../utils/getSecondPartURI.js";
import { arrayIntoChunks } from "../utils/arrayIntoChunks.js";
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

const BrandsSection = () => {
  const [brands, setBrands] = useState(null);

  const location = useLocation();
  const { pathname } = location;
  let lang = getSecondPartUrl(pathname) === "en" ? "en" : "fr";

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
    <section id="anchor" className="c-brands bg-ivory">
      {imagesChunks &&
        imagesChunks.map((chunk, index) => (
          <Swiper
            className={`swiper-${index}`}
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
