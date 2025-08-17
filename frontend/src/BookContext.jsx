import { createContext, useContext, useState } from 'react';

const BooksContext = createContext();

export const useBooks = () => {
  return useContext(BooksContext);
};

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [orderNumber, setOrderNumber] = useState('');
  const [licenseName, setLicenseName] = useState('');
  const [bundleName, setBundleName] = useState(''); 
  const [filterType, setFilterType] = useState('all'); // Add filterType to context

  return (
    <BooksContext.Provider value={{ 
      books, setBooks, 
      orderNumber, setOrderNumber, 
      licenseName, setLicenseName,
      bundleName, setBundleName,
      filterType, setFilterType // Add filterType and setFilterType
    
    }}>
      {children}
    </BooksContext.Provider>
  );
};