import { Search, Home, Users, MessageCircle, Bell, User, LogOut, Settings } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import SettingsModal from '../pages/Settings'
import './Header.css'

function Header({ onNavigate }) {
  const { user, logout } = useAuth()
  const [showSettings, setShowSettings] = useState(false)

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">social network</div>
        <div className="search-bar">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search Social Network" 
            className="search-input"
          />
        </div>
      </div>
      
      <nav className="header-center">
        <button className="nav-button active" onClick={() => onNavigate && onNavigate('newsfeed')}>
          <Home size={24} />
        </button>
        <button className="nav-button">
          <Users size={24} />
        </button>
        <button className="nav-button">
          <MessageCircle size={24} />
        </button>
      </nav>
      
      <div className="header-right">
        <button className="icon-button">
          <Bell size={20} />
        </button>
        <button className="icon-button" onClick={() => setShowSettings(true)}>
          <Settings size={20} />
        </button>
        <div className="profile-section">
          <span className="user-name">
            {user?.firstName} {user?.lastName}
          </span>
          <button className="profile-button" onClick={() => onNavigate && onNavigate('profile')}>
            <User size={20} />
          </button>
          <button className="icon-button logout-button" onClick={handleLogout} title="Logout">
            <LogOut size={20} />
          </button>
        </div>
      </div>
      
      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}
    </header>
  )
}

export default Header
