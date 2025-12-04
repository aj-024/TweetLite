import { useEffect, useState } from "react";
import TweetCard from "./TweetCard.jsx";
import { getPosts } from "../api/api.js";
import { useSelector } from "react-redux";

const TweetList = () => {
  const [tweets, setTweets] = useState([]);
  const [filter, setFilter] = useState("all"); 
  const [filteredTweets, setFilteredTweets] = useState([]);

  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const res = await getPosts();
        console.log("✅ Fetched tweets:", res.data);
        setTweets(res.data);
      } catch (err) {
        console.error("❌ Error fetching tweets:", err);
      }
    };

    fetchTweets();
  }, []);

  // Filter tweets based on selected tab
  useEffect(() => {
    if (filter === "all") setFilteredTweets(tweets);
    else if (filter === "my")
      setFilteredTweets(tweets.filter((t) => t.userId === userData?.userId));
    else if (filter === "following") setFilteredTweets([]); 
  }, [filter, tweets, userData]);

  return (
    <div className="max-w-2xl mx-auto mt-6 px-4 pb-10 space-y-4">
      {/* --- Filter Tabs --- */}
      <div className="flex justify-around border-b border-gray-200 pb-2 sticky top-[64px] bg-white z-40">
        {["all", "following", "my"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`capitalize font-medium pb-2 border-b-2 ${
              filter === type
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            } transition`}
          >
            {type === "my" ? "My Tweets" : type}
          </button>
        ))}
      </div>

      {/* --- Tweet Feed --- */}
      <div className="space-y-4">
        {filteredTweets.length > 0 ? (
          filteredTweets.map((tweet, index) => (
            <div key={tweet.postId}>
              <TweetCard tweet={tweet} />
              {index < filteredTweets.length - 1 && (
                <hr className="border-gray-200" />
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-6">
            {filter === "following"
              ? "No tweets from people you follow yet."
              : filter === "my"
              ? "You haven’t tweeted yet."
              : "No tweets yet 😅"}
          </p>
        )}
      </div>
    </div>
  );
};

export default TweetList;
