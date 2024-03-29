import { useEffect, useState } from "react";

import sanityClient from "../client.js";
import { Link, NavLink } from "react-router-dom";

import { LangReceiver } from "../components/shared/LangReceiver.jsx";

const Navbar = () => {
  const [menu, setMenu] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [frUrl, setFrUrl] = useState("");
  const [engUrl, setEngUrl] = useState("/en");

  const { lang, pathname } = LangReceiver();

  // Function to handle menu item click
  const handleMenuItemClick = (id) => {
    window.location.hash = String(id); // Update URL hash
  };

  let pathArray = pathname.split("/");

  let slug = null;
  if (pathArray.length > 2) {
    slug = pathArray[pathArray.length - 1];
  }

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

    if (slug !== null) {
      const currentSlugVar = lang === "en" ? "slugEn" : "slug";
      sanityClient
        .fetch(
          `*[_type == "productType" && ${currentSlugVar}.current == "${slug}"]{
            _id,
            slugEn,
            slug
          }`
        )
        .then((data) => {
          setEngUrl(`/en/products/${data[0].slugEn.current}`);
          setFrUrl(`/produits/${data[0].slug.current}`);
        })
        .catch(console.error);
    } else {
      setEngUrl("/en");
      setFrUrl("");
    }
  }, [lang, slug, pathname]);

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
              <NavLink className="uppercase font-light" to={frUrl}>
                FR
              </NavLink>
            </li>
          ) : (
            <li className="c-navbar__lang-item md:text-navy_blue text-ivory hover:text-black px-0">
              <NavLink className="uppercase font-light" to={engUrl}>
                EN
              </NavLink>
            </li>
          )}
        </ul>
      </ul>
    </div>
  );
};

export default Navbar;
