import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const TopUp = () => {
  const [opacity, setOpacity] = useState(0);

  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    window.onscroll = () => {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        setOpacity(1);
      } else {
        setOpacity(0);
      }
    };
  }, []);

  return (
    <div
      className={`c-topup flex cursor-pointer shadow-lg shadow-navy_blue-500/40 ${
        opacity === 0 ? "opacity-0" : "opacity-100"
      }`}
      id="scrollTop"
      onClick={scrollToTop}
    >
      <FontAwesomeIcon icon={faAngleUp} />
    </div>
  );
};

export default TopUp;
