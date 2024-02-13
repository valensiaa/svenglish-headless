import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";

const builder = imageUrlBuilder(sanityClient);

const Header = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "siteSettings"]{
          title,
      logotypeDark{
        asset->{
          _id,
          url
        },
        alt
      }
    }`
      )
      .then((data) => setData(data))
      .catch(console.error);
  });

  const setUrl = (source) => {
    return builder.image(source);
  };

  return (
    <header className="l-header bg-ivory">
      <div className="container mx-auto flex">
        <div className="w-full flex py-4">
          <NavLink to="/">
            <img
              className="l-header__logo-img"
              src={data ? setUrl(data[0].logotypeDark).url() : ""}
              alt={data ? data[0].title : ""}
            />
          </NavLink>
          {<Navbar />}
        </div>
      </div>
    </header>
  );
};

export default Header;
