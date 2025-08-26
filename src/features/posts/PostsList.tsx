"use client";

import { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = async (page: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts?page=${page}&limit=9`
      );
      const data = await res.json();
      setPosts(data.data);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  return (
    <div className="space-y-8">
      {/* Posts Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Paginator */}
      <div className="flex justify-center items-center space-x-2">
        {/* Prev Button */}
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 transition"
        >
          <ChevronLeftIcon className="w-5 h-5 mr-2" />
          <span className="font-medium">Prev</span>
        </button>

        {/* Page Numbers */}
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded-md transition ${
                page === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 transition"
        >
          <span className="font-medium">Next</span>
          <ChevronRightIcon className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
}
