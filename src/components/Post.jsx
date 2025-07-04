import { useState } from 'react'
import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react'
import Comment from './Comment'
import './Post.css'

function Post({ post, onLike, onComment, onLikeComment }) {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    onLike()
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      onComment(newComment)
      setNewComment('')
    }
  }

  const formatTimestamp = (timestamp) => {
    const now = new Date()
    const diff = now - timestamp
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m`
    if (hours < 24) return `${hours}h`
    return `${days}d`
  }

  return (
    <article className="post">
      <div className="post-header">
        <div className="post-author">
          <div className="author-avatar">{post.author.avatar}</div>
          <div className="author-info">
            <h3 className="author-name">{post.author.name}</h3>
            <time className="post-time">{formatTimestamp(post.timestamp)}</time>
          </div>
        </div>
        <button className="post-menu">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
      </div>

      <div className="post-stats">
        <span className="likes-count">
          {post.likes > 0 && (
            <>
              <span className="like-icon">❤️</span>
              {post.likes}
            </>
          )}
        </span>
        <span className="comments-count">
          {post.comments.length > 0 && `${post.comments.length} comments`}
        </span>
      </div>

      <div className="post-actions">
        <button 
          className={`action-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <Heart size={20} fill={isLiked ? '#e91e63' : 'none'} />
          <span>Like</span>
        </button>
        <button 
          className="action-btn"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle size={20} />
          <span>Comment</span>
        </button>
        <button className="action-btn">
          <Share size={20} />
          <span>Share</span>
        </button>
      </div>

      {(showComments || post.comments.length > 0) && (
        <div className="comments-section">
          {post.comments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              onLike={() => onLikeComment(comment.id)}
            />
          ))}
          
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <div className="comment-input-container">
              <div className="commenter-avatar">😊</div>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="comment-input"
              />
            </div>
          </form>
        </div>
      )}
    </article>
  )
}

export default Post
