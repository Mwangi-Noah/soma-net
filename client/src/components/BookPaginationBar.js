import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';

// Helper function for generating a range (start, end) -> [start, start+1, ..., end]
const range = (start, end) =>
  new Array(end - start + 1).fill().map((_, index) => index + start);

const BookPaginationBar = ({ currentPage, setPage, totalBooks, perPage }) => {
  const totalPages = Math.ceil(totalBooks / perPage);
  const [shownPages, setShownPages] = useState(range(1, Math.min(totalPages, 3)));

  function correctShownPages(value) {
    if (value === 1) {
      setShownPages(range(value, Math.min(totalPages, value + 2)));
    } else if (value === totalPages) {
      setShownPages(range(Math.max(1, value - 2), value));
    } else {
      setShownPages(range(value - 1, value + 1));
    }
  }

  const processNewPage = (page) => () => {
    page = Math.max(1, page);
    page = Math.min(totalPages, page);
    correctShownPages(page);
    setPage(page);
  };

  return (
    <Pagination>
      <Pagination.First onClick={processNewPage(1)} />
      <Pagination.Prev onClick={processNewPage(currentPage - 3)} />
      {shownPages.map((value) => (
        <Pagination.Item
          active={value === currentPage ? 'active' : ''}
          key={value}
          onClick={processNewPage(value)}
        >
          {value}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={processNewPage(currentPage + 3)} />
      <Pagination.Last onClick={processNewPage(totalPages)} />
    </Pagination>
  );
};

export default BookPaginationBar;