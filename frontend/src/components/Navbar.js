import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaHome, FaAddressCard } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";
import { GiChickenOven } from "react-icons/gi";
import { IoLogIn } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FaPhoneVolume } from "react-icons/fa6";
import Hinkley_Beanery from "../assets/Hinckley_Beanery.png";
import axios from "axios";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const BACKEND_URL =
    process.env.REACT_DEPLOYED_APP_BACKEND_URL ||
    process.env.REACT_APP_BACKEND_URL;
  // Adminship verification
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoggedIn(false);
        setIsAdmin(false);
        return;
      }

      try {
        // First verify with backend
        const response = await axios.post(
          `${BACKEND_URL}/api/auth/verify-token`,
          { token }
        );

        if (response.data.valid) {
          // Then decode the token locally
          const decodedToken = jwtDecode(token);
          setIsLoggedIn(true);
          setIsAdmin(decodedToken.isAdmin || false);
        } else {
          // Token is invalid, clear it
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setIsLoggedIn(false);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    };

    verifyToken();
  }, []);

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      className="sticky top-0 z-50 bg-red-600 text-white w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex justify-between mx-auto px-4 lg:px-8">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <NavLink to="/" W>
            <img
              src={Hinkley_Beanery || "/placeholder.svg"}
              alt="Hinkley Beanery"
              className="h-[70px] w-auto"
            />
          </NavLink>
        </div>

        {/* Use for Hamburger button on small screens */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
            // onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FaTimes className="h-6 w-6" aria-hidden="true" />
            ) : (
              <FaBars className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Navbar display on large screens  */}
        <div className="hidden lg:flex lg:items-center lg:space-x-4">
          <NavLinks />
        </div>
      </div>

      {/* Used for displaying navlinks in column on small screen*/}
      <div className={`${isMenuOpen ? "" : "hidden"} lg:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <NavLinks />
        </div>
      </div>
    </nav>
  );
};

const NavLinks = ({ isLoggedIn, isAdmin, handleLinkClick }) => {
  const linkClass =
    "hover:font-bold text-center text-lg md:text-2xl text-white block px-1 py-1 rounded-md font-medium";
  const activeLinkClass =
    "border border-2 w-fit mx-auto text-center text-lg text-white block px-3 py-1 rounded-md font-medium";

  return (
    <>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
      >
        <FaHome className="inline-block mr-2" />
        Home
      </NavLink>
      {isLoggedIn && isAdmin && (
        <NavLink
          to="/AdminPanelPage"
          className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
        >
          <MdAdminPanelSettings className="inline-block mr-2" />
          Admin Panel
        </NavLink>
      )}
      <NavLink
        to="/Shop"
        className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
      >
        <GiChickenOven className="inline-block mr-2" />
        Menu
      </NavLink>
      <NavLink
        to="/About"
        className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
      >
        <FaAddressCard className="inline-block mr-2" />
        About
      </NavLink>
      <NavLink
        to="/ContactPage"
        className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
      >
        <FaPhoneVolume className="inline-block mr-2" />
        Contact
      </NavLink>

      {isLoggedIn ? (
        <NavLink
          to="/LogOutPage"
          className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
        >
          <RiLogoutBoxFill className="inline-block mr-2" />
          Log out
        </NavLink>
      ) : (
        <NavLink
          to="/LoginPage"
          className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
        >
          <IoLogIn className="inline-block mr-2" />
          Log in
        </NavLink>
      )}
    </>
  );
};

export default Navbar;
