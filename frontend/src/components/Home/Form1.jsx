import { useState } from "react";
// import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useBooks }  from "../../BookContext"
import {  useEffect } from 'react';
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";
 
const Form = () => {
 
  const {
    books, setBooks,
    orderNumber, setOrderNumber,
    licenseName, setLicenseName,
    bundleName, setBundleName,
    filterType, setFilterType } = useBooks();
 
  //const [orderNumber, setOrderNumber] = useState();
  //const [licenseName, setLicenseName] = useState();
  //const [bundleName, setBundleName] = useState();
  const [originalBook, setOriginalBook] = useState([]);
  //const { books, setBooks } = useBooks();
  const [suggestedBundles, setSuggestedBundles] = useState([]);
  //const [filterType, setFilterType] = useState("all"); // "all", "normal", "premium"
  const [premiumBooksCount, setPremiumBooksCount] = useState(0);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
 
 
 
  const [displayedConcurrency, setDisplayedConcurrency] = useState('N/A');
  // Function to calculate and update displayedConcurrency
  const updateDisplayedConcurrency = () => {
    const premiumBooks = Object.values(books).filter(book => book.is_premium);
    const uniqueConcurrency = new Set(premiumBooks.map(book => book.concurrency));
    setDisplayedConcurrency(uniqueConcurrency.size === 1
      ? Array.from(uniqueConcurrency)[0]
      : "Title Specific"
    );
  };
  // ...
 
  useEffect(() => {
    updateDisplayedConcurrency();
  }, [books]);
 
  // we you come back
  useEffect(() => {
    const premiumCount = Object.values(books).reduce((count, book) => {
      if (typeof book === 'object' && book.is_premium) {
        return count + 1;
      }
      return count;
    }, 0);
 
    setPremiumBooksCount(premiumCount);
  }, [bundleName, books]);
 
  const handleSearch = async () => {
    try {
      const response = await axiosInstance.post("http://localhost:5000/api/v1/search-bundle", {
        bundle_name: bundleName,
        filter_type: filterType,
      },
 
    );
      const fetchedBooks = response.data;
      // setBooks(fetchedBooks);
      const updatedBooks = fetchedBooks;
      setOriginalBook(fetchedBooks);
      const updateBundle = {...updatedBooks, orderNumber, licenseName};
     // console.log('test',extra)
      setBooks(updateBundle);
 
      //setBooks(updatedBooks);
     
      const premiumCount = fetchedBooks.reduce((count, book) => {
        return book.is_premium ? count + 1 : count;
      }, 0);
      setPremiumBooksCount(premiumCount);
    } catch (error) {
      console.error("Error while searching", error);
      alert("Please enter Bundle Name ☹");
    }
   
  };
 
  const handleBundleNameChange = async (e) => {
    const value = e.target.value;
    setBundleName(value);
 
    if (value.length >= 1) {
      try {
        const response = await axiosInstance.get(`http://localhost:5000/api/v1/suggest-bundles?query=${value}`);
        setSuggestedBundles(response.data);
        console.log('response--',response.data)
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching suggestions", error);
      }
    } else {
      setSuggestedBundles([]);
      setShowSuggestions(false);
    }
  };
 
  const handleSave = async () => {
    if (!orderNumber || !licenseName) {
      alert("Please fill in all required fields: Order Number and License Name.");
      return;
    }
    if (filterType !== 'normal' && filterType !== 'premium') {
      alert("Click on either Normal or premium button  to get the data saved.");
      return;
    }
    const payload = {
      licenseName: books.licenseName, // license name from state
      orderNumber: books.orderNumber, // order number from state
      books : Object.keys(books)
      .filter(key => !isNaN(key)) // Ensure this only filters for numeric keys that represent books
      .map(key => ({
        book_id: books[key].book_id,      // Ensure this is included
        book_name: books[key].book_name,  // Ensure this is included
        is_premium: books[key].is_premium,  // Ensure this is included
        concurrency: books[key].concurrency  // Ensure this is included
      }))
    };
    try {
      const response = await axiosInstance.post("http://localhost:5000/api/v1/create-license", payload,         {
      }
);
      console.log("License created successfully:", response.data);
      alert("License Created Successfully!");
      navigate('/');
    } catch (error) {
      console.error("Error creating license:", error.response?.data || error.message);
      alert("Failed to create license. Please try again.");
    }
  };
 
  const handleSuggestionClick = (suggestion) => {
    setBundleName(suggestion.bundle_name);
    setShowSuggestions(false);
  };
 
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex === suggestedBundles.length - 1 ? 0 : prevIndex + 1
      );
    } else if (e.key === "ArrowUp") {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex === 0 ? suggestedBundles.length - 1 : prevIndex - 1
      );
    } else if (e.key === "Enter" && showSuggestions) {
      setBundleName(suggestedBundles[activeSuggestionIndex].bundle_name);
      setShowSuggestions(false);
      e.preventDefault(); // To prevent form submission on Enter
    }
  };
 
 
  const handleFilterClick = (type) => {
    setFilterType(type);
    const currentBooks = [...originalBook];
 
    if (type === "normal") {
      // Filter only non-premium books and include orderNumber and licenseName
      const filteredBooks = currentBooks.filter(book => !book.is_premium);
      const updatedBooks = {...filteredBooks, orderNumber, licenseName};
      setBooks(updatedBooks);
    }
     else if (type === "premium") {
      // Include all books along with orderNumber and licenseName
      const updatedBooks = {...originalBook, orderNumber, licenseName};
      setBooks(updatedBooks);
 
    }
 
  }
 
  const handleOrderChange = (e) => {
      setOrderNumber(e.target.value);
      const updateBundle = {...books, orderNumber : e.target.value};
      setBooks(updateBundle);
  }
  const handleLicenseChange = (e) => {
      setLicenseName(e.target.value);
      const updateBundle = {...books, licenseName : e.target.value};
      setBooks(updateBundle);
  }
 
  const navigate = useNavigate();
  const handleShare = () => {
    navigate("/Concurrency");
  };
  console.log(books);
 
  return (
     <div className="bg-gradient-to-b from-green-200 to-blue-300 h-screen flex justify-center items-center">
      <div className="major p-6 min-w-[600px] min-h-[500px] bg-white shadow-md rounded-md">
      {/* Filter Buttons */}
      <div className="flex justify-between items-center">
      <div className="mt-4 flex gap-x-2 mb-3">
        <button
          className={`py-2 px-4 rounded-md transition duration-200 ${
            filterType === "normal"
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => handleFilterClick("normal")}
        >
          Normal
        </button>
        <button
          className={`py-2 px-4 rounded-md transition duration-200 ${
            filterType === "premium"
              ? "bg-yellow-600 text-white hover:bg-yellow-700"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => handleFilterClick("premium")}
        >
          Premium
        </button>
      </div>
 
      <Link to='/'>
      <button className="bg-blue-600 text-white py-2 px-4 text-sm rounded hover:bg-blue-700 transition-colors shadow-md">Back</button>
      </Link>
 
      </div>
 
 
      {/* Order Number and License Name */}
      <div className="form-container">
        <label className="form-label block mb-2 text-sm font-medium text-gray-700" htmlFor="orderNumber">
          Order Number <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          className="form-input block w-full p-2 mb-4 border rounded-md border-gray-300"
          id="orderNumber"
          placeholder="Enter Order Number"
          value={orderNumber}
          onChange={handleOrderChange}
          required
         
        />
 
        <label className="form-label block mb-2 text-sm font-medium text-gray-700" htmlFor="licenseName">
          License Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="form-input block w-full p-2 mb-4 border rounded-md border-gray-300"
          id="licenseName"
          placeholder="Enter License Name"
          value={licenseName}
          onChange={handleLicenseChange}
          required
        />
      </div>
 
      {/* Bundle Name with Suggestions */}
      <div className="relative">
        <label className="form-label block mb-2 text-sm font-medium text-gray-700" htmlFor="bundleName">
          Bundle Name *
        </label>
        <input
          type="text"
          className="form-input block w-full p-2 mb-4 border rounded-md border-gray-300"
          id="bundleName"
          placeholder="Enter Bundle Name"
          value={bundleName}
          onChange={handleBundleNameChange}
          onKeyDown={handleKeyDown}
          required
        />
        {filterType === "normal" && (
          <span>
            <span className="font-semibold text-green-500">
              Available : {(Object.keys(books).length - 2 - premiumBooksCount)}
            </span>
          </span>
        )}
        {filterType === "premium" && (
          <span>
            <span className="font-semibold text-green-500">
              Available : {Object.keys(books).length - 2}
            </span>
          </span>
        )}
 
        {/* Suggestion Box */}
        {showSuggestions && suggestedBundles.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-300 w-full rounded-md shadow-lg max-h-48 overflow-y-auto">
            {suggestedBundles.map((bundle, index) => (
              <li
                key={index}
                className={`p-2 cursor-pointer ${
                  index === activeSuggestionIndex ? "bg-gray-200" : "bg-white"
                }`}
                onClick={() => handleSuggestionClick(bundle)}
              >
                {bundle.bundle_name}
              </li>
            ))}
          </ul>
        )}
      </div>
 
      <button
        type="button"
        className="search-button w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200 mt-4"
        onClick={handleSearch}
      >
        Search
      </button>
{   filterType === 'premium' && (
      <div className="policies mt-6 bg-blue-100 p-5 rounded-lg">
        <div>
          <p>{premiumBooksCount} titles are {bundleName ? bundleName : "Bundle"} protected. Please review/edit the titles</p>
        </div>
        <div className="extra-info mt-2">
          <div className="info-item flex justify-between">
            <p className="font-semibold">CONCURRENCY</p>
            {
              (Object.keys(books).length - 2 === 0) ? "N/A" :
           
         
            (<p>{displayedConcurrency}</p>)
            }
           
          </div>
          <div className="info-item flex justify-between">
            <p className="font-semibold">PRINT/COPY</p>
            <p>20</p> {/* Show total number of books - 2 (orderNumber, licenseName) */}
          </div>
          <div className="flex justify-center align-items text-blue-900 underline">
          {
            (Object.keys(books).length - 2 === 0) ? " " :
           
         
            (<button onClick={handleShare}> View/ Edit the Concurrency</button>)
          }
          </div>
        </div>
      </div>
    ) }
 
   
 
      <button
        type="button"
        className="save-button w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition duration-200 mt-4"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
     </div>
 
  );
};
 
export default Form;