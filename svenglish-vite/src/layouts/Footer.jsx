import sanityClient from "../client.js";
import React, { useEffect, useState } from "react";
import imageUrlBuilder from "@sanity/image-url";
import { Link } from "react-router-dom";

import { LangReceiver } from "../components/shared/LangReceiver.jsx";

const builder = imageUrlBuilder(sanityClient);

const Footer = () => {
  const [data, setData] = useState(null);

  const lang = LangReceiver();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=='siteConfig']{
          _id,
          logotypeWhite{
            asset->{
              _id,
              url
            }
          },
        }`
      )
      .then((data) => setData(data))
      .catch(console.error);
  }, []);

  const setUrl = (source) => {
    return builder.image(source);
  };

  return (
    <footer className="l-footer bg-navy_blue w-full py-[theme(spacing.40)]">
      <div className="container mx-auto">
        <Link to={lang === "en" ? "/en" : "/"}>
          <img
            className="l-footer__logo-img max-w-48"
            src={data ? setUrl(data[0].logotypeWhite).url() : ""}
            alt="Svenglish"
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
