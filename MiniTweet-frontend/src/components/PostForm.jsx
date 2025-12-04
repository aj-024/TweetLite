// src/components/PostForm.jsx
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/api.js";

const PostForm = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Title and Content are required!");
      return;
    }

    setLoading(true);
    console.log("Creating post with data:", { title, content, userId: userData.userId });

    try {
      await createPost({
        title,
        content,
        userId: userData.userId,
      });

    

      alert("Tweet created successfully!");
      navigate("/"); // go back to home page
    } catch (err) {
      console.error("❌ Error creating tweet:", err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded"
      />
      <textarea
        placeholder="What's happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="p-2 border rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Post Tweet
      </button>
    </form>
  );
};

export default PostForm;
