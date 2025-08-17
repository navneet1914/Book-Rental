import React from "react";

const Modal = ({ isOpen, onClose, onSave, value, setValue }) => {
  if (!isOpen) return null;

  const handleSave = () => {
    if (!value || value === 0 || isNaN(value)) {
      alert("Cannot save without a valid Concurrency Value");
    } else {
      onSave(value);  // Proceed with save
      onClose();  // Close the modal after save
    }
  };

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= 1 && newValue <= 1000) {
      setValue(newValue);  // Update value if valid (between 1 and 1000)
    } else if (newValue > 1000) {
      setValue(1000); // If input is greater than 1000, set it to 1000
    } else {
      setValue('');  // Clear invalid input (below 1)
    }
  };

  const handleKeyPress = (event) => {
    const key = event.which || event.keyCode;
    const keyChar = String.fromCharCode(key);

    // Prevent non-numeric characters, 'e', but allow numbers and backspace
    if (keyChar === 'e' || key < 48 || key > 57) {
      event.preventDefault();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-lg shadow-lg w-11/12 max-w-md transform transition-all duration-300 scale-100">
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">
            Bulk Edit Concurrency
          </h2>
          <input
            type="number"
            value={value}
            onChange={handleChange}
            className="border border-indigo-300 w-full p-3 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
            min="1" 
            max="1000" // Updated max value to 1000 for consistency
            step="1"
            onKeyPress={handleKeyPress}
            placeholder="Enter concurrency value (1-1000)"
          />
          <div className="flex justify-end space-x-4">
            <button
              className="bg-indigo-600 text-white font-semibold px-5 py-2 rounded shadow hover:bg-indigo-700 transition duration-200"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-300 text-gray-700 font-semibold px-5 py-2 rounded shadow hover:bg-gray-400 transition duration-200"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
