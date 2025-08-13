import React, { useState } from "react";
import { FaUserTie } from "react-icons/fa6";
import RegisteredUsers from "../Authentication Components/RegisteredUsers";
import UploadItem from "../Admin Panel Components/Item Crud/UploadItem";
import CategoryManager from "../Admin Panel Components/CategoryManager";
import SocialMediaIconManagement from "../Admin Panel Components/SocialMediaIconManagement";
import ReservationWebsiteIcon from "../Admin Panel Components/ReservationWebsiteIcon";
import DisplayMessage from "../Admin Panel Components/DisplayMessage";
import FastFood6 from "../../assets/FastFood6.jpg";
import OrderingWebsiteIcon from "../Admin Panel Components/OrderingWebsiteIcon";
import UploadMenu from "../Admin Panel Components/Menu Crud/UploadMenu";

const AdminPanel = () => {
  const [activeComponent, setActiveComponent] = useState("DisplayMessage");

  // Map for components to render dynamically
  const componentsMap = {
    RegisteredUsers: <RegisteredUsers />,
    UploadItem: <UploadItem />,
    CategoryManager: <CategoryManager />,
    SocialMediaIconManagement: <SocialMediaIconManagement />,
    ReservationWebsiteIcon: <ReservationWebsiteIcon />,
    DisplayMessage: <DisplayMessage />,
    OrderingWebsiteIcon: <OrderingWebsiteIcon />,
    UploadMenu: <UploadMenu />,
  };

  return (
    <div>
      {/* Background Image */}
      <div className="fixed w-full">
        <img src={FastFood6} alt="FastFood_image" className="w-full h-screen" />
      </div>

      <div className="relative py-10 px-5 lg:px-20">
        {/* Admin Panel Heading */}
        <h1 className="text-4xl bg-white text-red-600 mx-auto text-center rounded-md font-bold lg:ml-[45%] lg:w-[450px] md:text-5xl md:py-1 md:w-[400px] relative lg:top-[30px] lg:px-20 mb-6">
          Admin Panel
        </h1>

        <div className="flex flex-col lg:flex-row gap-x-5">
          {/* Left Section */}
          <div className="flex flex-col lg:-mt-[50px]">
            <div className="border-2 border-white flex flex-col items-center bg-white w-full mx-auto rounded-md mb-5 ">
              <div className="mt-5">
                <FaUserTie className="text-7xl text-red-600 mx-auto md:text-9xl" />
                <h1 className="text-center text-2xl text-red-600 md:text-5xl lg:text-3xl font-bold">
                  Admin: Adrian Venoin
                </h1>
              </div>
            </div>
            <div className="flex flex-col space-y-2 md:text-3xl lg:text-xl">
              {[
                { label: "Upload Food", value: "UploadItem" },
                { label: "Category Manager", value: "CategoryManager" },
                { label: "Upload Menu", value: "UploadMenu" },
                {
                  label: "Social Media Icon Management",
                  value: "SocialMediaIconManagement",
                },
                {
                  label: "Reservation Website Icon",
                  value: "ReservationWebsiteIcon",
                },
                {
                  label: "Ordering Website Icon",
                  value: "OrderingWebsiteIcon",
                },
                { label: "Registered Users", value: "RegisteredUsers" },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => setActiveComponent(item.value)}
                  className={`border-2 border-white text-white px-4 py-2 ${
                    activeComponent === item.value
                      ? "border-r-[10px] font-semibold bg-red-600"
                      : "bg-transparent"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 -mt-[5px]">
            {componentsMap[activeComponent]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
