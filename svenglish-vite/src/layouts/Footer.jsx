import sanityClient from "../client.js";
import { useEffect, useState } from "react";
import imageUrlBuilder from "@sanity/image-url";
import { Link } from "react-router-dom";

import { LangReceiver } from "../components/shared/LangReceiver.jsx";
import SocIcons from "./SocIcons.jsx";

const builder = imageUrlBuilder(sanityClient);

const Footer = () => {
  const [data, setData] = useState(null);

  const [email, setEmail] = useState(null);

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
          phoneNumber
        }`
      )
      .then((data) => setData(data))
      .catch(console.error);

    sanityClient
      .fetch(
        `*[_type == 'socIcons']{
        _id,
        gmail
      }`
      )
      .then((data) => setEmail(data))
      .catch(console.error);
  }, []);

  console.log(data, email);

  const setUrl = (source) => {
    return builder.image(source);
  };

  return (
    <footer className="l-footer bg-navy_blue w-full py-[theme(spacing.40)]">
      <div className="container mx-auto">
        <div className="l-footer__wrapper">
          <Link to={lang === "en" ? "/en" : "/"}>
            <img
              className="l-footer__logo-img max-w-48"
              src={data ? setUrl(data[0].logotypeWhite).url() : ""}
              alt="Svenglish"
            />
          </Link>
          <div className="l-footer__contacts">
            {email && (
              <Link
                to={`mailto:${email[0].gmail}`}
                className="l-footer__contacts-email text-white text-600"
              >
                {email[0].gmail}
              </Link>
            )}
            {data && (
              <Link
                to={`tel:${data[0].phoneNumber}`}
                className="l-footer__contacts-phone-number text-white"
              >
                {data[0].phoneNumber}
              </Link>
            )}
          </div>
          <div className="l-footer__socicons">
            <SocIcons />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
