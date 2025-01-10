import axios from "axios";
import { use } from "react";

const getWatchListData = async (user_id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}watchlist/?user_id=${user_id}`
    );
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "An error occurred while logging in";
  }
};

const createWatchList = async (user_id, stock_symbol) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}watchlist/create/`,
      {
        user_id,
        stock_symbol,
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "An error occurred while logging in";
  }
};

const deleteWatchList = async (user_id, stock_symbol) => {
  console.log(user_id, stock_symbol);

  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}watchlist/delete/`,
      {
        data: {
          user_id: user_id,
          stock_symbol: stock_symbol,
        },
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    throw error.response?.data || "An error occurred while logging in";
  }
};

export { getWatchListData, createWatchList, deleteWatchList };
