import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Import delete icon
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosConfig";


export default function Home() {
  const navigate = useNavigate();
  const [licenses, setLicenses] = useState([]); // State to hold licenses

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set to 10 entries per page

  const navigater = () => {
    navigate("/form");
  };

  // Fetch licenses on component mount
  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const response = await axiosInstance.get("http://localhost:5000/api/v1/licenses");
        setLicenses(response.data); // Set the fetched licenses to state
      } catch (error) {
        console.error("Error fetching licenses:", error);
      }
    };

    fetchLicenses();
  }, []); // Empty dependency array to run only on mount

  const handleLicenseClick = (license) => {
    navigate('/entitlements', { state: license }); // Pass the specific license object
  };

  // Delete license
  const handleDeleteLicense = async (licenseId) => {
    try {
      await axiosInstance.delete(`http://localhost:5000/api/v1/licenseDelete/${licenseId}`);
      // Remove the deleted license from the state
      setLicenses(licenses.filter(license => license._id !== licenseId));
      alert('Successfully Deleted');
    } catch (error) {
      console.error("Error deleting license:", error);
    }
  };

  // Calculate the current licenses based on pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentLicenses = licenses.slice(startIndex, startIndex + itemsPerPage);

  // Total pages calculation
  const totalPages = Math.ceil(licenses.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-blue-300 py-8">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
        <p className="text-3xl font-bold text-center mb-6 text-gray-800">Book Renter</p>

        <div className="flex justify-between mb-4">
          <span className="block text-lg font-bold text-gray-600">Book Licenses</span>
          <div className="flex space-x-2">
            <button 
              onClick={navigater} 
              className="bg-blue-600 text-white py-2 px-4 text-sm rounded hover:bg-blue-700 transition-colors shadow-md"
            >
              CREATE NEW
            </button>
            <button className="bg-blue-600 text-white py-2 px-4 text-sm rounded hover:bg-blue-700 transition-colors shadow-md">
              DOWNLOAD AS CSV
            </button>
          </div>
        </div>

        <table className="table-auto w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-300 text-left">
              <th className="p-2 font-bold text-gray-700">LICENSE NUMBER</th> 
              <th className="p-2 font-bold text-gray-700">LICENSE NAME</th>
              <th className="p-2 font-bold text-gray-700">STATUS</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {currentLicenses.map((license) => (
              <tr key={license._id} className="border-b transition-colors duration-300 hover:bg-gray-100">
                <td className="p-2">{license.orderNumber}</td>
                <td className="p-2">
                  <button 
                    onClick={() => handleLicenseClick(license)} 
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    {license.licenseName}
                  </button>
                </td>
                <td className="p-2">{license.books.length > 0 ? "Active" : "Inactive"}</td> 
                <td className="p-2">
                  <FontAwesomeIcon 
                    icon={faTrash} 
                    className="text-red-600 hover:text-red-500 cursor-pointer"
                    onClick={() => handleDeleteLicense(license._id)} // Call delete function on click
                  />
                  
                </td>
              </tr>
            ))}
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
}
