import React from "react";
import { GiChickenOven } from "react-icons/gi";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-10 text-white">
      <GiChickenOven className="animate-zoomInOut text-3xl md:text-7xl " />
      <p className="font-bold md:text-3xl">Loading...</p>
    </div>
  );
};

export default Loading;
