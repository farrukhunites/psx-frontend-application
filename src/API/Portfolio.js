import axios from "axios";

const getPortfolio = async (user_id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}portfolio/${user_id}/`
    );
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "An error occurred while logging in";
  }
};

export { getPortfolio };
