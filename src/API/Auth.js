import axios from "axios";

const login = async (username, password) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}user/login/`,
      {
        username,
        password,
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "An error occurred while logging in";
  }
};

const createLogin = async (username, password, email, risk_preference) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}user/`,
      {
        username,
        password,
        email,
        risk_preference,
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "An error occurred while logging in";
  }
};

export { login, createLogin };
