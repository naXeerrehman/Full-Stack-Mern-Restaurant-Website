import { React } from "react";

const SearchInput = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search For Foods..."
      className="border-2 text-black px-1 h-10 rounded-md mb-1 md:mb-0"
    />
  );
};

export default SearchInput;
