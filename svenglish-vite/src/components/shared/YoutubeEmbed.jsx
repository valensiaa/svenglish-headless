import React from "react";

const YoutubeEmbed = ({ embedId, videoTitle }) => (
  <div className="c-videos__item bg-navy_blue">
    <iframe
      className="mx-auto"
      width="315"
      height="560"
      src={`https://www.youtube.com/embed/${embedId}`}
      title={`${videoTitle}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  </div>
);

export default YoutubeEmbed;
