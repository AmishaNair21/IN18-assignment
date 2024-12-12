"use client";

import Image from "next/image";
import { FiMoreVertical } from "react-icons/fi"; // For three dots icon

// Define props
interface UserCardProps {
  name: string;
  email: string;
  photo: string | null; // Can be null if no photo provided
  registeredTime: string; // e.g., "2 hours ago"
}

const UserCard = ({ name, email, photo, registeredTime }: UserCardProps) => {
  // Helper function to validate image URLs
  const isValidUrl = (url: string | null | undefined): boolean => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="flex items-center justify-between w-[90%] p-4 border mb-4 border-gray-700 rounded-lg shadow-sm">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {/* Profile Picture */}
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-700">
          {photo && isValidUrl(photo) ? (
            <Image
              src={photo}
              alt={`${name}'s profile`}
              width={40}
              height={40}
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              N/A
            </div>
          )}
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

