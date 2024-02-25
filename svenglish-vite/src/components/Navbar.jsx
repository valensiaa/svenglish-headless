import React, { useEffect, useState } from "react";

import sanityClient from "../client.js";
import { Link, NavLink } from "react-router-dom";
import { useHashId } from "react-hash-control";

import { LangReceiver } from "../components/shared/LangReceiver.jsx";

const Navbar = () => {
  const [menu, setMenu] = useState(null);
  const lang = LangReceiver();
  const activeId = useHashId();

  // Function to handle menu item click
  const handleMenuItemClick = (id) => {
    window.location.hash = String(id); // Update URL hash
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
      <ul className="c-navbar__list flex">
        {menu &&
          menu.map((item) => (
            <li
              key={item._id}
              className="text-navy_blue hover:text-black c-navbar__item px-8 [&>*:last-child]:pr-8"
            >
              <Link
                className="uppercase font-light"
                to={item.itemAnchorURL}
                onClick={() => handleMenuItemClick(item.itemAnchorURL)}
              >
                {item.itemTitle}
              </Link>
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
