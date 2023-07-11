const API_BASE_URL = '/api/v1'; // Modify this to match your project's API base URL

const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/logout`, {
    method: 'DELETE'
  });
  return response.json();
};

const login = async (body) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return response.json();
};

const signup = async (body) => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return response.json();
};

const sendReactionsRequest = async (username) => {
  const response = await fetch(`${API_BASE_URL}/users/${username}/reactions`);
  return response.json();
};

const sendUserDataRequest = async (username) => {
  const response = await fetch(`${API_BASE_URL}/users/${username}`);
  return response.json();
};

const sendChangeIconRequest = async (data, username) => {
  const response = await fetch(`${API_BASE_URL}/users/${username}/icon`, {
    method: 'POST',
    body: data
  });
  return response.json();
};

export {
  logout,
  login,
  signup,
  sendReactionsRequest,
  sendUserDataRequest,
  sendChangeIconRequest
};