import { useState } from 'react'
import PostCreator from '../components/PostCreator'
import Post from '../components/Post'
import './NewsFeed.css'

// Mock initial posts data
const initialPosts = [
  {
    id: '1',
    author: {
      name: 'John Doe',
      avatar: '👤'
    },
    content: 'Just had an amazing day at the beach! The weather was perfect and the sunset was breathtaking. 🌅',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 15,
    comments: [
      {
        id: 'c1',
        author: { name: 'Jane Smith', avatar: '👩' },
        content: 'Looks amazing! Which beach did you go to?',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        likes: 3
      },
      {
        id: 'c2',
        author: { name: 'Mike Johnson', avatar: '👨' },
        content: 'Great photo! I need to visit that place soon.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        likes: 1
      }
    ]
  },
  {
    id: '2',
    author: {
      name: 'Sarah Wilson',
      avatar: '👩‍💼'
    },
    content: 'Excited to share that I just got promoted to Senior Developer! 🎉 Thank you to everyone who supported me on this journey.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    likes: 42,
    comments: [
      {
        id: 'c3',
        author: { name: 'Alex Brown', avatar: '👨‍💻' },
        content: 'Congratulations! Well deserved! 🎊',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        likes: 5
      }
    ]
  }
]

function NewsFeed() {
  const [posts, setPosts] = useState(initialPosts)

  const handleNewPost = (postContent) => {
    const newPost = {
      id: Date.now().toString(),
      author: {
        name: 'You',
        avatar: '😊'
      },
      content: postContent,
      timestamp: new Date(),
      likes: 0,
      comments: []
    }
    setPosts([newPost, ...posts])
  }

  const handleLikePost = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ))
  }

  const handleAddComment = (postId, commentContent) => {
    const newComment = {
      id: Date.now().toString(),
      author: { name: 'You', avatar: '😊' },
      content: commentContent,
      timestamp: new Date(),
      likes: 0
    }

    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ))
  }

  const handleLikeComment = (postId, commentId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? {
            ...post,
            comments: post.comments.map(comment =>
              comment.id === commentId
                ? { ...comment, likes: comment.likes + 1 }
                : comment
            )
          }
        : post
    ))
  }

  return (
    <div className="newsfeed">
      <div className="newsfeed-container">
        <PostCreator onSubmit={handleNewPost} />
        <div className="posts-list">
          {posts.map(post => (
            <Post
              key={post.id}
              post={post}
              onLike={() => handleLikePost(post.id)}
              onComment={(content) => handleAddComment(post.id, content)}
              onLikeComment={(commentId) => handleLikeComment(post.id, commentId)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewsFeed
