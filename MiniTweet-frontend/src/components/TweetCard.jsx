import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TweetCard = ({ tweet }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handleClick = () => {
    if (!isLoggedIn) {
      alert("Please login to read the full tweet!");
      navigate("/login");
      return;
    }
    navigate(`/tweet/${tweet.postId}`);
  };

  // Format date
  const formattedDate = new Date(tweet.createdAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Fallback for avatar
  const avatarLetter = tweet.username?.[0]?.toUpperCase() || "?";

  return (
    <div
      onClick={handleClick}
      className="bg-white border border-gray-300 rounded-2xl p-4 mb-4 cursor-pointer hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
    >
      {/* Header: Avatar + Username + Date */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg">
          {avatarLetter}
        </div>

        {/* User and Post Info */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">@{tweet.username}</span>
              <span className="text-sm text-gray-500">{formattedDate}</span>
            </div>
          </div>

          {/* Tweet Content */}
          <div className="mt-1">
            <h2 className="text-lg font-semibold text-gray-900">{tweet.title}</h2>
            <p className="text-gray-700 mt-1 leading-relaxed">
              {tweet.content.length > 160
                ? tweet.content.slice(0, 160) + "..."
                : tweet.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
