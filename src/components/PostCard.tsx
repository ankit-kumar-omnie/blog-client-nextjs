import Link from "next/link";
import styles from "../styles/PostCard.module.css";

type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.id}`}>
      <div className={styles.postCard}>
        <h2 className={styles.postCardTitle}>{post.title}</h2>
        <p className={styles.postCardContent}>
          {post.content.length > 140
            ? post.content.slice(0, 140) + "..."
            : post.content}
        </p>
        <div className={styles.postCardFooter}>
          <span className={styles.postCardAuthor}>{post.author}</span>
          <span className={styles.postCardDate}>
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
