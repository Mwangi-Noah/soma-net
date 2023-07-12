import Cookies from 'js-cookie';
import {
  sendPostSubmitRequest,
  sendPostsRequest,
  sendPostsPageRequest,
  sendPostCommentsRequest,
  sendSinglePostRequest,
  sendPostNumberRequest,
  sendUpvotePostRequest,
  sendDownvotePostRequest,
  sendRemovePostReactionsRequest,
} from './Requests/posts.js';
import {
  logout,
  signup,
  login,
  sendReactionsRequest,
  sendUserDataRequest,
  sendChangeIconRequest,
} from './Requests/users.js';
import Worker from 'worker-loader!./Worker.js';

const workerInstance = new Worker();

// Request interceptor to add the auth token header to requests
function addAuthHeader(config) {
  if (Cookies.get('accessToken')) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${Cookies.get('accessToken')}`,
    };
  }
  return config;
}

// Prevent fetch from returning an error and instead just return the response
function handleResponse(response) {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

// Functions to make API calls
const api = {
  sendPostSubmitRequest: async (body) => {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  },
  sendPostsRequest: async () => {
    const response = await fetch('/api/posts');
    return handleResponse(response);
  },
  sendPostsPageRequest: async (currentPage, postsPerPage, filterOptions) => {
    const searchParams = new URLSearchParams({
      page: currentPage,
      number: postsPerPage,
      ...filterOptions,
    });
    const response = await fetch(`/api/posts?${searchParams.toString()}`);
    return handleResponse(response);
  },
  sendPostCommentsRequest: async (parent, returnWithComments) => {
    const response = await fetch(
      `/api/posts?parent=${parent}&returnWithComments=${returnWithComments}`
    );
    return handleResponse(response);
  },
  sendSinglePostRequest: async (id) => {
    const response = await fetch(`/api/posts/${id}`);
    return handleResponse(response);
  },
  sendPostNumberRequest: async () => {
    const response = await fetch('/api/posts-number');
    return handleResponse(response);
  },
  sendUpvotePostRequest: async (id) => {
    const response = await fetch(`/api/posts/${id}/upvote`, {
      method: 'POST',
    });
    return handleResponse(response);
  },
  sendDownvotePostRequest: async (id) => {
    const response = await fetch(`/api/posts/${id}/downvote`, {
      method: 'POST',
    });
    return handleResponse(response);
  },
  sendRemovePostReactionsRequest: async (id) => {
    const response = await fetch(`/api/posts/${id}/remove-reactions`, {
      method: 'POST',
    });
    return handleResponse(response);
  },
  logout: async () => {
    const response = await fetch('/api/logout', {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
  signup: async (body) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  },
  login: async (body) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return handleResponse(response);
  },
  sendReactionsRequest: async (username) => {
    const response = await fetch(`/api/users/${username}/reactions`);
    return handleResponse(response);
  },
  sendUserDataRequest: async (username) => {
    const response = await fetch(`/api/users/${username}`);
    return handleResponse(response);
  },
  sendChangeIconRequest: async (data, username) => {
    const response = await fetch(`/api/users/${username}/icon`, {
      method: 'POST',
      body: data,
    });
    return handleResponse(response);
  },
};

export default api;