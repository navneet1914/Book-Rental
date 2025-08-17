import React, { useState } from "react";
import BookRow from "./BookRow";
import TableHeader from "./TableHeader";
import Modal from "./Modal";
import { useBooks } from "../../BookContext";
import { useNavigate } from "react-router-dom";

const ConcurrencyBookTable = () => {
  const { books, setBooks } = useBooks();
  const { setFilterType } = useBooks();

  const [isModalOpen, setModalOpen] = useState(false);
  const [bulkConcurrency, setBulkConcurrency] = useState("");
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const updateConcurrency = (bookName, newConcurrency) => {
    setBooks((prevBooks) => {
      const updatedBooks = { ...prevBooks };

      Object.keys(updatedBooks).forEach((key) => {
        if (!isNaN(key) && updatedBooks[key].book_name === bookName) {
          updatedBooks[key] = {
            ...updatedBooks[key],
            concurrency: newConcurrency,
          };
        }
      });

      return updatedBooks;
    });
  };

  const handleBulkEdit = (newConcurrency) => {
    const numericValue = Number(newConcurrency);
    if (!isNaN(numericValue)) {
      setBooks((prevBooks) => {
        const updatedBooks = { ...prevBooks };

        Object.keys(updatedBooks).forEach((key) => {
          if (!isNaN(key) && updatedBooks[key].is_premium) {
            updatedBooks[key] = {
              ...updatedBooks[key],
              concurrency: numericValue,
            };
          }
        });

        return updatedBooks;
      });
    }
  };

  // Calculate the current books based on pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBooks = Object.keys(books)
    .filter((key) => !isNaN(key) && books[key].is_premium) // Filter only premium books
    .slice(startIndex, startIndex + itemsPerPage);

  // Total pages calculation
  const totalPages = Math.ceil(
    Object.keys(books).filter((key) => !isNaN(key) && books[key].is_premium).length / itemsPerPage
  );

  const handleSave = () => {
    const hasEmptyConcurrency = Object.keys(books).some((key) => {
      return books[key].is_premium && (books[key].concurrency === "" || books[key].concurrency === undefined);
    });

    if (hasEmptyConcurrency) {
      alert("Please fill in the concurrency for all premium books before saving.");
      return; // Prevent save if any concurrency is empty
    }

    // Proceed with the save action if all fields are valid
    setFilterType("premium");
    navigate("/form");
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-r from-gray-100 to-gray-200">
      {/* Header */}
      <header className="flex justify-between items-center border-b border-gray-300 p-6 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
        <h1 className="text-2xl font-bold text-white">View/Edit DRM Policies</h1>
        <div className="flex gap-x-3">
          <button
            onClick={handleSave}
            className="bg-white text-blue-600 font-semibold px-5 py-2 rounded shadow hover:bg-gray-100 transition duration-200"
          >
            Save
          </button>
        </div>
      </header>

      {/* Action Buttons */}
      <div className="flex justify-end p-6 bg-white shadow">
        <button
          className="bg-green-500 text-white font-semibold px-5 py-2 rounded shadow hover:bg-green-600 transition duration-200"
          onClick={() => setModalOpen(true)}
        >
          Bulk Edit
        </button>
        <button className="bg-blue-500 text-white font-semibold px-5 py-2 rounded shadow hover:bg-blue-600 transition duration-200 ml-4">
          DOWNLOAD AS CSV
        </button>
      </div>

      {/* Table */}
      <div className="flex-grow w-full overflow-auto p-6">
        <TableHeader />

        <div className="mt-4 grid grid-cols-1 gap-4">
          {currentBooks.map((key) => (
            <BookRow
              key={books[key].book_name} // Use the book's name as a key
              book={books[key]} // Pass the book object
              onUpdateConcurrency={(newConcurrency) =>
                updateConcurrency(books[key].book_name, newConcurrency)
              } // Pass book name and concurrency for update
            />
          ))}
        </div>
      </div>

      {/* Pagination */}
    
      <div className="flex justify-between items-center p-6 bg-white">
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className={`bg-gray-300 text-gray-600 font-semibold px-5 py-2 rounded shadow hover:bg-gray-400 transition duration-200 ${
      currentPage === 1 ? 'hidden' : ''
    }`}
  >
    Previous
  </button>

  <span className="flex-grow text-center">
    Page {currentPage} of {totalPages}
  </span>

  <button
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
    className={`bg-gray-300 text-gray-600 font-semibold px-5 py-2 rounded shadow hover:bg-gray-400 transition duration-200 ${
      currentPage === totalPages ? 'hidden' : ''
    }`}
  >
    Next
  </button>
</div>



      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleBulkEdit}
        value={bulkConcurrency}
        setValue={setBulkConcurrency}
      />
    </div>
  );
};

export default ConcurrencyBookTable;
