import axios from 'axios';

const API_URL = '/api/bills/';

// Create new bill
const createBill = async (billData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, billData, config);

  return response.data;
}

// Get user bills
const getBills = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  // Sorting bills by category
  response.data.sort((a, b) => a.category - b.category);

  return response.data;
}

// Delete user bill
const deleteBill = async (billId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + billId, config);

  return response.data;
}

const billService = {
  createBill,
  getBills,
  deleteBill,
};

export default billService;