import React from "react";

const BookRow = ({ book, onUpdateConcurrency }) => {
  const handleConcurrencyChange = (event) => {
    const newConcurrency = event.target.value;

    // Allow empty value (when backspacing)
    if (newConcurrency === "") {
      onUpdateConcurrency(""); // Allow empty input
    } else {
      // Ensure valid numeric input when not empty
      const numericValue = Number(newConcurrency);
      if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 1000) {
        onUpdateConcurrency(numericValue); // Update concurrency if value is between 1 and 100
      }
    }
  };

  const handleKeyPress = (event) => {
    const key = event.which || event.keyCode;
    const keyChar = String.fromCharCode(key);

    // Prevent non-numeric characters and 'e', but allow numbers and backspace
    if (keyChar === "e" || key < 48 || key > 57) {
      event.preventDefault();
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 items-center border-b py-2 w-full">
      <div className="text-blue-600 underline">{book.book_name}</div>
      <div>{book.is_premium ? "Premium" : "Standard"}</div>
      <div>
        <input
          type="number"
          className="border w-full p-1"
          value={book.concurrency}
          onChange={handleConcurrencyChange}
          onKeyPress={handleKeyPress}
          min="1"
          step="1"
          max="100"
          required
        />
      </div>
    </div>
  );
};

export default BookRow;
