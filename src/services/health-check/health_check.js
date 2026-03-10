import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const healthCheck = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return response;
  } catch (error) {
    if (error.response) {
      console.log("Server Error", error?.response);
      throw error;
    }
    if (error.request) {
      console.log("Network Error", error?.request);
      throw "Network Error: " + error?.request;
    }
    console.log("Unknown Error", error?.message);
    throw error?.message;
  }
};
