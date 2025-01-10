import axios from "axios";

const getAllStocks = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}stocks/`
    );
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "An error occurred while logging in";
  }
};

export { getAllStocks };
