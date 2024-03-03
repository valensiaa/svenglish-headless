import { useState } from "react";
import PropTypes from "prop-types";
import sanityClient from "../../client.js";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);

const YoutubeEmbed = ({ embedId, videoTitle, videoPoster, playIcon }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleClick = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  const setUrl = (source) => {
    return builder.image(source);
  };

  const urlAutoplay = isVideoPlaying ? "?autoplay=1" : "";

  return (
    <div
      className={`c-videos__item bg-ivory relative ${
        isVideoPlaying ? "hidden" : ""
      }`}
    >
      {videoPoster && (
        <>
          <img
            src={videoPoster ? setUrl(videoPoster).url() : ""}
            alt={videoTitle}
            onClick={handleClick}
            className="c-videos__item-poster cursor-pointer object-cover"
          />
          <img
            src={playIcon ? setUrl(playIcon).url() : ""}
            className="c-videos__play-icon"
          />
        </>
      )}
      <iframe
        className="mx-auto"
        width="315"
        height="560"
        src={`https://www.youtube.com/embed/${embedId}${urlAutoplay}`}
        title={`${videoTitle}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YoutubeEmbed;

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string,
  videoTitle: PropTypes.string,
  videoPoster: PropTypes.object,
  playIcon: PropTypes.object,
};
