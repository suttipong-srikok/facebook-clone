'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { usersAPI, postsAPI } from '../services/api'
import Post from '../components/Post'
import { Camera, MapPin, Calendar, Globe, Edit } from 'lucide-react'
import './Profile.css'

const Profile = ({ userId, isOwnProfile = false, onNavigateToProfile }) => {
  const [userProfile, setUserProfile] = useState(null)
  const [userPosts, setUserPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const { user: currentUser } = useAuth()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        
        let profile
        if (isOwnProfile) {
          profile = currentUser
        } else {
          profile = await usersAPI.getProfile(userId)
        }
        
        setUserProfile(profile)

        // Fetch user posts
        const postsData = await usersAPI.getUserPosts(userId || currentUser?.id)
        setUserPosts(postsData.posts || [])
        
        setError('')
      } catch (err) {
        console.error('Error fetching user data:', err)
        setError('Failed to load profile. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    if (userId || isOwnProfile) {
      fetchUserData()
    }
  }, [userId, isOwnProfile, currentUser])

  const handleLikePost = async (postId) => {
    try {
      const result = await postsAPI.likePost(postId)
      
      setUserPosts(posts => posts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              likes_count: result.liked ? post.likes_count + 1 : post.likes_count - 1,
              isLiked: result.liked
            }
          : post
      ))
    } catch (err) {
      console.error('Error liking post:', err)
    }
  }

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '200px',
            fontSize: '18px',
            color: '#65676b'
          }}>
            Loading profile...
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div style={{
            background: '#ffe6e6',
            color: '#d32f2f',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        </div>
      </div>
    )
  }

  if (!userProfile) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#65676b',
            fontSize: '16px'
          }}>
            User not found
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Cover Photo Section */}
        <div className="cover-photo-section">
          <div className="cover-photo">
            <div className="cover-photo-placeholder">
              <Camera size={40} />
              <span>Add Cover Photo</span>
            </div>
          </div>
          
          {/* Profile Picture and Info */}
          <div className="profile-header">
            <div className="profile-picture-container">
              <div className="profile-picture">
                {userProfile.profilePicture ? (
                  <img src={userProfile.profilePicture} alt={`${userProfile.firstName} ${userProfile.lastName}`} />
                ) : (
                  <div className="default-avatar">
                    {userProfile.firstName?.[0]}{userProfile.lastName?.[0]}
                  </div>
                )}
                {isOwnProfile && (
                  <button className="change-photo-btn">
                    <Camera size={16} />
                  </button>
                )}
              </div>
            </div>
            
            <div className="profile-info">
              <h1 className="profile-name">
                {userProfile.firstName} {userProfile.lastName}
              </h1>
              <p className="profile-username">@{userProfile.username}</p>
              
              {userProfile.bio && (
                <p className="profile-bio">{userProfile.bio}</p>
              )}
              
              <div className="profile-meta">
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>Joined {new Date(userProfile.createdAt).toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}</span>
                </div>
                
                <div className="meta-item">
                  <Globe size={16} />
                  <span>Public Profile</span>
                </div>
              </div>
              
              <div className="profile-actions">
                {isOwnProfile ? (
                  <button 
                    className="edit-profile-btn"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit size={16} />
                    Edit Profile
                  </button>
                ) : (
                  <div className="other-user-actions">
                    <button className="follow-btn">Follow</button>
                    <button className="message-btn">Message</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-number">{userPosts.length}</span>
            <span className="stat-label">Posts</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">0</span>
            <span className="stat-label">Following</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">0</span>
            <span className="stat-label">Followers</span>
          </div>
        </div>

        {/* Posts Section */}
        <div className="profile-posts">
          <h2 className="posts-title">
            {isOwnProfile ? 'Your Posts' : `${userProfile.firstName}'s Posts`}
          </h2>
          
          {userPosts.length === 0 ? (
            <div className="no-posts">
              <p>
                {isOwnProfile 
                  ? "You haven't posted anything yet. Share your first post!" 
                  : `${userProfile.firstName} hasn't posted anything yet.`
                }
              </p>
            </div>
          ) : (
            <div className="posts-list">
              {userPosts.map(post => (
                <Post
                  key={post.id}
                  post={{
                    id: post.id.toString(),
                    author: {
                      id: post.user_id,
                      name: `${post.first_name} ${post.last_name}`,
                      username: post.username,
                      avatar: post.profile_picture_url || '👤'
                    },
                    content: post.content,
                    imageUrl: post.image_url,
                    timestamp: new Date(post.created_at),
                    likes: post.likes_count || 0,
                    commentsCount: post.comments_count || 0,
                    comments: []
                  }}
                  onLike={() => handleLikePost(post.id)}
                  onComment={() => {}} // Will be implemented with comments
                  onLikeComment={() => {}}
                  onNavigateToProfile={onNavigateToProfile}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
