import { useEffect, useState } from "react";

import sanityClient from "../client.js";
import { Link } from "react-router-dom";

import { LangReceiver } from "../components/shared/LangReceiver.jsx";

const Navbar = () => {
  const [menu, setMenu] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lang = LangReceiver();

  // Function to handle menu item click
  const handleMenuItemClick = (id) => {
    window.location.hash = String(id); // Update URL hash
  };

  const addURLToHref = (url) => {
    window.location.href = url; // Update URL href
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == 'itemMenu']{
          _id,
          "itemAnchorURL": itemAnchorURL.${lang},
          "itemTitle": itemTitle.${lang}
        }`
      )
      .then((data) => setMenu(data))
      .catch(console.error);
  }, [lang]);

  return (
    <div className="c-navbar flex-auto flex justify-end items-center">
      <div
        className={`c-navbar__burger absolute flex md:hidden cursor-pointer ${
          isMenuOpen ? "close" : ""
        }`}
        onClick={() => toggleMenu()}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul
        className={`c-navbar__list flex flex-col md:flex-row absolute md:relative bg-navy_blue  md:bg-ivory py-40 md:py-0 ${
          isMenuOpen ? "show" : ""
        }`}
      >
        {menu &&
          menu.map((item) => (
            <li
              key={item._id}
              className="md:text-navy_blue text-ivory hover:text-black c-navbar__item px-16 md:px-8 md:[&>*:last-child]:pr-8"
            >
              <Link
                className="uppercase font-light"
                to={
                  lang === "fr"
                    ? `/${item.itemAnchorURL}`
                    : `/${lang}/${item.itemAnchorURL}`
                }
                onClick={() => handleMenuItemClick(item.itemAnchorURL)}
              >
                {item.itemTitle}
              </Link>
            </li>
          ))}
        <ul className="c-navbar__lang flex px-16 md:pl-[theme(spacing.16)] md:pr-0">
          {lang === "en" ? (
            <li className="c-navbar__lang-item md:text-navy_blue text-ivory hover:text-black px-0">
              <span
                className="uppercase font-light"
                onClick={() => addURLToHref("/")}
              >
                FR
              </span>
            </li>
          ) : (
            <li
              className="c-navbar__lang-item md:text-navy_blue text-ivory hover:text-black pl
            x-0"
            >
              <span
                className="uppercase font-light"
                onClick={() => addURLToHref("/en")}
              >
                EN
              </span>
            </li>
          )}
        </ul>
      </ul>
    </div>
  );
};

export default Navbar;
