import { postsData } from '@/lib/postsData';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PostProps {
  params: {
    slug: string;
  };
}

const PostPage = ({ params }: PostProps) => {
  const post = postsData.find(post => post.slug === params.slug);

  if (!post) {
    return <div className="container mx-auto px-4 py-8">Post not found</div>;
  }

  return (
    <div className="flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-4xl">
        {/* Back arrow and category section */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <a href="/posts" className="hover:underline">&larr; Back to Posts</a>
          {/* Example category/tag - replace with actual data if available */}
          <span className="mx-2">|</span>
          <span>Technology, Career, Artificial Intelligence</span> {/* Replace with actual categories/tags */}
        </div>

        {/* Post Title and Date */}
        <div className="text-center mb-8">
          <p className="text-base text-gray-500 dark:text-gray-400 mb-2">{post.date}</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-gray-900 dark:text-gray-100">
            {post.title}
          </h1>
          {/* Read time placeholder - add logic to calculate */}
          <p className="text-sm text-gray-500 dark:text-gray-400">4 min read</p> {/* Replace with dynamic read time */}
        </div>

        {/* Featured Image */}
        {post.images && post.images.length > 0 && (
          <div className="relative w-full aspect-video overflow-hidden rounded-lg mb-8">
            <Image
              src={post.images[0]}
              alt={post.imageHint || post.title}
              fill
              style={{ objectFit: 'cover' }}
              className="object-cover"
            />
          </div>
        )}

        {/* Post Content */}
        <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed text-lg">
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </div>

        {/* Social Sharing Buttons Placeholder */}
        <div className="flex justify-center space-x-4 my-8">
          {/* Replace with actual social sharing components/links */}
          <a href="#" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.25 12.145a10.11 10.11 0 01-2.748 7.118c-2.2 2.203-4.763 3.304-7.695 3.304-2.74 0-5.303-1.098-7.5-3.302C2.057 17.45 1 14.984 1 12.145c0-2.838 1.057-5.303 3.21-7.502S9.405 1.34 12.218 1.34c2.931 0 5.494 1.1 7.696 3.303 2.152 2.2 3.209 4.665 3.209 7.502zm-4.21-.924c0-.87-.354-1.675-.97-2.29S15.492 8.66 14.622 8.66h-1.43c-.24 0-.438.195-.438.435v3.053l-2.75-.01c-.24 0-.438.193-.438.432v.87c0 .239.198.435.438.435h2.75v3.05c0 .24.197.435.438.435h.872c.24 0 .438-.195.438-.435v-3.053h.562c.87 0 1.674-.356 2.29-.973S18.04 11.22 18.04 11.22zm-3.305-1.733h.688c.24 0 .438.195.438.435v.433h-1.562v-.868zm1.005 3.487v1.564H12.22v-1.564zm-1.006 2.432v-1.565h-1.56v1.565h1.56z"/></svg>
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-300">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.901 1.162a5.925 5.925 0 013.13 3.13c-.075.075-.15.15-.225.225l-3.75-3.75c.075-.075.15-.15.225-.225zM5.098 1.162a5.926 5.926 0 00-3.13 3.13c.075.075.15.15.225.225L5.25 1.387c-.075-.075-.15-.15-.225-.225zM22.288 4.534l-4.5 4.5c-.075.075-.15.15-.225.225l4.5 4.5c.075.075.15.15.225.225a5.925 5.925 0 00-3.13-3.13c-.075-.075-.15-.15-.225-.225l-4.5 4.5c-.075.075-.15.15-.225.225a5.925 5.925 0 00-3.13-3.13c-.075-.075-.15-.15-.225-.225L4.534 22.288a5.926 5.926 0 01-3.13-3.13c.075-.075.15-.15.225-.225l4.5-4.5c.075-.075.15-.15.225-.225L1.712 10.213a5.925 5.925 0 013.13-3.13c.075-.075.15-.15.225-.225l4.5 4.5c.075.075.15.15.225.225L13.787 1.712a5.925 5.925 0 013.13 3.13c-.075.075-.15.15-.225.225l-4.5 4.5c-.075.075-.15.15-.225.225l4.5 4.5c.075.075.15.15.225.225a5.925 5.925 0 003.13-3.13c-.075-.075-.15-.15-.225-.225L19.213 4.761a5.925 5.925 0 013.075-.227zM10.898 13.41l-2.25 2.25a.875.875 0 001.237 1.238l2.25-2.25a.875.875 0 00-1.237-1.237zm2.25-2.25l-2.25-2.25a.875.875 0 00-1.238 1.237l2.25 2.25a.875.875 0 001.237-1.238zm-2.25 2.25l2.25-2.25a.875.875 0 011.237-1.237l-2.25 2.25a.875.875 0 01-1.237 1.238zm2.25-2.25l-2.25 2.25a.875.875 0 011.238 1.237l2.25-2.25a.875.875 0 01-1.237-1.238z"></path></svg>
          </a>
           <a href="#" className="text-gray-500 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.529-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
           </a>
             <a href="#" className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.165c1.04-.53 2.185-.813 3.355-.813 3.98 0 7.22 3.24 7.22 7.22 0 3.98-3.24 7.22-7.22 7.22-3.98 0-7.22-3.24-7.22-7.22l-.007-.293c-.003-1.592.517-3.193 1.483-4.53l1.06-1.53zm.636-6.551c-.037 0-.073-.002-.11 0-1.995 0-3.2-.768-3.2-2.816 0-1.54.758-2.95 1.598-3.633l1.658-2.437c-.711-1.083-1.155-2.354-1.155-3.788 0-3.85 3.15-6.998 6.998-6.998 3.85 0 6.998 3.148 6.998 6.998 0 3.85-3.148 6.998-6.998 6.998-.564 0-1.106-.078-1.624-.228l-.374.184-1.05.515c-2.835 1.39-5.482 2.685-5.482 2.685zm.754-4.541l-.45-.222c-1.393-.682-2.197-1.702-2.197-3.276 0-1.35.612-2.286 1.2-2.846l.45-.223c.591-2.846 2.424-5 5.098-5 2.847 0 5.1 2.253 5.1 5.1 0 2.846-2.253 5.1-5.1 5.1-1.586 0-3.042-.782-3.924-1.963z"/></svg>
            </a>

        </div>

        {/* Placeholder for Previous/Next Article navigation */}
        {/* <div className="flex justify-between mt-8">
          <a href="#" className="text-blue-600 hover:underline">&larr; Previous Article</a>
          <a href="#" className="text-blue-600 hover:underline">Next Article &rarr;</a>
        </div> */}

        {/* About the Author section */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mt-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner">
          {/* Author Image Placeholder - Replace with actual image */}
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-600 flex-shrink-0">
            {/* Add Author Image here */}
             {/* Replace with actual author image if available */}
             <Image
              src="/panjabi.jpeg" // Placeholder image - replace with author's image
              alt="Author Avatar"
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">About the Author</h3>
            {/* Replace with actual author bio */}
            <p className="text-base text-gray-700 dark:text-gray-300">
               Md. Mobin Chowdhury is an undergraduate Physics student at University of Dhaka, combining theoretical physics research with self-taught expertise in AI and quantum computing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;