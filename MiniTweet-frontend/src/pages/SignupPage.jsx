import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slice/userSlice.js";
import { signupUser } from "../api/api.js";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner"; 

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isServerSlow, setIsServerSlow] = useState(false);
  const [error, setError] = useState(""); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if(error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ✅ 1. NEW: Validate Password Length immediately
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return; // Stop here, do not send to backend
    }

    try {
      setIsLoading(true);
      const slowTimer = setTimeout(() => setIsServerSlow(true), 3000);

      const res = await signupUser(formData);
      
      clearTimeout(slowTimer);
      console.log("✅ Signup success");

      dispatch(login(res.data));
      navigate("/");
    } catch (err) {
      console.error("❌ Signup failed:", err);
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError(err.message || "Signup failed. Try again.");
      }
    } finally {
      setIsLoading(false);
      setIsServerSlow(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-80 space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Signup</h2>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative text-sm">
            {error}
          </div>
        )}

        {/* Server Slow Warning */}
        {isServerSlow && isLoading && (
           <div className="bg-blue-50 text-blue-600 text-xs px-3 py-2 rounded text-center animate-pulse">
             Server is waking up...<br/>This may take ~50 seconds.
           </div>
        )}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          disabled={isLoading}
          className="border p-2 w-full rounded disabled:bg-gray-100"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          className="border p-2 w-full rounded disabled:bg-gray-100"
        />

        <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              // ✅ 2. UI: Show red border if user types < 6 chars
              className={`border p-2 w-full rounded disabled:bg-gray-100 ${
                  formData.password.length > 0 && formData.password.length < 6 
                  ? "border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500" 
                  : ""
              }`}
            />
            {/* ✅ 3. UI: Helper Text */}
            <p className="text-xs text-gray-500 mt-1 ml-1">
                *Min 6 characters
            </p>
        </div>

        <button
          type="submit"
          // ✅ 4. Disable button visually if password is short
          disabled={isLoading || (formData.password.length > 0 && formData.password.length < 6)}
          className={`w-full py-2 rounded text-white flex justify-center items-center ${
             isLoading || (formData.password.length > 0 && formData.password.length < 6)
             ? "bg-green-300 cursor-not-allowed" 
             : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isLoading ? <Spinner /> : "Signup"}
        </button>
        
        <p className="text-center text-sm text-gray-600 mt-2">
          Already have an account?{" "}
          <span
            className={`text-blue-500 hover:underline cursor-pointer ${isLoading ? 'pointer-events-none text-blue-300' : ''}`}
            onClick={() => !isLoading && navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;