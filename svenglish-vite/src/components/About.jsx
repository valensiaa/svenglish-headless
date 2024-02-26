import { useEffect, useState } from "react";

import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";

import { LangReceiver } from "../components/shared/LangReceiver.jsx";
import { MyCustomPortableText } from "./shared/CustomPortableText.jsx";

const builder = imageUrlBuilder(sanityClient);

const AboutSection = ({ titleSection, anchorSection, iconSection }) => {
  const [about, setAbout] = useState(null);

  const lang = LangReceiver();

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
          id={anchorSection}
          className="c-about bg-ivory flex flex-col items-center w-full pb-56 pt-56"
        >
          <div className="container mx-auto">
            {titleSection && (
              <div className="c-about__title">
                <h2 className="text-4xl text-navy_blue lowercase border border-x-0 border-t-0 border-solid border-b-navy_blue pb-[theme(spacing.16)]">
                  {titleSection}
                </h2>
                {/* <img
                  src={iconSection ? setUrl(iconSection).url() : ""}
                  alt={titleSection}
                /> */}
              </div>
            )}
            <div className="c-about__content relative flex items-center flex-col md:flex-row w-full  pt-[theme(spacing.56)]">
              <img
                className="c-about__image max-h-96 md:max-h-80 mb-24 w-full md:w-1/2 md:mb-0 object-cover"
                src={about ? setUrl(about[0].image).url() : ""}
                alt={about[0].image.alt}
              />
              <div>
                <MyCustomPortableText
                  paragraphClasses="c-about__text text-base text-navy_blue font-light leading-8 w-full pl-24"
                  ulClasses="my-[theme(spacing.24)] ml-[theme(spacing.16)]"
                  liClasses="text-base text-navy_blue font-light leading-6 w-full pl-16 max-w-3xl"
                  headerClasses={"font-bold text-navy_blue text-lg max-w-3xl"}
                  value={about[0].content}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AboutSection;
