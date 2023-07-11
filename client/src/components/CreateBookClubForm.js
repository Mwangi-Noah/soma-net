import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBookClubForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    bookTitle: '',
    discussionDuration: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to create a book club with formData
    fetch('/api/bookclubs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        book_title: formData.bookTitle,
        discussion_duration: formData.discussionDuration,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful creation of the book club
          console.log('Book club created successfully');
          navigate('/bookclubs/newly-created-book-club'); // Replace with the actual route for the newly created book club
        } else {
          // Handle error in creating the book club
          console.error('Failed to create book club');
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Book Club Name" />
      <input type="text" name="bookTitle" value={formData.bookTitle} onChange={handleChange} placeholder="Book Title" />
      <input type="number" name="discussionDuration" value={formData.discussionDuration} onChange={handleChange} placeholder="Discussion Duration" />
      <button type="submit">Create Book Club</button>
    </form>
  );
};

export default CreateBookClubForm;