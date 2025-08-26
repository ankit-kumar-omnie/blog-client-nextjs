import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold hover:text-blue-400">My Blog</h1>
        </Link>
        <div className="flex gap-6">
          <Link href="/" className="hover:text-blue-400">
            Home
          </Link>
          <Link href="/create" className="hover:text-blue-400">
            Create Post
          </Link>
        </div>
      </div>
    </nav>
  );
}
