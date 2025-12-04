import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slice/userSlice.js";
import { Feather, Plus, LogOut, User } from "lucide-react"; // ✅ icons

const Navbar = () => {
  const { isLoggedIn, userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 shadow-md z-50">
      <div className="mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LEFT - Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="bg-blue-500 text-white rounded-full p-2">
            <Feather size={20} />
          </div>
          <h1 className="text-xl font-bold text-blue-600">Mini Twitter</h1>
        </div>

        {/* RIGHT - Buttons */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Signup
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/addpost")}
                className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1.5 rounded-full hover:bg-blue-600 transition"
              >
                <Plus size={18} /> Add Post
              </button>

              {/* Profile Avatar */}
              <div
                onClick={() => navigate("/profile")}
                className="cursor-pointer bg-blue-100 text-blue-600 w-9 h-9 rounded-full flex items-center justify-center font-bold hover:bg-blue-200 transition"
                title={userData?.username || "Profile"}
              >
                {userData?.username?.[0]?.toUpperCase() || <User size={18} />}
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-full hover:bg-red-600 transition"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
