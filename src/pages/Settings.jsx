'use client'

import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { Settings as SettingsIcon, Palette, User, Bell, Shield, HelpCircle, X } from 'lucide-react'
import './Settings.css'

const Settings = ({ onClose }) => {
  const { currentTheme, themes, changeTheme, currentThemeData } = useTheme()
  const [activeTab, setActiveTab] = useState('appearance')

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'help', label: 'Help', icon: HelpCircle }
  ]

  const renderAppearanceTab = () => (
    <div className="settings-content">
      <div className="settings-section">
        <h3 className="section-title">Theme Selection</h3>
        <p className="section-description">
          Choose a color theme that matches your style. Changes apply instantly.
        </p>
        
        <div className="theme-grid">
          {Object.values(themes).map((theme) => (
            <div
              key={theme.id}
              className={`theme-card ${currentTheme === theme.id ? 'active' : ''}`}
              onClick={() => changeTheme(theme.id)}
            >
              <div className="theme-preview">
                <div 
                  className="theme-color-primary"
                  style={{ backgroundColor: theme.colors.primary }}
                />
                <div 
                  className="theme-color-secondary"
                  style={{ backgroundColor: theme.colors.secondary }}
                />
                <div 
                  className="theme-color-accent"
                  style={{ backgroundColor: theme.colors.accent }}
                />
              </div>
              <div className="theme-info">
                <div className="theme-name">
                  <span className="theme-emoji">{theme.emoji}</span>
                  {theme.name}
                </div>
                <div className="theme-description">{theme.description}</div>
              </div>
              {currentTheme === theme.id && (
                <div className="theme-active-indicator">
                  <div className="active-dot" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="current-theme-preview">
          <h4>Current Theme: {currentThemeData.name}</h4>
          <div className="color-palette">
            <div className="color-row">
              <div className="color-swatch">
                <div 
                  className="color-circle"
                  style={{ backgroundColor: currentThemeData.colors.primary }}
                />
                <span>Primary</span>
              </div>
              <div className="color-swatch">
                <div 
                  className="color-circle"
                  style={{ backgroundColor: currentThemeData.colors.secondary }}
                />
                <span>Secondary</span>
              </div>
              <div className="color-swatch">
                <div 
                  className="color-circle"
                  style={{ backgroundColor: currentThemeData.colors.accent }}
                />
                <span>Accent</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderOtherTab = (tabId) => (
    <div className="settings-content">
      <div className="settings-section">
        <h3 className="section-title">
          {tabs.find(tab => tab.id === tabId)?.label}
        </h3>
        <p className="section-description">
          {tabId === 'account' && 'Manage your account settings and profile information.'}
          {tabId === 'notifications' && 'Configure your notification preferences.'}
          {tabId === 'privacy' && 'Control your privacy and security settings.'}
          {tabId === 'help' && 'Get help and support for using the platform.'}
        </p>
        <div className="coming-soon">
          <div className="coming-soon-icon">🚧</div>
          <h4>Coming Soon</h4>
          <p>This feature is currently under development and will be available in a future update.</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="settings-overlay">
      <div className="settings-modal">
        <div className="settings-header">
          <h2 className="settings-title">
            <SettingsIcon size={24} />
            Settings
          </h2>
          <button className="settings-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="settings-body">
          <div className="settings-sidebar">
            <nav className="settings-nav">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon size={20} />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="settings-main">
            {activeTab === 'appearance' ? renderAppearanceTab() : renderOtherTab(activeTab)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
