import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId, videoTitle }) => (
  <div className="c-videos__item bg-ivory">
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

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string,
  videoTitle: PropTypes.string,
};
