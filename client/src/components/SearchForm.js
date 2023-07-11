import React, { useState } from 'react';

const SearchForm = ({ handleAddBook }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
      );
      const data = await response.json();
      const books = data.items;
      // Handle the search results (e.g., display in SearchResults component)
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search books"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;