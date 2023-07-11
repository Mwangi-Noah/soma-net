import React, { useState, useEffect } from 'react';
import api from '../../api'; // Import your API functions

const DiscussionTopic = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    // Fetch the book list from your backend server
    const fetchBooks = async () => {
      try {
        const response = await api.getBooks(); // Replace with your API function to fetch books
        const bookData = response.data;
        setBooks(bookData);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    // Perform any other necessary actions when a book is selected, such as setting it as the topic of discussion or navigating to the discussion page.
  };

  return (
    <div>
      <h2>Select a Book as the Topic of Discussion</h2>
      {books.map((book) => (
        <div key={book.id} onClick={() => handleSelectBook(book)}>
          <img src={book.coverImage} alt={book.title} />
          <h3>{book.title}</h3>
          <h4>By: {book.author}</h4>
          {/* Additional book details or actions */}
        </div>
      ))}
      {selectedBook && (
        <div>
          <h3>Selected Book:</h3>
          <img src={selectedBook.coverImage} alt={selectedBook.title} />
          <h4>{selectedBook.title}</h4>
          <h5>By: {selectedBook.author}</h5>
          {/* Additional details or actions related to the selected book */}
        </div>
      )}
    </div>
  );
};

export default DiscussionTopic;