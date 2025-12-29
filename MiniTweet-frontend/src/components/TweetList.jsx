import { useEffect, useState } from "react";
import TweetCard from "./TweetCard.jsx";
import SkeletonTweet from "./SkeletonTweet.jsx"; // 1. Import Skeleton
import { getPosts } from "../api/api.js";
import { useSelector } from "react-redux";

const TweetList = () => {
  const [tweets, setTweets] = useState([]);
  const [filter, setFilter] = useState("all");
  const [filteredTweets, setFilteredTweets] = useState([]);
  
  // 2. Add Loading State
  const [isLoading, setIsLoading] = useState(true); 
  const [isServerSlow, setIsServerSlow] = useState(false); // Detects Render cold start

  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        setIsLoading(true); // Start loading
        
        // Timer: If data takes > 3 seconds, show "Waking up server" message
        const slowServerTimer = setTimeout(() => setIsServerSlow(true), 3000);
        
        const res = await getPosts();
        console.log("✅ Fetched tweets:", res.data);
        setTweets(res.data);
        
        clearTimeout(slowServerTimer); // Clear timer if data arrives fast
      } catch (err) {
        console.error("❌ Error fetching tweets:", err);
      } finally {
        setIsLoading(false); // Stop loading regardless of success/error
        setIsServerSlow(false);
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

      {/* --- Slow Server Warning (Optional but good for Render) --- */}
      {isServerSlow && isLoading && (
        <div className="bg-blue-50 text-blue-600 text-xs px-4 py-2 rounded-md text-center">
          Render server is waking up... this might take about 50 seconds.
        </div>
      )}

      {/* --- Tweet Feed Logic --- */}
      <div className="space-y-4">
        {isLoading ? (
          // 3. SHOW SKELETONS WHILE LOADING
          <>
             <SkeletonTweet />
             <SkeletonTweet />
             <SkeletonTweet />
             <SkeletonTweet />
             <SkeletonTweet />
          </>
        ) : filteredTweets.length > 0 ? (
          // 4. SHOW REAL TWEETS IF LOADED
          filteredTweets.map((tweet, index) => (
            <div key={tweet.postId}>
              <TweetCard tweet={tweet} />
              {index < filteredTweets.length - 1 && (
                <hr className="border-gray-200" />
              )}
            </div>
          ))
        ) : (
          // 5. SHOW EMPTY STATE ONLY IF NOT LOADING AND NO TWEETS
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