import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slice/userSlice.js";
import { loginUser } from "../api/api.js";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(""); // State to store error messages
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing again
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Client-Side Validation (Prevents 400 Bad Request)
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const res = await loginUser(formData);
      console.log("✅ Login success:", res.data);

      dispatch(login(res.data));
      navigate("/");
    } catch (err) {
      console.error("❌ Login failed:", err);
      
      // 2. Display Backend Error Message if available
      if (err.response && err.response.data) {
         // Sometimes Spring sends the message in 'message' or just the body string
         setError(err.response.data.message || "Invalid username or password."); 
      } else {
         setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-80 space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Login</h2>

        {/* Display Error Message at the top */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative text-sm">
            {error}
          </div>
        )}

        <input
          type="text"
          name="username"
          required
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`border p-2 w-full rounded ${
              formData.password.length > 0 && formData.password.length < 6 
                ? "border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500" 
                : ""
            }`}
          />
          {/* Helper text for password length */}
          <p className="text-xs text-gray-500 mt-1">
             *Min 6 characters
          </p>
        </div>

        <button
          type="submit"
          // Disable button if password is too short (Visual feedback)
          disabled={formData.password.length > 0 && formData.password.length < 6}
          className={`w-full py-2 rounded text-white ${
            formData.password.length > 0 && formData.password.length < 6
              ? "bg-blue-300 cursor-not-allowed" // Lighter blue if disabled
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Login
        </button>

        {/* Signup link */}
        <p className="text-center text-sm text-gray-600 mt-2">
          Don't have an account?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;