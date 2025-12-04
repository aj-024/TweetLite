import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const loginUser = (userData) => API.post("/user/login", userData);
export const signupUser = (userData) => API.post("/user/signup", userData);

export const createPost = (postData) => API.post("/tweeter/addpost", postData);
export const getPosts = () => API.get("/tweeter");
export const deletePost = (postId) => API.delete(`/tweeter/${postId}`);
export const updatePost = (postId, postData) => API.put(`/tweeter/${postId}`, postData);
export const getPostById = (postId) => API.get(`/tweeter/${postId}`);

export default API;