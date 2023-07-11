import React, { useEffect, useState } from 'react';

const BookLibrary = () => {
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const response = await fetch('/api/library');
        const libraryData = await response.json();
        setLibrary(libraryData);
      } catch (error) {
        console.error('Error fetching book library:', error);
      }
    };

    fetchLibrary();
  }, []);

  return (
    <div>
      {library.map((book) => (
        <BookInfo key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookLibrary;