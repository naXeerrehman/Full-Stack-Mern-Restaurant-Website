import React from "react";
import { Link } from "react-router-dom";
const MenuDetailButton = () => {
  return (
    <Link
      to="/Menu"
      className="bg-green-500 w-[98%] md:w-[250px] lg:w-[240px] rounded-md text-white py-1.5 px-2 relative md:text-xl text-center hover:shadow-2xl hover:shadow-white lg:mb-1/2"
    >
      View All Menus
    </Link>
  );
};

export default MenuDetailButton;
