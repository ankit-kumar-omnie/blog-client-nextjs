"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ToastType = "success" | "error" | "warning";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);
  const router = useRouter();

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500); // auto close
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, author }),
      });

      if (!res.ok) throw new Error("Failed to create post");

      const data = await res.text();
      showToast(data, "success");

      setTitle("");
      setContent("");
      setAuthor("");

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      console.error(err);
      showToast("Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating toast */}
      {toast && (
        <div
          className={`fixed top-18 right-5 px-6 py-3 rounded-xl shadow-lg animate-slideInOut z-50 font-medium ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : toast.type === "error"
              ? "bg-red-500 text-white"
              : "bg-yellow-500 text-black"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Create post card */}
      <div className="createPostContainer max-w-xl mx-auto p-8 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl space-y-6 hover:shadow-3xl transition">
        <h2 className="createPostTitle text-3xl font-extrabold text-gray-800 text-center tracking-wide">
          Create New Post
        </h2>

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
      </div>

      {/* Toast animation */}
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
          animation: slideInOut 2.5s ease forwards;
        }
      `}</style>
    </>
  );
}
