import { Search, Home, Users, MessageCircle, Bell, User } from 'lucide-react'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">facebook</div>
        <div className="search-bar">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search Facebook" 
            className="search-input"
          />
        </div>
      </div>
      
      <nav className="header-center">
        <button className="nav-button active">
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
        <button className="profile-button">
          <User size={20} />
        </button>
      </div>
    </header>
  )
}

export default Header
