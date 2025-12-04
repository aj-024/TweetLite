import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPostById, deletePost, updatePost } from "../api/api.js";

const TweetDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userData, isLoggedIn } = useSelector((state) => state.user);

  const [tweet, setTweet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const res = await getPostById(id);
        console.log("✅ Fetched tweet:", res.data);
        setTweet(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        console.error("❌ Error fetching tweet:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTweet();
  }, [id]);

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  if (loading) return <p className="text-center mt-8">Loading tweet...</p>;
  if (!tweet) return <p className="text-center mt-8">Tweet not found.</p>;

  const isOwner = Number(userData.userId) === Number(tweet.userId);
  const formattedDate = new Date(tweet.createdAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const avatarLetter = tweet.username?.[0]?.toUpperCase() || "?";

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this tweet?")) return;
    try {
      await deletePost(id);
      alert("Tweet deleted successfully!");
      navigate("/");
    } catch (err) {
      console.error("❌ Error deleting tweet:", err);
    }
  };

  const handleSave = async () => {
    try {
      await updatePost(id, {
        title,
        content,
        userId: userData.userId,
      });
      setTweet({ ...tweet, title, content });
      setEditMode(false);
      alert("Tweet updated successfully!");
    } catch (err) {
      console.error("❌ Error updating tweet:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white border border-gray-300 rounded-2xl shadow-sm hover:shadow-md transition-all">
      {editMode ? (
        <>
          <input
            className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex gap-4 justify-end">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Header: Avatar + User Info */}
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
              {avatarLetter}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 text-lg">
                @{tweet.username}
              </span>
              <span className="text-sm text-gray-500">{formattedDate}</span>
            </div>
          </div>

          {/* Tweet Body */}
          <div className="ml-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              {tweet.title}
            </h1>
            <p className="text-gray-800 text-lg leading-relaxed">
              {tweet.content}
            </p>
          </div>

          {/* Actions for Owner */}
          {isOwner && (
            <div className="flex gap-4 mt-6 justify-end">
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TweetDetailsPage;
