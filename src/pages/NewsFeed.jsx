import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { postsAPI, commentsAPI } from '../services/api'
import PostCreator from '../components/PostCreator'
import Post from '../components/Post'
import './NewsFeed.css'

function NewsFeed({ onNavigateToProfile }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user } = useAuth()

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await postsAPI.getAllPosts(1, 20)
      
      // Transform API data to match component structure
      const transformedPosts = await Promise.all(
        response.posts.map(async (post) => {
          // Fetch comments for each post
          const comments = await commentsAPI.getComments(post.id)
          
          return {
            id: post.id.toString(),
            author: {
              id: post.user_id,
              name: `${post.first_name} ${post.last_name}`,
              username: post.username,
              avatar: post.profile_picture_url || '�'
            },
            content: post.content,
            imageUrl: post.image_url,
            timestamp: new Date(post.created_at),
            likes: post.likes_count || 0,
            commentsCount: post.comments_count || 0,
            comments: comments.map(comment => ({
              id: comment.id.toString(),
              author: {
                id: comment.user_id,
                name: `${comment.first_name} ${comment.last_name}`,
                username: comment.username,
                avatar: comment.profile_picture_url || '👤'
              },
              content: comment.content,
              timestamp: new Date(comment.created_at),
              likes: comment.likes_count || 0
            }))
          }
        })
      )
      
      setPosts(transformedPosts)
      setError('')
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError('Failed to load posts. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleNewPost = async (postContent) => {
    try {
      const newPostData = await postsAPI.createPost({ content: postContent })
      
      // Transform the new post to match component structure
      const transformedPost = {
        id: newPostData.id.toString(),
        author: {
          id: newPostData.user.id,
          name: `${newPostData.user.firstName} ${newPostData.user.lastName}`,
          username: newPostData.user.username,
          avatar: newPostData.user.profilePicture || '�'
        },
        content: newPostData.content,
        imageUrl: newPostData.imageUrl,
        timestamp: new Date(newPostData.createdAt),
        likes: newPostData.likesCount || 0,
        commentsCount: newPostData.commentsCount || 0,
        comments: []
      }
      
      setPosts([transformedPost, ...posts])
    } catch (err) {
      console.error('Error creating post:', err)
      setError('Failed to create post. Please try again.')
    }
  }

  const handleLikePost = async (postId) => {
    try {
      const result = await postsAPI.likePost(postId)
      
      // Update the post in the local state
      setPosts(posts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              likes: result.liked ? post.likes + 1 : post.likes - 1,
              isLiked: result.liked
            }
          : post
      ))
    } catch (err) {
      console.error('Error liking post:', err)
      setError('Failed to like post. Please try again.')
    }
  }

  const handleAddComment = async (postId, commentContent) => {
    try {
      const newCommentData = await commentsAPI.createComment({
        postId: parseInt(postId),
        content: commentContent
      })
      
      const newComment = {
        id: newCommentData.id.toString(),
        author: {
          id: newCommentData.user.id,
          name: `${newCommentData.user.firstName} ${newCommentData.user.lastName}`,
          username: newCommentData.user.username,
          avatar: newCommentData.user.profilePicture || '�'
        },
        content: newCommentData.content,
        timestamp: new Date(newCommentData.createdAt),
        likes: newCommentData.likesCount || 0
      }

      setPosts(posts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              comments: [...post.comments, newComment],
              commentsCount: post.commentsCount + 1
            }
          : post
      ))
    } catch (err) {
      console.error('Error adding comment:', err)
      setError('Failed to add comment. Please try again.')
    }
  }

  const handleLikeComment = async (postId, commentId) => {
    try {
      const result = await commentsAPI.likeComment(commentId)
      
      setPosts(posts.map(post => 
        post.id === postId 
          ? {
              ...post,
              comments: post.comments.map(comment =>
                comment.id === commentId
                  ? { 
                      ...comment, 
                      likes: result.liked ? comment.likes + 1 : comment.likes - 1,
                      isLiked: result.liked
                    }
                  : comment
              )
            }
          : post
      ))
    } catch (err) {
      console.error('Error liking comment:', err)
      setError('Failed to like comment. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="newsfeed">
        <div className="newsfeed-container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '200px',
            fontSize: '18px',
            color: '#65676b'
          }}>
            Loading posts...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="newsfeed">
      <div className="newsfeed-container">
        <PostCreator onSubmit={handleNewPost} />
        
        {error && (
          <div style={{
            background: '#ffe6e6',
            color: '#d32f2f',
            padding: '12px',
            borderRadius: '8px',
            margin: '16px 0',
            border: '1px solid #ffcdd2'
          }}>
            {error}
          </div>
        )}
        
        <div className="posts-list">
          {posts.length === 0 && !loading ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#65676b',
              fontSize: '16px'
            }}>
              No posts yet. Be the first to share something!
            </div>
          ) : (
            posts.map(post => (
              <Post
                key={post.id}
                post={post}
                onLike={() => handleLikePost(post.id)}
                onComment={(content) => handleAddComment(post.id, content)}
                onLikeComment={(commentId) => handleLikeComment(post.id, commentId)}
                onNavigateToProfile={onNavigateToProfile}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default NewsFeed
