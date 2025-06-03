"use client";
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import RichTextEditor from '@/components/RichTextEditor'; // 

// Define types directly in this file for now
interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  meta_description?: string;
  meta_keywords?: string;
  featured_image_url?: string;
  author_id?: string;
  status: 'draft' | 'published' | 'archived';
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
  views_count?: number;
  reading_time?: number;
  featured?: boolean;
  tags: string[];
}

export default function PostPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClientComponentClient();
  const postId = params.id as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Load post data
  useEffect(() => {
    if (postId) {
      loadPost();
    }
  }, [postId]);

  const loadPost = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setPost(data);
      } else {
        setError('Post not found');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load post';
      setError(errorMessage);
      console.error('Error loading post:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (title: string): void => {
    if (post) {
      setPost({
        ...post,
        title,
        slug: generateSlug(title),
      });
    }
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const handleTagsChange = (tagsString: string): void => {
    if (post) {
      const tagsArray: string[] = tagsString
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      setPost({
        ...post,
        tags: tagsArray
      });
    }
  };

  const savePost = async (status?: 'draft' | 'published'): Promise<void> => {
    if (!post) return;

    setSaving(true);
    setError('');
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const updateData = {
        ...post,
        status: status || post.status,
        reading_time: calculateReadingTime(post.content),
        updated_at: new Date().toISOString(),
        published_at: (status === 'published' && post.status !== 'published') 
          ? new Date().toISOString() 
          : post.published_at,
      };

      const { data, error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', postId)
        .select()
        .single();

      if (error) throw error;

      // Update local state
      setPost(data);
      setIsEditing(false);

      // Trigger sitemap regeneration if published
      if (status === 'published') {
        try {
          await fetch('/api/sitemap/regenerate', { method: 'POST' });
          await fetch('/api/seo/ping-google', { method: 'POST' });
        } catch (seoError) {
          console.warn('SEO operations failed:', seoError);
        }
      }

      // Show success message
      alert('Post saved successfully!');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Error saving post:', err);
    } finally {
      setSaving(false);
    }
  };

  const deletePost = async (): Promise<void> => {
    if (!post || !confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      router.push('/adminpacha/dashboard');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete post';
      setError(errorMessage);
      console.error('Error deleting post:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading post...</p>
        <style jsx>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 400px;
            color: #6272a4;
          }
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #44475a;
            border-top: 4px solid #bd93f9;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 1rem;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error && !post) {
    return (
      <div className="error-container">
        <h1>❌ Error</h1>
        <p>{error}</p>
        <button 
          onClick={() => router.push('/adminpacha/dashboard')}
          className="back-btn"
        >
          🔙 Back to Dashboard
        </button>
        <style jsx>{`
          .error-container {
            text-align: center;
            padding: 2rem;
            color: #ff5555;
          }
          .back-btn {
            background: #6272a4;
            color: #f8f8f2;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 1rem;
            font-family: inherit;
          }
          .back-btn:hover {
            background: #44475a;
          }
        `}</style>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="post-page">
      <div className="post-header">
        <div className="post-title-section">
          <h1>{isEditing ? '✏️ Edit Post' : '📄 View Post'}</h1>
          <div className="post-status">
            <span className={`status-badge ${post.status}`}>
              {post.status === 'draft' ? '📝' : post.status === 'published' ? '🌟' : '📦'} {post.status.toUpperCase()}
            </span>
          </div>
        </div>
        
        <div className="post-actions">
          {!isEditing ? (
            <>
              <button 
                onClick={() => setIsEditing(true)}
                className="edit-btn"
                disabled={saving}
              >
                ✏️ Edit
              </button>
              {post.status === 'published' && (
                <button 
                  onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                  className="view-btn"
                >
                  👁️ View Live
                </button>
              )}
              <button 
                onClick={() => savePost(post.status === 'published' ? 'draft' : 'published')}
                className={post.status === 'published' ? 'unpublish-btn' : 'publish-btn'}
                disabled={saving}
              >
                {post.status === 'published' ? '📦 Unpublish' : '🚀 Publish'}
              </button>
              <button 
                onClick={deletePost}
                className="delete-btn"
                disabled={saving}
              >
                🗑️ Delete
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => savePost()}
                disabled={saving || !post.title.trim()}
                className="save-btn"
              >
                💾 Save Changes
              </button>
              <button 
                onClick={() => {
                  setIsEditing(false);
                  loadPost(); // Reload original data
                }}
                className="cancel-btn"
                disabled={saving}
              >
                ❌ Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      <div className="post-content">
        {!isEditing ? (
          <div className="view-mode">
            <div className="post-meta">
              <p><strong>📅 Created:</strong> {new Date(post.created_at || '').toLocaleDateString()}</p>
              {post.updated_at && (
                <p><strong>📝 Updated:</strong> {new Date(post.updated_at).toLocaleDateString()}</p>
              )}
              {post.published_at && (
                <p><strong>🌟 Published:</strong> {new Date(post.published_at).toLocaleDateString()}</p>
              )}
              <p><strong>📖 Reading Time:</strong> {post.reading_time || 0} min</p>
              <p><strong>👀 Views:</strong> {post.views_count || 0}</p>
            </div>

            <div className="post-details">
              <div className="detail-section">
                <h3>Title</h3>
                <p>{post.title}</p>
              </div>

              <div className="detail-section">
                <h3>Slug</h3>
                <p>/blog/{post.slug}</p>
              </div>

              <div className="detail-section">
                <h3>Content</h3>
                <div 
                  className="content-preview"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="detail-section">
                  <h3>Tags</h3>
                  <div className="tags-display">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {post.meta_description && (
                <div className="detail-section">
                  <h3>Meta Description</h3>
                  <p>{post.meta_description}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="edit-mode">
            <div className="form-section">
              <label className="form-label">Post Title</label>
              <input
                type="text"
                value={post.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="title-input"
                disabled={saving}
              />
            </div>

            <div className="form-section">
              <label className="form-label">URL Slug</label>
              <input
                type="text"
                value={post.slug}
                onChange={(e) => setPost({ ...post, slug: e.target.value })}
                className="slug-input"
                disabled={saving}
              />
            </div>

            <div className="form-section">
              <label className="form-label">Content</label>
              <RichTextEditor
                content={post.content}
                onChange={(content: string) => setPost({ ...post, content })}
                placeholder="Start writing your blog post..."
              />
            </div>

            <div className="form-section">
              <label className="form-label">Meta Description</label>
              <textarea
                value={post.meta_description || ''}
                onChange={(e) => setPost({ ...post, meta_description: e.target.value })}
                className="meta-textarea"
                maxLength={160}
                disabled={saving}
              />
            </div>

            <div className="form-section">
              <label className="form-label">Tags (comma-separated)</label>
              <input
                type="text"
                value={post.tags ? post.tags.join(', ') : ''}
                onChange={(e) => handleTagsChange(e.target.value)}
                className="tags-input"
                disabled={saving}
              />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .post-page {
          max-width: 1000px;
          margin: 0 auto;
          padding: 1rem;
        }

        .post-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #44475a;
        }

        .post-title-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .post-title-section h1 {
          margin: 0;
          color: #bd93f9;
          font-size: 2rem;
        }

        .status-badge {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .status-badge.draft {
          background: #6272a4;
          color: #f8f8f2;
        }

        .status-badge.published {
          background: #50fa7b;
          color: #282a36;
        }

        .status-badge.archived {
          background: #ffb86c;
          color: #282a36;
        }

        .post-actions {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .edit-btn, .view-btn, .publish-btn, .unpublish-btn, .delete-btn, .save-btn, .cancel-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
          font-size: 0.9rem;
        }

        .edit-btn {
          background: #8be9fd;
          color: #282a36;
        }

        .view-btn {
          background: #50fa7b;
          color: #282a36;
        }

        .publish-btn {
          background: #50fa7b;
          color: #282a36;
        }

        .unpublish-btn {
          background: #ffb86c;
          color: #282a36;
        }

        .delete-btn {
          background: #ff5555;
          color: #f8f8f2;
        }

        .save-btn {
          background: #50fa7b;
          color: #282a36;
        }

        .cancel-btn {
          background: #6272a4;
          color: #f8f8f2;
        }

        .edit-btn:hover, .view-btn:hover, .publish-btn:hover, .save-btn:hover {
          transform: translateY(-1px);
        }

        .delete-btn:hover {
          background: #ff4444;
        }

        .cancel-btn:hover, .unpublish-btn:hover {
          opacity: 0.8;
        }

        .edit-btn:disabled, .view-btn:disabled, .publish-btn:disabled, .unpublish-btn:disabled, .delete-btn:disabled, .save-btn:disabled, .cancel-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .error-banner {
          background: linear-gradient(135deg, rgba(255, 85, 85, 0.2) 0%, rgba(255, 85, 85, 0.1) 100%);
          color: #ff5555;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 2rem;
          border: 1px solid rgba(255, 85, 85, 0.3);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .post-meta {
          background: rgba(189, 147, 249, 0.1);
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 2rem;
          border: 1px solid rgba(189, 147, 249, 0.3);
        }

        .post-meta p {
          margin: 0.5rem 0;
          color: #f8f8f2;
        }

        .detail-section {
          margin-bottom: 2rem;
        }

        .detail-section h3 {
          color: #bd93f9;
          margin-bottom: 0.5rem;
          font-size: 1.2rem;
        }

        .detail-section p {
          color: #f8f8f2;
          line-height: 1.6;
        }

        .content-preview {
          background: #1e1f29;
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid #44475a;
          color: #f8f8f2;
          line-height: 1.6;
        }

        .tags-display {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .tag {
          background: #44475a;
          color: #f8f8f2;
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.8rem;
        }

        .form-section {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          color: #bd93f9;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .title-input, .slug-input, .tags-input {
          width: 100%;
          padding: 0.75rem;
          background: #1e1f29;
          border: 2px solid #44475a;
          border-radius: 6px;
          color: #f8f8f2;
          font-family: inherit;
          box-sizing: border-box;
        }

        .title-input {
          font-size: 1.2rem;
          font-weight: 600;
        }

        .meta-textarea {
          width: 100%;
          min-height: 80px;
          padding: 0.75rem;
          background: #1e1f29;
          border: 2px solid #44475a;
          border-radius: 6px;
          color: #f8f8f2;
          font-family: inherit;
          resize: vertical;
          box-sizing: border-box;
        }

        .title-input:focus, .slug-input:focus, .tags-input:focus, .meta-textarea:focus {
          outline: none;
          border-color: #bd93f9;
          box-shadow: 0 0 0 3px rgba(189, 147, 249, 0.2);
        }

        @media (max-width: 768px) {
          .post-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .post-title-section {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .post-actions {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}