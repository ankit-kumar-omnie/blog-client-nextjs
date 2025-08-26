import { notFound } from "next/navigation";
import PostDetails from "@/features/posts/PostDetails";

type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

export default async function PostDetailsPage(props: unknown) {
  const { params } = props as { params: { id: string } };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${params.id}`, { cache: "no-store" });

  if (!res.ok) return notFound();

  const post: Post = await res.json();

  return <PostDetails post={post} />;
}
