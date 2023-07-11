const API_BASE_URL = '/api/v1'; // Modify this to match your project's API base URL

const sendPostNumberRequest = async () => {
  const response = await fetch(`${API_BASE_URL}/posts-number`);
  return response.json();
};

const sendPostsPageRequest = async (currentPage, postsPerPage, filterOptions) => {
  const requestString = `${API_BASE_URL}/posts`;
  const searchParams = new URLSearchParams(`page=${currentPage}&number=${postsPerPage}`);
  for (const [key, value] of Object.entries(filterOptions)) {
    searchParams.append(key, value);
  }
  const response = await fetch(`${requestString}?${searchParams.toString()}`);
  return response.json();
};

const sendPostCommentsRequest = async (parent, returnWithComments) => {
  const response = await fetch(
    `${API_BASE_URL}/posts?parent=${parent}&returnWithComments=${returnWithComments}`
  );
  return response.json();
};

const sendPostsRequest = async () => {
  const response = await fetch(`${API_BASE_URL}/posts`);
  return response.json();
};

const sendPostSubmitRequest = async (body) => {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return response.json();
};

const sendSinglePostRequest = async (id) => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`);
  return response.json();
};

const sendUpvotePostRequest = async (id) => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}/upvote`, {
    method: 'POST'
  });
  return response.json();
};

const sendDownvotePostRequest = async (id) => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}/downvote`, {
    method: 'POST'
  });
  return response.json();
};

const sendRemovePostReactionsRequest = async (id) => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}/remove-reactions`, {
    method: 'POST'
  });
  return response.json();
};

export {
  sendPostNumberRequest,
  sendPostsPageRequest,
  sendPostCommentsRequest,
  sendPostsRequest,
  sendPostSubmitRequest,
  sendSinglePostRequest,
  sendUpvotePostRequest,
  sendDownvotePostRequest,
  sendRemovePostReactionsRequest
};