import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api.js';
import BookInfo from './BookInfo';
import Post from './Post';

const BookDiscussion = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const bookResponse = await api.getBook(bookId);
        const commentsResponse = await api.getComments(bookId);

        if (bookResponse.status === 200 && commentsResponse.status === 200) {
          setBook(bookResponse.data);
          setComments(commentsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBookData();
  }, [bookId]);

  const handleNewComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div>
      {book && <BookInfo book={book} />}
      
      {comments.map((comment) => (
        <Post
          key={comment.id}
          title={comment.title}
          author={comment.author}
          upvotes={comment.upvotes}
          status={comment.status}
          body={comment.body}
        />
      ))}

      {/* Render a component to create new comments */}
      {/* Use the PostCreator component */}
      <PostCreator
        parentId={bookId}
        onNewComment={handleNewComment}
      />
    </div>
  );
};

export default BookDiscussion;