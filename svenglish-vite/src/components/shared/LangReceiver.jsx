import { useLocation } from "react-router-dom";
import { getSecondPartUrl } from "../../utils/getSecondPartURI.js";

export const LangReceiver = () => {
  const location = useLocation();

  const { pathname } = location;
  let lang = getSecondPartUrl(pathname) === "en" ? "en" : "fr";
  return { lang, pathname };
};
