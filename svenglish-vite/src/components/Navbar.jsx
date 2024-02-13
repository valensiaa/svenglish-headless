import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="c-navbar flex-auto flex justify-end items-center">
      <ul className="c-navbar__list flex">
        <li className="c-navbar__item px-[theme(spacing.8)] text-navy_blue hover:text-black">
          <NavLink className="uppercase font-light" to="/">
            apropos
          </NavLink>
        </li>
        <li className="c-navbar__item px-[theme(spacing.8)] text-navy_blue hover:text-black">
          <NavLink to="/produits">PRODUITS</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
