import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Pagination, Grid } from "swiper/modules";
import { register } from "swiper/element/bundle";
register();

import { LangReceiver } from "../components/shared/LangReceiver.jsx";
import { MyCustomPortableText } from "./shared/CustomPortableText.jsx";
const builder = imageUrlBuilder(sanityClient);

const ReviewsSection = ({ titleSection, anchorSection, iconSection }) => {
  const [reviews, setReviews] = useState(null);

  const lang = LangReceiver();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=='reviewType']{
            _id,
        "reviewContent": reviewContent.${lang},
        }`
      )
      .then((data) => setReviews(data))
      .catch(console.error);
  }, [lang]);

  const setUrl = (source) => {
    return builder.image(source);
  };

  return (
    <section
      className="c-reviews bg-ivory pt-[theme(spacing.56)]"
      id={anchorSection}
    >
      <div className="container mx-auto">
        {titleSection && (
          <div className="c-title-section__wrapper">
            <h2 className="c-reviews__title text-4xl text-navy_blue lowercase border border-x-0 border-t-0 border-solid border-b-navy_blue pb-[theme(spacing.16)] flex-auto">
              {titleSection}
            </h2>
            <img
              className="c-title-section__icon"
              src={iconSection ? setUrl(iconSection).url() : ""}
              alt={titleSection}
            />
          </div>
        )}

        {reviews && (
          <Swiper
            className="pt-[theme(spacing.56)]"
            slidesPerView={2}
            grid={{
              fill: "row",
              rows: 3,
            }}
            modules={[Grid, Pagination]}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="c-reviews__wrapper">
                  {review.reviewContent && (
                    <MyCustomPortableText
                      paragraphClasses="text-base text-navy_blue font-light w-full p-24 text-center"
                      ulClasses="my-[theme(spacing.24)]"
                      liClasses="text-ivory ml-3 text-sm font-light"
                      headerClasses={"font-bold text-ivory text-lg"}
                      value={review.reviewContent}
                    />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};
export default ReviewsSection;

ReviewsSection.propTypes = {
  titleSection: PropTypes.string,
  anchorSection: PropTypes.string,
  iconSection: PropTypes.object,
};
