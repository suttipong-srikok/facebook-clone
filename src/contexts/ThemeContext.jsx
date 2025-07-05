'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Define all available themes
export const THEMES = {
  oceanModern: {
    id: 'oceanModern',
    name: 'Ocean Modern',
    description: 'Professional & Trustworthy',
    emoji: '🌊',
    colors: {
      primary: '#0ea5e9',
      primaryHover: '#0284c7',
      primaryLight: '#e0f2fe',
      secondary: '#64748b',
      accent: '#10b981',
      background: '#f8fafc',
      surface: '#ffffff',
      border: '#e2e8f0',
      textPrimary: '#0f172a',
      textSecondary: '#64748b'
    }
  },
  vibrantModern: {
    id: 'vibrantModern',
    name: 'Vibrant Modern',
    description: 'Creative & Energetic',
    emoji: '🎨',
    colors: {
      primary: '#8b5cf6',
      primaryHover: '#7c3aed',
      primaryLight: '#f3e8ff',
      secondary: '#ef4444',
      accent: '#f59e0b',
      background: '#fafafa',
      surface: '#ffffff',
      border: '#e5e7eb',
      textPrimary: '#111827',
      textSecondary: '#6b7280'
    }
  },
  natureModern: {
    id: 'natureModern',
    name: 'Nature Modern',
    description: 'Calm & Sustainable',
    emoji: '🌱',
    colors: {
      primary: '#059669',
      primaryHover: '#047857',
      primaryLight: '#d1fae5',
      secondary: '#7c2d12',
      accent: '#f59e0b',
      background: '#f9fafb',
      surface: '#ffffff',
      border: '#d1d5db',
      textPrimary: '#111827',
      textSecondary: '#6b7280'
    }
  },
  boldModern: {
    id: 'boldModern',
    name: 'Bold Modern',
    description: 'Dynamic & Confident',
    emoji: '🔥',
    colors: {
      primary: '#dc2626',
      primaryHover: '#b91c1c',
      primaryLight: '#fef2f2',
      secondary: '#1f2937',
      accent: '#f59e0b',
      background: '#f9fafb',
      surface: '#ffffff',
      border: '#e5e7eb',
      textPrimary: '#111827',
      textSecondary: '#6b7280'
    }
  },
  elegantDark: {
    id: 'elegantDark',
    name: 'Elegant Dark',
    description: 'Sophisticated & Modern',
    emoji: '🌙',
    colors: {
      primary: '#6366f1',
      primaryHover: '#4f46e5',
      primaryLight: '#312e81',
      secondary: '#64748b',
      accent: '#06b6d4',
      background: '#0f172a',
      surface: '#1e293b',
      border: '#334155',
      textPrimary: '#f8fafc',
      textSecondary: '#cbd5e1'
    }
  },
  playfulModern: {
    id: 'playfulModern',
    name: 'Playful Modern',
    description: 'Fun & Approachable',
    emoji: '🎪',
    colors: {
      primary: '#ec4899',
      primaryHover: '#db2777',
      primaryLight: '#fdf2f8',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
      background: '#fefefe',
      surface: '#ffffff',
      border: '#f3f4f6',
      textPrimary: '#374151',
      textSecondary: '#9ca3af'
    }
  },
  classicBlue: {
    id: 'classicBlue',
    name: 'Classic Blue',
    description: 'Traditional Blue Style',
    emoji: '📘',
    colors: {
      primary: '#1877f2',
      primaryHover: '#166fe5',
      primaryLight: '#e7f3ff',
      secondary: '#42b883',
      accent: '#00d084',
      background: '#f0f2f5',
      surface: '#ffffff',
      border: '#dadde1',
      textPrimary: '#1c1e21',
      textSecondary: '#65676b'
    }
  }
}

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('natureModern')

  // Load theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('socialNetworkTheme')
      if (savedTheme && THEMES[savedTheme]) {
        setCurrentTheme(savedTheme)
      }
    }
  }, [])

  // Apply theme colors to CSS variables
  useEffect(() => {
    const theme = THEMES[currentTheme]
    if (theme) {
      const root = document.documentElement
      Object.entries(theme.colors).forEach(([key, value]) => {
        // Convert camelCase to kebab-case for CSS variables
        const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase()
        root.style.setProperty(`--${cssVar}`, value)
      })
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('socialNetworkTheme', currentTheme)
      }
    }
  }, [currentTheme])

  const changeTheme = (themeId) => {
    if (THEMES[themeId]) {
      setCurrentTheme(themeId)
    }
  }

  const value = {
    currentTheme,
    themes: THEMES,
    changeTheme,
    currentThemeData: THEMES[currentTheme]
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext
