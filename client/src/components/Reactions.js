import React from 'react';
import api from '../../api.js';

const Reactions = (props) => {
  async function handleUpvote() {
    let res;
    if (props.status === 1) {
      // Already liked the post, remove the reaction
      res = await api.sendRemovePostReactionsRequest(props.postID);
    } else {
      // Upvote the post
      res = await api.sendUpvotePostRequest(props.postID);
    }
    if (res.status === 200) {
      if (props.status === -1) {
        // Already disliked, increase upvotes by 2
        props.setUpvotes(props.upvotes + 2);
        props.setStatus(1);
      } else if (props.status !== 1) {
        // Not liked or disliked, increase upvotes by 1
        props.setUpvotes(props.upvotes + 1);
        props.setStatus(1);
      } else {
        // Already liked, decrease upvotes by 1
        props.setUpvotes(props.upvotes - 1);
        props.setStatus(0);
      }
    }
  }

  async function handleDownvote() {
    let res;
    if (props.status === -1) {
      // Already disliked the post, remove the reaction
      res = await api.sendRemovePostReactionsRequest(props.postID);
    } else {
      // Downvote the post
      res = await api.sendDownvotePostRequest(props.postID);
    }
    if (res.status === 200) {
      if (props.status === 1) {
        // Already liked, decrease upvotes by 2
        props.setUpvotes(props.upvotes - 2);
        props.setStatus(-1);
      } else if (props.status !== -1) {
        // Not liked or disliked, decrease upvotes by 1
        props.setUpvotes(props.upvotes - 1);
        props.setStatus(-1);
      } else {
        // Already disliked, increase upvotes by 1
        props.setUpvotes(props.upvotes + 1);
        props.setStatus(0);
      }
    }
  }

  return (
    <>
      <button
        className={`btn btn-outline-secondary ml-3 pl-3 pr-3 ${
          props.status === 1 && 'active'
        }`}
        style={{ height: '40px' }}
        onClick={handleUpvote}
      >
        👍
      </button>
      <button
        className={`btn btn-outline-secondary ml-3 pl-3 pr-3 ${
          props.status === -1 && 'active'
        }`}
        style={{ height: '40px' }}
        onClick={handleDownvote}
      >
        👎
      </button>
    </>
  );
};

export default Reactions;