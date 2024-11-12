"use client";

import { useState } from "react";

import toast from "react-hot-toast";
import Link from "next/link";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    photo: "",
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Registration successful!");
      } else {
        toast.error(result.error || "An error occurred"); 
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to register. Please try again."); 
    }
  }

  return (
<div className="flex flex-col md:flex-row justify-center h-screen items-center">

    <div className="w-80 border border-gray-500 h-[35rem] justify-center    rounded-md flex overflow-hidden flex-col md:w-1/2 md:ml-[50%]   md:h-screen ">


        {/* title  */}
        <h1 className="text-xl mt-4  text-center md:text-4xl 2xl:text-6xl ">Create an account</h1>
        <p className="text-xs 2xl:text-xl 2xl:mt-2  font-sans text-gray-400 text-center">Enter information below to register yourself</p>

        {/* form */}
        <form className="mt-3 md:flex-col md:justify-center" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="font-sans text-xs px-2 ml-1 m mb-1 md:ml-5 2xl:text-xl 2xl:ml-16 ">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="johndoe@gmail.com"
              required
              className="w-72 md:w-2/3 2xl:w-[55rem] 2xl:h-16 2xl:text-xl 2xl:mt-4 md:ml-10 md:h-10 md:text-sm mx-2  text-xs p-2 2xl:my-5 border border-gray-600 rounded-lg bg-black"
            />
          </div>
          <div>
            <label htmlFor="name" className="font-sans text-[0.70rem] px-2 ml-1 md:ml-5 mb-1 2xl:text-xl 2xl:ml-14">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="john doe"
              required
              className="w-72  mx-2 md:w-2/3 md:ml-10 md:h-10 md:text-sm md:my-5 2xl:w-[55rem] 2xl:h-16 2xl:text-xl 2xl:mt-4 text-xs p-2 border border-gray-600 rounded-lg bg-black"
            />
          </div>
          <div>
            <label htmlFor="dob" className="font-sans text-[0.70rem] px-2 ml-1 2xl:text-xl  md:ml-5 mb-1 2xl:ml-7">Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              required
              className="w-72  mx-2  md:w-2/3 md:ml-2 md:h-10 md:text-xs  text-xs p-2 border border-gray-600 rounded-lg bg-black 2xl:w-[55rem] 2xl:h-16 2xl:text-base  2xl:my-5"
            />
          </div>
          <div>
            <label htmlFor="photo" className="font-sans text-[0.70rem] px-2 md:ml-5 ml-1 mb-1 2xl:text-xl 2xl:ml-7">Profile Photo</label>
            <input
              type="file"
              id="photo"
              onChange={(e) => setFormData({ ...formData, photo: e.target.files ? e.target.files[0].name : '' })}
              className="w-72  mx-2  md:w-2/3 md:ml-1 md:h-10 md:text-sm md:my-5  text-xs p-2 border border-gray-600 rounded-lg bg-black 2xl:w-[55rem] 2xl:h-16 2xl:text-xl 2xl:mt-4"
            />
          </div>
  <div className="flex flex-col justify-center items-center mt-6">
  <button
            type="submit"
            disabled={loading}
            className="w-64 md:w-[25rem] md:h-9 h-7  bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 2xl:text-2xl 2xl:w-[45rem] 2xl:h-14  2xl:mt-20"
          >
            {loading ? "Submitting..." : "Submit"}
            </button>
  </div>
  <p className="text-[0.70rem] 2xl:text-2xl 2xl:mt-7 md:text-sm  md:mt-3 font-sans text-center mt-1 text-gray-500">Click here to view <Link href="/usersList" className="text-blue-500">registered users.</Link> </p>
        </form>


    </div>
</div>
  )
}

export default Form;
