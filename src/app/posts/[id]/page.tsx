import { notFound } from "next/navigation";
import PostDetails from "@/features/posts/PostDetails";

type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

export default async function PostDetailsPage({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3000/posts/${params.id}`, { cache: "no-store" });

  if (!res.ok) return notFound();

  const post: Post = await res.json();

  return <PostDetails post={post} />;
}
