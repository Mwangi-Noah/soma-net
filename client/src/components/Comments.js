import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import Reactions from '../Reactions';
import api from '../../api.js';

const Comments = (props) => {
  const [upvotes, setUpvotes] = useState(props.upvotes);
  const [status, setStatus] = useState(props.status);
  const [showChildren, setShowChildren] = useState(false);
  const [comments, setComments] = useState([]);

  async function fetchComments() {
    try {
      const response = await api.fetchComments(props.id);
      if (response.status === 200) {
        setComments(response.data);
        setShowChildren(true);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }

  return (
    <>
      <div className='p-2 ml-5' style={{ width: '90%' }}>
        <div className='list-group-item'>
          <h6>By: {props.author}</h6>
          <p>{props.body}</p>
          <div className='align-items-center d-flex flex-row'>
            <Link to={`/comment?parentId=${props.id}&originalId=${props.original}`}>
              Reply
            </Link>
            <Reactions
              postID={props.id}
              setUpvotes={setUpvotes}
              upvotes={upvotes}
              status={status}
              setStatus={setStatus}
              className=''
            />
            <p className='upvotes m-0 pr-0 pl-3 pt-0 pb-0'>{upvotes}</p>
          </div>
        </div>
      </div>
      {props.children && props.children.length > 0 && (
        <div className='ml-5'>
          {props.children.map((comment) => (
            <Comment
              key={comment.id}
              author={comment.author}
              body={comment.body}
              upvotes={comment.upvotes}
              date={comment.date}
              status={comment.status}
              original={props.original}
              id={comment.id}
              reactions={comment.reactions}
              children={comment.children}
            />
          ))}
        </div>
      )}
      {showChildren && comments.length > 0 && (
        <div className='ml-5'>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              author={comment.author}
              body={comment.body}
              upvotes={comment.upvotes}
              date={comment.date}
              status={comment.status}
              original={props.original}
              id={comment.id}
              reactions={comment.reactions}
              children={comment.children}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;