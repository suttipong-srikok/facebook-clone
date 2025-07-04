import { useState } from 'react'
import { Heart, MessageCircle } from 'lucide-react'
import './Comment.css'

function Comment({ comment, onLike }) {
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
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
          <div className="comment-author">{comment.author.name}</div>
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
          {comment.likes > 0 && (
            <span className="comment-likes">
              <Heart size={12} fill="#e91e63" />
              {comment.likes}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Comment
