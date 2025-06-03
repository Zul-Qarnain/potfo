import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// BlogPost interface matching your exact database schema
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  meta_description?: string;
  meta_keywords?: string;
  featured_image_url?: string;
  author_id: string;
  status: 'draft' | 'published' | 'archived';
  published_at: string | null;
  created_at: string;
  updated_at: string;
  views_count: number;
  reading_time: number;
  featured: boolean;
  tags: string[];
}

interface PostProps {
  params: {
    slug: string;
  };
}

const PostPage = async ({ params }: PostProps) => {
  const supabase = createServerComponentClient({ cookies });

  // Fetch the post from Supabase
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single();

  if (error || !post) {
    notFound();
  }

  // Increment view count using your database function
  try {
    await supabase.rpc('increment_post_views', { post_slug: params.slug });
  } catch (error) {
    console.error('Error incrementing view count:', error);
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTags = (tags: string[]) => {
    if (!tags || tags.length === 0) return 'Technology, Programming';
    return tags.join(', ');
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-site.com';
  const postUrl = `${siteUrl}/posts/${post.slug}`;

  return (
    <div className="flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-4xl">
        {/* Back arrow and category section */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Link href="/posts" className="hover:underline hover:text-purple-600 transition-colors duration-200">
            ← Back to Posts
          </Link>
          <span className="mx-2">|</span>
          <span>{formatTags(post.tags)}</span>
        </div>

        {/* Featured badge */}
        {post.featured && (
          <div className="text-center mb-4">
            <span className="inline-block bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              ⭐ Featured Post
            </span>
          </div>
        )}

        {/* Post Title and Date */}
        <div className="text-center mb-8">
          <p className="text-base text-gray-500 dark:text-gray-400 mb-2">
            {formatDate(post.published_at!)}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-gray-900 dark:text-gray-100">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            {post.reading_time > 0 && <span>{post.reading_time} min read</span>}
            {post.views_count > 0 && <span>• {post.views_count + 1} views</span>}
            <span>• Published {formatDate(post.created_at)}</span>
          </div>
        </div>

        {/* Featured Image */}
        {post.featured_image_url && (
          <div className="relative w-full aspect-video overflow-hidden rounded-lg mb-8 shadow-lg">
            <Image
              src={post.featured_image_url}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              className="object-cover"
            />
          </div>
        )}

        {/* Post excerpt if available */}
        {post.excerpt && (
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8 border-l-4 border-purple-600">
            <p className="text-lg italic text-gray-700 dark:text-gray-300 leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        )}

        {/* Post Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </div>

        {/* Tags Section */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 mr-2">Tags:</span>
            {post.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="inline-block bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm px-3 py-1 rounded-full hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Social Sharing Buttons */}
        <div className="flex justify-center space-x-4 my-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 mr-4 self-center">Share:</span>
          <a 
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
            title="Share on Twitter"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
            </svg>
          </a>
          <a 
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500 transition-colors duration-200"
            title="Share on LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
            </svg>
          </a>
          <a 
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-800 dark:text-gray-400 dark:hover:text-blue-600 transition-colors duration-200"
            title="Share on Facebook"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
            </svg>
          </a>
        </div>

        {/* About the Author section */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mt-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-600 flex-shrink-0">
            <Image
              src="/panjabi.jpeg"
              alt="Author Avatar"
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">About the Author</h3>
            <p className="text-base text-gray-700 dark:text-gray-300">
              Md. Mobin Chowdhury is an undergraduate Physics student at University of Dhaka, combining theoretical physics research with self-taught expertise in AI and quantum computing.
            </p>
          </div>
        </div>

        {/* Navigation to other posts */}
        <div className="mt-12 text-center">
          <Link 
            href="/posts" 
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 hover:shadow-md"
          >
            ← Back to All Posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostPage;

// Generate metadata for SEO
export async function generateMetadata({ params }: PostProps) {
  const supabase = createServerComponentClient({ cookies });
  
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, meta_description, featured_image_url, excerpt, tags')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single();

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const description = post.meta_description || post.excerpt || post.title;

  return {
    title: post.title,
    description: description,
    keywords: post.tags?.join(', '),
    openGraph: {
      title: post.title,
      description: description,
      images: post.featured_image_url ? [post.featured_image_url] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: post.featured_image_url ? [post.featured_image_url] : [],
    },
  };
}