"use client";
import { useState, useEffect } from 'react';
import UserCard from '@/components/userCard';
import SkeletonCard from '@/components/userCardSkeleton'; // Import Skeleton for UserCard
import Link from 'next/link';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'; // Import left and right arrow icons
import { formatDistanceToNow, parseISO } from 'date-fns'; // Import the necessary functions from date-fns

const Page = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true); // Start loading
      try {
        const response = await fetch(`/api/register?page=${currentPage}`, {
          method: 'GET',
        });
        const { users, totalPages, hasNextPage, hasPrevPage } = await response.json();
        setUsers(users);
        setTotalPages(totalPages);
        setHasNextPage(hasNextPage);
        setHasPrevPage(hasPrevPage);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // End loading
      }
    }
    fetchUsers();
  }, [currentPage]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-between w-[90%]">
        <h1 className="text-2xl font-sans font-bold mt-6 mb-5 text-white rounded-lg">
          Registered Users
        </h1>
        <Link href="/" className="text-white bg-blue-500 px-3 py-1 rounded-lg">
          Sign Up
        </Link>
      </div>

      {/* Skeleton or User Cards */}
      {isLoading
        ? Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} /> // Show skeleton while loading
          ))
        : users.map((user: { id: string; name: string; email: string; photos: string | null; created_at: string }) => (
            <UserCard
              key={user.id}
              name={user.name}
              email={user.email}
              photos={user.photos && user.photos !== 'NULL' ? user.photos : '/next.svg'}
              registeredTime={formatDistanceToNow(parseISO(user.created_at)) + ' ago'}
            />
          ))}

      <div className="flex gap-2 ">
        <button
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={!hasPrevPage}
          className="flex items-center justify-center p-2 rounded-full bg-blue-500 text-white"
        >
          <AiOutlineLeft size={24} />
        </button>

        <button
          onClick={() => setCurrentPage((nextPage) => Math.min(nextPage + 1, totalPages))}
          disabled={!hasNextPage}
          className="flex items-center justify-center p-2 rounded-full bg-blue-500 text-white"
        >
          <AiOutlineRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Page;
