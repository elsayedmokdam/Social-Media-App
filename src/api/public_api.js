import axios from "axios";
console.log(import.meta.env.VITE_BASE_URL);
export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

publicApi.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

publicApi.interceptors.response.use(
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
        status: 500,
      });
    }
  },
);
