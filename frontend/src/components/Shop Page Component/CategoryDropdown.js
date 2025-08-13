import { useState, useEffect } from "react";
import axios from "axios";

const CategoryDropDown = ({ apiUrl, placeholder, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiUrl);
        setCategories(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [apiUrl]);

  const handleOptionClick = (value) => {
    setSelectedValue(value);
    onFilterChange(value);
    setIsOpen(false);
  };

  return (
    <div
      className="relative inline-block text-center md:mt-2 md:w-[220px] mb-1"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Dropdown button */}
      <button
        className={`border px-2 py-2 lg:py-1.5 lg:mb-1 text-lg rounded-md bg-red-600 text-white w-full text-center hover:shadow-2xl hover:shadow-white transition-all duration-300 ${
          loading ? "opacity-70" : ""
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        disabled={loading}
      >
        {loading ? "Loading..." : selectedValue || placeholder}
      </button>

      {error && <div className="text-red-500 text-sm mt-1">Error: {error}</div>}

      {/* Dropdown menu */}
      <div
        className={`absolute left-0 w-full bg-white border rounded-md shadow-lg z-10 transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <ul className="py-1 text-2xl">
          <li
            onClick={() => handleOptionClick(null)}
            className="px-4 py-2 hover:bg-red-600 hover:text-white cursor-pointer transition-colors duration-200"
          >
            All
          </li>
          {categories.map((category) => (
            <li
              key={category._id}
              onClick={() => handleOptionClick(category.label)}
              className="px-4 py-2 hover:bg-red-600 hover:text-white cursor-pointer transition-colors duration-200"
            >
              {category.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryDropDown;
