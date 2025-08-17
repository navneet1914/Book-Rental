import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Access the base URL from .env
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to add the token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = import.meta.env.VITE_API_TOKEN; // Access the token from .env
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Response Interceptor for handling responses globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific response errors globally
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized! Redirecting to login.');
      // Optionally, redirect to login or perform other actions
      // window.location.href = '/login'; // Uncomment if you have a login route
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
