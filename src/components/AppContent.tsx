'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { ThemeProvider } from '../contexts/ThemeContext'
import Header from './Header'
import NewsFeed from '../pages/NewsFeed'
import Profile from '../pages/Profile'
import Login from '../pages/Login'
import Register from '../pages/Register'

type Page = 'login' | 'register' | 'newsfeed' | 'profile' | 'user-profile'

const AppContentInner = () => {
  const { isAuthenticated, loading } = useAuth()
  const [currentPage, setCurrentPage] = useState<Page>('login')
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        setCurrentPage('newsfeed')
      } else {
        setCurrentPage('login')
      }
    }
  }, [isAuthenticated, loading])

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    )
  }

  const handleNavigate = (page: Page, userId?: string) => {
    if (page === 'user-profile' && userId) {
      setSelectedUserId(userId)
    }
    setCurrentPage(page)
  }

  if (!isAuthenticated) {
    if (currentPage === 'register') {
      return <Register onNavigate={handleNavigate} />
    }
    return <Login onNavigate={handleNavigate} />
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'profile':
        return <Profile userId={null} isOwnProfile={true} onNavigateToProfile={handleNavigate} />
      case 'user-profile':
        return <Profile userId={selectedUserId} isOwnProfile={false} onNavigateToProfile={handleNavigate} />
      case 'newsfeed':
      default:
        return <NewsFeed onNavigateToProfile={handleNavigate} />
    }
  }

  return (
    <div className="app">
      <Header onNavigate={handleNavigate} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  )
}

const AppContent = () => {
  return (
    <ThemeProvider>
      <AppContentInner />
    </ThemeProvider>
  )
}

export default AppContent
