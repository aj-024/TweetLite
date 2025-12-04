// src/pages/HomePage.jsx
import TweetList from "../components/TweetList";

const HomePage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Latest Tweets</h1>
      <TweetList />
    </div>
  );
};

export default HomePage;
