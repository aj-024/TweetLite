// src/pages/AddPostPage.jsx
import PostForm from "../components/PostForm.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AddPostPage = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Tweet</h1>
      <PostForm />
    </div>
  );
};

export default AddPostPage;
