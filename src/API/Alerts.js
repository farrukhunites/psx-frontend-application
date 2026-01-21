import axios from "axios";

const getAlerts = async (user_id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}alerts/?user_id=${user_id}`
    );
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "An error occurred while logging in";
  }
};

const createAlert = async (user_id, watchlist_id, condition, price) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}alerts/create/`,
      {
        user_id,
        watchlist_id,
        condition,
        price,
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "An error occurred while logging in";
  }
};

const deleteAlert = async (alert_id) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}alerts/delete/`,
      {
        data: {
          alert_id: alert_id,
        },
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "An error occurred while logging in";
  }
};

export { getAlerts, createAlert, deleteAlert };
