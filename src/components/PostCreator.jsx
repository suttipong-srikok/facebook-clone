import { useState } from 'react'
import { Image, Smile, MapPin } from 'lucide-react'
import './PostCreator.css'

function PostCreator({ onSubmit }) {
  const [content, setContent] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (content.trim()) {
      onSubmit(content)
      setContent('')
      setIsExpanded(false)
    }
  }

  return (
    <div className="post-creator">
      <div className="post-creator-header">
        <div className="user-avatar">😊</div>
        <button 
          className="post-input-trigger"
          onClick={() => setIsExpanded(true)}
        >
          What's on your mind?
        </button>
      </div>

      {isExpanded && (
        <form onSubmit={handleSubmit} className="post-form">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="post-textarea"
            autoFocus
            rows={3}
          />
          
          <div className="post-options">
            <div className="post-actions">
              <button type="button" className="action-button">
                <Image size={20} />
                <span>Photo/Video</span>
              </button>
              <button type="button" className="action-button">
                <Smile size={20} />
                <span>Feeling/Activity</span>
              </button>
              <button type="button" className="action-button">
                <MapPin size={20} />
                <span>Check in</span>
              </button>
            </div>
            
            <div className="post-submit">
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => {
                  setIsExpanded(false)
                  setContent('')
                }}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-button"
                disabled={!content.trim()}
              >
                Post
              </button>
            </div>
          </div>
        </form>
      )}

      {!isExpanded && (
        <div className="post-quick-actions">
          <button className="quick-action">
            <Image size={20} />
            <span>Photo/Video</span>
          </button>
          <button className="quick-action">
            <Smile size={20} />
            <span>Feeling/Activity</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default PostCreator
