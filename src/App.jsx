import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import NewsFeed from './pages/NewsFeed'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<NewsFeed />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
