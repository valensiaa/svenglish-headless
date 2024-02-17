import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";

import { getSecondPartUrl } from "../utils/getSecondPartURI.js";

const builder = imageUrlBuilder(sanityClient);

const AboutSection = () => {
  const [about, setAbout] = useState(null);

  const location = useLocation();
  const { pathname } = location;
  let lang = getSecondPartUrl(pathname) === "en" ? "en" : "fr";

  const toLowerCb = (str) => {
    return str.toLowerCase();
  };

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == 'aboutSection']{
        _id,
        "anchor": anchor.${lang},
        "content": content.${lang},
        image{
            asset->{    
            _id,
            url
            },
            alt
            }
        }`
      )
      .then((data) => setAbout(data))
      .catch(console.error);
  }, [lang]);

  const setUrl = (source) => {
    return builder.image(source);
  };

  return (
    <>
      {about && (
        <section
          id={toLowerCb(about[0].anchor)}
          className="c-about bg-ivory flex flex-col items-center w-full pb-40 pt-40"
        >
          <div className="container">
            <div className="c-about__content relative flex items-center w-full">
              <img
                className="c-about__image max-h-80"
                src={about ? setUrl(about[0].image).url() : ""}
                alt={about[0].image.alt}
              />
              <p className="c-about__text text-base text-navy_blue font-light leading-8 w-full pl-24">
                {about[0].content[0].children[0].text}
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AboutSection;
