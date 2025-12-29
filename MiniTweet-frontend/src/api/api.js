import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// --- INTERCEPTOR (The Centralized Error Handler) ---
// This is the "Gatekeeper" that grabs the backend error message
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      // 1. Log the backend error for you to see
      console.error("🚨 Backend Error:", error.response.data.message);
      
      // 2. IMPORTANT: Move the backend message into the main error object
      // This allows your components to just read 'error.message'
      error.message = error.response.data.message;
    } else {
      console.error("🚨 Network Error:", error.message);
      error.message = "Server is unreachable. Please try again later.";
    }
    return Promise.reject(error);
  }
);

// --- API Calls ---
export const loginUser = (userData) => API.post("/user/login", userData);
export const signupUser = (userData) => API.post("/user/signup", userData);

export const createPost = (postData) => API.post("/tweeter/addpost", postData);
export const getPosts = () => API.get("/tweeter");
export const deletePost = (postId) => API.delete(`/tweeter/${postId}`);
export const updatePost = (postId, postData) => API.put(`/tweeter/${postId}`, postData);
export const getPostById = (postId) => API.get(`/tweeter/${postId}`);

export default API;