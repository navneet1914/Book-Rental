import { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

const LicenseDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const license = location.state; // Access the specific license object
  
  if (!license) {
    return <div className="p-4 text-center text-red-500">No license data found</div>; // Handle case where license is not found
  }

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Set to 15 entries per page

  // Calculate the current books based on pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBooks = license.books.slice(startIndex, startIndex + itemsPerPage);

  // Total pages calculation
  const totalPages = Math.ceil(license.books.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-blue-300 py-8">
      <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold mb-2 text-blue-800"> <span className="text-red-800">License Name: </span>{license.licenseName}</h1>
            <h2 className="text-2xl mb-4 text-gray-600 italic">Order Number: {license.orderNumber}</h2>
          </div>
          <button 
            onClick={() => navigate("/")}
            className="mb-4 inline-flex items-center px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Back
          </button>
        </div>
        
        <table className="table-auto w-full bg-gray-100 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-300 text-left">
              <th className="p-3 font-bold text-gray-700">Book Name</th>
              <th className="p-3 font-bold text-gray-700">Is Premium</th>
              <th className="p-3 font-bold text-gray-700">Concurrency</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((book) => (
              <tr key={book._id} className="border-b transition-colors duration-300 hover:bg-gray-50">
                <td className="p-3 text-gray-800">{book.book_name}</td>
                <td className="p-3 text-black bg-white">{book.is_premium ? "Yes" : "No"}</td>
                <td className="p-3 text-gray-800 bg-white">{book.concurrency > 0 ? book.concurrency : "N/A"}</td>
              </tr>
            ))}
            {currentBooks.length === 0 && (
              <tr>
                <td colSpan="3" className="p-3 text-center text-gray-500">No books available for this license.</td>
              </tr>
            )
            }
          </tbody>
        </table>

        {/* Pagination Controls */}
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
      </div>
    </div>
  );
};

export default LicenseDetails;
