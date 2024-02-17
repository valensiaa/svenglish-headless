import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import { Link, useLocation } from "react-router-dom";

import { getSecondPartUrl } from "../utils/getSecondPartURI.js";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);

const HeroSection = () => {
  const [hero, setHero] = useState(null);

  const location = useLocation();
  const { pathname } = location;
  let lang = getSecondPartUrl(pathname) === "en" ? "en" : "fr";

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == 'heroSection']{
        _id,
            "title": title.${lang},
            "content": content.${lang},
            "cta": cta.${lang},
            ctaLink,
            image{
                asset->{    
                _id,
                url
                },
                alt
            }
        }`
      )
      .then((data) => setHero(data))
      .catch(console.error);
  }, [lang]);

  const setUrl = (source) => {
    return builder.image(source);
  };

  return (
    <>
      {hero && (
        <section
          className="c-hero bg-ivory flex flex-col items-center w-full pb-[theme(spacing.56)] pt-[theme(spacing.56)]"
          style={{
            backgroundImage: `url(${
              hero[0] ? setUrl(hero[0].image).url() : ""
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          <div className="container">
            <div className="c-hero__content relative flex flex-col items-start w-full max-w-3xl">
              <h1 className="c-hero__title text-4xl font-bold text-ivory text-5xl lowercase">
                {hero[0].title}
              </h1>
              <p className="c-hero__text text-lg font-light text-left text-ivory text-2xl py-[theme(spacing.40)]">
                {hero[0].content[0].children[0].text}
              </p>
              <Link
                to={hero[0].ctaLink}
                className="c-hero__cta text-ivory text-2xl font-light py-3 px-6 mt-4 lowercase"
              >
                {hero[0].cta}
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default HeroSection;
