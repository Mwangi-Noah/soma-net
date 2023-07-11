import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './Post.module.css';
import Reactions from '../Reactions';
import { Link } from 'react-router-dom';

const SinglePost = ({ title, author, upvotes, status, body, id }) => {
  const [postUpvotes, setPostUpvotes] = useState(upvotes);
  const [postStatus, setPostStatus] = useState(status);

  const dropDownText = React.useRef();

  function swapDropdown() {
    if (
      dropDownText.current.style.height === '0px' ||
      dropDownText.current.style.height === ''
    ) {
      dropDownText.current.classList.add(styles.dropdown_hover);
      dropDownText.current.style.height = `${dropDownText.current.scrollHeight}px`;
    } else {
      dropDownText.current.classList.remove(styles.dropdown_hover);
      dropDownText.current.style.height = '0';
    }
  }

  return (
    <div className='list-group-item p-0 ml-5' style={{ width: '90%' }}>
      <div className='p-3 d-flex flex-row'>
        <div>
          <p className={styles.post_title}>{title}</p>
          <h6>By: {author}</h6>
          <Link to={`comment/?parentId=${id}&originalId=${id}`}>Reply</Link>
        </div>
        <div className='ml-auto d-flex flex-row'>
          <p className='upvotes ml-3 pl-3 pr-3'>{postUpvotes}</p>
          <Reactions
            postID={id}
            setUpvotes={setPostUpvotes}
            upvotes={postUpvotes}
            status={postStatus}
            setStatus={setPostStatus}
            className=''
          />
          <Link
            className='btn btn-outline-secondary ml-3 pl-3 pr-3'
            style={{ height: '40px' }}
            to={`/posts/${id}`}
          >
            Visit
          </Link>
          <button
            type='button'
            className='btn btn-outline-secondary ml-3 pl-3 pr-3'
            style={{ height: '40px' }}
            onClick={swapDropdown}
          >
            Preview
          </button>
        </div>
      </div>
      <div ref={dropDownText} className={styles.dropdown}>
        <p>{body}</p>
      </div>
    </div>
  );
};

export default SinglePost;