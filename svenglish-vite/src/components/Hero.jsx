import { useEffect, useState } from "react";
import sanityClient from "../client.js";
import { Link } from "react-router-dom";

import { LangReceiver } from "../components/shared/LangReceiver.jsx";
import imageUrlBuilder from "@sanity/image-url";
import { MyCustomPortableText } from "../components/shared/CustomPortableText.jsx";

const builder = imageUrlBuilder(sanityClient);

const HeroSection = () => {
  const [hero, setHero] = useState(null);

  const lang = LangReceiver();

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
                }
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
          className="c-hero bg-ivory flex flex-col items-center w-full pb-[theme(spacing.72)] pt-[theme(spacing.72)]"
          style={{
            background: hero[0].image
              ? `url(${setUrl(hero[0].image).url()})`
              : "#365b6d",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          <div className="container">
            <div className="c-hero__content relative flex flex-col items-start w-full max-w-2xl">
              <h1 className="c-hero__title font-bold text-ivory text-5xl lowercase">
                {hero[0].title}
              </h1>
              <div>
                <MyCustomPortableText
                  paragraphClasses="c-hero__text text-lg font-light text-left text-ivory py-[theme(spacing.40)]"
                  ulClasses="my-[theme(spacing.24)] ml-[theme(spacing.16)]"
                  liClasses="text-lg text-ivory font-light leading-6 w-full pl-16 max-w-3xl"
                  headerClasses="font-bold text-ivory text-lg max-w-3xl"
                  value={hero[0].content}
                />
              </div>
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
