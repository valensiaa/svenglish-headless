import sanityClient from "../client.js";
import imageUrlBuilder from "@sanity/image-url";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <header className="l-header bg-white">
      <div className="l-header__logo">
        <Link to="/" className="-m-1.5 p-1.5">
          <img
            className="h-8 w-auto"
            src={data ? setUrl(data[0].logotypeDark).url() : ""}
            alt={data ? data[0].title : ""}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
