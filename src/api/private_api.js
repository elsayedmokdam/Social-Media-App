import axios from "axios";

export const privateApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

privateApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("social-app-token");
    if (!token) {
      const err = new Error();
      err.status = 401;
      err.message = "You are not authenticated! Please login first.";
      return Promise.reject(err);
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

privateApi.interceptors.response.use(
  (res) => res?.data || res,
  (error) => {
    if (error.response) {
      return Promise.reject({
        data: error.response.data,
        message: error.response.data?.message || "Server Error!",
        status: error.response.status,
        statusText: error.response.statusText,
      });
    } else if (error.request) {
      return Promise.reject({
        message: `Network Error: No response received from server: ${error.request}`,
        status: 500,
      });
    } else {
      return Promise.reject({
        message: error.message,
        status: error?.status || 500,
      });
    }
  },
);
