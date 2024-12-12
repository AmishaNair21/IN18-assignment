
"use client";

import Image from "next/image";
import { FiMoreVertical } from "react-icons/fi"; // For three dots icon

// Define props
interface UserCardProps {
  name: string;
  email: string;
  photos: string | null; // Can be null if no photo provided
  registeredTime: string; // e.g., "2 hours ago"
}

const UserCard = ({ name, email, registeredTime }: UserCardProps) => {
  
  

  return (
    <div className="flex items-center justify-between w-[90%] p-4 border mb-4 border-gray-700 rounded-lg shadow-sm">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {/* Profile Picture */}
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-700">
         
            <Image
              src="/vercel.svg"
              alt={`${name}'s profile`}
              width={40}
              height={40}
              className="object-cover"
            />
          
        </div>

        {/* User Info */}
        <div>
          <p className="font-bold text-sm text-white">{name}</p>
          <p className="text-sm text-gray-400">{email}</p>
          <p className="text-xs text-gray-500">{registeredTime}</p>
        </div>
      </div>

      {/* Right Section (Toggle) */}
      <div className="relative">
        <button className="p-2 rounded-full hover:bg-gray-700 transition">
          <FiMoreVertical size={20} className="text-white" />
        </button>
        {/* Add Dropdown Menu here if needed */}
      </div>
    </div>
  );
};

export default UserCard;

