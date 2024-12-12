"use client";
import { useState, useEffect } from 'react';
import UserCard from '@/components/userCard';
import Link from 'next/link';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'; // Import left and right arrow icons
import { formatDistanceToNow, parseISO } from 'date-fns'; // Import the necessary functions from date-fns

const Page = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
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
  
      {users.map((user: { id: string, name: string, email: string, photo: string | null, created_at: string }) => (
        <UserCard
          key={user.id}
          name={user.name}
          email={user.email}
          photo={user.photo && user.photo !== 'NULL' ? user.photo : '/next.svg'}
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
