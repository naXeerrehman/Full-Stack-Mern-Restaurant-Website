import React from "react";

const PaginationButton = ({
  currentPage,
  totalPages,
  paginate,
  setCurrentPage,
}) => {
  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-red-600 text-white rounded-md mx-2 disabled:opacity-50"
      >
        Previous
      </button>

      {[...Array(totalPages).keys()].map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => paginate(pageNumber + 1)}
          className={`px-4 py-2 mx-1 rounded-md ${
            currentPage === pageNumber + 1
              ? "bg-white text-black border"
              : "bg-gray-300"
          }`}
        >
          {pageNumber + 1}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-red-600 text-white rounded-md mx-2 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButton;
