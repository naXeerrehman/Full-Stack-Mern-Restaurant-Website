import React from "react";
import { Link } from "react-router-dom";

const FoodCard = ({ currentItems, isLoggedIn, isAdmin, handleDeleteItem }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 px-1 gap-x-1 sm:px-36 md:px-4 lg:px-32 mx-auto gap-y-2 md:gap-3">
      {currentItems.map((item) => (
        <div
          key={item._id}
          className="border-2 hover:border-red-600 hover:shadow-red-600 hover:shadow-2xl p-2 rounded-md shadow-md transition-shadow"
        >
          <img
            src={
              item.imageUrls && item.imageUrls[0]
                ? item.imageUrls[0]
                : "placeholder-image-url"
            }
            alt={`${item.name} - ${item.price}`}
            className="w-full h-[100px] lg:h-[150px] md:h-[200px] rounded-md mb-2 px-2"
          />
          <div className="text-white flex justify-between md:text-2xl">
            <p className="text-md font-semibold">{item.name}</p>
            <p className="text-md font-bold">Price: £{item.price}</p>
          </div>
          {isLoggedIn && isAdmin && (
            <div className="mt-1 space-x-2 flex flex-wrap items-center">
              <Link
                to={`/EditItemPage/${item._id}`}
                className="bg-yellow-500 text-white px-4 py-1 rounded-md"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDeleteItem(item._id)}
                className="bg-red-600 text-white px-4 py-1 rounded-md"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FoodCard;
