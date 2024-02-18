import React, { useRef, useEffect, useState } from "react";
import sanityClient from "../client.js";
import { useLocation } from "react-router-dom";

import { getSecondPartUrl } from "../utils/getSecondPartURI.js";
import imageUrlBuilder from "@sanity/image-url";

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";

// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

const builder = imageUrlBuilder(sanityClient);

const BrandsSection = () => {
  const progressContent = useRef(null);

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

  return (
    <section id={brands && brands[0].anchor} className="c-brands bg-ivory">
      <Swiper
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 0,
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
        {brands &&
          brands[0].arrayOfImages.map((item) => (
            <SwiperSlide key={item._key}>
              <img
                src={brands ? setUrl(item).url() : ""}
                alt="brand"
                className="c-brands__slide"
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default BrandsSection;
