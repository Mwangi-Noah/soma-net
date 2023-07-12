import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import api from '../../api.js';
import Popup from '../Popup';

const PostCreator = ({ parentId, onNewComment }) => {
  const history = useHistory();
  const [popup, setPopup] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const body = formData.get('body');

    try {
      const res = await api.createComment(parentId, body); // Replace with API function to create a comment
      if (res.status === 200) {
        const newComment = res.data;
        onNewComment(newComment); // Notify parent component about the new comment
        history.push(`/posts/${parentId}`);
      } else if (res.status === 401) {
        setPopup({ message: 'Invalid credentials. Please login again.' });
      } else {
        setPopup({ message: 'Sorry, something went wrong.' });
      }
    } catch (error) {
      console.error('Error creating comment:', error);
      setPopup({ message: 'Sorry, something went wrong.' });
    }
  };

  return (
    <>
      {popup.message && <Popup error message={popup.message} />}
      <div
        style={{
          marginLeft: '20%',
          marginRight: '20%',
          marginTop: '2%',
          padding: '2em'
        }}
        className='card'
      >
        <Form id='addCommentForm' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Body</label>
            <Form.Control
              name='body'
              className='form-control'
              id='body'
              placeholder='Enter text'
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </Form>
      </div>
    </>
  );
};

export default PostCreator;