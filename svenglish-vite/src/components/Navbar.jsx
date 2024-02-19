import React, { useEffect, useState } from "react";

import sanityClient from "../client.js";
import { NavLink, useLocation } from "react-router-dom";

import { getSecondPartUrl } from "../utils/getSecondPartURI.js";

const Navbar = () => {
  const [menu, setMenu] = useState(null);

  const location = useLocation();
  const { pathname } = location;
  let lang = getSecondPartUrl(pathname) === "en" ? "en" : "fr";

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
      <ul className="c-navbar__list flex">
        {menu &&
          menu.map((item) => (
            <li
              key={item._id}
              className="text-navy_blue hover:text-black c-navbar__item"
            >
              <NavLink className="uppercase font-light" to={item.itemAnchorURL}>
                {item.itemTitle}
              </NavLink>
            </li>
          ))}
        <ul className="c-navbar__lang flex pl-[theme(spacing.16)]">
          {lang === "en" ? (
            <li className="c-navbar__lang-item text-navy_blue hover:text-black">
              <NavLink className="uppercase font-light" to="/">
                FR
              </NavLink>
            </li>
          ) : (
            <li className="c-navbar__lang-item text-navy_blue hover:text-black">
              <NavLink className="uppercase font-light" to="/en">
                EN
              </NavLink>
            </li>
          )}
        </ul>
      </ul>
      {/* <FontAwesomeIcon icon={faFacebook} /> */}
    </div>
  );
};

export default Navbar;
