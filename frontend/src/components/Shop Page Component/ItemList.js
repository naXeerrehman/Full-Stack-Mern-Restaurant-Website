import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryDropdown from "../Shop Page Component/CategoryDropdown";
import { jwtDecode } from "jwt-decode";
import FastFood6 from "../../assets/FastFood6.jpg";
import SearchInput from "./SearchInput";
import PaginationButton from "./PaginationButton";
import ItemCard from "../Shop Page Component/ItemCard";
import MenuDetailButton from "./MenuDetailButton";
import Loading from "../Loading";
import "../../App.css";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ type: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const itemsPerPage = 6;

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const itemResponse = await axios.get(`${BACKEND_URL}/api/items`);
      setItems(itemResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/items/${itemId}`);
      setDeleteSuccess("Item deleted successfully!");
      setTimeout(() => {
        setDeleteSuccess("");
      }, 3000);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const filteredItems = items.filter((item) => {
    const itemName = item.name || "";
    return (
      itemName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.type === "" ||
        itemName.toLowerCase() === filters.type.toLowerCase())
    );
  });

  // Pagination logic
  const handleFilterChange = (selectedValue) => {
    setFilters({ type: selectedValue || "" });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Adminship logic
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
      try {
        const decodedToken = jwtDecode(token);
        setIsAdmin(decodedToken.isAdmin);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div>
      {/* Background Image */}
      <div className="fixed inset-0">
        <img src={FastFood6} alt="FastFood_image" className="w-full h-full" />
      </div>
      {/* Content Container */}
      <div className="relative pb-4 md:pt-8 lg:pt-3 ml-0 px-1">
        {/* Search */}
        <div className="flex justify-between md:items-center md:justify-start lg:flex-row lg:gap-x-3 md:ml-3 md:gap-x-2 lg:ml-[130px] items-end mb-1 md:mb-5 pt-6">
          <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {/* Filter and Menu */}
          <div className="flex flex-col md:flex-row md:gap-x-2 items-center space-y-1">
            <CategoryDropdown
              apiUrl={`http://localhost:5000/api/categories`}
              placeholder="Select Category"
              onFilterChange={handleFilterChange}
            />
            <MenuDetailButton />
          </div>
        </div>
        {deleteSuccess && (
          <div className="bg-red-500 w-[230px] md:w-[290px] mx-auto text-white text-center text-lg md:text-2xl px-1 rounded-md mb-4">
            {deleteSuccess}
            Item deleted successfully
          </div>
        )}
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <ItemCard
              currentItems={currentItems}
              isLoggedIn={isLoggedIn}
              isAdmin={isAdmin}
              handleDeleteItem={handleDeleteItem}
            />

            <PaginationButton
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              paginate={paginate}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ItemList;
