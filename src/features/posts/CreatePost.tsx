"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setShowMessage(false);

    try {
      const res = await fetch("http://localhost:3000/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, author }),
      });

      const data = await res.text();
      setMessage(data);
      setShowMessage(true);

      // Reset form
      setTitle("");
      setContent("");
      setAuthor("");

      // Auto-hide toast and redirect after 2 seconds
      setTimeout(() => {
        setShowMessage(false);
        router.push("/");
      }, 2000);
    } catch (err) {
      setMessage("Failed to create post");
      setShowMessage(true);
      console.error(err);
      setTimeout(() => setShowMessage(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="createPostContainer max-w-xl mx-auto p-8 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl space-y-6 hover:shadow-3xl transition">
      <h2 className="createPostTitle text-3xl font-extrabold text-gray-800 text-center tracking-wide">
        Create New Post
      </h2>

      {/* Floating toast message */}
      {showMessage && (
        <div className="createPostToast fixed top-18 right-5 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-slideInOut z-50">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="createPostForm space-y-6">
        {[
          { label: "Title", value: title, setter: setTitle },
          { label: "Author", value: author, setter: setAuthor },
        ].map((field) => (
          <div key={field.label} className="createPostField relative">
            <input
              type="text"
              value={field.value}
              onChange={(e) => field.setter(e.target.value)}
              required
              className="createPostInput peer w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-3 text-gray-900 placeholder-transparent"
              placeholder={field.label}
            />
            <label className="createPostLabel absolute left-0 -top-1.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-1.5 peer-focus:text-gray-700 peer-focus:text-sm">
              {field.label}
            </label>
          </div>
        ))}

        <div className="createPostField relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={6}
            placeholder="Content"
            className="createPostInput peer w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-3 text-gray-900 placeholder-transparent resize-none"
          />
          <label className="createPostLabel absolute left-0 -top-1.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-1.5 peer-focus:text-gray-700 peer-focus:text-sm">
            Content
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="createPostButton w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-500 hover:shadow-lg disabled:opacity-50 transition-all duration-300 transform hover:-translate-y-1"
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>

      {/* Tailwind animation */}
      <style jsx>{`
        @keyframes slideInOut {
          0% {
            opacity: 0;
            transform: translateX(100%);
          }
          10% {
            opacity: 1;
            transform: translateX(0);
          }
          90% {
            opacity: 1;
            transform: translateX(0);
          }
          100% {
            opacity: 0;
            transform: translateX(100%);
          }
        }
        .animate-slideInOut {
          animation: slideInOut 2s ease forwards;
        }
      `}</style>
    </div>
  );
}
