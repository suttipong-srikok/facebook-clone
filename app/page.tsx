'use client'

import { AuthProvider } from '../src/contexts/AuthContext'
import AppContent from '../src/components/AppContent'

export default function Home() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
