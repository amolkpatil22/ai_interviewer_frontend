// src/api/axiosInstance.js
import axios from "axios";
import { removeItemFromLocalStorage } from "../Utils/ManageLocalStorage";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Set your base API URL
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      removeItemFromLocalStorage("isLoggedIn");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
