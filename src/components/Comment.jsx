import { useState } from 'react'
import { Heart, MessageCircle } from 'lucide-react'
import './Comment.css'

function Comment({ comment, onLike, onNavigateToProfile }) {
  const [isLiked, setIsLiked] = useState(comment.isLiked || false)
  const [likesCount, setLikesCount] = useState(comment.likes || 0)

  const handleLike = () => {
    const newLikedState = !isLiked
    const newLikesCount = newLikedState ? likesCount + 1 : likesCount - 1
    
    // Optimistically update UI
    setIsLiked(newLikedState)
    setLikesCount(newLikesCount)
    
    // Call parent handler
    onLike()
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
    <div className="comment">
      <div className="comment-avatar">{comment.author.avatar}</div>
      <div className="comment-content">
        <div className="comment-bubble">
          <div className="comment-author">
            <span 
              onClick={() => onNavigateToProfile && onNavigateToProfile('user-profile', comment.author.id)}
              style={{ cursor: 'pointer', color: '#1877f2' }}
            >
              {comment.author.name}
            </span>
            <span className="comment-username">@{comment.author.username}</span>
          </div>
          <div className="comment-text">{comment.content}</div>
        </div>
        <div className="comment-actions">
          <button 
            className={`comment-action ${isLiked ? 'liked' : ''}`}
            onClick={handleLike}
          >
            Like
          </button>
          <button className="comment-action">Reply</button>
          <span className="comment-time">{formatTimestamp(comment.timestamp)}</span>
          {likesCount > 0 && (
            <span className="comment-likes">
              <Heart size={12} fill="#e91e63" />
              {likesCount}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Comment
