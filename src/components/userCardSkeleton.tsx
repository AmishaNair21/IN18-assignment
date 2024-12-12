const UserCardSkeleton = () => {
    return (
      <div className="flex items-center justify-between w-[90%] p-4 border mb-4 border-gray-700 rounded-lg shadow-sm animate-pulse">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Profile Picture Skeleton */}
          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
  
          {/* User Info Skeleton */}
          <div>
            <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-32 h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-20 h-3 bg-gray-300 rounded"></div>
          </div>
        </div>
  
        {/* Right Section */}
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
      </div>
    );
  };
  
  export default UserCardSkeleton;
  