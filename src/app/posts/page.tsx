import React from 'react';
import { postsData, Post } from '@/lib/postsData';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const PostsPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Writing on Machine Learning, Advance Math, and Programming</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">All my articles are written with the goal of helping you learn something new. I hope you enjoy them!</p>

      {/* Placeholder for Search Bar */}
      <div className="mb-12 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search articles..."
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
        />
      </div>

      <div className="flex flex-col gap-10">
 {postsData.map((post) => (
 <Card key={post.id} className="w-full max-w-2xl mx-auto overflow-hidden">
          {post.images && post.images.length > 0 && (
 <div className="relative w-full h-60">
 <Image
                src={post.images[0]}
 alt={post.imageHint || post.title}
                layout="fill"
 objectFit="cover"
 className="rounded-t-md"
 />
 </div>
 )}
 <CardHeader>
 <CardTitle>{post.title}</CardTitle>
 <p className="text-sm text-muted-foreground">{post.date}</p>
 </CardHeader>
 <CardContent>
 <p className="mb-4">{post.description}</p>
 <Link href={`/posts/${post.slug}`} className="inline-flex items-center px-4 py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:bg-purple-700 dark:hover:bg-purple-800 dark:focus:ring-purple-800">
              Read more <span className="ml-2 text-lg">→</span>
 </Link>
 </CardContent>
 </Card>
        ))}
      </div>

    </div>
  );
};

export default PostsPage;
