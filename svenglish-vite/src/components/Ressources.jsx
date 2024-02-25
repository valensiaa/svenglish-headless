import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { register } from "swiper/element/bundle";
register();

import YoutubeEmbed from "./shared/YoutubeEmbed";
import { getYoutubeIdFromUrl } from "../utils/getYoutubeIdFromUrl.js";

const RessourcesSection = ({ titleSection, anchorSection, iconSection }) => {
  const [ressources, setRessources] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=='videoType']{
            _id,
            videoTitle,
            videoLink,
        }`
      )
      .then((data) => setRessources(data))
      .catch(console.error);
  }, []);

  return (
    <section
      className="c-videos bg-ivory py-[theme(spacing.56)]"
      id={anchorSection}
    >
      <div className="container mx-auto">
        {titleSection && (
          <h2 className="c-videos__title text-4xl text-navy_blue lowercase border border-x-0 border-t-0 border-solid border-b-navy_blue pb-[theme(spacing.16)]">
            {titleSection}
          </h2>
        )}
        {ressources && (
          <Swiper
            className="mt-[theme(spacing.56)] bg-ivory"
            slidesPerView={1}
            spaceBetween={30}
            modules={[Pagination]}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              768: {
                slidesPerView: 3,
              },
            }}
          >
            {ressources.map((item) => (
              <SwiperSlide key={item._id} className="mb-[theme(spacing.56)]">
                <YoutubeEmbed
                  embedId={getYoutubeIdFromUrl(item.videoLink)}
                  videoTitle={item.videoTitle}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};
export default RessourcesSection;
