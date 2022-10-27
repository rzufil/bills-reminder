import axios from 'axios';

const API_URL = '/api/users/';
const expiryDays = 2592000 * 1000; // 30 days expiry time

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify({
      value: JSON.stringify(response.data),
      expiry: Date.now() + expiryDays,
    }));
  }

  return response.data;
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify({
      value: JSON.stringify(response.data),
      expiry: Date.now() + expiryDays,
    }));
  }

  return response.data;
}

// Update user
const update = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL, userData, config);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify({
      value: JSON.stringify(response.data),
      expiry: Date.now() + expiryDays,
    }));
  }

  return response.data;
}

// Logout user
const logout = () => {
  localStorage.removeItem('user');
}

const authService = {
  register,
  logout,
  login,
  update,
};

export default authService;