import axios from "axios";

const getDashboard = async (user_id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}user/${user_id}/dashboard/`
    );
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "An error occurred while logging in";
  }
};

export { getDashboard };
