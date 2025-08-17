import React from "react";

const TableHeader = () => {
  return (
    <div className="hidden md:grid grid-cols-3 gap-4 bg-gradient-to-r from-indigo-500 to-purple-600 p-4 font-semibold text-white shadow-lg rounded-t-lg">
      <div className="flex items-center">
        <span className="mr-2">
          {/* Optional: Add an icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
            <path d="M16 3H4a1 1 0 00-1 1v1h14V4a1 1 0 00-1-1z" />
          </svg>
        </span>
        <span>Book Title</span>
      </div>
      <div className="flex items-center">
        <span className="mr-2">
          {/* Optional: Add an icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9 12h1v1H9v-1zm0-2h1v1H9V10zm1-7a8 8 0 100 16A8 8 0 0010 1z" />
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3a1 1 0 102 0V7zm-1 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <span>Published Status</span>
      </div>
      <div className="flex items-center">
        <span className="mr-2">
          {/* Optional: Add an icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M6 2a2 2 0 00-2 2v1H2a1 1 0 000 2h1v10a2 2 0 002 2h10a2 2 0 002-2V7h1a1 1 0 100-2h-2V4a2 2 0 00-2-2H6zM4 4h12a1 1 0 011 1v2H3V5a1 1 0 011-1zm13 7H3V7h14v4z" />
          </svg>
        </span>
        <span>Concurrency--No. of People</span>
      </div>
    </div>
  );
};

export default TableHeader;
