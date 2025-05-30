// src/utils/axiosInstance.js (example path)
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3002/';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Debugging logs
    console.log("Interceptor error object:", JSON.parse(JSON.stringify(error))); // Full error object
    if (error.response) {
      console.log("Interceptor: Error response received", error.response);
      const status = error.response.status;
      const data = error.response.data; // Yeh backend se aaya JSON response hai
      console.log("Interceptor: Status code:", status);
      console.log("Interceptor: Response data:", data);

      if (status === 401) {
        // Check if the data object and its 'status' property exist
        if (data && (data.status === 'expired' || data.status === 'invalid_token')) {
          console.log("Interceptor: Token expired or invalid. Redirecting to sign-in.");

          localStorage.removeItem('authToken');
          // localStorage.removeItem('userData'); // Agar use karte hain

          // Check current path before redirecting to avoid loop
          if (window.location.pathname !== '/api/admin/admin_login' && window.location.pathname !== '/') {
            window.location.href = '/api/admin/admin_login'; // Apna sign-in route
          } else {
            console.log("Interceptor: Already on sign-in page or root, not redirecting.");
          }
        } else if (data && data.Message && data.Message.includes("Token Not Found")) { // From your backend: "Unauthorized. Token Not Found or malformed."
           console.log("Interceptor: Token not found on server side. Redirecting to sign-in.");
           localStorage.removeItem('authToken');
           if (window.location.pathname !== '/http://localhost:3002/' && window.location.pathname !== '/') {
            window.location.href = '/http://localhost:3002/';
          } else {
            console.log("Interceptor: Already on sign-in page or root, not redirecting.");
          }
        }
         else {
          console.warn("Interceptor: Received 401, but not for token expiry/invalidity. Data:", data);
        }
      } else if (status === 403) {
        console.warn("Interceptor: Received 403 Forbidden:", data?.Message || "No message");
        // Decide if redirect is needed for 403
      }
    } else if (error.request) {
      console.error('Interceptor: Network Error or No Response:', error.message);
    } else {
      console.error('Interceptor: Axios Error during request setup:', error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;