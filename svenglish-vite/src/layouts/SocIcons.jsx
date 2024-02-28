import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faSquareInstagram,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

const SocIcons = () => {
  const [icons, setIcons] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == 'socIcons']`)
      .then((data) => setIcons(data))
      .catch(console.error);
  }, []);

  return (
    <div className="c-soc-icons flex">
      {icons && (
        <div className="c-soc-icons__wrapper">
          {icons[0].whatsapp && (
            <Link
              to={icons[0].whatsapp}
              className="c-soc-icons__item shadow-lg shadow-navy_blue-500/40"
            >
              <FontAwesomeIcon icon={faWhatsapp} />
            </Link>
          )}

          {icons[0].facebook && (
            <Link
              to={icons[0].facebook}
              className="c-soc-icons__item shadow-lg shadow-navy_blue-500/40 "
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </Link>
          )}

          {icons[0].gmail && (
            <Link
              to={`mailto:${icons[0].gmail}`}
              className="c-soc-icons__item  shadow-lg shadow-navy_blue-500/40"
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </Link>
          )}

          {icons[0].instagram && (
            <Link
              to={icons[0].instagram}
              className="c-soc-icons__item  shadow-lg shadow-navy_blue-500/40"
            >
              <FontAwesomeIcon icon={faSquareInstagram} />
            </Link>
          )}

          {icons[0].youtube && (
            <Link
              to={icons[0].youtube}
              className="c-soc-icons__item  shadow-lg shadow-navy_blue-500/40"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default SocIcons;
