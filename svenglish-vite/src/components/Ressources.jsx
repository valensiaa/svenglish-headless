import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { register } from "swiper/element/bundle";
register();

import YoutubeEmbed from "./shared/YoutubeEmbed";
import { getYoutubeIdFromUrl } from "../utils/getYoutubeIdFromUrl.js";
const builder = imageUrlBuilder(sanityClient);

const RessourcesSection = ({ titleSection, anchorSection, iconSection }) => {
  const [ressources, setRessources] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=='videoType']{
            _id,
            videoTitle,
            videoLink,
            videoImage{
              asset->{
                _id,
                url
              }
            }
        }`
      )
      .then((data) => setRessources(data))
      .catch(console.error);
  }, []);

  const setUrl = (source) => {
    return builder.image(source);
  };

  return (
    <section
      className="c-videos bg-ivory py-[theme(spacing.56)]"
      id={anchorSection}
    >
      <div className="container mx-auto">
        {titleSection && (
          <div className="c-title-section__wrapper">
            <h2 className="c-videos__title text-4xl  text-navy_blue lowercase border border-x-0 border-t-0 border-solid border-b-navy_blue pb-[theme(spacing.16)] flex-auto">
              {titleSection}
            </h2>
            <img
              className="c-title-section__icon"
              src={iconSection ? setUrl(iconSection).url() : ""}
              alt={titleSection}
            />
          </div>
        )}
        {ressources && (
          <Swiper
            className="pt-[theme(spacing.56)] mt-[theme(spacing.40)] bg-ivory"
            slidesPerView={1}
            spaceBetween={30}
            modules={[Pagination]}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              979: {
                slidesPerView: 3,
              },
              767: {
                slidesPerView: 2,
              },
            }}
          >
            {ressources.map((item) => (
              <SwiperSlide key={item._id} className="mb-[theme(spacing.56)]">
                <YoutubeEmbed
                  embedId={getYoutubeIdFromUrl(item.videoLink)}
                  videoTitle={item.videoTitle}
                  videoPoster={item.videoImage && item.videoImage}
                  playIcon={iconSection && iconSection}
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

RessourcesSection.propTypes = {
  titleSection: PropTypes.string,
  anchorSection: PropTypes.string,
  iconSection: PropTypes.object,
};
