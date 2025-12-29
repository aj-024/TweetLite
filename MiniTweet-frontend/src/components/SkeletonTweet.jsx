import React from "react";

const SkeletonTweet = () => {
  return (
    <div className="bg-white p-4 border-b border-gray-200 animate-pulse">
      <div className="flex space-x-3">
        {/* Avatar Skeleton */}
        <div className="h-10 w-10 bg-gray-200 rounded-full flex-shrink-0"></div>
        
        <div className="flex-1 space-y-3">
          {/* Header (Name + Date) Skeleton */}
          <div className="flex items-center space-x-2">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
          
          {/* Tweet Body Skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex pt-2 gap-8">
            <div className="h-5 w-5 bg-gray-200 rounded"></div>
            <div className="h-5 w-5 bg-gray-200 rounded"></div>
            <div className="h-5 w-5 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonTweet;