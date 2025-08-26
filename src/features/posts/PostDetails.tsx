"use client";

import { useState } from "react";
import styles from "../../styles/PostDetails.module.css";

type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

type Comment = {
  id: string;
  author: string;
  content: string;
};

export default function PostDetails({ post }: { post: Post }) {
  const [comments, setComments] = useState<Comment[]>([
    { id: "1", author: "Alice", content: "Loved this post!" },
    { id: "2", author: "Bob", content: "Very insightful." },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: Date.now().toString(),
      author: "You",
      content: newComment,
    };
    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <>
      {/* Post Details */}
      <div className={`max-w-3xl mx-auto p-6 space-y-6 ${styles.postDetails__container}`}>
        <a href="/" className={`${styles.postDetails__back} text-blue-400 hover:text-blue-500`}>
          &larr; Back to Posts
        </a>

        <h1 className={`${styles.postDetails__title} text-white`}>{post.title}</h1>

        <div className={`${styles.postDetails__meta} flex justify-between text-gray-400`}>
          <span>By {post.author}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        <p className={`${styles.postDetails__content} text-gray-200 whitespace-pre-line`}>
          {post.content}
        </p>
      </div>

      {/* Comments Section */}
      <div className="max-w-3xl mx-auto mt-6 space-y-4">
        {comments.map((c) => (
          <div
            key={c.id}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 p-4 rounded-xl border-l-4 border-blue-500 bg-gray-900 bg-opacity-30 hover:bg-opacity-50 transition"
          >
            <span className="font-semibold text-blue-400">{c.author}</span>
            <span className="text-gray-200">{c.content}</span>
          </div>
        ))}

        {/* Add Comment */}
        <div className="flex gap-2 mt-4">
          <input
            type="text"
            placeholder="Write a comment..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={handleAddComment}
            className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
}
