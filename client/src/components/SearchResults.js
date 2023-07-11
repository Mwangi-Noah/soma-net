import React from 'react';

const SearchResults = ({ results, handleAddBook }) => {
  return (
    <div>
      {results.map((book) => (
        <div key={book.id}>
          <img src={book.image} alt={book.title} />
          <h3>{book.title}</h3>
          <h4>By: {book.author}</h4>
          <button onClick={() => handleAddBook(book)}>Add to Library</button>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;