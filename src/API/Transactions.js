import axios from "axios";

const getTransactions = async (user_id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}transactions/${user_id}/`
    );
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "An error occurred while logging in";
  }
};

const createTransaction = async (user_id, data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}transaction/add/${user_id}/`,
      data
    );
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "An error occurred while logging in";
  }
};

const bulkTransaction = async (user_id, data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}pdf-extract/${user_id}/`,
      data
    );
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "An error occurred while logging in";
  }
};

export { getTransactions, createTransaction, bulkTransaction };
