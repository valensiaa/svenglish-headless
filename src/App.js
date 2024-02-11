import "./App.css";
import { useEffect, useState } from "react";

import sanityClient from "./client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);

function App() {
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
    <div className="App">
      <header className="l-header">
        <img
          src={data ? setUrl(data[0].logotypeDark).url() : ""}
          alt={data ? data[0].title : ""}
        />
      </header>
    </div>
  );
}

export default App;
